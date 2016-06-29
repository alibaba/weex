/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleProtocol.h"
#import "WXType.h"

@protocol WXImageOperationProtocol <NSObject>

- (void)cancel;

@end

@protocol WXImgLoaderProtocol <WXModuleProtocol>

/**
 * @abstract Creates a image download handler with a given URL
 *
 * @param imageUrl The URL of the image to download
 *
 * @param imageFrame  The frame of the image you want to set
 *
 * @param options : The options to be used for this download
 *
 * @param completedBlock : A block called once the download is completed.
 *                 image : the image which has been download to local.
 *                 error : the error which has happened in download.
 *              finished : a Boolean value indicating whether download action has finished.
 */
- (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)options completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock;

@end
