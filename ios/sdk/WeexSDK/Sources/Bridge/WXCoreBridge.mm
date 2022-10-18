/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXSDKError.h"
#import "WXCoreBridge.h"
#import "JSValue+Weex.h"
#import "WXSDKManager.h"
#import "WXComponentManager.h"
#import "WXSDKInstance_private.h"
#import "WXLog.h"
#import "WXBridgeProtocol.h"
#import "WXUtility.h"
#import "WXAssert.h"
#import "WXAppConfiguration.h"
#import "WXConvertUtility.h"
#import "WXSDKEngine.h"
#import "WXAppMonitorProtocol.h"
#import "WXComponentMethod.h"
#import "WXExceptionUtils.h"
#import "WXModuleFactory.h"
#import "WXComponentFactory.h"
#import "WXRichText.h"
#include "base/core_constants.h"
#include "base/time_utils.h"
#include "base/log_defines.h"
#include "core/manager/weex_core_manager.h"
#include "core/render/manager/render_manager.h"
#include "core/render/target/render_target.h"
#include "core/render/page/render_page.h"
#include "core/render/page/render_page_custom.h"
#include "core/render/node/render_object.h"
#include "core/render/node/render_list.h"
#include "core/render/node/factory/render_type.h"
#include "core/render/node/factory/render_creator.h"
#include "core/config/core_environment.h"
#include "core/bridge/platform/core_side_in_platform.h"
#include "core/bridge/script/core_side_in_script.h"
#include "core/network/http_module.h"

#import <objc/runtime.h>
#include <fstream>

namespace WeexCore
{    
    static void consoleWithArguments(NSArray *arguments, WXLogFlag logLevel)
    {
        NSMutableString *jsLog = [NSMutableString string];
        [jsLog appendString:@"jsLog: "];
        [arguments enumerateObjectsUsingBlock:^(NSString *jsVal, NSUInteger idx, BOOL *stop) {
            if (idx == arguments.count - 1) {
                if (logLevel) {
                    if (WXLogFlagWarning == logLevel || WXLogFlagError == logLevel) {
                        id<WXAppMonitorProtocol> appMonitorHandler = [WXSDKEngine handlerForProtocol:@protocol(WXAppMonitorProtocol)];
                        if ([appMonitorHandler respondsToSelector:@selector(commitAppMonitorAlarm:monitorPoint:success:errorCode:errorMsg:arg:)]) {
                            [appMonitorHandler commitAppMonitorAlarm:@"weex" monitorPoint:@"jswarning" success:NO errorCode:@"99999" errorMsg:jsLog arg:[WXSDKEngine topInstance].pageName];
                        }
                    }
                    WX_LOG(logLevel, @"%@", jsLog);
                }
                else {
                    [jsLog appendFormat:@"%@ ", jsVal];
                    WXLogInfo(@"%@", jsLog);
                }
            }
            else {
                [jsLog appendFormat:@"%@ ", jsVal];
            }
        }];
    }
    
    static void MergeBorderWidthValues(NSMutableDictionary* dict,
                                       const WXCoreBorderWidth & borders,
                                       bool isUpdate, float pixelScaleFactor)
    {
        if (pixelScaleFactor <= 0) {
            pixelScaleFactor = 1.0f;
        }
        if (borders.getBorderWidth(kBorderWidthTop) != (float)0.0f || isUpdate) {
            dict[@"borderTopWidth"] = @(borders.getBorderWidth(kBorderWidthTop) / pixelScaleFactor);
        }
        if (borders.getBorderWidth(kBorderWidthLeft) != (float)0.0f || isUpdate) {
            dict[@"borderLeftWidth"] = @(borders.getBorderWidth(kBorderWidthLeft) / pixelScaleFactor);
        }
        if (borders.getBorderWidth(kBorderWidthBottom) != (float)0.0f || isUpdate) {
            dict[@"borderBottomWidth"] = @(borders.getBorderWidth(kBorderWidthBottom) / pixelScaleFactor);
        }
        if (borders.getBorderWidth(kBorderWidthRight) != (float)0.0f || isUpdate) {
            dict[@"borderRightWidth"] = @(borders.getBorderWidth(kBorderWidthRight) / pixelScaleFactor);
        }
    }

    static void MergeBorderWidthValues(NSMutableDictionary* dict,
                                       std::vector<std::pair<std::string, std::string>>* borders,
                                       float pixelScaleFactor)
    {
        if (borders == nullptr) {
            return;
        }
        if (pixelScaleFactor <= 0) {
            pixelScaleFactor = 1.0f;
        }
        
        for (auto& p : *borders) {
            dict[NSSTRING(p.first.c_str())] = @(atof(p.second.c_str()) / pixelScaleFactor);
        }
    }

    void IOSSide::SetJSVersion(const char* version)
    {
        NSString *jsVersion = NSSTRING(version);
        if (jsVersion.length > 0) {
            [WXAppConfiguration setJSFrameworkVersion:jsVersion];
        }
    }
    
