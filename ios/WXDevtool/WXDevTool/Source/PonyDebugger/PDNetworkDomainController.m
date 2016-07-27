//
//  PDAFNetworkDomainController.m
//  PonyDebugger
//
//  Created by Mike Lewis on 2/27/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDNetworkDomainController.h"
#import "PDPrettyStringPrinter.h"
#import "NSDate+PDDebugger.h"
#import "NSData+PDDebugger.h"

#import <objc/runtime.h>
#import <objc/message.h>
#import <dispatch/queue.h>


// For reference from the private class dump
//@interface __NSCFURLSessionConnection : NSObject
//
//- (void)_redirectRequest:(id)arg1 redirectResponse:(id)arg2 completion:(void (^)(id arg))arg3;
//- (void)_conditionalRequirementsChanged:(BOOL)arg1;
//- (void)_connectionIsWaiting;
//- (void)_willSendRequestForEstablishedConnection:(id)arg1 completion:(void (^)(NSURLRequest *arg3))arg2;
//- (void)_didReceiveConnectionCacheKey:(struct HTTPConnectionCacheKey *)arg1;
//- (void)_didFinishWithError:(id)arg1;
//- (void)_didSendBodyData:(struct UploadProgressInfo)arg1;
//- (void)_didReceiveData:(id)arg1;
//- (void)_didReceiveResponse:(id)arg1 sniff:(BOOL)arg2;
//
//@end

@interface __NSCFURLSessionConnection_Swizzles : NSObject

@property(copy) NSURLSessionTask *task; // @synthesize task=_task;

@end

@implementation __NSCFURLSessionConnection_Swizzles

@dynamic task;

- (void)PD__redirectRequest:(NSURLRequest *)arg1 redirectResponse:(NSURLResponse *)arg2 completion:(id)arg3;
{
    [[PDNetworkDomainController defaultInstance] URLSession:[self.task valueForKey:@"session"] task:self.task willPerformHTTPRedirection:(id)arg2 newRequest:arg1];
    
    [self PD__redirectRequest:arg1 redirectResponse:arg2 completion:arg3];
}

- (void)PD__didReceiveData:(id)arg1;
{
    [[PDNetworkDomainController defaultInstance] URLSession:[self.task valueForKey:@"session"] dataTask:(id)self.task didReceiveData:arg1];
    
    [self PD__didReceiveData:arg1];
}

- (void)PD__didReceiveResponse:(NSURLResponse *)response sniff:(BOOL)sniff;
{
    // This can be called multiple times for the same request. Make sure it doesn't
    [[PDNetworkDomainController defaultInstance] URLSession:[self.task valueForKey:@"session"] dataTask:(id)self.task didReceiveResponse:response];

    [self PD__didReceiveResponse:response sniff:sniff];
}

- (void)PD__didFinishWithError:(NSError *)arg1;
{
    [[PDNetworkDomainController defaultInstance] URLSession:[self.task valueForKey:@"session"] task:self.task didCompleteWithError:arg1];
    [self PD__didFinishWithError:arg1];
}

@end


@interface NSURLSessionTask (PrivateStuff)

- (NSTimeInterval)startTime;

@end

@interface _PDRequestState : NSObject

@property (nonatomic, copy) NSURLRequest *request;
@property (nonatomic, copy) NSURLResponse *response;
@property (nonatomic, strong) NSMutableData *dataAccumulator;
@property (nonatomic, copy) NSString *requestID;

@end


@interface PDNetworkDomainController ()

- (void)setResponse:(NSData *)responseBody forRequestID:(NSString *)requestID response:(NSURLResponse *)response request:(NSURLRequest *)request;
- (void)performBlock:(dispatch_block_t)block;

@end


@implementation PDNetworkDomainController {
    NSCache *_responseCache;
    NSMutableDictionary *_connectionStates;
    dispatch_queue_t _queue;
}

@dynamic domain;

#pragma mark - Statics

+ (PDNetworkDomainController *)defaultInstance;
{
    static PDNetworkDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[PDNetworkDomainController alloc] init];
    });
    return defaultInstance;
}

+ (NSString *)nextRequestID;
{
    static NSInteger sequenceNumber = 0;
    static NSString *seed = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        CFUUIDRef uuid = CFUUIDCreate(CFAllocatorGetDefault());
        seed = (__bridge NSString *)CFUUIDCreateString(CFAllocatorGetDefault(), uuid);
        CFRelease(uuid);
    });
    
    return [[NSString alloc] initWithFormat:@"%@-%ld", seed, (long)(++sequenceNumber)];
}

+ (Class)domainClass;
{
    return [PDNetworkDomain class];
}

#pragma mark Pretty String Printing registration and usage

// This is replaced atomically to avoid having to lock when looking up the printers instead of being mutable.
static NSArray *prettyStringPrinters = nil;

+ (NSArray*)_currentPrettyStringPrinters;
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // Always register the default to differentiate text vs binary data
        id<PDPrettyStringPrinting> textPrettyStringPrinter = [[PDTextPrettyStringPrinter alloc] init];
        prettyStringPrinters = [[NSArray alloc] initWithObjects:textPrettyStringPrinter, nil];
    });
    return prettyStringPrinters;
}

