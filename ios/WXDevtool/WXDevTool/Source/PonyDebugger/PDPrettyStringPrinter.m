//
//  PDPrettyStringPrinter.m
//  PonyDebugger
//
//  Created by Dave Apgar on 2/28/13.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDPrettyStringPrinter.h"


@implementation PDTextPrettyStringPrinter

#pragma mark - PDPrettyStringPrinting

// Handle any non-binary, but don't make it pretty
- (BOOL)canPrettyStringPrintContentType:(NSString *)contentType;
{
    return
    ([contentType rangeOfString:@"json"].location != NSNotFound)
    || ([contentType rangeOfString:@"text"].location != NSNotFound)
    || ([contentType rangeOfString:@"xml"].location != NSNotFound)
    || ([contentType rangeOfString:@"javascript"].location != NSNotFound);
}

- (BOOL)canPrettyStringPrintRequest:(NSURLRequest *)request;
{
    NSString *contentType = [request valueForHTTPHeaderField:@"Content-Type"];
    return [self canPrettyStringPrintContentType:contentType];
}

- (BOOL)canPrettyStringPrintResponse:(NSURLResponse *)response withRequest:(NSURLRequest *)request;
{
    return [self canPrettyStringPrintContentType:response.MIMEType];
}

- (NSString*)prettyStringForData:(NSData *)data;
{
    return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
}

- (NSString *)prettyStringForData:(NSData *)data forRequest:(NSURLRequest *)request;
{
    return [self prettyStringForData:data];
}

- (NSString *)prettyStringForData:(NSData *)data forResponse:(NSURLResponse *)response request:(NSURLRequest *)request;
{
    return [self prettyStringForData:data];
}

@end


@implementation PDJSONPrettyStringPrinter {
    NSMutableSet *_redactedFields;
}

@synthesize redactedFields = _redactedFields;

#pragma mark - Initialization

- (id)init;
{
    self = [super init];
    if (self) {
        _redactedFields = [[NSMutableSet alloc] initWithObjects:@"password", nil];
    }
    return self;
}

- (id)initWithRedactedFields:(NSArray *)redactedFields;
{
    self = [self init];
    for (NSString *field in redactedFields) {
        [_redactedFields addObject:field];
    }
    return self;
}

#pragma mark - PDPrettyStringPrinting

- (BOOL)canPrettyStringPrintContentType:(NSString *)contentType;
{
    if ([contentType rangeOfString:@"json"].location != NSNotFound) {
        return YES;
    }
    return NO;
}

- (BOOL)canPrettyStringPrintRequest:(NSURLRequest *)request;
{
    NSString *mimeType = [request valueForHTTPHeaderField:@"Content-Type"];
    return [self canPrettyStringPrintContentType:mimeType];
}

- (BOOL)canPrettyStringPrintResponse:(NSURLResponse *)response withRequest:(NSURLRequest *)request;
{
    return [self canPrettyStringPrintContentType:response.MIMEType];
}

- (NSString *)prettyStringForData:(NSData *)data;
{
    if (!data) {
        return nil;
    }

    NSData *prettyData = data;
    NSMutableDictionary *jsonObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];

    if (jsonObject) {
        if ([jsonObject isKindOfClass:[NSDictionary class]]) {
            jsonObject = [jsonObject mutableCopy];
            for (NSString *redactedField in _redactedFields) {
                if ([jsonObject objectForKey:redactedField]) {
                    [jsonObject setObject:@"REDACTED" forKey:redactedField];
                }
            }
        }
        prettyData = [NSJSONSerialization dataWithJSONObject:jsonObject options:NSJSONWritingPrettyPrinted error:NULL];
    }

    return [[NSString alloc] initWithData:prettyData encoding:NSUTF8StringEncoding];
}

- (NSString *)prettyStringForData:(NSData *)data forRequest:(NSURLRequest *)request;
{
    return [self prettyStringForData:data];
}

- (NSString *)prettyStringForData:(NSData *)data forResponse:(NSURLResponse *)response request:(NSURLRequest *)request;
{
    return [self prettyStringForData:data];
}

#pragma mark - Accessors/Mutators

- (void)addRedactedField:(NSString *)field;
{
    [_redactedFields addObject:field];
}

@end