    void IOSSide::ReportException(const char *page_id, const char *func, const char *exception)
    {
        do {
            WXSDKInstance *instance = [WXSDKManager instanceForID:NSSTRING(page_id)];
            if (!instance) {
                break;
            }
            WXSDKErrCode errorCode = WX_ERR_JS_EXECUTE;
            BOOL is_render_failed = NO;
            if (func && (strcmp(func, "CreatePageWithContent") == 0 || strcmp(func, "UpdateComponentData") == 0)) {
                errorCode = WX_KEY_EXCEPTION_DEGRADE_EAGLE_RENDER_ERROR;
                WXComponentManager *manager = instance.componentManager;
                if (manager.isValid) {
                    NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN code:errorCode userInfo:@{@"message":[NSString stringWithUTF8String:exception], @"exception function:":@(func)}];
                    [manager renderFailed:error];
                }
                is_render_failed = YES;
            }
            NSString *bundleUrl = instance.pageName ? : ([instance.scriptURL absoluteString] ? : @"WX_KEY_EXCEPTION_WXBRIDGE");
            NSMutableDictionary *userInfo = [[NSMutableDictionary alloc] init];
            [userInfo setObject:instance.userInfo[@"jsMainBundleStringContentLength"] ? : @"" forKey:@"jsMainBundleStringContentLength"];
            [userInfo setObject:instance.userInfo[@"jsMainBundleStringContentMd5"] ? : @"" forKey:@"jsMainBundleStringContentMd5"];
            WXJSExceptionInfo *jsException = [[WXJSExceptionInfo alloc] initWithInstanceId:instance.instanceId bundleUrl:bundleUrl errorCode: [NSString stringWithFormat:@"%d", errorCode] functionName:func ? [NSString stringWithUTF8String:func] :@"exceptionHandler" exception:exception ? [NSString stringWithUTF8String:exception] : @"unkown" userInfo:userInfo];
            [WXExceptionUtils commitCriticalExceptionRT:jsException.instanceId errCode:jsException.errorCode function:jsException.functionName exception:jsException.exception extParams:jsException.userInfo];
            if (!is_render_failed && instance.onJSRuntimeException) {
                instance.onJSRuntimeException(jsException);
            }
            
        } while (0);
        
    }
    
    int IOSSide::CallNative(const char* pageId, const char *task, const char *callback)
    {
        // should not enter this function
        assert(false); //!OCLint
    }
    
    static WeexByteArray *generator_bytes_array(const char *str, size_t len) {
        auto *result = (WeexByteArray *)malloc(len + sizeof(WeexByteArray));
        do {
            if (!result) {
                break;
            }
            memset(result, 0, len + sizeof(WeexByteArray));
            result->length = static_cast<uint32_t>(len);
            memcpy(result->content, str, len);
            result->content[len] = '\0';
            
        } while (0);
        
        return result;
    }
    std::unique_ptr<ValueWithType> IOSSide::RegisterPluginComponent(const char *pcstr_name, const char *pcstr_class_name, const char *pcstr_version) {
        ValueWithType *returnValue = new ValueWithType();
        memset(returnValue, 0, sizeof(ValueWithType));
        returnValue->type = ParamsType::VOID;
        do {
            if (!pcstr_class_name) {
                break;
            }
            NSString *className = [NSString stringWithUTF8String:pcstr_class_name];
            Class clazz = NSClassFromString(className);
            if (!clazz) {
                break;
            }
            if (!pcstr_name) {
                break;
            }
            NSDictionary *properties = @{ @"append" : @"tree" };
            NSString *name = [NSString stringWithUTF8String:pcstr_name];
            [WXComponentFactory registerComponent:name withClass:clazz withPros:properties];
            NSMutableDictionary *info = [WXComponentFactory componentMethodMapsWithName:name];
            if (![info isKindOfClass:[NSDictionary class]]) {
                break;
            }
            NSArray *methods = info[@"methods"];
            if (![methods isKindOfClass:[NSArray class]] || !methods.count) {
                break;
            }
            info[@"type"] = name;
            NSMutableDictionary *props = [properties mutableCopy];
            [props addEntriesFromDictionary:info];
            NSString *componentsInfo = [WXUtility JSONString:@[props]];
            if (componentsInfo.length > 0) {
                returnValue->type = ParamsType::BYTEARRAYSTRING;
                const char *pcstr_utf8 = [componentsInfo UTF8String];
                returnValue->value.byteArray = generator_bytes_array(pcstr_utf8, componentsInfo.length);
            }
            
        } while (0);
        
        return std::unique_ptr<ValueWithType>(returnValue);
    }
    
    std::unique_ptr<ValueWithType> IOSSide::RegisterPluginModule(const char *pcstr_name, const char *pcstr_class_name, const char *pcstr_version) {
        ValueWithType *returnValue = new ValueWithType();
        memset(returnValue, 0, sizeof(ValueWithType));
        returnValue->type = ParamsType::VOID;
        do {
            if (!pcstr_class_name) {
                break;
            }
            NSString *className = [NSString stringWithUTF8String:pcstr_class_name];
            Class clazz = NSClassFromString(className);
            if (!clazz) {
                break;
            }
            if (!pcstr_name) {
                break;
            }
            NSString *name = [NSString stringWithUTF8String:pcstr_name];
            NSString *moduleName = [WXModuleFactory registerModule:name withClass:clazz];
            if (!moduleName.length) {
                break;
            }
            NSDictionary *moduleInfo = [WXModuleFactory moduleMethodMapsWithName:moduleName];
            if (!moduleInfo || ![moduleInfo isKindOfClass:[NSDictionary class]]) {
                break;
            }
            NSString *setting = [WXUtility JSONString:moduleInfo];
            if (setting.length > 0) {
                returnValue->type = ParamsType::BYTEARRAYSTRING;
                const char *pcstr_utf8 = [setting UTF8String];
                returnValue->value.byteArray = generator_bytes_array(pcstr_utf8, setting.length);
            }

        } while (0);
        
        return std::unique_ptr<ValueWithType>(returnValue);
    }
    std::unique_ptr<ValueWithType> IOSSide::CallNativeModule(const char *page_id, const char *module, const char *method, const char *args, int args_length, const char *options, int options_length)
    {
        ValueWithType *returnValue = new ValueWithType();
        memset(returnValue, 0, sizeof(ValueWithType));
        returnValue->type = ParamsType::VOID;
        // should not enter this function
        do {
            NSString *instanceId = NSSTRING(page_id);
            WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
            if (!instance) {
                break;
            }
            NSString *moduleName = [NSString stringWithUTF8String:module];
            NSString *methodName = [NSString stringWithUTF8String:method];
            NSArray *newArguments;
            if (args && args_length > 0) {
                NSString *arguments = [NSString stringWithUTF8String:args];
                newArguments = [WXUtility objectFromJSON:arguments];
            }
            LOGD("CallNativeModule:[%s]:[%s]=>%s \n", module, method, args);
            WXModuleMethod *method = [[WXModuleMethod alloc] initWithModuleName:moduleName methodName:methodName arguments:newArguments options:nil instance:instance];
            NSInvocation *invocation = [method invoke];
            if (!invocation) {
                break;
            }
            const char *returnType = [invocation.methodSignature methodReturnType];
            switch (returnType[0] == _C_CONST ? returnType[1] : returnType[0]) {
                case _C_VOID: {
                    // 1.void
                    returnValue->type = ParamsType::VOID;
                    break;
                }
                case _C_ID: {
                    // 2.id
                    void *value;
                    [invocation getReturnValue:&value];
                    id object = (__bridge id)value;
                    if ([object isKindOfClass:[NSString class]]) {
                        returnValue->type = ParamsType::BYTEARRAYSTRING;
                        const char *pcstr_utf8 = [(NSString *)object UTF8String];
                        returnValue->value.byteArray = generator_bytes_array(pcstr_utf8, [(NSString *)object lengthOfBytesUsingEncoding:NSUTF8StringEncoding]);
                    }
                    if ([object isKindOfClass:[NSDictionary class]] || [object isKindOfClass:[NSArray class]]) {
                        NSString *jsonString = [WXUtility JSONString:object];
                        returnValue->type = ParamsType::BYTEARRAYJSONSTRING;
                        returnValue->value.byteArray = generator_bytes_array(jsonString.UTF8String, [jsonString lengthOfBytesUsingEncoding:NSUTF8StringEncoding]);
                    }
                    break;
                }
#define WX_MODULE_INT32_VALUE_RET_CASE(ctype, ttype) \
case ctype: {                         \
ttype value;                          \
[invocation getReturnValue:&value];   \
returnValue->type = ParamsType::INT32; \
returnValue->value.int32Value = value; \
break; \
}
#define WX_MODULE_INT64_VALUE_RET_CASE(ctype, ttype) \
case ctype: {                         \
ttype value;                          \
[invocation getReturnValue:&value];   \
returnValue->type = ParamsType::INT64; \
returnValue->value.int64Value = value; \
break; \
}
                // 3.number
                WX_MODULE_INT32_VALUE_RET_CASE(_C_CHR, char)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_UCHR, unsigned char)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_SHT, short)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_USHT, unsigned short)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_INT, int)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_UINT, unsigned int)
                WX_MODULE_INT32_VALUE_RET_CASE(_C_BOOL, BOOL)
                WX_MODULE_INT64_VALUE_RET_CASE(_C_LNG, long)
                WX_MODULE_INT64_VALUE_RET_CASE(_C_ULNG, unsigned long)
                WX_MODULE_INT64_VALUE_RET_CASE(_C_LNG_LNG, long long)
                WX_MODULE_INT64_VALUE_RET_CASE(_C_ULNG_LNG, unsigned long long)
                case _C_FLT:
                {
                    float value;
                    [invocation getReturnValue:&value];
                    returnValue->type = ParamsType::FLOAT;
                    returnValue->value.floatValue = value;
                    break;
                }
                case _C_DBL:
                {
                    double value;
                    [invocation getReturnValue:&value];
                    returnValue->type = ParamsType::DOUBLE;
                    returnValue->value.doubleValue = value;
                    break;
                }
                case _C_STRUCT_B:
                case _C_CHARPTR:
                case _C_PTR:
                case _C_CLASS: {
                    returnValue->type = ParamsType::JSUNDEFINED;
                    break;
                }
            }
            
        } while (0);
        
        return std::unique_ptr<ValueWithType>(returnValue);
    }
        
    void IOSSide::CallNativeComponent(const char *page_id, const char *ref, const char *method,
                                      const char *args, int args_length,
                                      const char *options, int options_length)
    {
        do {
            NSString *instanceId = NSSTRING(page_id);
            WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
            if (!instance) {
                break;
            }
            if (!ref || !method) {
                break;
            }
            NSString *componentRef = [NSString stringWithUTF8String:ref];
            NSString *methodName = [NSString stringWithUTF8String:method];
            NSArray *newArguments;
            if (args && args_length > 0) {
                NSString *arguments = [NSString stringWithUTF8String:args];
                newArguments = [WXUtility objectFromJSON:arguments];
            }
            WXComponentMethod *method = [[WXComponentMethod alloc] initWithComponentRef:componentRef methodName:methodName arguments:newArguments instance:instance];
            [method invoke];
            
        } while (0);
    }

    void IOSSide::SetTimeout(const char* callbackID, const char* time)
    {
        // should not enter this function
        assert(false); //!OCLint
    }

    void IOSSide::NativeLog(const char *args)
    {
        // should not enter this function
        do {
            if (!args) {
                break;
            }
            NSArray *newArguments;
            if (args) {
                NSString *arguments = [NSString stringWithUTF8String:args];
                newArguments = [WXUtility objectFromJSON:arguments];
            }
            if (![newArguments isKindOfClass:[NSArray class]] || !newArguments.count) {
                break;
            }
            static NSDictionary *levelMap;
            static dispatch_once_t onceToken;
            dispatch_once(&onceToken, ^{
                levelMap = @{@"__ERROR": @(WXLogFlagError),
                          @"__WARN": @(WXLogFlagWarning),
                          @"__INFO": @(WXLogFlagInfo),
                          @"__DEBUG": @(WXLogFlagDebug),
                          @"__LOG": @(WXLogFlagLog)};
            });
            NSString *levelStr = [newArguments lastObject];
            consoleWithArguments(newArguments, (WXLogFlag)[levelMap[levelStr] integerValue]);
            
        } while (0);
    }
    
    void IOSSide::TriggerVSync(const char* page_id)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(page_id);
        if (page == nullptr) {
            return;
        }
        
        NSString* ns_instanceId = NSSTRING(page_id);
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return;
        }
        [manager startComponentTasks];
    }
        
    int IOSSide::UpdateFinish(const char* page_id, const char* task, int taskLen,
                                   const char* callback, int callbackLen)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(page_id);
        if (page == nullptr) {
            return -1;
        }
        
        NSString* ns_instanceId = NSSTRING(page_id);
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager updateFinish];

        return 0;
    }
        
    int IOSSide::RefreshFinish(const char* pageId, const char *task, const char *callback)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        NSString* ns_instanceId = NSSTRING(pageId);
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager refreshFinish];
        
        return 0;
    }
        
    int IOSSide::AddEvent(const char* pageId, const char* ref, const char *event)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_event = NSSTRING(event);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: addEvent ref:%@", ns_ref);
