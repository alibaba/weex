//
//  PDPageDomainController.m
//  PonyDebugger
//
//  Created by Wen-Hao Lue on 8/6/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDPageDomainController.h"
#import "PDRuntimeDomainController.h"
#import "PDPageDomain.h"
#import "PDPageTypes.h"


@interface PDPageDomainController () <PDPageCommandDelegate>
@end


@implementation PDPageDomainController

@dynamic domain;

#pragma mark - Statics

+ (PDPageDomainController *)defaultInstance;
{
    static PDPageDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[PDPageDomainController alloc] init];
    });
    
    return defaultInstance;
}

+ (Class)domainClass;
{
    return [PDPageDomain class];
}


#pragma mark - PDPageCommandDelegate
- (void)domain:(PDPageDomain *)domain enableWithCallback:(void (^)(id error))callback {
    callback(nil);
//    [self.domain workerRegistrationUpdated];
//    [self.domain workerVersionUpdated];
}

- (void)domain:(PDPageDomain *)domain canOverrideDeviceMetricsWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

- (void)domain:(PDPageDomain *)domain canOverrideGeolocationWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

- (void)domain:(PDPageDomain *)domain canOverrideDeviceOrientationWithCallback:(void (^)(NSNumber *result, id error))callback {
    callback([NSNumber numberWithBool:YES],nil);
}

- (void)domain:(PDPageDomain *)domain getResourceTreeWithCallback:(void (^)(PDPageFrameResourceTree *, id))callback;
{
    NSString *localPath = [NSString stringWithFormat:@"%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath];
    
    PDPageFrame *frame = [[PDPageFrame alloc] init];
    frame.identifier = @"3888.3";
    frame.name = @"Root";
    frame.securityOrigin = [NSBundle mainBundle].bundlePath;//[[NSBundle mainBundle] bundleIdentifier];
    frame.url = localPath;//localPath;
    frame.loaderId = @"11111";
    frame.mimeType = @"application/javascript";
    
    PDFrameResource *resource = [[PDFrameResource alloc] init];
    resource.url = @"index.js";
    resource.mimeType = @"application/javascript";
    resource.type = @"Script";
    
    PDPageFrameResourceTree *resourceTree = [[PDPageFrameResourceTree alloc] init];
    resourceTree.frame = frame;
    resourceTree.resources = @[resource];
    
    callback(resourceTree, nil);
}

- (void)domain:(PDPageDomain *)domain reloadWithIgnoreCache:(NSNumber *)ignoreCache scriptToEvaluateOnLoad:(NSString *)scriptToEvaluateOnLoad callback:(void (^)(id))callback;
{
    callback(nil);
}

@end
