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

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;
import com.google.zxing.Result;
import com.google.zxing.ResultPoint;
import com.journeyapps.barcodescanner.BarcodeCallback;
import com.journeyapps.barcodescanner.BarcodeResult;
import com.journeyapps.barcodescanner.CaptureManager;
import com.journeyapps.barcodescanner.DecoratedBarcodeView;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import java.util.List;
import org.apache.weex.constants.Constants;
import org.apache.weex.thirdParty.zxing.HistoryActivity;
import org.apache.weex.thirdParty.zxing.HistoryItem;
import org.apache.weex.thirdParty.zxing.HistoryManager;

public class CustomCaptureActivity extends Activity {
    private CaptureManager capture;
    private DecoratedBarcodeView barcodeScannerView;
    private HistoryManager historyManager;
    public static final int HISTORY_REQUEST_CODE = 0x0000bacc;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window window = getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.activity_qrcode);

        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        }

        barcodeScannerView = findViewById(R.id.decoratedBarcodeView);

        capture = new CaptureManager(this, barcodeScannerView);
        capture.initializeFromIntent(getIntent(), savedInstanceState);

        barcodeScannerView.decodeContinuous(new BarcodeCallback() {
            @Override
            public void barcodeResult(BarcodeResult result) {
                historyManager.addHistoryItem(result.getResult());
                handleDecodeInternally(result.getResult());
            }

            @Override
            public void possibleResultPoints(List<ResultPoint> resultPoints) {

            }
        });
    }

    private void handleDecodeInternally(Result rawResult) {
        String code = rawResult.getText();
        if (!TextUtils.isEmpty(code)) {
            Uri uri = Uri.parse(code);
            if (uri.getPath().contains("dynamic/replace")) {
                Intent intent = new Intent("weex.intent.action.dynamic", uri);
                intent.addCategory("weex.intent.category.dynamic");
                startActivity(intent);
                finish();
            } else if (uri.getQueryParameterNames().contains("_wx_devtool")) {
                WXEnvironment.sRemoteDebugProxyUrl = uri.getQueryParameter("_wx_devtool");
                WXEnvironment.sDebugServerConnectable = true;
                WXSDKEngine.reload();
                Toast.makeText(this, "devtool", Toast.LENGTH_SHORT).show();
                finish();
                return;
            } else {
                String urlData = uri.getQueryParameter(Constants.WEEX_TPL_KEY);
                if (TextUtils.isEmpty(urlData)){
                    urlData = code;
                }
                Log.d("test->", "before nav activity ");
                WXPreLoadManager.getInstance().preLoad(urlData);
                Toast.makeText(this, rawResult.getText(), Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(CustomCaptureActivity.this, WXPageActivity.class);
                intent.setData(Uri.parse(code));
                startActivity(intent);
            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (resultCode == RESULT_OK && requestCode == HISTORY_REQUEST_CODE
                && historyManager != null) {
            int itemNumber = intent
                    .getIntExtra(historyManager.ITEM_NUMBER, -1);
            if (itemNumber >= 0) {
                HistoryItem historyItem = historyManager
                        .buildHistoryItem(itemNumber);
                handleDecodeInternally(historyItem.getResult());
            }
        }
    }


    @Override
    protected void onResume() {
        super.onResume();
        capture.onResume();
        historyManager = new HistoryManager(this);
        historyManager.trimHistory();
    }

    @Override
    protected void onPause() {
        super.onPause();
        capture.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        capture.onDestroy();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        capture.onSaveInstanceState(outState);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[], @NonNull int[] grantResults) {
        capture.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return barcodeScannerView.onKeyDown(keyCode, event) || super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.capture, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        int i = item.getItemId();
        if (i == R.id.menu_history) {
            intent.setClassName(this, HistoryActivity.class.getName());
            startActivityForResult(intent, HISTORY_REQUEST_CODE);
        } else {
            return super.onOptionsItemSelected(item);
        }
        return true;
    }


}
