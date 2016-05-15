package com.alibaba.weex.util;

import android.content.Context;
import android.text.TextUtils;

import com.alibaba.weex.models.AssetsEntity;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 */
public class WXAssetsManager {

  private static WXAssetsManager instance = new WXAssetsManager();

  private WXAssetsManager() {
  }

  public static WXAssetsManager getInstance() {
    return instance;
  }

  public List<AssetsEntity> getAssetsEntity(Context context, String path) {
    try {
      String[] folders = context.getAssets().list(path);
      if (folders == null) {
        return null;
      }
      List<AssetsEntity> entities = new ArrayList<AssetsEntity>();
      for (String folder : folders) {
        AssetsEntity entity = new AssetsEntity();
        entity.name = folder;
        entity.path = TextUtils.isEmpty(path) ? folder : path + File.separator + folder;
        entity.isFolder = context.getAssets().list(entity.path).length == 0 ? false : true;
        entities.add(entity);
      }
      return entities;
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

}
