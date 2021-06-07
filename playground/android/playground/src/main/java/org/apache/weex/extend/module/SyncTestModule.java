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
package org.apache.weex.extend.module;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhengshihan on 2016/12/28.
 */

public class SyncTestModule extends WXModule {

    @JSMethod(uiThread = false)
    public ArrayList getArray(){
        ArrayList list = new ArrayList();
        list.add("ArrayList test 1");
        list.add("ArrayList test 2");
        return list;
    }
    @JSMethod(uiThread = false)
    public String  getString(){

        return "getString :i am string ";
    }

    @JSMethod(uiThread = false)
    public int getNumber(){
        return 1111;
    }

    /**
     * JSON NOT allow KeyValue  as  non-string value
     * @return
     */
    @JSMethod(uiThread = false)
    public Object getObject(){
        ArrayList list = new ArrayList();
        list.add("222");
        list.add("test");
        Map map = new HashMap();
        map.put(11,"test11");
        map.put("22","test22");
        list.add(map);
        return list;

    }



}