+ (void)registerPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;
{
    @synchronized(prettyStringPrinters) {
        NSMutableArray *newPrinters = [[PDNetworkDomainController _currentPrettyStringPrinters] mutableCopy];
        [newPrinters addObject:prettyStringPrinter];
        prettyStringPrinters = newPrinters;
    }
}

+ (void)unregisterPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;
{
    @synchronized(prettyStringPrinters) {
        NSMutableArray *newPrinters = [[PDNetworkDomainController _currentPrettyStringPrinters] mutableCopy];
        [newPrinters removeObjectIdenticalTo:prettyStringPrinter];
        prettyStringPrinters = newPrinters;
    }
}

+ (id<PDPrettyStringPrinting>)prettyStringPrinterForRequest:(NSURLRequest *)request;
{
    for(id<PDPrettyStringPrinting> prettyStringPrinter in [[PDNetworkDomainController _currentPrettyStringPrinters] reverseObjectEnumerator]) {
        if ([prettyStringPrinter canPrettyStringPrintRequest:request]) {
            return prettyStringPrinter;
        }
    }
    return nil;
}

+ (id<PDPrettyStringPrinting>)prettyStringPrinterForResponse:(NSURLResponse *)response withRequest:(NSURLRequest *)request;
{
    for(id<PDPrettyStringPrinting> prettyStringPrinter in [[PDNetworkDomainController _currentPrettyStringPrinters] reverseObjectEnumerator]) {
        if ([prettyStringPrinter canPrettyStringPrintResponse:response withRequest:request]) {
            return prettyStringPrinter;
        }
    }
    return nil;
}

#pragma mark Delegate Injection Convenience Methods

+ (SEL)swizzledSelectorForSelector:(SEL)selector;
{
    return NSSelectorFromString([NSString stringWithFormat:@"_pd_swizzle_%x_%@", arc4random(), NSStringFromSelector(selector)]);
}

/// All swizzled delegate methods should make use of this guard.
/// This will prevent duplicated sniffing when the original implementation calls up to a superclass implementation which we've also swizzled.
/// The superclass implementation (and implementations in classes above that) will be executed without inteference if called from the original implementation.
+ (void)sniffWithoutDuplicationForObject:(NSObject *)object selector:(SEL)selector sniffingBlock:(void (^)(void))sniffingBlock originalImplementationBlock:(void (^)(void))originalImplementationBlock
{
    const void *key = selector;

    // Don't run the sniffing block if we're inside a nested call
    if (!objc_getAssociatedObject(object, key)) {
        sniffingBlock();
    }

    // Mark that we're calling through to the original so we can detect nested calls
    objc_setAssociatedObject(object, key, @YES, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    originalImplementationBlock();
    objc_setAssociatedObject(object, key, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

+ (BOOL)instanceRespondsButDoesNotImplementSelector:(SEL)selector class:(Class)cls;
{
    if ([cls instancesRespondToSelector:selector]) {
        unsigned int numMethods = 0;
        Method *methods = class_copyMethodList(cls, &numMethods);
        
        BOOL implementsSelector = NO;
        for (int index = 0; index < numMethods; index++) {
            SEL methodSelector = method_getName(methods[index]);
            if (selector == methodSelector) {
                implementsSelector = YES;
                break;
            }
        }
        
        free(methods);
        
        if (!implementsSelector) {
            return YES;
        }
    }
    
    return NO;
}

+ (void)replaceImplementationOfSelector:(SEL)selector withSelector:(SEL)swizzledSelector forClass:(Class)cls withMethodDescription:(struct objc_method_description)methodDescription implementationBlock:(id)implementationBlock undefinedBlock:(id)undefinedBlock;
{
    if ([self instanceRespondsButDoesNotImplementSelector:selector class:cls]) {
        return;
    }

#ifdef __IPHONE_6_0
    IMP implementation = imp_implementationWithBlock((id)([cls instancesRespondToSelector:selector] ? implementationBlock : undefinedBlock));
#else
    IMP implementation = imp_implementationWithBlock((__bridge void *)([cls instancesRespondToSelector:selector] ? implementationBlock : undefinedBlock));
#endif
    
    Method oldMethod = class_getInstanceMethod(cls, selector);
    if (oldMethod) {
        class_addMethod(cls, swizzledSelector, implementation, methodDescription.types);
         
        Method newMethod = class_getInstanceMethod(cls, swizzledSelector);
        
        method_exchangeImplementations(oldMethod, newMethod);
    } else {
        class_addMethod(cls, selector, implementation, methodDescription.types);
    }
}

#pragma mark - Delegate Injection

+ (void)swizzleNSURLSessionClasses;
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [self _swizzleNSURLSessionClasses];
    });
}

