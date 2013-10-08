app = function () {
	
};    

touchLib = function () {

	var abstractTouchVal = {
		    "x": 0,
		    "y": 0,
		    "direction": {"vert": undefined, "hori": undefined},
		    "distance": {"x": undefined, "y": undefined}
		},
		distance = {},
		startPos = {},
		eNum = {
				'LEFT': 'left',
				'RIGHT': 'right',
				'UP': 'up',
				'DOWN': 'down'
			};

    updateDirection = function (direction) {
    	var absStartPosX = Math.abs(startPos.x), 
    		absDirectionX = Math.abs(direction.x), 
    		absStartPosY = Math.abs(startPos.y), 
    		absDirectionY = Math.abs(direction.y);
    	
    	if ((absStartPosY - absDirectionY) > 0) distance.direction.vert = eNum.UP;
    	if ((absStartPosY - absDirectionY) < 0) distance.direction.vert = eNum.DOWN;
    	if ((absStartPosX - absDirectionX) > 0) distance.direction.hori = eNum.LEFT;
    	if ((absStartPosX - absDirectionX) < 0) distance.direction.hori = eNum.RIGHT;
    	
    	distance.distance.x = direction.x - startPos.x;
    	distance.distance.y = direction.y - startPos.y;
    };
	
	extend = function () {
		
		var target = arguments[0] || {},
			source = arguments[1];
		
		for (var i in source) {
			if (typeof source[i] !== 'object')
			target [ i ] = source [ i ];
			else target [ i ] = extend({}, source[i]);
		}
		
		return target;
		
	};
	
	extend(distance, abstractTouchVal);
	extend(startPos, abstractTouchVal);
	
	this.touchStart = function (event, callback) {
		
	    event.preventDefault();
//		    console.log(this);
//		    this.debug.event(event);
	    
	    // swipe with one finger (for 2 finger you have another touches array element)
	    if (event.touches.length === 1) {
	    	var y = event.touches[0].pageY-10;
	        var x = event.touches[0].pageX-10;
	                   
	        startPos.x = x;
	        startPos.y = y;
	        console.log("ontouchstart");
	        console.log(startPos);
	        
	        if (typeof callback === 'function') {
	        	callback.apply(this, [event, startPos]);
	        }
	        
	        return distance;
	        
	    }
	};
	    
    this.touchMove = function (event, callback) {
        
    	event.preventDefault();
        //stdOut(event);
    	var direction;
        
        var y = event.changedTouches[0].pageY-10;
        var x = event.changedTouches[0].pageX-10;
        
        direction = {'y': y, 'x': x};
        
        updateDirection(direction);
        
        if (typeof callback === 'function') {
        	callback.apply(this, [event, distance, startPos]);
        }
        
    };
    
    this.touchEnd = function (event) {
        
    	event.preventDefault();
//		    	stdOut(event);
    	
    	for (var i=0; i<event.changedTouches.length; i++) {
    	    
    		var y = event.changedTouches[i].pageY-10;
    	    var x = event.changedTouches[i].pageX-10;
    	    
    	    distance.y = y;
    	    distance.x = x;
    	
    	    updateDirection(distance);
    	    
    	    console.log("distance:=>");
    	    console.log(distance);
    	    console.log(distance.direction);
    	        
    	    if (typeof callback === 'function') {
    	    	callback.apply(this, [event, distance, startPos]);
            }
            
        }
    	    
    };


};

app.prototype = new touchLib;
app.prototype.constructor = app;

var btd = new app;
console.log(btd);


    
//app.debug = { 
//	event: function (event) {
//        console.log(event.type);
//        console.log(event);
//    }
//};

var move = function (e, pos, start) {
	console.log(this);
	this.style.webkitTransitionDuration = "200ms";
	this.style.webkitTransform = "translate(" + pos.distance.x + "px, 0)";
};
	 
var events = function (e) {
	
	switch (e.type) {
	case 'touchstart':
			btd.touchStart(e);
		break;
	case 'touchmove':
			btd.touchMove.apply(this, [e, move]);
		break;
	case 'touchend':
			btd.touchEnd(e);
		break;
	case 'transitionend':
		break;
	};
	
};


var elements = document.getElementsByClassName('ontouchstart');


for (var i = 0, j = elements.length; i < j; i++) {
    elements[i].addEventListener('touchstart', events, false);
    elements[i].addEventListener('touchend', events, false);
    elements[i].addEventListener('touchmove', events, false);
}


var elements = document.getElementsByClassName('inner-slider');


for (var i = 0, j = elements.length; i < j; i++) {
    elements[i].addEventListener('touchstart', events, false);
    elements[i].addEventListener('touchend', events, false);
    elements[i].addEventListener('touchmove', events, false);
}
//div.style.display = "none";
//div.style.width = "20px";
//div.style.height = "20px";
//div.style.backgroundColor = "green";
//div.style.position = "absolute";