#endif
        
        WXComponentManager *manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager addEvent:ns_event toComponent:ns_ref];

        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::RemoveEvent(const char* pageId, const char* ref, const char *event)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_event = NSSTRING(event);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action :removeEvent ref:%@", ns_ref);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager removeEvent:ns_event fromComponent:ns_ref];
    
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::CreateBody(const char* pageId, const char *componentType, const char* ref,
                                     std::map<std::string, std::string> *styles,
                                     std::map<std::string, std::string> *attributes,
                                     std::set<std::string> *events,
                                     const WXCoreMargin &margins,
                                     const WXCorePadding &paddings,
                                     const WXCoreBorderWidth &borders)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        RenderObject* renderObject = page->GetRenderObject(ref);
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_type = NSSTRING(componentType);
        NSMutableDictionary* ns_styles = NSDICTIONARY(styles);
        NSDictionary* ns_attributes = NSDICTIONARY(attributes);
        NSArray* ns_events = NSARRAY(events);
        
        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        MergeBorderWidthValues(ns_styles, borders, false, sdkInstance.pixelScaleFactor);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: createBody %@ ref:%@", ns_type, ns_ref);
#endif
        
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager createBody:ns_ref type:ns_type styles:ns_styles attributes:ns_attributes events:ns_events renderObject:renderObject];
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::AddElement(const char* pageId, const char *componentType, const char* ref,
                           int &index, const char* parentRef,
                           std::map<std::string, std::string> *styles,
                           std::map<std::string, std::string> *attributes,
                           std::set<std::string> *events,
                           const WXCoreMargin &margins,
                           const WXCorePadding &paddings,
                           const WXCoreBorderWidth &borders,
                           bool willLayout)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        RenderObject* renderObject = page->GetRenderObject(ref);
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_componentType = NSSTRING(componentType);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_parentRef = NSSTRING(parentRef);
        NSMutableDictionary* ns_styles = NSDICTIONARY(styles);
        NSDictionary* ns_attributes = NSDICTIONARY(attributes);
        NSArray* ns_events = NSARRAY(events);
        NSInteger ns_index = index;
        
        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        MergeBorderWidthValues(ns_styles, borders, false, sdkInstance.pixelScaleFactor);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: addElement : %@", ns_componentType);
#endif
        
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }
        
        [manager startComponentTasks];
        [manager addComponent:ns_ref type:ns_componentType parentRef:ns_parentRef styles:ns_styles attributes:ns_attributes events:ns_events index:ns_index renderObject:renderObject];

        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
    
    int IOSSide::AddChildToRichtext(const char* pageId, const char *nodeType, const char* ref,
                            const char* parentRef, const char* richtextRef,
                            std::map<std::string, std::string> *styles,
                            std::map<std::string, std::string> *attributes)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        NSString* ns_richtextRef = NSSTRING(richtextRef);
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_nodeType = NSSTRING(nodeType);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_parentRef = NSSTRING(parentRef);
        NSMutableDictionary* ns_styles = NSDICTIONARY(styles);
        NSDictionary* ns_attributes = NSDICTIONARY(attributes);

        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }

        WXRichText* richtext = (WXRichText*)[manager componentForRef:ns_richtextRef];
        [richtext addChildNode:ns_nodeType ref:ns_ref styles:ns_styles attributes:ns_attributes toSuperNodeRef:ns_parentRef];
        return 0;
    }

    int IOSSide::Layout(const char* pageId, const char* ref,
                       float top, float bottom, float left, float right,
                       float height, float width, bool isRTL, int index)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        RenderObject* renderObject = page->GetRenderObject(ref);
        if (renderObject->getContext() == nullptr) {
            return -1;
        }
        WXComponent* component = (__bridge WXComponent *)(renderObject->getContext());
        NSString* ns_instanceId = NSSTRING(pageId);
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        CGRect frame = CGRectMake(isnan(WXCeilPixelValue(left))?0:WXCeilPixelValue(left),
                                  isnan(WXCeilPixelValue(top))?0:WXCeilPixelValue(top),
                                  isnan(WXCeilPixelValue(width))?0:WXCeilPixelValue(width),
                                  isnan(WXCeilPixelValue(height))?0:WXCeilPixelValue(height));
        [manager layoutComponent:component frame:frame isRTL:isRTL innerMainSize:renderObject->getLargestMainSize()];

        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
    
    void IOSSide::InvokeLayoutPlatform(const char* page_id, long render_ptr)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(page_id);
        if (page == nullptr) {
            return;
        }
        
        long long startTime = getCurrentTime();
        
        RenderObject* renderObject = reinterpret_cast<RenderObject*>(render_ptr);
        if (renderObject->getContext() == nullptr) {
            return;
        }
        WXComponent* component = (__bridge WXComponent *)(renderObject->getContext());
        NSString* ns_instanceId = NSSTRING(page_id);
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return;
        }
        
        [manager layoutComponent:component];

        page->CallBridgeTime(getCurrentTime() - startTime);
    }
    
    int IOSSide::UpdateRichtextStyle(const char* pageId, const char* ref,
                             std::vector<std::pair<std::string, std::string>> *style,
                             const char* parent_ref, const char* richtext_ref)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }

        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_richtextRef = NSSTRING(richtext_ref);
        NSString* ns_parentRef = NSSTRING(parent_ref);
        NSMutableDictionary* ns_style = NSDICTIONARY(style);

        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        if (!sdkInstance) {
            return -1;
        }
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }

        WXRichText* richtext = (WXRichText*)[manager componentForRef:ns_richtextRef];
        [richtext updateChildNodeStyles:ns_style ref:ns_ref parentRef:ns_parentRef];
        return 0;
    }

    int IOSSide::UpdateStyle(const char* pageId, const char* ref,
                            std::vector<std::pair<std::string, std::string>> *style,
                            std::vector<std::pair<std::string, std::string>> *margin,
                            std::vector<std::pair<std::string, std::string>> *padding,
                            std::vector<std::pair<std::string, std::string>> *border)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSMutableDictionary* ns_style = NSDICTIONARY(style);
        
        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        MergeBorderWidthValues(ns_style, border, sdkInstance.pixelScaleFactor);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: updateStyles ref:%@, styles:%@", ns_ref, ns_style);
