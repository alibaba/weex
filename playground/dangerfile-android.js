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
import { schedule, danger, fail, warn, message, markdown } from "danger";

function checkAndroidFile(file){
  return file.match(/android\//)?true:false;
}

var hasAndroidFile = false;

if (!hasAndroidFile && danger.git.created_files) {
  danger.git.created_files.some(file => {
    var f = checkAndroidFile(file);
    if(f){
      hasAndroidFile =f;
    }
    return f;
  });
}
if (!hasAndroidFile && danger.git.modified_files) {
  danger.git.modified_files.some(file => {
    var f = checkAndroidFile(file);
    if(f){
      hasAndroidFile =f;
    }
    return f;
  });
}
if (!hasAndroidFile && danger.git.deleted_files) {
  danger.git.deleted_files.some(file => {
    var f = checkAndroidFile(file);
    if(f){
      hasAndroidFile =f;
    }
    return f;
  });
}
if(hasAndroidFile){
  console.log('hasAndroidFile');
}
