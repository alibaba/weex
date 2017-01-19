package com.alibaba.weex.extend.module;

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
