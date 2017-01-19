---
title: Timer
type: references
order: 3.8
version: 0.10
---

# Timer

Weex encapsulates a series of APIs in order to start/stop a one-time task or a repeated task at a fixed delay. Please note that this module don't provide an accuracy delay. It provides best-effort delivery, but the actual delay may still exceed the delay user wants if the corresponding thread is busy.
Actually, this module is made for the polyfill of HTML5 timer APIs, developers **should not** use this module directly unless they know exactly what they are doing.    

## API

All timeout or interval in this module are measured in milliseconds.    
Also, timeout and interval should be a non-negative integer(the max of integer is 0x7FFFFFFF). If timeout or interval is negative, then it will be reset to zero, e.g. the task will be put in the task queue immediately.     

### setTimeout(fn, timeout)    

The `setTimeout()` method calls a function after a specified number of milliseconds. Use the `clearTimeout()` method to prevent the function from running. The function is only executed once. If you need to repeat execution, use the `setInterval()` method.    

#### Arguments

- `fn` (function): The function that will be executed
- `timeout` (number): The number of milliseconds to wait before executing the function    

#### Return value

A Number, representing the fnId value of the timer that is set. Use this value with the `clearTimeout()` method to cancel the timer.   

### setInterval(fn, interval)    

The `setInterval()` method calls a function at specified intervals (in milliseconds), and it will continue calling the function until `clearInterval()` is called. The fnId value returned by `setInterval()` is used as the parameter for the `clearInterval()` method.  

#### Arguments    

- `fn` (function): The function that will be executed
- `interval` (number): The intervals (in milliseconds) on how often to execute the function

#### Return value    

A Number, representing the fnId value of the timer that is set. Use this value with the `clearInterval()` method to cancel the timer  

### clearTimeout(fnId)    

The `clearTimeout()` method clears a timer set with the `setTimeout()` method. The fnId value returned by `setTimeout()` is used as the parameter for the `clearTimeout()` method. If the function has not already been executed, you will be able to stop the execution by calling the `clearTimeout()` method, otherwise, this method has no influence on the task.    

#### Arguments    

- `fnId` (number): The fnId value of the timer returned by the `setTimeout()` method

### clearInterval(fnId)

The `clearInterval()` method clears a timer set with the `setInterval()` method. The fnId value returned by `setInterval()` is used as the parameter for the `clearInterval()` method.    

#### Arguments

- `fnId` (number): The fnId of the timer returned by the `setInterval()` method    

[Try it](http://dotwe.org/996578e8f29b88d7d4fa01ab031fbbda)