#endif
        
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }
        
        [manager startComponentTasks];
        [manager updateStyles:ns_style forComponent:ns_ref];
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::UpdateAttr(const char* pageId, const char* ref,
                           std::vector<std::pair<std::string, std::string>> *attrs)
    {
        if (attrs == nullptr) {
            return 0;
        }
        if (attrs->size() == 0) {
            return 0;
        }
        
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSDictionary* ns_attributes = NSDICTIONARY(attrs);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: updateAttrs ref:%@, attr:%@", ns_ref, ns_attributes);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager updateAttributes:ns_attributes forComponent:ns_ref];

        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }

    int IOSSide::UpdateRichtextChildAttr(const char* pageId, const char* ref,
                            std::vector<std::pair<std::string, std::string>> *attrs, const char* parent_ref, const char* richtext_ref)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        if (attrs == nullptr) {
            return 0;
        }
        if (attrs->size() == 0) {
            return 0;
        }

        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_parentRef = NSSTRING(parent_ref);
        NSString* ns_richtextRef = NSSTRING(richtext_ref);
        NSDictionary* ns_attributes = NSDICTIONARY(attrs);
        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        if (!sdkInstance) {
            return -1;
        }
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }

        WXRichText* richtext = (WXRichText*)[manager componentForRef:ns_richtextRef];
        [richtext updateChildNodeAttributes:ns_attributes ref:ns_ref parentRef:ns_parentRef];
        return 0;
    }
        
    int IOSSide::CreateFinish(const char* pageId)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);

#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: createFinish :%@", ns_instanceId);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager createFinish];

        if (page) {
            page->CallBridgeTime(getCurrentTime() - startTime);
        }
        return 0;
    }
    
    int IOSSide::RenderSuccess(const char* pageId)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: renderFinish :%@", ns_instanceId);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager renderFinish];
        
        if (page) {
            page->CallBridgeTime(getCurrentTime() - startTime);
        }
        return 0;
    }

    int IOSSide::RemoveChildFromRichtext(const char* pageId, const char* ref, const char* parent_ref, const char* richtext_ref) {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_richtextRef = NSSTRING(richtext_ref);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_parentRef = NSSTRING(parent_ref);

        WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:ns_instanceId];
        WXComponentManager* manager = sdkInstance.componentManager;
        if (!manager.isValid) {
            return -1;
        }

        WXRichText* richtext = (WXRichText*)[manager componentForRef:ns_richtextRef];
        [richtext removeChildNode:ns_ref superNodeRef:ns_parentRef];
        return 0;
    }
    int IOSSide::RemoveElement(const char* pageId, const char* ref)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: removeElement ref:%@", ns_ref);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        
        [manager startComponentTasks];
        [manager removeComponent:ns_ref];
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::MoveElement(const char* pageId, const char* ref, const char* parentRef, int index)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        NSString* ns_parentRef = NSSTRING(parentRef);
        NSInteger ns_index = index;
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> action: moveElement, ref:%@ to ref:%@", ns_ref, ns_parentRef);
#endif
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        
        [manager startComponentTasks];
        [manager moveComponent:ns_ref toSuper:ns_parentRef atIndex:ns_index];
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
        
    int IOSSide::AppendTreeCreateFinish(const char* pageId, const char* ref)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);

        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        [manager startComponentTasks];
        [manager appendTreeCreateFinish:ns_ref];
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return 0;
    }
    
    int IOSSide::HasTransitionPros(const char* pageId, const char* ref,
                              std::vector<std::pair<std::string, std::string>> *style)
    {
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page == nullptr) {
            return -1;
        }
        
        long long startTime = getCurrentTime();
        
        NSString* ns_instanceId = NSSTRING(pageId);
        NSString* ns_ref = NSSTRING(ref);
        
        WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
        if (!manager.isValid) {
            return -1;
        }
        
        // if transition is none, return directly, avoiding convert style
        if ([manager isTransitionNoneOfComponent:ns_ref]) {
            return 0;
        }
        
        int result = [manager hasTransitionPropertyInStyles:NSDICTIONARY(style) forComponent:ns_ref] ? 1 : 0;
        
        page->CallBridgeTime(getCurrentTime() - startTime);
        return result;
    }

    void IOSSide::PostTaskOnComponentThread(const weex::base::Closure closure) {
        WXPerformBlockOnComponentThread(^{
            closure();
        });
    }

#pragma mark - Layout Impl
    
    WXCoreSize WXCoreMeasureFunctionBridge::Measure(const char* page_id, long render_ptr, float width, MeasureMode widthMeasureMode, float height, MeasureMode heightMeasureMode)
    {
        // should not enter this function
        assert(false); //!OCLint
    }
    
    void WXCoreMeasureFunctionBridge::LayoutBefore(const char* page_id, long render_ptr)
    {
        
    }
    
    void WXCoreMeasureFunctionBridge::LayoutAfter(const char* page_id, long render_ptr, float width, float height)
    {
        
    }
    
#pragma mark - Log Bridge
    
    class LogBridgeIOS: public weex::base::LogBase {
    public:
        virtual bool log(LogLevel level, const char* tag, const char* file, unsigned long line, const char* log) override {
#ifdef DEBUG
            switch (level) {
                case LogLevel::Error:
                    printf("<%s:Error|%s:%lu> %s\n", tag, file, line, log);
                    break;
                case LogLevel::Warn:
                    printf("<%s:Warn|%s:%lu> %s\n", tag, file, line, log);
                    break;
                case LogLevel::Info:
                    printf("<%s:Info|%s:%lu> %s\n", tag, file, line, log);
                    break;
                case LogLevel::Debug:
                    printf("<%s:Debug|%s:%lu> %s\n", tag, file, line, log);
                    break;
                default:
                    break;
            }
#else
            WXLogFlag wxLogLevel;
            switch (level) {
                case LogLevel::Error:
                    wxLogLevel = WXLogFlagError;
                    break;
                case LogLevel::Warn:
                    wxLogLevel = WXLogFlagWarning;
                    break;
                case LogLevel::Info:
                    wxLogLevel = WXLogFlagInfo;
                    break;
                default:
                    wxLogLevel = WXLogFlagDebug;
                    break;
            }
            
            [WXLog devLog:wxLogLevel file:file line:line format:@"<%s> %s", tag, log];
#endif
            return true;
        }
    };
}

@interface WXCustomPageBridge()
{
    std::mutex _customPageLock;
    std::map<std::string, WeexCore::RenderPageCustom*> _customPages;
    
    WeexCore::RenderPageCustom* _lastPage;
}

@end

@implementation WXCustomPageBridge

+ (instancetype)sharedInstance
{
    static dispatch_once_t onceToken;
    static WXCustomPageBridge* instance;
    dispatch_once(&onceToken, ^{
        instance = [[WXCustomPageBridge alloc] init];
    });
    return instance;
}

+ (BOOL)isCustomPage:(NSString*)pageId
{
    return [pageId integerValue] % 2 != 0;
}

