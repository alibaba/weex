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
package org.apache.weex.extend.adapter;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.urlconnection.ByteArrayRequestEntity;
import com.taobao.weex.urlconnection.SimpleRequestEntity;
import com.taobao.weex.urlconnection.WeexURLConnectionManager;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

/**
 * Created by moxun on 16/12/29.
 */

public class InterceptWXHttpAdapter extends DefaultWXHttpAdapter {

    @NonNull
    @Override
    public IEventReporterDelegate getEventReporterDelegate() {
        return new IEventReporterDelegate() {

            WeexURLConnectionManager manager = new WeexURLConnectionManager(null);

            @Override
            public void preConnect(HttpURLConnection connection, @Nullable String body) {
                SimpleRequestEntity requestEntity = null;
                if (body != null) {
                    requestEntity = new ByteArrayRequestEntity(body.getBytes());
                }

                try {
                    manager.preConnect(connection, requestEntity);
                } catch (Throwable throwable) {
                    manager.httpExchangeFailed(new IOException("Exception on preConnect", throwable));
                }
            }

            @Override
            public void postConnect() {
                try {
                    manager.postConnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public InputStream interpretResponseStream(@Nullable InputStream inputStream) {
                return manager.interpretResponseStream(inputStream);
            }

            @Override
            public void httpExchangeFailed(IOException e) {
                manager.httpExchangeFailed(e);
            }
        };
    }
}
