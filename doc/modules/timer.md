# Timer


## Summary

Weex encapulates a series of APIs in order to start/stop a one time task or a repeated task at a fixed delay. Please be noted that this moudle **don't provide an accuracy dealy**. It provides best-effort delivery, but the actual dealy may still exceed the delay user wants if the corresponding thread is busy.

## API
All timeout or interval in this module are measured in milliseconds.

Also, timeout and interval should be a non-negative integer(the max of integer is 0x7FFFFFFF). If timeout or interval is negative, then it will be reset to zero, e.g. the task will be put in the task queue immediately.

### setTimeout(fnId: number, timeout: number)
Execute an one-time task at a fixed delay.
#### Arguments
* `fnId` *(number)*: the task to be excuted.
* `timeout`*(object)*: the time delay when executing task.

### setInterval(fnId: number, interval: number)
Execute a repeated task for at a fixed rate.
#### Arguments
* `fnId` *(number)*: the task to be excuted.
* `interval`*(object)*: the time interval when excuting two tasks.

### clearTimeout(fnId: number)
Stop a specified one-time task. If this method is executed before the corresponding task start, the task would be destroyed. Otherwise, this method has no influence on the task.
#### Arguments
* `fnId` *(number)*: the task to be stopped.

### clearInterval(fnId: number)
Stop a specified repeated task.
#### Arguments
* `fnId` *(number)*: the task to be stopped.