+ (void)_swizzleNSURLSessionClasses;
{
    // On iOS 8 we want to swizzle __NSCFURLSessionConnection. On 9 we want to swizzle its subclass, __NSCFURLLocalSessionConnection
    Class cfURLSessionConnectionClass = NSClassFromString(@"__NSCFURLLocalSessionConnection");
    
    if (cfURLSessionConnectionClass == nil) {
        cfURLSessionConnectionClass = NSClassFromString(@"__NSCFURLSessionConnection");

    }
    if (!cfURLSessionConnectionClass) {
        PDLog(@"Could not find __NSCFURLSessionConnection or __NSCFURLLocalSessionConnection");
        return;
    }
    
    unsigned int outCount = 0;
    Method *methods = class_copyMethodList([__NSCFURLSessionConnection_Swizzles class], &outCount);
    
    for (int i = 0; i < outCount; i++) {
        Method m = methods[i];
        SEL sourceMethod = method_getName(m);
        const char *encoding = method_getTypeEncoding(m);
        NSString *sourceMethodName = NSStringFromSelector(sourceMethod);
        NSAssert([sourceMethodName hasPrefix:@"PD_"], @"Expecting swizzle methods only");
        NSString *originalMethodName = [sourceMethodName substringFromIndex:3];
        SEL originalMethod = NSSelectorFromString(originalMethodName);
        NSAssert(originalMethod, @"Must find selector");
        
        IMP sourceImp = method_getImplementation(m);
        
        IMP originalImp = class_getMethodImplementation(cfURLSessionConnectionClass, originalMethod);
        
        NSAssert(originalImp, @"Must find imp");

        BOOL success = class_addMethod(cfURLSessionConnectionClass, sourceMethod, originalImp, encoding);
        if (!success) {
            NSAssert(success, @"Should be successful");
        }
        IMP replacedImp = class_replaceMethod(cfURLSessionConnectionClass, originalMethod, sourceImp, encoding);
        if (!replacedImp) {
            NSAssert(replacedImp, @"Expected originam method to have been replaced");
        }
    }
    
    if (methods) {
        free(methods);
    }
}

+ (void)injectIntoAllNSURLConnectionDelegateClasses;
{
    // Only allow swizzling once.
    static BOOL swizzled = NO;
    if (swizzled) {
        return;
    }
    
    swizzled = YES;

    // Swizzle any classes that implement one of these selectors.
    const SEL selectors[] = {
        @selector(connectionDidFinishLoading:),
        @selector(connection:didReceiveResponse:),
        @selector(URLSession:dataTask:didReceiveResponse:completionHandler:),
        @selector(URLSession:task:didCompleteWithError:),
        @selector(URLSession:downloadTask:didFinishDownloadingToURL:)
    };
    
    const int numSelectors = sizeof(selectors) / sizeof(SEL);

    Class *classes = NULL;
    int numClasses = objc_getClassList(NULL, 0);
    
    if (numClasses > 0) {
        classes = (__unsafe_unretained Class *)malloc(sizeof(Class) * numClasses);
        numClasses = objc_getClassList(classes, numClasses);
        for (NSInteger classIndex = 0; classIndex < numClasses; ++classIndex) {
            Class class = classes[classIndex];
            
            if (class_getClassMethod(class, @selector(isSubclassOfClass:)) == NULL) {
                continue;
            }
            
            if (![class isSubclassOfClass:[NSObject class]]) {
                continue;
            }
            
            if ([class isSubclassOfClass:[PDNetworkDomainController class]]) {
                continue;
            }
            
            for (int selectorIndex = 0; selectorIndex < numSelectors; ++selectorIndex) {
                if ([class instancesRespondToSelector:selectors[selectorIndex]]) {
                    [self injectIntoDelegateClass:class];
                    break;
                }
            }
        }
        
        free(classes);
    }
}

+ (void)injectIntoDelegateClass:(Class)cls;
{
    // Connections
    [self injectWillSendRequestIntoDelegateClass:cls];
    [self injectDidReceiveDataIntoDelegateClass:cls];
    [self injectDidReceiveResponseIntoDelegateClass:cls];
    [self injectDidFinishLoadingIntoDelegateClass:cls];
    [self injectDidFailWithErrorIntoDelegateClass:cls];
}

+ (void)injectWillSendRequestIntoDelegateClass:(Class)cls;
{
    SEL selector = @selector(connection:willSendRequest:redirectResponse:);
    SEL swizzledSelector = [self swizzledSelectorForSelector:selector];
    
    Protocol *protocol = @protocol(NSURLConnectionDataDelegate);
    if (!protocol) {
        protocol = @protocol(NSURLConnectionDelegate);
    }
    
    struct objc_method_description methodDescription = protocol_getMethodDescription(protocol, selector, NO, YES);
    
    typedef NSURLRequest *(^NSURLConnectionWillSendRequestBlock)(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLRequest *request, NSURLResponse *response);
    
    NSURLConnectionWillSendRequestBlock undefinedBlock = ^NSURLRequest *(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLRequest *request, NSURLResponse *response) {
        [[PDNetworkDomainController defaultInstance] connection:connection willSendRequest:request redirectResponse:response];
        return request;
    };
    
    NSURLConnectionWillSendRequestBlock implementationBlock = ^NSURLRequest *(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLRequest *request, NSURLResponse *response) {
        __block NSURLRequest *returnValue = nil;
        [self sniffWithoutDuplicationForObject:connection selector:selector sniffingBlock:^{
            undefinedBlock(slf, connection, request, response);
        } originalImplementationBlock:^{
            returnValue = ((id(*)(id, SEL, id, id, id))objc_msgSend)(slf, swizzledSelector, connection, request, response);
        }];
        return returnValue;
    };
    
    [self replaceImplementationOfSelector:selector withSelector:swizzledSelector forClass:cls withMethodDescription:methodDescription implementationBlock:implementationBlock undefinedBlock:undefinedBlock];
}