+ (NSSet<NSString*>*)getAvailableCustomRenderTypes
{
    NSMutableSet<NSString*>* result = [[NSMutableSet alloc] init];
    for (const std::string& s : WeexCore::RenderTargetManager::sharedInstance()->getAvailableTargetNames()) {
        [result addObject:NSSTRING(s.c_str())];
    }
    return result;
}

+ (UIView*)createPageRootView:(NSString*)pageId pageType:(NSString*)pageType frame:(CGRect)frame
{
    auto target = WeexCore::RenderTargetManager::sharedInstance()->getRenderTarget([pageType UTF8String]?:"");
    if (target) {
        return (__bridge UIView*)((void*)(target->createRootView([pageId UTF8String]?:"", frame.origin.x, frame.origin.y, frame.size.width, frame.size.height)));
    }
    return nil;
}

+ (void)parseRenderObject:(NSDictionary *)data
                parentRef:(const std::string&)parentRef
                    index:(int)index
                genObject:(void(^)(const std::string& ref,
                                   const std::string& type,
                                   const std::string& parentRef,
                                   std::map<std::string, std::string>* styles,
                                   std::map<std::string, std::string>* attrs,
                                   std::set<std::string>* events,
                                   int index))onGenObject
{
    const char* type = [data[@"type"] UTF8String];
    const char* ref = [data[@"ref"] UTF8String];
    if (type != nullptr && ref != nullptr) {
        std::map<std::string, std::string>* styles = new std::map<std::string, std::string>();
        std::map<std::string, std::string>* attrs = new std::map<std::string, std::string>();
        std::set<std::string>* events = new std::set<std::string>();
        
        [data[@"attr"] enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    (*attrs)[[key UTF8String]] = value;
                }
            });
        }];
        
        [data[@"style"] enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    (*styles)[[key UTF8String]] = value;
                }
            });
        }];
        
        for (id obj in data[@"event"]) {
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    events->insert(value);
                }
            });
        }
        
        std::string thisRef = ref;
        std::string thisType = type;
        onGenObject(thisRef, thisType, parentRef, styles, attrs, events, index);
        
        // parse children
        int childIndex = 0;
        for (NSDictionary* obj in data[@"children"]) {
            [self parseRenderObject:obj parentRef:thisRef index:childIndex ++ genObject:onGenObject];
        }
    }
}

+ (std::vector<std::pair<std::string, std::string>>*)parseMapValuePairs:(NSDictionary *)data
{
    std::vector<std::pair<std::string, std::string>>* result = new std::vector<std::pair<std::string, std::string>>();
    [data enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        ConvertToCString(obj, ^(const char * value) {
            if (value != nullptr) {
                result->emplace_back([key UTF8String], value);
            }
        });
    }];
    return result;
}

- (WeexCore::RenderPageCustom*)getPage:(NSString*)pageId
{
    std::lock_guard<std::mutex> lockGuard(_customPageLock);
    std::string sId = [pageId UTF8String] ?: "";
    if (_lastPage && _lastPage->page_id() == sId) {
        // avoid a map search
        return _lastPage;
    }
    auto findPage = _customPages.find([pageId UTF8String] ?: "");
    _lastPage = findPage == _customPages.end() ? nullptr : findPage->second;
    return _lastPage;
}

- (void)invalidatePage:(NSString*)pageId
{
    std::lock_guard<std::mutex> lockGuard(_customPageLock);
    auto findPage = _customPages.find([pageId UTF8String] ?: "");
    if (findPage != _customPages.end()) {
        findPage->second->Invalidate();
    }
}

- (void)removePage:(NSString*)pageId
{
    RenderPageCustom* thePage = nullptr;
    {
        std::lock_guard<std::mutex> lockGuard(_customPageLock);
        auto findPage = _customPages.find([pageId UTF8String] ?: "");
        if (findPage != _customPages.end()) {
            thePage = findPage->second;
            _customPages.erase(findPage);
        }
    }
    
    if (thePage) {
        thePage->OnRenderPageClose();
        delete thePage;
        _lastPage = nullptr;
    }
}

- (void)callCreateBody:(NSString*)pageId data:(NSDictionary*)data
{
    using namespace WeexCore;
    
    WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:pageId];
    WXComponentManager* manager = sdkInstance.componentManager;
    if (!manager.isValid) {
        return;
    }
    
    std::string sId = [pageId UTF8String] ?: "";
    if (sId.empty()) {
        return;
    }
    
    auto pageArgs = RenderManager::GetInstance()->removePageArguments(sId);
    RenderPageCustom::PageOptions options;
    
    options.is_round_off = false;
    options.view_scale = 1;
    auto value = WXCoreEnvironment::getInstance()->GetOption("pixel_scale");
    if (value != "") {
        options.view_scale = strtof(value.c_str(), NULL);
    }
    
    auto findViewPort = pageArgs.find("viewportwidth");
    if (findViewPort != pageArgs.end()) {
        options.viewport_width = strtof(findViewPort->second.c_str(), nullptr);
    }
    else {
        options.viewport_width = kDefaultViewPortWidth;
    }
    
    auto findDeviceWidth = pageArgs.find("devicewidth");
    if (findDeviceWidth != pageArgs.end()) {
        options.device_width = strtof(findDeviceWidth->second.c_str(), nullptr);
    }
    else {
        /* For iOS DeviceWidth stored by WeexCore is in UIKit view system coordinate(iPhone6 is 375).
         So we must provide heron with the pixel device width here. */
        options.device_width = WXCoreEnvironment::getInstance()->DeviceWidth() * options.view_scale;
    }
    
    std::swap(options.args, pageArgs);
    
    RenderPageCustom* page = new RenderPageCustom(sId, "heron", options);
    
    {
        std::lock_guard<std::mutex> lockGuard(_customPageLock);
        _customPages[sId] = page;
    }
    
    SetConvertCurrentPage(pageId);
    [WXCustomPageBridge parseRenderObject:data parentRef:"" index:0 genObject:^(const std::string &ref, const std::string &type, const std::string &parentRef, std::map<std::string, std::string> *styles, std::map<std::string, std::string> *attrs, std::set<std::string> *events, int index) {
        if (parentRef.empty()) {
            // is root body
            page->CreateBody(ref, type, styles, attrs, events);
        }
        else {
            page->AddRenderObject(ref, type, parentRef, index, styles, attrs, events);
        }
    }];
}

- (void)callAddElement:(NSString*)pageId parentRef:(NSString*)parentRef data:(NSDictionary*)data index:(int)index
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        [WXCustomPageBridge parseRenderObject:data parentRef:[parentRef UTF8String] ?: "" index:index genObject:^(const std::string &ref, const std::string &type, const std::string &parentRef, std::map<std::string, std::string> *styles, std::map<std::string, std::string> *attrs, std::set<std::string> *events, int index) {
            page->AddRenderObject(ref, type, parentRef, index, styles, attrs, events);
        }];
    }
}

- (void)callRemoveElement:(NSString*)pageId ref:(NSString*)ref
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        page->RemoveRenderObject([ref UTF8String] ?: "");
    }
}

- (void)callMoveElement:(NSString*)pageId ref:(NSString*)ref parentRef:(NSString*)parentRef index:(int)index
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        page->MoveRenderObject([ref UTF8String] ?: "", [parentRef UTF8String] ?: "", index);
    }
}

- (void)callUpdateAttrs:(NSString*)pageId ref:(NSString*)ref data:(NSDictionary*)data
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        SetConvertCurrentPage(pageId);
        page->UpdateAttr([ref UTF8String] ?: "", [WXCustomPageBridge parseMapValuePairs:data]);
    }
}

- (void)callUpdateStyle:(NSString*)pageId ref:(NSString*)ref data:(NSDictionary*)data
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        SetConvertCurrentPage(pageId);
        page->UpdateStyle([ref UTF8String] ?: "", [WXCustomPageBridge parseMapValuePairs:data]);
    }
}

- (void)callAddEvent:(NSString*)pageId ref:(NSString*)ref event:(NSString*)event
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        page->AddEvent([ref UTF8String] ?: "", [event UTF8String] ?: "");
    }
}

