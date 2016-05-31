package com.taobao.weex;

import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.adapter.IWXUserTrackAdapter;

/**
 * Created by sospartan on 5/31/16.
 */
public class InitConfig {
  private IWXHttpAdapter httpAdapter;
  private IWXImgLoaderAdapter imgAdapter;
  private IWXUserTrackAdapter utAdapter;

  public IWXHttpAdapter getHttpAdapter() {
    return httpAdapter;
  }

  public IWXImgLoaderAdapter getImgAdapter() {
    return imgAdapter;
  }

  public IWXUserTrackAdapter getUtAdapter() {
    return utAdapter;
  }

  private InitConfig() {
  }

  public static class Builder{
    IWXHttpAdapter httpAdapter;
    IWXImgLoaderAdapter imgAdapter;
    IWXUserTrackAdapter utAdapter;
    public Builder(){

    }

    public Builder setHttpAdapter(IWXHttpAdapter httpAdapter) {
      this.httpAdapter = httpAdapter;
      return this;
    }

    public Builder setImgAdapter(IWXImgLoaderAdapter imgAdapter) {
      this.imgAdapter = imgAdapter;
      return this;
    }

    public Builder setUtAdapter(IWXUserTrackAdapter utAdapter) {
      this.utAdapter = utAdapter;
      return this;
    }

    public InitConfig build(){
      InitConfig config =  new InitConfig();
      config.httpAdapter = this.httpAdapter;
      config.imgAdapter = this.imgAdapter;
      config.utAdapter = this.utAdapter;
      return config;
    }
  }
}
