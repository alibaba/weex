## WXAnimationModule
Built-in module for animaiton. One can invoke `transition(id, options, callback)` in JavaScript to activate an animaiton.

* **id** the id of the element to be animatied.
* **options** Property value of animaiton. The animation will start from current property to the given property. Refer the following for example.
    	          
    	styles: {
         	color: ‘#FF0000’,
         	transform: ‘translate(1, 1)’
        },
    	duration: 0, //ms
    	timingFunction: ’ease’,
    	transform-origin: 'center center',
    	delay: 0 //ms
  
  * **style** the expected property value when the animation finished.
    * color, the color of the element when the animaiton finished.
    * transform, transform fuction to be applied to the element. Following value is supported.
      * **translate, translateX, translateY** translate the element to a new location. The value an be pixel or percent
      * **rotate** the unit is degree.
      * **scale** scale up or scale down the element.
  * **duration** Duration that the animation last.
  * **timingFuncion** can be one of *ease-in*, *ease-out*, *ease-in-out*, *linear*
  * **delay** Delay time before the animation starts.
  * **transform-origin** the center of scale and rotation. The value can be pixel or keywords(left, right, bottom, top, center). If keywords is ever given, it must be in **X,Y** order.
* **callback** the callback function to be executed when the animation finished.