- (void)callRemoveEvent:(NSString*)pageId ref:(NSString*)ref event:(NSString*)event
{
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        page->RemoveEvent([ref UTF8String] ?: "", [event UTF8String] ?: "");
    }
}

- (void)callCreateFinish:(NSString*)pageId
{
    WXPerformBlockOnComponentThread(^{
        RenderPageCustom* page = [self getPage:pageId];
        if (page && page->IsValid()) {
            page->CreateFinish();
        }
    });
}

- (void)callRefreshFinish:(NSString*)pageId
{
    // TODO, this may not be correct, for heron may also need to implement refresh finish.
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->RefreshFinish([pageId UTF8String] ?: "", nullptr, nullptr);
}

- (void)callUpdateFinish:(NSString*)pageId
{
    // TODO, this may not be correct, for heron may also need to implement update finish.
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->UpdateFinish([pageId UTF8String] ?: "", nullptr, 0, nullptr, 0);
}

- (BOOL)forwardCallNativeModuleToCustomPage:(NSString*)pageId
                                 moduleName:(NSString*)moduleName methodName:(NSString*)methodName
                                  arguments:(NSArray*)arguments options:(NSDictionary*)options
                                returnValue:(id*)returnValue
{
    using namespace WeexCore;
    
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        RenderTarget* target = page->GetRenderTarget();
        if (target && target->shouldHandleModuleMethod([moduleName UTF8String] ?: "", [methodName UTF8String] ?: "")) {
            __block const char* seralizedArguments = nullptr;
            __block const char* seralizedOptions = nullptr;
            SetConvertCurrentPage(pageId);
            ConvertToCString(arguments, ^(const char * value) {
                if (value != nullptr) {
                    seralizedArguments = strdup(value);
                }
            });
            ConvertToCString(options, ^(const char * value) {
                if (value != nullptr) {
                    seralizedOptions = strdup(value);
                }
            });
            
            bool handled = false;
            std::unique_ptr<ValueWithType> result = target->callNativeModule([pageId UTF8String] ?: "", [moduleName UTF8String] ?: "", [methodName UTF8String] ?: "", seralizedArguments ?: "", seralizedArguments ? (int)(strlen(seralizedArguments)) : 0, seralizedOptions ?: "", seralizedOptions ? (int)(strlen(seralizedOptions)) : 0, handled);
            
            if (seralizedArguments) {
                free((void*)seralizedArguments);
            }
            if (seralizedOptions) {
                free((void*)seralizedOptions);
            }
            
            if (handled && result) {
                switch (result->type) {
                    case ParamsType::INT32:
                        *returnValue = @(result->value.int32Value);
                        break;
                    case ParamsType::INT64:
                        *returnValue = @(result->value.int64Value);
                        break;
                    case ParamsType::FLOAT:
                        *returnValue = @(result->value.floatValue);
                        break;
                    case ParamsType::DOUBLE:
                        *returnValue = @(result->value.doubleValue);
                        break;
                    case ParamsType::JSONSTRING:
                    {
                        NSString* s = [NSString stringWithCharacters:(const unichar *)(result->value.string->content) length:result->value.string->length];
                        free(result->value.string);
                        
                        @try {
                            NSError* error = nil;
                            id jsonObj = [NSJSONSerialization JSONObjectWithData:[s dataUsingEncoding:NSUTF8StringEncoding]
                                                                         options:NSJSONReadingMutableContainers | NSJSONReadingMutableLeaves
                                                                           error:&error];
                            
                            if (jsonObj == nil) {
                                WXLogError(@"%@", error);
                                WXAssert(NO, @"Fail to convert json to object. %@", error);
                            }
                            else {
                                *returnValue = jsonObj;
                            }
                        } @catch (NSException *exception) {
                            WXLogError(@"%@", exception);
                            WXAssert(NO, @"Fail to convert json to object. %@", exception);
                        }
                    }
                        break;
                    case ParamsType::STRING:
                        *returnValue = [NSString stringWithCharacters:(const unichar *)(result->value.string->content) length:result->value.string->length];
                        free(result->value.string);
                        break;
                    default:
                        *returnValue = nil;
                        break;
                }
                return YES;
            }
        }
    }
    
    return NO;
}

- (void)forwardCallComponentToCustomPage:(NSString*)pageId
                                     ref:(NSString*)ref
                              methodName:(NSString*)methodName
                               arguments:(NSArray*)arguments
                                 options:(NSDictionary*)options
{
    using namespace WeexCore;
    
    RenderPageCustom* page = [self getPage:pageId];
    if (page && page->IsValid()) {
        RenderTarget* target = page->GetRenderTarget();
        if (target) {
            __block const char* seralizedArguments = nullptr;
            __block const char* seralizedOptions = nullptr;
            SetConvertCurrentPage(pageId);
            ConvertToCString(arguments, ^(const char * value) {
                if (value != nullptr) {
                    seralizedArguments = strdup(value);
                }
            });
            ConvertToCString(options, ^(const char * value) {
                if (value != nullptr) {
                    seralizedOptions = strdup(value);
                }
            });
            
            target->callNativeComponent([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [methodName UTF8String] ?: "", seralizedArguments ?: "", seralizedArguments ? (int)(strlen(seralizedArguments)) : 0, seralizedOptions ?: "", seralizedOptions ? (int)(strlen(seralizedOptions)) : 0);
            
            if (seralizedArguments) {
                free((void*)seralizedArguments);
            }
            if (seralizedOptions) {
                free((void*)seralizedOptions);
            }
        }
    }
}

@end

@implementation WXCoreBridge

static WeexCore::PlatformBridge* platformBridge = nullptr;
static WeexCore::ScriptBridge* jsBridge = nullptr;
static UnicornRenderFunc unicornRenderFunction = nullptr;

+ (void)install
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        WeexCore::WXCoreEnvironment* env = WeexCore::WXCoreEnvironment::getInstance();
        env->SetPlatform(OS_iOS);
        
        /* For historical reason, layout in weexcore and layout result are in iOS UIView system unit.
         So we pass 'scale' as 1 to affect nothing.
         */
        env->AddOption("scale", "1");
        env->AddOption("pixel_scale", std::to_string([[UIScreen mainScreen] scale]));
        
        // Here we initialize weex device width and height using portrait by default.
        CGSize screenSize = [UIScreen mainScreen].bounds.size;
        CGFloat w = MIN(screenSize.width, screenSize.height);
        CGFloat h = MAX(screenSize.width, screenSize.height);
        env->SetDeviceWidth(std::to_string(w));
        env->SetDeviceHeight(std::to_string(h));
        
        __block UIEdgeInsets safeAreaInsets = UIEdgeInsetsZero;
    #if __IPHONE_11_0
        if (@available(iOS 11.0, *)) {
            WXPerformBlockSyncOnMainThread(^{
                safeAreaInsets = [UIApplication sharedApplication].windows[0].safeAreaInsets;
            });
        }
    #endif
        env->SetSafeAreaInsets(WXSafeAreaInsets{
            .top = safeAreaInsets.top,
            .bottom = safeAreaInsets.bottom,
            .left = safeAreaInsets.left,
            .right = safeAreaInsets.right
        });
        
        
        env->AddOption("screen_width_pixels", std::to_string(w));
        env->AddOption("screen_height_pixels", std::to_string(h));
        
        weex::base::LogImplement::getLog()->setLogImplement(new WeexCore::LogBridgeIOS());
        
#ifdef DEBUG
        weex::base::LogImplement::getLog()->setDebugMode(true);
#else
        weex::base::LogImplement::getLog()->setDebugMode(false);
#endif

        Class UnicornRenderClass = NSClassFromString(@"UnicornRender");
        unicornRenderFunction = [(id<WXUnicornRenderProtocol>)UnicornRenderClass getRenderFunc];
        
        platformBridge = new WeexCore::PlatformBridge();
        platformBridge->set_platform_side(new WeexCore::IOSSide());
        platformBridge->set_core_side(new WeexCore::CoreSideInPlatform());
        WeexCore::WeexCoreManager::Instance()->set_platform_bridge(platformBridge);
        
        jsBridge = new WeexCore::ScriptBridge();
        jsBridge->set_core_side(new WeexCore::CoreSideInScript());
        WeexCore::WeexCoreManager::Instance()->set_script_bridge(jsBridge);
        
        WeexCore::WeexCoreManager::Instance()->set_measure_function_adapter(new WeexCore::WXCoreMeasureFunctionBridge());

        [[WXSDKManager bridgeMgr] checkJSThread];
    });
}

