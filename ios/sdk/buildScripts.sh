#!/bin/sh

# generateFileHeader
# param 1：headerFilePath
function generateFileHeader() {
	headerFilePath=$1
	headerFileName=`basename $1`
	echo '/**' > $headerFilePath
	echo ' * Created by Weex.' >> $headerFilePath
	echo ' * Copyright (c) 2016, Alibaba, Inc. All rights reserved.' >> $headerFilePath
	echo ' * ' >> $headerFilePath
	echo ' * This source code is licensed under the Apache Licence 2.0.' >> $headerFilePath
	echo ' * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.' >> $headerFilePath
	echo ' */' >> $headerFilePath
	echo '' >> $headerFilePath
	echo '#ifdef __OBJC__' >> $headerFilePath
	echo '' >> $headerFilePath
	return 0;
}

# generateFileFooter
# param 1：headerFilePath
function generateFileFooter() {
	headerFilePath=$1
	echo '' >> $headerFilePath
	echo '#endif /* __OBJC__ */' >> $headerFilePath
	return 0;
}

# findHeaders
# param 1：projectFilePath
# param 2：searchPattern
function findHeaders() {
	projectFilePath=$1
	searchPattern=$2
	grep -o "[0-9A-F]\{23\}.*[0-9a-zA-Z+_-]*\.h.*PBXBuildFile.*ATTRIBUTES.*=.*(${searchPattern}" "$projectFilePath/project.pbxproj" | grep -o '[0-9A-Za-z+_-]*\.h' | grep -v 'Weex-.*\.h' | uniq | sort -r
	return 0;
}

# generateImport
# param 1：projectFilePath
# param 2：searchPattern
# param 3：headerFilePath
# param 4：externalHeader
function generateImport() {
	projectFilePath=$1
	searchPattern=$2
	headerFilePath=$3
	sdkName=$4
	externalHeader=$5

	if [[ $externalHeader ]]; then
		if [ "$searchPattern" = 'Private' ]; then
			echo "#import <${PRODUCT_NAME}/$externalHeader>" >> $headerFilePath
		else
			echo "#import \"$externalHeader\"" >> $headerFilePath
		fi
	fi
	headers=$(findHeaders $projectFilePath $searchPattern)

	for header in $headers; do
		if [ "$searchPattern" = 'Private' ]; then
			echo "#import <${PRODUCT_NAME}/$header>" >> $headerFilePath
		else
			if [ "$header" = "${sdkName}.h" ];then
				continue
			fi
			echo "#import \"$header\"" >> $headerFilePath
		fi
	done
	return 0;
}

# generateHeader
# param 1：projectPath
# param 2：headerFilePath
# param 3：searchPattern
# param 4：externalHeader
function generateHeader() {
	projectPath=$1
	headerFilePath=$2
	searchPattern=$3
	sdkName=$4
	externalHeader=$5
	generateFileHeader $headerFilePath
	generateImport $projectPath $searchPattern $headerFilePath $sdkName $externalHeader
	generateFileFooter $headerFilePath
	return 0
}

# generateSDKHeader
# param 1: sdkName
# param 2：supportPrivate
function generateSDKHeader() {
	sdkName=$1
	supportPrivate=$2
	headerFilePath="${PROJECT_DIR}/${sdkName}/Sources"
	publicHeaderFilePath="${headerFilePath}/${sdkName}.h"

	if [ -f "$publicHeaderFilePath" ]; then
		rm $publicHeaderFilePath
	fi
	generateHeader "${PROJECT_DIR}/${PROJECT_NAME}.xcodeproj" "${publicHeaderFilePath}" 'Public' $sdkName
}