+ (void)injectDidReceiveResponseIntoDelegateClass:(Class)cls;
{
    SEL selector = @selector(connection:didReceiveResponse:);
    SEL swizzledSelector = [self swizzledSelectorForSelector:selector];
    
    Protocol *protocol = @protocol(NSURLConnectionDataDelegate);
    if (!protocol) {
        protocol = @protocol(NSURLConnectionDelegate);
    }
    
    struct objc_method_description methodDescription = protocol_getMethodDescription(protocol, selector, NO, YES);
    
    typedef void (^NSURLConnectionDidReceiveResponseBlock)(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLResponse *response);
    
    NSURLConnectionDidReceiveResponseBlock undefinedBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLResponse *response) {
        [[PDNetworkDomainController defaultInstance] connection:connection didReceiveResponse:response];
    };
    
    NSURLConnectionDidReceiveResponseBlock implementationBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSURLResponse *response) {
        [self sniffWithoutDuplicationForObject:connection selector:selector sniffingBlock:^{
            undefinedBlock(slf, connection, response);
        } originalImplementationBlock:^{
            ((void(*)(id, SEL, id, id))objc_msgSend)(slf, swizzledSelector, connection, response);
        }];
    };
    
    [self replaceImplementationOfSelector:selector withSelector:swizzledSelector forClass:cls withMethodDescription:methodDescription implementationBlock:implementationBlock undefinedBlock:undefinedBlock];
}

+ (void)injectDidReceiveDataIntoDelegateClass:(Class)cls;
{
    SEL selector = @selector(connection:didReceiveData:);
    SEL swizzledSelector = [self swizzledSelectorForSelector:selector];
    
    Protocol *protocol = @protocol(NSURLConnectionDataDelegate);
    if (!protocol) {
        protocol = @protocol(NSURLConnectionDelegate);
    }
    
    struct objc_method_description methodDescription = protocol_getMethodDescription(protocol, selector, NO, YES);
    
    typedef void (^NSURLConnectionDidReceiveDataBlock)(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSData *data);
    
    NSURLConnectionDidReceiveDataBlock undefinedBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSData *data) {
        [[PDNetworkDomainController defaultInstance] connection:connection didReceiveData:data];
    };
    
    NSURLConnectionDidReceiveDataBlock implementationBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSData *data) {
        [self sniffWithoutDuplicationForObject:connection selector:selector sniffingBlock:^{
            undefinedBlock(slf, connection, data);
        } originalImplementationBlock:^{
            ((void(*)(id, SEL, id, id))objc_msgSend)(slf, swizzledSelector, connection, data);
        }];
    };
    
    [self replaceImplementationOfSelector:selector withSelector:swizzledSelector forClass:cls withMethodDescription:methodDescription implementationBlock:implementationBlock undefinedBlock:undefinedBlock];
}

+ (void)injectDidFinishLoadingIntoDelegateClass:(Class)cls;
{
    SEL selector = @selector(connectionDidFinishLoading:);
    SEL swizzledSelector = [self swizzledSelectorForSelector:selector];
    
    Protocol *protocol = @protocol(NSURLConnectionDataDelegate);
    if (!protocol) {
        protocol = @protocol(NSURLConnectionDelegate);
    }
    
    struct objc_method_description methodDescription = protocol_getMethodDescription(protocol, selector, NO, YES);
    
    typedef void (^NSURLConnectionDidFinishLoadingBlock)(id <NSURLConnectionDelegate> slf, NSURLConnection *connection);
    
    NSURLConnectionDidFinishLoadingBlock undefinedBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection) {
        [[PDNetworkDomainController defaultInstance] connectionDidFinishLoading:connection];
    };
    
    NSURLConnectionDidFinishLoadingBlock implementationBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection) {
        [self sniffWithoutDuplicationForObject:connection selector:selector sniffingBlock:^{
            undefinedBlock(slf, connection);
        } originalImplementationBlock:^{
            ((void(*)(id, SEL, id))objc_msgSend)(slf, swizzledSelector, connection);
        }];
    };
    
    [self replaceImplementationOfSelector:selector withSelector:swizzledSelector forClass:cls withMethodDescription:methodDescription implementationBlock:implementationBlock undefinedBlock:undefinedBlock];
}

+ (void)injectDidFailWithErrorIntoDelegateClass:(Class)cls;
{
    SEL selector = @selector(connection:didFailWithError:);
    SEL swizzledSelector = [self swizzledSelectorForSelector:selector];
    
    Protocol *protocol = @protocol(NSURLConnectionDelegate);
    struct objc_method_description methodDescription = protocol_getMethodDescription(protocol, selector, NO, YES);
    
    typedef void (^NSURLConnectionDidFailWithErrorBlock)(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSError *error);
    
    NSURLConnectionDidFailWithErrorBlock undefinedBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSError *error) {
        [[PDNetworkDomainController defaultInstance] connection:connection didFailWithError:error];
    };
    
    NSURLConnectionDidFailWithErrorBlock implementationBlock = ^(id <NSURLConnectionDelegate> slf, NSURLConnection *connection, NSError *error) {
        [self sniffWithoutDuplicationForObject:connection selector:selector sniffingBlock:^{
            undefinedBlock(slf, connection, error);
        } originalImplementationBlock:^{
            ((void(*)(id, SEL, id, id))objc_msgSend)(slf, swizzledSelector, connection, error);
        }];
    };
    
    [self replaceImplementationOfSelector:selector withSelector:swizzledSelector forClass:cls withMethodDescription:methodDescription implementationBlock:implementationBlock undefinedBlock:undefinedBlock];
}

