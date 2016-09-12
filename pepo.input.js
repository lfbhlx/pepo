/**
 * http://usejsdoc.org/
 */

function KeyEvent(keyCode,type)
{
	this.keyCode = keyCode?keyCode:0;
	this.type = type?type:0;
	this.time = new Date().getTime();
}
KeyEvent.KEY_STATE = {};
KeyEvent.KEY_UP = 0;
KeyEvent.KEY_DOWN = 1;
KeyEvent.KEYCODE_LEFT = 37;
KeyEvent.KEYCODE_UP = 38;
KeyEvent.KEYCODE_RIGHT = 39;
KeyEvent.KEYCODE_DOWN = 40;

function ClickEvent(x,y)
{
	this.x = x?x:0;
	this.y = y?y:0;
	this.time = new Date().getTime();
}

function Input()
{
	var that = this;
	function accelInputHandler(e)
	{
		var accel = e.accelerationIncludingGravity;
		if(accel){
			if(pepo.graphics.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON 
				&& pepo.graphics.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL){
				if(accel.x) that.accelX = -accel.y;
				if(accel.y) that.accelY = accel.x;
				if(accel.z) that.accelZ = accel.z;
			}else{
				if(accel.x) that.accelX = accel.x;
				if(accel.y) that.accelY = accel.y;
				if(accel.z) that.accelZ = accel.z;
			}
		}else{
			console.error('can not gain accel object');
		}
	}
	function keyupInputHandler(e)
	{
		that.keyEvents.push(new KeyEvent(e.keyCode, KeyEvent.KEY_UP));
		KeyEvent.KEY_STATE[e.keyCode] = KeyEvent.KEY_UP;
	}
	function keydownInputHandler(e)
	{
		that.keyEvents.push(new KeyEvent(e.keyCode, KeyEvent.KEY_DOWN));
		KeyEvent.KEY_STATE[e.keyCode] = KeyEvent.KEY_DOWN;
	}
	function clickInputHandler(e)
	{
		var x = 0;
		var y = 0;
		if(pepo.graphics.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON 
				&& pepo.graphics.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL){
			x = (e.pageY - $(this).offset().top)*pepo.graphics.scaleWidth;
			y = pepo.graphics.modelHeight - (e.pageX - $(this).offset().left)*pepo.graphics.scaleHeight;
		}else{
			x = (e.pageX - $(this).offset().left)*pepo.graphics.scaleWidth;
			y = (e.pageY - $(this).offset().top)*pepo.graphics.scaleHeight;
		}
		that.clickEvents.push(new ClickEvent(x, y));
	}
	this.keyEvents = [];
	this.clickEvents = [];
	this.accelX = 0;
	this.accelY = 0;
	this.accelZ = 0;
	this.openAccel = function(err){
		if(window.DeviceMotionEvent){
			window.addEventListener('devicemotion',accelInputHandler);
		}else{
			if(err) err();
		}
	};
	this.closeAccel = function(){
		if(window.DeviceMotionEvent){
			window.removeEventListener('devicemotion',accelInputHandler);
		}
	};
	this.isKeyDown = function(keyCode){
		return KeyEvent.KEY_STATE[keyCode] == KeyEvent.KEY_DOWN?true:false;
	};
	this.getKeyEvents = function(){
		var ret = [];
		while(that.keyEvents.length > 0)
		{
			ret.push(that.keyEvents.shift());
		}
		return ret;
	};
	this.getClickEvents = function(){
		var ret = [];
		while(that.clickEvents.length > 0)
		{
			ret.push(that.clickEvents.shift());
		}
		return ret;
	};
	setTimeout(function(){
		window.addEventListener('keyup',keyupInputHandler);
		window.addEventListener('keydown',keydownInputHandler);
		$(pepo.graphics.canvas).on('click',clickInputHandler);
	},1000);
}

Pepo.plugin('input', new Input());

