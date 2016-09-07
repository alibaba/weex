# Timer
<span class="weex-version">0.7</span>


## Summary

Weex encapsulates a series of APIs in order to start/stop a one-time task or a repeated task at a fixed delay. Please note that this module **don't provide an accuracy delay**. It provides best-effort delivery, but the actual delay may still exceed the delay user wants if the corresponding thread is busy.

Actually, this module is made for the polyfill of HTML5 timer APIs, developers **should not** use this module directly unless they know exactly what they are doing.

## API
All timeout or interval in this module are measured in milliseconds.

Also, timeout and interval should be a non-negative integer(the max of integer is 0x7FFFFFFF). If timeout or interval is negative, then it will be reset to zero, e.g. the task will be put in the task queue immediately.

### setTimeout(fn: function, timeout: number)
Execute a one-time task after a fixed delay.
#### Arguments
* `fn` *(function)*: the task to be executed.
* `timeout`*(number)*: the time delay when executing task.

### setInterval(fn: function, interval: number)
Execute a repeated task for at a fixed rate.
#### Arguments
* `fn` *(function)*: the task to be executed.
* `interval`*(number)*: the time interval when executing two tasks.

### clearTimeout(fnId: number)
Stop a specified one-time task. If this method is executed before the corresponding task start, the task would be destroyed. Otherwise, this method has no influence on the task.
#### Arguments
* `fnId` *(number)*: the return value of corresponding `setTimeout(fn: function, timeout: number)`.

### clearInterval(fnId: number)
Stop a specified repeated task.
#### Arguments
* `fnId` *(number)*: the return value of corresponding `setInterval(fn: function, interval: number)`.

## Example
	<template>
	  <div>
	    <text onclick="stop">stop interval</text>
	  </div>
	</template>
	
	<script>
	  var timer;
	  module.exports = {
	    data: {},
	    methods: {
	      ready: function(){
	        timer = setInterval(this.start.bind(this), 4000)
	      },
	      start:function(){
	        console.log('start')
	        var modal = require('@weex-module/modal');
	        modal.toast({
	          'message': 'Android',
	          'duration': 1000});
	      },
	      stop: function(){
	        console.log('stop')
	        clearInterval(timer)
	      }
	    }
	  }
	</script>