#pragma mark - Initialization

- (id)init;
{
    self = [super init];
    if (!self) {
        return nil;
    }

    _connectionStates = [[NSMutableDictionary alloc] init];
    _responseCache = [[NSCache alloc] init];
    _queue = dispatch_queue_create("com.squareup.ponydebugger.PDNetworkDomainController", DISPATCH_QUEUE_SERIAL);
    
    return self;
}

- (void)dealloc;
{
    if (_queue) {
//        dispatch_release(_queue);
        _queue = nil;
    }
}

#pragma mark - PDNetworkCommandDelegate

- (void)domain:(PDNetworkDomain *)domain canClearBrowserCacheWithCallback:(void (^)(NSNumber *, id))callback;
{
    callback([NSNumber numberWithBool:NO], nil);
}

- (void)domain:(PDNetworkDomain *)domain canClearBrowserCookiesWithCallback:(void (^)(NSNumber *, id))callback
{
    callback([NSNumber numberWithBool:NO], nil);
}

- (void)domain:(PDNetworkDomain *)domain clearBrowserCacheWithCallback:(void (^)(id))callback;
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
    callback(nil);
}

- (void)domain:(PDNetworkDomain *)domain getResponseBodyWithRequestId:(NSString *)requestId callback:(void (^)(NSString *, NSNumber *, id))callback;
{
    NSDictionary *response = [_responseCache objectForKey:requestId];
    callback([response objectForKey:@"body"], [response objectForKey:@"base64Encoded"], nil);
}

#pragma mark - public Methods
- (NSCache *)getNetWorkResponseCache {
    return _responseCache;
}

#pragma mark - Private Methods

- (void)setResponse:(NSData *)responseBody forRequestID:(NSString *)requestID response:(NSURLResponse *)response request:(NSURLRequest *)request;
{
    id<PDPrettyStringPrinting> prettyStringPrinter = [PDNetworkDomainController prettyStringPrinterForResponse:response withRequest:request];
    
    NSString *encodedBody;
    BOOL isBinary;
    if (!prettyStringPrinter) {
#if __IPHONE_OS_VERSION_MIN_REQUIRED >= 70000
        encodedBody = [responseBody base64EncodedStringWithOptions:0];
#else
        encodedBody = responseBody.base64Encoding;
#endif
        isBinary = YES;
    } else {
        encodedBody = [prettyStringPrinter prettyStringForData:responseBody forResponse:response request:request];
        isBinary = NO;
    }

    NSDictionary *responseDict = [NSDictionary dictionaryWithObjectsAndKeys:
        encodedBody, @"body",
        [NSNumber numberWithBool:isBinary], @"base64Encoded",
        nil];

    [_responseCache setObject:responseDict forKey:requestID cost:[responseBody length]];
}

- (void)performBlock:(dispatch_block_t)block;
{
    dispatch_async(_queue, block);
}

#pragma mark - Private Methods (Connections)

- (_PDRequestState *)requestStateForConnection:(NSURLConnection *)connection;
{
    NSValue *key = [NSValue valueWithNonretainedObject:connection];
    _PDRequestState *state = [_connectionStates objectForKey:key];
    if (!state) {
        state = [[_PDRequestState alloc] init];
        state.requestID = [[self class] nextRequestID];
        [_connectionStates setObject:state forKey:key];
    }

    return state;
}

- (NSString *)requestIDForConnection:(NSURLConnection *)connection;
{
    return [self requestStateForConnection:connection].requestID;
}

- (void)setResponse:(NSURLResponse *)response forConnection:(NSURLConnection *)connection;
{
    [self requestStateForConnection:connection].response = response;
}

- (NSURLResponse *)responseForConnection:(NSURLConnection *)connection;
{
    return [self requestStateForConnection:connection].response;
}

- (void)setRequest:(NSURLRequest *)request forConnection:(NSURLConnection *)connection;
{
    [self requestStateForConnection:connection].request = request;
}

- (NSURLRequest *)requestForConnection:(NSURLConnection *)connection;
{
    return [self requestStateForConnection:connection].request;
}

- (void)setAccumulatedData:(NSMutableData *)data forConnection:(NSURLConnection *)connection;
{
    _PDRequestState *requestState = [self requestStateForConnection:connection];
    requestState.dataAccumulator = data;
}

- (void)addAccumulatedData:(NSData *)data forConnection:(NSURLConnection *)connection;
{
    NSMutableData *dataAccumulator = [self requestStateForConnection:connection].dataAccumulator;
    
    [dataAccumulator appendData:data];
}

- (NSData *)accumulatedDataForConnection:(NSURLConnection *)connection;
{
    return [self requestStateForConnection:connection].dataAccumulator;
}

// This removes storing the accumulated request/response from the dictionary so we can release connection
- (void)connectionFinished:(NSURLConnection *)connection;
{
    NSValue *key = [NSValue valueWithNonretainedObject:connection];
    [_connectionStates removeObjectForKey:key];
}

#pragma mark - Private Methods (Tasks)

- (_PDRequestState *)requestStateForTask:(NSURLSessionTask *)task;
{
    NSValue *key = [NSValue valueWithNonretainedObject:task];
    _PDRequestState *state = [_connectionStates objectForKey:key];
    if (!state) {
        state = [[_PDRequestState alloc] init];
        state.requestID = [[self class] nextRequestID];
        [_connectionStates setObject:state forKey:key];
    }

    return state;
}

