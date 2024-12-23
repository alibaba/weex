<template>
  <div>
    <list>
      <div @touchstart='parentStart'>
        <div class="btn" @touchstart='onStart'>
          @touchstart='onStart'
        </div>
        <div class="btn" @touchstart.stop='onStart'>
          @touchstart.stop='onStart'
        </div>
        <div class="btn" @touchstart.stop.prevent='onStart'>
          @touchstart.stop.prevent='onStart'
        </div>
        <div class="btn" @touchstart.stop.prevent>
          @touchstart.stop.prevent
        </div>
        <div class="btn" @touchstart.stop>
        @touchstart.stop
        </div>
      </div>
        <div @touchmove='parentMove'>
          <div class="btn" @touchmove='onMove'>
            @touchmove='onmove'
          </div>
          <div class="btn" @touchmove.stop='onMove'>
            @touchmove.stop='onmove'
          </div>
          <div class="btn" @touchmove.stop.prevent='onMove'>
            @touchmove.stop.prevent='onmove'
          </div>
          <div class="btn" @touchmove.stop.prevent>
            @touchmove.stop.prevent
          </div>
          <div class="btn" @touchmove.stop> 
          @touchmove.stop
          </div>
        </div>
          <div @touchend='parentEnd'>
          <div class="btn" @touchend='onEnd'>
            @touchend='onEnd'
          </div>
          <div class="btn" @touchend.stop='onEnd'>
            @touchend.stop='onEnd'
          </div>
          <div class="btn" @touchend.stop.prevent='onEnd'>
            @touchend.stop.prevent='onEnd'
          </div>
          <div class="btn" @touchend.stop.prevent>
            @touchend.stop.prevent
          </div>
          <div class="btn" @touchend.stop>
          @touchend.stop
          </div>
        </div>
    </list>
  </div>
</template>

<script>
export default {
  methods: {
    onStart(event){
      console.log('子元素')
    },
    parentStart(event){
      console.log('父组件的touchstart回调函数触发了')
    },
    onMove(event){
      console.log('子元素')
    },
    parentMove(event){
      console.log('父组件的touchmove回调函数触发了')
    },
    onEnd(event){
      console.log('子元素')
    },
    parentEnd(event){
      console.log('父组件的touchend回调函数触发了')
    }
  }
}
</script>

<style>
.btn {
  height: 300px;
  width: 400px;
  border: 1px solid green;
  border-radius: 5px;
}
</style>