+ (void)registerComponentAffineType:(NSString *)type asType:(NSString *)baseType
{
    WeexCore::RenderCreator::GetInstance()->RegisterAffineType([type UTF8String] ?: "", [baseType UTF8String] ?: "");
}

+ (BOOL)isComponentAffineType:(NSString *)type asType:(NSString *)baseType
{
    return WeexCore::RenderCreator::GetInstance()->IsAffineType([type UTF8String] ?: "", [baseType UTF8String] ?: "");
}

+ (void)setDefaultDimensionIntoRoot:(NSString*)pageId width:(CGFloat)width height:(CGFloat)height
                 isWidthWrapContent:(BOOL)isWidthWrapContent
                isHeightWrapContent:(BOOL)isHeightWrapContent
{
    if (platformBridge) {
        if (width == 0 && !isWidthWrapContent) {
            return;
        }
        
        if (height == 0 && !isHeightWrapContent) {
            return;
        }
        
        platformBridge->core_side()->SetDefaultHeightAndWidthIntoRootDom([pageId UTF8String] ?: "", (float)width, (float)height, (bool)isWidthWrapContent, (bool)isHeightWrapContent);
    }
}

+ (void)setDeviceSize:(CGSize)size
{
    [WXCoreBridge install];
    WeexCore::WXCoreEnvironment* env = WeexCore::WXCoreEnvironment::getInstance();
    env->SetDeviceWidth(std::to_string(size.width));
    env->SetDeviceHeight(std::to_string(size.height));
}

+ (CGSize)getDeviceSize
{
    [WXCoreBridge install];
    WeexCore::WXCoreEnvironment* env = WeexCore::WXCoreEnvironment::getInstance();
    return CGSizeMake(env->DeviceWidth(), env->DeviceHeight());
}

+ (void)setViewportWidth:(NSString*)pageId width:(CGFloat)width
{
    [WXCoreBridge install];
    if (platformBridge) {
        platformBridge->core_side()->SetViewPortWidth([pageId UTF8String] ?: "", (float)width);
    }
}

+ (void)setPageRequired:(NSString *)pageId width:(CGFloat)width height:(CGFloat)height
{
    [WXCoreBridge install];
    if (platformBridge) {
        platformBridge->core_side()->SetDeviceDisplayOfPage([pageId UTF8String] ?: "", (float)width, (float)height);
    }
}

+ (void)layoutPage:(NSString*)pageId forced:(BOOL)forced
{
    if (platformBridge) {
        const char* page = [pageId UTF8String] ?: "";
        if (forced) {
            platformBridge->core_side()->SetPageDirty(page);
        }
        
        if (platformBridge->core_side()->NotifyLayout(page)) {
            platformBridge->core_side()->ForceLayout(page);
        }
    }
}

+ (double)getLayoutTime:(NSString*)pageId {
    if (platformBridge) {
        const char* page = [pageId UTF8String] ?: "";
        return platformBridge->core_side()->GetLayoutTime(page);
    }
    return 0;
}

+ (void)closePage:(NSString*)pageId
{
    if (platformBridge) {
        platformBridge->core_side()->DestroyInstance([pageId UTF8String]);
        platformBridge->core_side()->OnInstanceClose([pageId UTF8String] ?: "");
    }
}

+ (BOOL)reloadPageLayout:(NSString*)pageId
{
    if (platformBridge) {
        return platformBridge->core_side()->RelayoutUsingRawCssStyles([pageId UTF8String] ?: "");
    }
    return false;
}

+ (void)_traverseTree:(WeexCore::RenderObject *)render index:(int)index pageId:(const char *)pageId
{
    using namespace WeexCore;
    if (render == nullptr) return;

    if (render->hasNewLayout()) {
        /* do not call bridge->callLayout because render is not registered to page, so that
         page->GetRenderObject will not give the correct object. */
        RenderPageBase *page = RenderManager::GetInstance()->GetPage(pageId);
        if (page != nullptr) {
            WXComponent* component = (__bridge WXComponent *)(render->getContext());
            NSString* ns_instanceId = NSSTRING(pageId);
            
            float top = render->getLayoutPositionTop();
            float left = render->getLayoutPositionLeft();
            float height = render->getLayoutHeight();
            float width = render->getLayoutWidth();
            BOOL isRTL = render->getLayoutDirectionFromPathNode() == WeexCore::kDirectionRTL;
            WXComponentManager* manager = [WXSDKManager instanceForID:ns_instanceId].componentManager;
            CGRect frame = CGRectMake(isnan(WXCeilPixelValue(left))?0:WXCeilPixelValue(left),
                                      isnan(WXCeilPixelValue(top))?0:WXCeilPixelValue(top),
                                      isnan(WXCeilPixelValue(width))?0:WXCeilPixelValue(width),
                                      isnan(WXCeilPixelValue(height))?0:WXCeilPixelValue(height));
            [manager layoutComponent:component frame:frame isRTL:isRTL innerMainSize:render->getLargestMainSize()];
        }
        render->setHasNewLayout(false);
    }

    for (auto it = render->ChildListIterBegin(); it != render->ChildListIterEnd(); it ++) {
        WeexCore::RenderObject *child = static_cast<WeexCore::RenderObject *>(*it);
        if (child != nullptr) {
            [self _traverseTree:child index:(int)(it - render->ChildListIterBegin()) pageId:pageId];
        }
    }
}

+ (void)layoutRenderObject:(void*)object size:(CGSize)size page:(NSString*)pageId
{
    using namespace WeexCore;
    RenderObject* render = static_cast<RenderObject*>(object);
    std::pair<float, float> renderPageSize(size.width, size.height);
    
    render->calculateLayout(renderPageSize);
    [self _traverseTree:render index:0 pageId:[pageId UTF8String] ?: ""];
}

+ (void*)copyRenderObject:(void*)source replacedRef:(NSString*)ref
{
    using namespace WeexCore;
    RenderObject* sourceObject = static_cast<RenderObject*>(source);
    RenderObject* copyObject = static_cast<RenderObject*>(RenderCreator::GetInstance()->CreateRender(sourceObject->type(), sourceObject->ref()));
                                                          
    copyObject->CopyFrom(sourceObject);
    if (ref != nil) {
        copyObject->set_ref([ref UTF8String] ?: "");
    }

    if (sourceObject->type() == kRenderCellSlot || sourceObject->type() == kRenderCell) {
        RenderList* renderList = static_cast<RenderList*>(sourceObject->getParent());
        if (renderList != nullptr) {
            renderList->AddCellSlotCopyTrack(copyObject);
        }
    }
    return copyObject;
}

+ (void)addChildRenderObject:(void*)child toParent:(void*)parent
{
    (static_cast<WeexCore::RenderObject*>(parent))->AddRenderObject(-1, (static_cast<WeexCore::RenderObject*>(child)));
}

+ (void)removeRenderObjectFromMap:(NSString*)pageId object:(void*)object
{
    using namespace WeexCore;
    RenderPage* page = static_cast<RenderPage*>(RenderManager::GetInstance()->GetPage([pageId UTF8String] ?: ""));
    if (page != nullptr) {
        page->RemoveRenderFromRegisterMap(static_cast<RenderObject*>(object));
    }
}

