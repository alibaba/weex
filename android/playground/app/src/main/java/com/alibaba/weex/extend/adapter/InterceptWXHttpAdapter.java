package com.alibaba.weex.extend.adapter;

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

    private IEventReporterDelegate eventReporterDelegate;

    @NonNull
    @Override
    public IEventReporterDelegate getEventReporterDelegate() {
        if (eventReporterDelegate == null) {
            eventReporterDelegate = new IEventReporterDelegate() {

                WeexURLConnectionManager manager = new WeexURLConnectionManager(null);

                @Override
                public void preConnect(HttpURLConnection connection, @Nullable String body) {
                    SimpleRequestEntity requestEntity = null;
                    if (body != null) {
                        requestEntity = new ByteArrayRequestEntity(body.getBytes());
                    }

                    manager.preConnect(connection, requestEntity);
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
        return eventReporterDelegate;
    }
}
