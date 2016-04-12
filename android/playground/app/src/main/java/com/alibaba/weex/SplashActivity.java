package com.alibaba.weex;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.RotateAnimation;
import android.view.animation.ScaleAnimation;

public class SplashActivity extends AppCompatActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_splash);

    View textView=findViewById(R.id.fullscreen_content);
    Animation scaleAnimation = new ScaleAnimation(0.5f, 1.0f, 0.5f, 1.0f);
    scaleAnimation.setDuration(5000);


    Animation rotateAnimation = new RotateAnimation(0f,360f,Animation.RELATIVE_TO_SELF,0.5f,Animation.RELATIVE_TO_SELF,0.5f);

    rotateAnimation.setDuration(1000);


    AnimationSet animationSet=new AnimationSet(false);
//    animationSet.addAnimation(scaleAnimation);
    animationSet.addAnimation(rotateAnimation);

    animationSet.setAnimationListener(new Animation.AnimationListener() {
      @Override
      public void onAnimationStart(Animation animation) {

      }

      @Override
      public void onAnimationEnd(Animation animation) {
        startActivity(new Intent(SplashActivity.this, WXMainActivity.class));
        finish();
      }

      @Override
      public void onAnimationRepeat(Animation animation) {

      }
    });

    textView.startAnimation(animationSet);
  }
}
