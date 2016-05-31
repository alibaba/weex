package com.alibaba.weex;

import com.google.zxing.client.android.CaptureActivity;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.Vibrator;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.widget.Button;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;

public abstract class WXBaseActivity extends AppCompatActivity {

  private static final int SENSOR_SHAKE = 10;
  private SensorManager sensorManager;
  private Vibrator vibrator;
  private SensorEventListener sensorEventListener = new SensorEventListener() {
    @Override
    public void onSensorChanged(SensorEvent event) {
      float[] values = event.values;
      float x = values[0];
      float y = values[1];
      float medumValue = 19.5f;

      if (Math.abs(x) > medumValue || Math.abs(y) > medumValue) {
        vibrator.vibrate(200);
        Message msg = new Message();
        msg.what = SENSOR_SHAKE;
        handler.sendMessage(msg);
      }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
  };
  private Dialog mDialog;
  private Button mButton;

  //	@Override
  //	public boolean onKeyDown(int keyCode, KeyEvent event) {
  //		if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
  //			if (System.currentTimeMillis() - mLatestTime > 5000) {
  //				mLatestTime = System.currentTimeMillis();
  //				WXSDKEngine.restartBridge(true);
  //				Toast.makeText(this, "down", Toast.LENGTH_SHORT).show();
  //			}
  //			return true;
  //		}
  //		return super.onKeyDown(keyCode, event);
  //	}
  private boolean mDebug = false;
  private String sDebugInfo = "Switch to dev model by scaning QR code";
  private String sNormalInfo = "Switched to the normal mode";
  @SuppressLint("HandlerLeak")
  Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
      super.handleMessage(msg);
      switch (msg.what) {
        case SENSOR_SHAKE:
          showDialog();
          break;
      }
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
    vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
  }

  @Override
  protected void onStop() {
    super.onStop();
    if (sensorManager != null) {
      sensorManager.unregisterListener(sensorEventListener);
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    handler.removeCallbacksAndMessages(null);
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (sensorManager != null) {
      sensorManager.registerListener(sensorEventListener,
                                     sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
                                     SensorManager.SENSOR_DELAY_NORMAL);
    }
  }

  private void showDialog() {
    if (mDialog == null) {
      mDialog = new Dialog(this);
      mDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
      mDialog.setContentView(R.layout.wxp_dialog_layout);
      mButton = (Button) mDialog.findViewById(R.id.wxp_dialog_info_tv);
      mButton.setOnClickListener(new View.OnClickListener() {

        @Override
        public void onClick(View v) {
          if (mDebug) {
            mDebug = false;
            WXEnvironment.sDebugWsUrl = "";
            WXSDKEngine.restartBridge(false);
            mDialog.dismiss();
          } else {
            mDebug = true;
            Intent intent = new Intent(WXBaseActivity.this, CaptureActivity.class);
            startActivity(intent);
            mDialog.dismiss();
          }
        }
      });
    }

    if (mDebug) {
      mButton.setText(sNormalInfo);
    } else {
      mButton.setText(sDebugInfo);
    }

    if (!mDialog.isShowing()) {
      mDialog.show();
    }

  }
}
