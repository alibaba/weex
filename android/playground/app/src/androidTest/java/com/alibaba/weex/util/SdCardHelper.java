package com.alibaba.weex.util;

import android.os.Environment;

/**
 * Created by admin on 16/4/25.
 */
public class SdCardHelper {
    public static String SDCardRoot = Environment.getExternalStorageDirectory().getAbsolutePath() + "/";

    /**
     * sdcard check
     * @return
     */
    public static boolean  isHasSdcard(){
        String status = Environment.getExternalStorageState();
        if (status.equals(Environment.MEDIA_MOUNTED)) {
            return true;
        } else {
            return false;
        }
    }
}
