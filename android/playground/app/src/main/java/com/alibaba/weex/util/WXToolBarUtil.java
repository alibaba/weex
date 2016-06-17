package com.alibaba.weex.util;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.view.Menu;

import com.alibaba.weex.R;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * Created by lixinke on 16/3/17.
 */
public class WXToolBarUtil {

    public static Bitmap resizeBitmap(Bitmap bitmap, int maxLength) {
        if (null == bitmap)
            return null;
        int w = bitmap.getWidth();
        int h = bitmap.getHeight();
        float scale = (float) maxLength / h;
        Matrix matrix = new Matrix();
        matrix.postScale(scale, scale);
        Bitmap zoomedBitmap = Bitmap.createBitmap(bitmap, 0, 0, w, h, matrix, true);
        return zoomedBitmap;
    }


    public static final int getIconFontId(String name) {
        Class<R.string> c = R.string.class;
        Field field;
        int value = 0;
        try {
            field = c.getDeclaredField("uik_icon_" + name);
            value = field.getInt(null);
        } catch (SecurityException e1) {
            e1.printStackTrace();
        } catch (NoSuchFieldException e1) {
            e1.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return value;
    }

    public static void setIconEnable(Menu menu, boolean enable) {
        try {
            Class<?> clazz = Class.forName("com.android.internal.view.menu.MenuBuilder");
            Method m = clazz.getDeclaredMethod("setOptionalIconsVisible", boolean.class);
            m.setAccessible(true);
            m.invoke(menu, enable);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static int getResIdByName(Context context, String resName) {
        Resources res = context.getResources();
        final String packageName = context.getPackageName();
        int imageResId = res.getIdentifier(resName, "drawable", packageName);
        return imageResId;
    }
}