- (NSString *)requestIDForTask:(NSURLSessionTask *)task;
{
    return [self requestStateForTask:task].requestID;
}

- (void)setResponse:(NSURLResponse *)response forTask:(NSURLSessionTask *)task;
{
    [self requestStateForTask:task].response = response;
}

- (NSURLResponse *)responseForTask:(NSURLSessionTask *)task
{
    return [self requestStateForTask:task].response;
}

- (void)setRequest:(NSURLRequest *)request forTask:(NSURLSessionTask *)task;
{
    [self requestStateForTask:task].request = request;
}

- (NSURLRequest *)requestForTask:(NSURLSessionTask *)task;
{
    return [self requestStateForTask:task].request;
}

- (void)setAccumulatedData:(NSMutableData *)data forTask:(NSURLSessionTask *)task;
{
    _PDRequestState *requestState = [self requestStateForTask:task];
    requestState.dataAccumulator = data;
}

- (void)addAccumulatedData:(NSData *)data forTask:(NSURLSessionTask *)task;
{
    NSMutableData *dataAccumulator = [self requestStateForTask:task].dataAccumulator;

    [dataAccumulator appendData:data];
}

- (NSData *)accumulatedDataForTask:(NSURLSessionTask *)task;
{
    return [self requestStateForTask:task].dataAccumulator;
}

// This removes storing the accumulated request/response from the dictionary so we can release task
- (void)taskFinished:(NSURLSessionTask *)task;
{
    NSValue *key = [NSValue valueWithNonretainedObject:task];
    [_connectionStates removeObjectForKey:key];
}

@end


@implementation PDNetworkDomainController (NSURLConnectionHelpers)

