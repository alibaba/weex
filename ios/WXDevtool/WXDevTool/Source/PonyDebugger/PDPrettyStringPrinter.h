//
//  PDPrettyStringPrinter.h
//  PonyDebugger
//
//  Created by Dave Apgar on 2/28/13.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//


#import <Foundation/Foundation.h>

@protocol PDPrettyStringPrinting <NSObject>

- (BOOL)canPrettyStringPrintRequest:(NSURLRequest *)request;
- (BOOL)canPrettyStringPrintResponse:(NSURLResponse *)response withRequest:(NSURLRequest *)request;

- (NSString *)prettyStringForData:(NSData *)data forRequest:(NSURLRequest *)request;
- (NSString *)prettyStringForData:(NSData *)data forResponse:(NSURLResponse *)response request:(NSURLRequest *)request;

@end

@interface PDTextPrettyStringPrinter : NSObject <PDPrettyStringPrinting>

@end

@interface PDJSONPrettyStringPrinter : NSObject <PDPrettyStringPrinting>

@property (nonatomic, strong, readonly) NSSet *redactedFields;

- (id)initWithRedactedFields:(NSArray *)redactedFields;
- (void)addRedactedField:(NSString *)field;

@end