+ (void)_parseStyleBeforehand:(NSDictionary *)styles key:(NSString *)key render:(WeexCore::RenderObject*)render reserveStyles:(bool)reserveStyles
{
    id data = styles[key];
    if (data) {
        ConvertToCString(data, ^(const char * value) {
            if (value != nullptr) {
                render->AddStyle([key UTF8String], value, reserveStyles);
            }
        });
    }
}

+ (WeexCore::RenderObject*)_parseRenderObject:(NSDictionary *)data parent:(WeexCore::RenderObject *)parent index:(int)index pageId:(const std::string&)pageId reserveStyles:(bool)reserveStyles
{
    using namespace WeexCore;
    
    const char* type = [data[@"type"] UTF8String];
    const char* ref = [data[@"ref"] UTF8String];
    if (type != nullptr && ref != nullptr) {
        RenderObject* render = (RenderObject *)RenderCreator::GetInstance()->CreateRender(type, ref);
        render->set_page_id(pageId);
        if (parent != nullptr){
            parent->AddRenderObject(index, render);
        }
        
        [data[@"attr"] enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    render->AddAttr([key UTF8String], value);
                }
            });
        }];
        
        // margin/padding/borderWidth should be handled beforehand. Because maringLeft should override margin.
        NSDictionary* styles = data[@"style"];
        [self _parseStyleBeforehand:styles key:@"margin" render:render reserveStyles:reserveStyles];
        [self _parseStyleBeforehand:styles key:@"padding" render:render reserveStyles:reserveStyles];
        [self _parseStyleBeforehand:styles key:@"borderWidth" render:render reserveStyles:reserveStyles];
        [styles enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            if ([key isEqualToString:@"margin"] || [key isEqualToString:@"padding"] || [key isEqualToString:@"borderWidth"]) {
                return;
            }
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    render->AddStyle([key UTF8String], value, reserveStyles);
                }
            });
        }];
        
        for (id obj in data[@"event"]) {
            ConvertToCString(obj, ^(const char * value) {
                if (value != nullptr) {
                    render->AddEvent(value);
                }
            });
        }
        
        int childIndex = 0;
        for (NSDictionary* obj in data[@"children"]) {
            [self _parseRenderObject:obj parent:render index:childIndex ++ pageId:pageId reserveStyles:reserveStyles];
        }
        
        render->ApplyDefaultStyle(reserveStyles);
        render->ApplyDefaultAttr();
        
        return render;
    }
    return nullptr;
}

+ (std::unique_ptr<std::vector<std::pair<std::string, std::string>>>)_parseMapValuePairs:(NSDictionary *)data
{
    __block std::unique_ptr<std::vector<std::pair<std::string, std::string>>> result = std::make_unique<std::vector<std::pair<std::string, std::string>>>();
    [data enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        ConvertToCString(obj, ^(const char * value) {
            if (value != nullptr) {
                result->emplace_back([key UTF8String], value);
            }
        });
    }];
    return std::move(result);
}

+ (void)callAddElement:(NSString*)pageId parentRef:(NSString*)parentRef data:(NSDictionary*)data index:(int)index
{
    using namespace WeexCore;
    
    const std::string page([pageId UTF8String] ?: "");
    RenderManager::GetInstance()->AddRenderObject(page, [parentRef UTF8String] ?: "", index, [&] (RenderPage* pageInstance) -> RenderObject* {
        return [self _parseRenderObject:data parent:nullptr index:0 pageId:page reserveStyles:pageInstance->reserve_css_styles()];
    });
}

+ (void)callCreateBody:(NSString*)pageId data:(NSDictionary*)data
{
    using namespace WeexCore;
    
    WXSDKInstance* sdkInstance = [WXSDKManager instanceForID:pageId];
    WXComponentManager* manager = sdkInstance.componentManager;
    if (!manager.isValid) {
        return;
    }
    
    SetConvertCurrentPage(pageId);
    const std::string page([pageId UTF8String] ?: "");
    RenderManager::GetInstance()->CreatePage(page, [&] (RenderPage* pageInstance) -> RenderObject* {
        pageInstance->set_before_layout_needed(false); // we do not need before and after layout
        pageInstance->set_after_layout_needed(false);
        pageInstance->set_platform_layout_needed(true);
        return [self _parseRenderObject:data parent:nullptr index:0 pageId:page reserveStyles:pageInstance->reserve_css_styles()];
    });
}

+ (void)callRemoveElement:(NSString*)pageId ref:(NSString*)ref
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->RemoveElement([pageId UTF8String] ?: "", [ref UTF8String] ?: "");
}

+ (void)callMoveElement:(NSString*)pageId ref:(NSString*)ref parentRef:(NSString*)parentRef index:(int)index
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->MoveElement([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [parentRef UTF8String] ?: "", index);
}

+ (void)callUpdateAttrs:(NSString*)pageId ref:(NSString*)ref data:(NSDictionary*)data
{
    SetConvertCurrentPage(pageId);
    WeexCore::RenderManager::GetInstance()->UpdateAttr([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [self _parseMapValuePairs:data].get());
}

+ (void)callUpdateStyle:(NSString*)pageId ref:(NSString*)ref data:(NSDictionary*)data
{
    SetConvertCurrentPage(pageId);
    WeexCore::RenderManager::GetInstance()->UpdateStyle([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [self _parseMapValuePairs:data].get());
}

+ (void)callAddEvent:(NSString*)pageId ref:(NSString*)ref event:(NSString*)event
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->AddEvent([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [event UTF8String] ?: "");
}

+ (void)callRemoveEvent:(NSString*)pageId ref:(NSString*)ref event:(NSString*)event
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->RemoveEvent([pageId UTF8String] ?: "", [ref UTF8String] ?: "", [event UTF8String] ?: "");
}

+ (void)callCreateFinish:(NSString*)pageId
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->CreateFinish([pageId UTF8String] ?: "");
}

+ (void)callRefreshFinish:(NSString*)pageId
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->RefreshFinish([pageId UTF8String] ?: "", nullptr, nullptr);
}

+ (void)callUpdateFinish:(NSString*)pageId
{
    WeexCore::WeexCoreManager::Instance()->script_bridge()->core_side()->UpdateFinish([pageId UTF8String] ?: "", nullptr, 0, nullptr, 0);
}

+ (void)registerCoreEnv:(NSString*)key withValue:(NSString*)value
{
    WeexCore::WeexCoreManager::Instance()->getPlatformBridge()->core_side()->RegisterCoreEnv([key UTF8String]?:"", [value UTF8String]?:"");
}

+ (void)setPageArgument:(NSString*)pageId key:(NSString*)key value:(NSString*)value
{
    WeexCore::RenderManager::GetInstance()->setPageArgument([pageId UTF8String]?:"", [key UTF8String]?:"", [value UTF8String]?:"");
}

+ (BOOL)isKeepingRawCssStyles:(NSString*)pageId
{
    RenderPageBase* page = RenderManager::GetInstance()->GetPage([pageId UTF8String] ?: "");
    if (page == nullptr) {
        return NO;
    }
    return static_cast<RenderPage*>(page)->reserve_css_styles();
}

+ (void)callUnicornRenderAction:(NSString*)instanceId
                         module:(const char*)module
                         method:(const char*)method
                        context:(JSContext*)context
                           args:(JSValueRef[])args
                       argCount:(int)argCount {
  std::unique_ptr<JSValueRef[]> values = std::unique_ptr<JSValueRef[]>(new JSValueRef[argCount]);
  for (int i = 0; i < argCount; i ++) {
    values[i] = args[i];
  }
  if (!unicornRenderFunction) {
      Class UnicornRenderClass = NSClassFromString(@"UnicornRender");
      unicornRenderFunction = [(id<WXUnicornRenderProtocol>)UnicornRenderClass getRenderFunc];
  }
  unicornRenderFunction([instanceId UTF8String],
                        module,
                        method,
                        context.JSGlobalContextRef,
                        values.get(),
                        argCount);
}

@end