- (void)connection:(NSURLConnection *)connection willSendRequest:(NSURLRequest *)request redirectResponse:(NSURLResponse *)response;
{
    [self performBlock:^{
        [self setRequest:request forConnection:connection];
        PDNetworkRequest *networkRequest = [PDNetworkRequest networkRequestWithURLRequest:request];
        PDNetworkResponse *networkRedirectResponse = response ? [[PDNetworkResponse alloc] initWithURLResponse:response request:request] : nil;
        
        [self.domain requestWillBeSentWithRequestId:[self requestIDForConnection:connection]
                                            frameId:@"3888.3"
                                           loaderId:@"11111"
                                        documentURL:[request.URL absoluteString]
                                            request:networkRequest
                                          timestamp:[NSDate PD_timestamp]
                                          initiator:nil
                                   redirectResponse:networkRedirectResponse];
    }];
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response;
{
    [self performBlock:^{
        
        if ([response respondsToSelector:@selector(copyWithZone:)]) {
            
            // If the request wasn't generated yet, then willSendRequest was not called. This appears to be an inconsistency in documentation
            // and behavior.
            NSURLRequest *request = [self requestForConnection:connection];
            if (!request && [connection respondsToSelector:@selector(currentRequest)]) {
            
                NSLog(@"PonyDebugger Warning: -[PDNetworkDomainController connection:willSendRequest:redirectResponse:] not called, request timestamp may be inaccurate. See Known Issues in the README for more information.");

                request = connection.currentRequest;
                [self setRequest:request forConnection:connection];

                PDNetworkRequest *networkRequest = [PDNetworkRequest networkRequestWithURLRequest:request];
                [self.domain requestWillBeSentWithRequestId:[self requestIDForConnection:connection]
                                                    frameId:@"3888.3"
                                                   loaderId:@"11111"
                                                documentURL:[request.URL absoluteString]
                                                    request:networkRequest
                                                  timestamp:[NSDate PD_timestamp]
                                                  initiator:nil
                                           redirectResponse:nil];
            }
        
            [self setResponse:response forConnection:connection];
            
            NSMutableData *dataAccumulator = nil;
            if (response.expectedContentLength < 0) {
                dataAccumulator = [[NSMutableData alloc] init];
            } else {
                dataAccumulator = [[NSMutableData alloc] initWithCapacity:(NSUInteger)response.expectedContentLength];
            }
            
            [self setAccumulatedData:dataAccumulator forConnection:connection];
            
            NSString *requestID = [self requestIDForConnection:connection];
            PDNetworkResponse *networkResponse = [PDNetworkResponse networkResponseWithURLResponse:response request:[self requestForConnection:connection]];
            
            [self.domain responseReceivedWithRequestId:requestID
                                               frameId:@"3888.3"
                                              loaderId:@"11111"
                                             timestamp:[NSDate PD_timestamp]
                                                  type:response.PD_responseType
                                              response:networkResponse];
        }
        
    }];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data;
{
    // Just to be safe since we're doing this async
    data = [data copy];
    [self performBlock:^{
        [self addAccumulatedData:data forConnection:connection];

        if ([self accumulatedDataForConnection:connection] == nil) return;
        
        NSNumber *length = [NSNumber numberWithInteger:data.length];
        NSString *requestID = [self requestIDForConnection:connection];
        
        [self.domain dataReceivedWithRequestId:requestID
                                     timestamp:[NSDate PD_timestamp]
                                    dataLength:length
                             encodedDataLength:length];
    }];
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection;
{
    [self performBlock:^{
        NSURLResponse *response = [self responseForConnection:connection];
        NSString *requestID = [self requestIDForConnection:connection];

        NSData *accumulatedData = [self accumulatedDataForConnection:connection];

        [self setResponse:accumulatedData
             forRequestID:requestID
                 response:response
                  request:[self requestForConnection:connection]];
        
        [self.domain loadingFinishedWithRequestId:requestID
                                        timestamp:[NSDate PD_timestamp]];
        
        [self connectionFinished:connection];
    }];
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error;
{
    [self performBlock:^{
        [self.domain loadingFailedWithRequestId:[self requestIDForConnection:connection]
                                      timestamp:[NSDate PD_timestamp]
                                      errorText:[error localizedDescription]
                                       canceled:[NSNumber numberWithBool:NO]];
        
        [self connectionFinished:connection];
    }];
}

@end


@implementation PDNetworkDomainController (NSURLSessionTaskHelpers)

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task willPerformHTTPRedirection:(NSHTTPURLResponse *)response newRequest:(NSURLRequest *)request
{
    [self performBlock:^{
        NSMutableURLRequest *newRequest = [request mutableCopy];
        [session.configuration.HTTPAdditionalHeaders enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
            if (![newRequest valueForHTTPHeaderField:key]) {
                [newRequest setValue:obj forHTTPHeaderField:key];
            }
        }];

        [self setRequest:newRequest forTask:task];
        PDNetworkRequest *networkRequest = [PDNetworkRequest networkRequestWithURLRequest:request];
        PDNetworkResponse *networkRedirectResponse = response ? [[PDNetworkResponse alloc] initWithURLResponse:response request:request] : nil;
        
        
        NSDate *startDate = nil;
        if ([task respondsToSelector:@selector(startTime)]) {
            startDate = [NSDate dateWithTimeIntervalSinceReferenceDate:[task startTime]];
        } else {
            static dispatch_once_t onceToken;
            dispatch_once(&onceToken, ^{
                NSLog(@"PonyDebugger Warning: Some requests' timestamps may be inaccurate. See Known Issues in the README for more information.");
            });
            
            startDate = [NSDate date];
        }
        
        [self.domain requestWillBeSentWithRequestId:[self requestIDForTask:task]
                                            frameId:@"3888.3"
                                           loaderId:@"11111"
                                        documentURL:[request.URL absoluteString]
                                            request:networkRequest
                                          timestamp:@(startDate.timeIntervalSince1970)
                                          initiator:nil
                                   redirectResponse:networkRedirectResponse];
    }];
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveResponse:(NSURLResponse *)response;
{
    if ([response respondsToSelector:@selector(copyWithZone:)]) {

        // willSendRequest does not exist in NSURLSession. Here's a workaround.
        NSURLRequest *request = [self requestForTask:dataTask];
        if (!request && [dataTask respondsToSelector:@selector(currentRequest)]) {

            /// We need to set headers from the session configuration
            NSMutableURLRequest *request = [dataTask.currentRequest mutableCopy];
            
            /// FOr some reason, the currentRequest doesn't always keep the HTTPBody around.
            if (request.HTTPBody == nil && dataTask.originalRequest.HTTPBody) {
                request.HTTPBody = dataTask.originalRequest.HTTPBody;
            }
            
            [session.configuration.HTTPAdditionalHeaders enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
                if (![request valueForHTTPHeaderField:key]) {
                    [request setValue:obj forHTTPHeaderField:key];
                }
            }];

            [self setRequest:request forTask:dataTask];

            NSDate *startDate = nil;
            if ([dataTask respondsToSelector:@selector(startTime)]) {
                startDate = [NSDate dateWithTimeIntervalSinceReferenceDate:[dataTask startTime]];
            } else {
                static dispatch_once_t onceToken;
                dispatch_once(&onceToken, ^{
                    NSLog(@"PonyDebugger Warning: Some requests' timestamps may be inaccurate. See Known Issues in the README for more information.");
                });
                
                startDate = [NSDate date];
            }
            
            PDNetworkRequest *networkRequest = [PDNetworkRequest networkRequestWithURLRequest:request];
            [self.domain requestWillBeSentWithRequestId:[self requestIDForTask:dataTask]
                                                frameId:@"3888.3"
                                               loaderId:@"11111"
                                            documentURL:[request.URL absoluteString]
                                                request:networkRequest
                                              timestamp:@(startDate.timeIntervalSince1970)
                                              initiator:nil
                                       redirectResponse:nil];
        }

        [self setResponse:response forTask:dataTask];

        NSMutableData *dataAccumulator = nil;
        if (response.expectedContentLength < 0) {
            dataAccumulator = [[NSMutableData alloc] init];
        } else {
            dataAccumulator = [[NSMutableData alloc] initWithCapacity:(NSUInteger)response.expectedContentLength];
        }

        [self setAccumulatedData:dataAccumulator forTask:dataTask];

        NSString *requestID = [self requestIDForTask:dataTask];
        PDNetworkResponse *networkResponse = [PDNetworkResponse networkResponseWithURLResponse:response request:[self requestForTask:dataTask]];
        /*
        PDNetworkResourceTiming *timeline = [[PDNetworkResourceTiming alloc] init];
        timeline.requestTime = [NSNumber numberWithDouble:startDate.timeIntervalSince1970];//[NSDate PD_timestamp];
        timeline.proxyStart = [NSNumber numberWithInt:0];
        timeline.proxyEnd = [NSNumber numberWithInt:10001];
        timeline.dnsStart = [NSNumber numberWithInt:89];
        timeline.dnsEnd = [NSNumber numberWithInt:90];
        timeline.connectStart = [NSNumber numberWithInt:23];
        timeline.connectEnd = [NSNumber numberWithInt:34];
        timeline.sslStart = [NSNumber numberWithInt:0];
        timeline.sslEnd = [NSNumber numberWithInt:1];
        timeline.sendStart = [NSDate PD_timestamp];
        timeline.sendEnd = [NSDate PD_timestamp];
        timeline.receiveHeadersEnd = [NSNumber numberWithDouble:startDate.timeIntervalSince1970];//[NSDate PD_timestamp];
        networkResponse.timing = timeline;
         */
        [self.domain responseReceivedWithRequestId:requestID
                                           frameId:@"3888.3"
                                          loaderId:@"11111"
                                         timestamp:[NSDate PD_timestamp]
                                              type:response.PD_responseType
                                          response:networkResponse];
    }
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data
{
    // Just to be safe since we're doing this async
    data = [data copy];
    [self performBlock:^{
        [self addAccumulatedData:data forTask:dataTask];

        if ([self accumulatedDataForTask:dataTask] == nil) return;

        NSNumber *length = [NSNumber numberWithInteger:data.length];
        NSString *requestID = [self requestIDForTask:dataTask];

        [self.domain dataReceivedWithRequestId:requestID
                                     timestamp:[NSDate PD_timestamp]
                                    dataLength:length
                             encodedDataLength:length];
    }];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error;
{
    [self performBlock:^{
        NSURLResponse *response = [self responseForTask:task];
        NSString *requestID = [self requestIDForTask:task];

        NSData *accumulatedData = [self accumulatedDataForTask:task];

        if (error) {
            [self.domain loadingFailedWithRequestId:[self requestIDForTask:task]
                                          timestamp:[NSDate PD_timestamp]
                                          errorText:[error localizedDescription]
                                           canceled:[NSNumber numberWithBool:NO]];
        } else {
            [self setResponse:accumulatedData
                 forRequestID:requestID
                     response:response
                      request:[self requestForTask:task]];
        }

        [self.domain loadingFinishedWithRequestId:requestID
                                        timestamp:[NSDate PD_timestamp]];

        [self taskFinished:task];
    }];
}

@end


@implementation PDNetworkRequest (PDNetworkHelpers)

- (id)initWithURLRequest:(NSURLRequest *)request
{
    self = [super init];
    if (!self) {
        return nil;
    }
    
    self.url = [request.URL absoluteString];
    self.method = request.HTTPMethod;
    self.headers = request.allHTTPHeaderFields;
    
    
    NSData *body = request.HTTPBody;
    
    // pretty print and redact sensitive fields
    id<PDPrettyStringPrinting> prettyStringPrinter = [PDNetworkDomainController prettyStringPrinterForRequest:request];
    if (prettyStringPrinter) {
        self.postData = [prettyStringPrinter prettyStringForData:body forRequest:request];
    } else {
        // If the data isn't UTF-8 it will just be nil;
        self.postData = [[NSString alloc] initWithData:body encoding:NSUTF8StringEncoding];
    }

    return self;
}

+ (PDNetworkRequest *)networkRequestWithURLRequest:(NSURLRequest *)request;
{
    return [[[self class] alloc] initWithURLRequest:request];
}

@end


@implementation PDNetworkResponse (PDNetworkHelpers)

- (id)initWithURLResponse:(NSURLResponse *)response request:(NSURLRequest *)request
{
    self = [super init];
    if (!self) {
        return nil;
    }
    
    self.url = [response.URL absoluteString];

    // Set statusText if this was a HTTP Response
    self.statusText = @"";

    self.mimeType = response.MIMEType;
    self.requestHeaders = request.allHTTPHeaderFields;
    
    if ([response isKindOfClass:[NSHTTPURLResponse class]]) {
        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;
        self.status = [NSNumber numberWithInteger:httpResponse.statusCode];
        self.statusText = [NSHTTPURLResponse localizedStringForStatusCode:httpResponse.statusCode];
        self.headers = httpResponse.allHeaderFields;
    }

    return self;
}

+ (PDNetworkResponse *)networkResponseWithURLResponse:(NSURLResponse *)response request:(NSURLRequest *)request;
{
    return [[[self class] alloc] initWithURLResponse:response request:request];
}

@end


@implementation NSURLResponse (PDNetworkHelpers)

- (NSString *)PD_responseType;
{
    NSString *MIMEType = self.MIMEType;
    NSString *contentType = [MIMEType lowercaseString];
    NSString *type = @"Other";
    
    if ([contentType rangeOfString:@"image"].length != 0) {
        type = @"Image";
    } else if ([contentType rangeOfString:@"json"].length != 0) {
        type = @"XHR";
    } else if ([contentType rangeOfString:@"javascript"].length != 0) {
        type = @"Script";
    } else if ([contentType rangeOfString:@"css"].length != 0) {
        type = @"Stylesheet";
    }

    return type;
}

@end


@implementation _PDRequestState

@synthesize request = _request;
@synthesize response = _response;
@synthesize requestID = _requestID;
@synthesize dataAccumulator = _dataAccumulator;

@end
