/**
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
package org.apache.weex;

import android.content.res.AssetFileDescriptor;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXException;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXRenderStrategy;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SliceTestActivity extends AppCompatActivity {
  private static final String LOG_TAG = "SliceTestActivity";
  private RecyclerView mRecyclerView;
  private TextView mReportTextView;

  private final List<String> mData = new ArrayList<>();
  private WXInstanceAdapter mAdapter;
  private final Set<WXSDKInstance> mInstances = new HashSet<>();

  public static class SearchModule extends WXModule {
    @JSMethod(uiThread = true)
    public void search(JSONObject options) {
      Log.e("TestModuel", options.toJSONString());
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    try {
      WXSDKEngine.registerModule("searchEvent", SearchModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
    setContentView(R.layout.activity_slice_test);
    mRecyclerView = (RecyclerView) findViewById(R.id.recycler_view);
    mReportTextView = (TextView) findViewById(R.id.report_text);

    mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
    mRecyclerView.addItemDecoration(new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));
    mAdapter = new WXInstanceAdapter();
    mRecyclerView.setAdapter(mAdapter);
  }

  static int i = 0;

  public void addCellClick(View view) {
    //rax case.js
    if (i++ % 2 == 0) {
      mData.add("{\"model\":{\"tips\":[{\"show\":\"雪纺\",\"q\":\"连衣裙 雪纺\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%221%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"中长款\",\"q\":\"连衣裙 中长款\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%222%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"假两件\",\"q\":\"连衣裙 假两件\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%223%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"A字款\",\"q\":\"连衣裙 A字款\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%224%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"气质淑女\",\"q\":\"连衣裙 气质淑女\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%225%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]}],\"pos\":\"3\",\"src\":\"graph\",\"topic\":\"细选"+i+"\",\"type\":\"1\",\"tItemType\":\"wx_text\",\"tShowTmpl\":\"wx_text\",\"rl\":\"query_type-1|tip_show_type-1|tip_show_page-2\"},\"status\":{\"layoutStyle\":0}}");
    } else {
      mData.add("{\"model\":{\"tips\":[{\"show\":\"雪纺\",\"q\":\"连衣裙 雪纺\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%221%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"中长款\",\"q\":\"连衣裙 中长款\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%222%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"假两件\",\"q\":\"连衣裙 假两件\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%223%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"A字款\",\"q\":\"连衣裙 A字款\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%224%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]},{\"show\":\"气质淑女\",\"q\":\"连衣裙 气质淑女\",\"params\":[{\"key\":\"from\",\"value\":\"tips_1\"},{\"key\":\"vClickTrace\",\"value\":\"%7B%22tips_oriq%22%3A%22%E8%BF%9E%E8%A1%A3%E8%A3%99%22%2C%22tips_srppage%22%3A%222%22%2C%22tips_type%22%3A%221%22%2C%22tips_pos%22%3A%225%22%2C%22pre_rn%22%3A%220189c4d06e11f32262fa896f5f364f76%22%7D\"}]}],\"pos\":\"3\",\"src\":\"graph\",\"topic\":\"细选"+i+"\",\"type\":\"1\",\"tItemType\":\"wx_text\",\"tShowTmpl\":\"wx_text\",\"rl\":\"query_type-1|tip_show_type-1|tip_show_page-2\"},\"status\":{\"layoutStyle\":1}}");
    }

    //card.wasm
    if (false) {
      if (i++ % 2 == 0) {
        mData.add("{\n" +
            "    \"model\": {\n" +
            "      \"src\": \"tmall_rec\",\n" +
            "      \"pos\": 3,\n" +
            "      \"topic\": \"你可能想看"+i+"\",\n" +
            "      \"type\": \"tmall_rec\",\n" +
            "      \"tShowTmpl\": \"wx_tmall_discovery\",\n" +
            "      \"tItemType\": \"wx_tmall_discovery\",\n" +
            "      \"tips\": [\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i1/2985924572/TB2EL5XnDnI8KJjy0FfXXcdoVXa_!!2985924572.jpg\",\n" +
            "          \"show\": \"职场范儿\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%220%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1001\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/tfs/TB1.3ctnvDH8KJjy1XcXXcpdXXa-1125-390.png\",\n" +
            "          \"show\": \"国际大牌\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%221%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1007\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i2/263817957/TB2STDSnwLD8KJjSszeXXaGRpXa-263817957.jpg\",\n" +
            "          \"show\": \"优雅淑女\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%222%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1002\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i2/263817957/TB2_JnCnBHH8KJjy0FbXXcqlpXa-263817957.jpg\",\n" +
            "          \"show\": \"活力少女\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%223%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1005\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        }\n" +
            "      ]\n" +
            "    },\n" +
            "    \"status\": {\n" +
            "      \"layoutStyle\": 0\n" +
            "    }\n" +
            "  }");
      } else {
        mData.add("{\n" +
            "    \"model\": {\n" +
            "      \"src\": \"tmall_rec\",\n" +
            "      \"pos\": 3,\n" +
            "      \"topic\": \"你可能不想看\",\n" +
            "      \"type\": \"tmall_rec\",\n" +
            "      \"tShowTmpl\": \"wx_tmall_discovery\",\n" +
            "      \"tItemType\": \"wx_tmall_discovery\",\n" +
            "      \"tips\": [\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i1/2985924572/TB2EL5XnDnI8KJjy0FfXXcdoVXa_!!2985924572.jpg\",\n" +
            "          \"show\": \"职场范儿\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%220%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1001\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/tfs/TB1.3ctnvDH8KJjy1XcXXcpdXXa-1125-390.png\",\n" +
            "          \"show\": \"国际大牌\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%221%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1007\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i2/263817957/TB2STDSnwLD8KJjSszeXXaGRpXa-263817957.jpg\",\n" +
            "          \"show\": \"优雅淑女\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%222%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1002\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        },\n" +
            "        {\n" +
            "          \"picUrl\": \"https://img.alicdn.com/imgextra/i2/263817957/TB2_JnCnBHH8KJjy0FbXXcqlpXa-263817957.jpg\",\n" +
            "          \"show\": \"活力少女\",\n" +
            "          \"params\": [\n" +
            "            {\n" +
            "              \"value\": \"tmall_rec\",\n" +
            "              \"key\": \"from\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"%7B%22tips_oriq%22%3A%22%E7%BE%BD%E7%BB%92%E6%9C%8D%22%2C%22tips_srppage%22%3A%221%22%2C%22tips_type%22%3A%22mall1%22%2C%22tips_pos%22%3A%223%22%2C%22pre_rn%22%3A%22767d9f52662b4883b2dfcff69f12edce%22%7D\",\n" +
            "              \"key\": \"vClickTrace\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"1005\",\n" +
            "              \"key\": \"tag_id\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"767d9f52662b4883b2dfcff69f12edce\",\n" +
            "              \"key\": \"sessionid\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"tmallRecCard\",\n" +
            "              \"key\": \"m\"\n" +
            "            },\n" +
            "            {\n" +
            "              \"value\": \"羽绒服\",\n" +
            "              \"key\": \"q\"\n" +
            "            }\n" +
            "          ]\n" +
            "        }\n" +
            "      ]\n" +
            "    },\n" +
            "    \"status\": {\n" +
            "      \"layoutStyle\": 1\n" +
            "    }\n" +
            "  }");
      }
    }
    mAdapter.notifyItemInserted(mData.size() - 1);
//    mAdapter.notifyDataSetChanged();
  }

  private class WXInstanceAdapter extends RecyclerView.Adapter<WXViewHolder> {
    @Override
    public WXViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
      Log.d(LOG_TAG, "onCreateViewHolder");
      FrameLayout itemView = new FrameLayout(SliceTestActivity.this);
      itemView.setLayoutParams(new RecyclerView.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
      return new WXViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(WXViewHolder holder, int position) {
      String data = mData.get(position);
      if (!holder.isRendered()) {
        Log.d(LOG_TAG, "render onBindViewHolder " + position);
        holder.render(data, position);
      } else {
        Log.d(LOG_TAG, "refresh onBindViewHolder " + position);
        holder.refresh(data, position);
      }
    }

    @Override
    public int getItemCount() {
      return mData.size();
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    for (WXSDKInstance instance : mInstances) {
      instance.destroy();
    }
    mInstances.clear();
  }

  private class WXViewHolder extends RecyclerView.ViewHolder implements IWXRenderListener {
    private WXSDKInstance mInstance;
    private boolean mRendered;

    private TextView mTextView;

    public WXViewHolder(View itemView) {
      super(itemView);
      mInstance = new WXSDKInstance(SliceTestActivity.this);
      mInstance.registerRenderListener(this);
      mInstances.add(mInstance);
      mTextView = new TextView(SliceTestActivity.this);
      FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
      params.gravity = Gravity.RIGHT;
      ((ViewGroup) itemView).addView(mTextView, params);
    }

    public void render(String initData, int position) {
//
      if (true) {

        mInstance.render(
            "testPage",
            loadAssets(),
            null,
            initData,
            WXRenderStrategy.DATA_RENDER
        );
      } else {
//
        mInstance.render(
            "testPage",
            loadBytes(),
            null,
            initData
        );
      }
      mTextView.setText(String.valueOf(position));
      mRendered = true;
    }

    public boolean isRendered() {
      return mRendered;
    }

    public void refresh(String initData, int position) {
      mInstance.refreshInstance(initData);
      mTextView.setText(String.valueOf(position));
    }

    @Override
    public void onViewCreated(WXSDKInstance instance, View view) {
      ((ViewGroup) itemView).addView(view, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    @Override
    public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    }

    @Override
    public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {

    }

    @Override
    public void onException(WXSDKInstance instance, String errCode, String msg) {

    }
  }

  @NonNull
  private String loadAssets() {
    StringBuilder buf = new StringBuilder();
    try {
      InputStream json = getAssets().open("lite_template/case.js");
      BufferedReader in =
          new BufferedReader(new InputStreamReader(json, "UTF-8"));
      String str;

      while ((str = in.readLine()) != null) {
        buf.append(str);
      }

      in.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    return buf.toString();
  }

  private byte[] loadBytes() {
    try {
      AssetFileDescriptor assetFileDescriptor = getAssets().openFd("lite_template/card.wasm");
      long len = assetFileDescriptor.getDeclaredLength();
      ByteBuffer buf = ByteBuffer.allocate((int) len);
      InputStream json = assetFileDescriptor.createInputStream();
      json.read(buf.array());
      json.close();
      return buf.array();
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }
}
