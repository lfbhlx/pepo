function Screen()
{
	this.resume = function(){
		//console.log('Initial Resume');
	};
	this.destory = function(){
		//console.log('Initial Destory');
	};
	this.update = function(deltaTime){
		//console.log('Initial Update');
	};
	this.present = function(deltaTime){
		//console.log('Initial Present');
	};
}

function Pepo()
{
	var requestAnimationFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			function(callback){
				window.setTimeout(callback, 1000/60);
			};
	})();
	var that = this;
	
	this.screen = null;
	
	this.require = function(src){
		$('<script></script>',{
			'type':'text/javascript',
			'src':src,
		}).appendTo('head');
	};
	this.ready = function(callback){
		$(document).ready(callback);
	};
	this.setScreen = function(screen){
		if(this.screen == null){
			screen.resume();
		}else{
			this.screen.destory();
			screen.resume();
		}
		this.screen = screen;
	};
	this.start = function(){
		var time = new Date().getTime();
		var callback = function(){
			var deltaTime = (new Date().getTime() - time) / 1000;
			time = new Date().getTime();
			
			that.screen.update(deltaTime);
			that.screen.present(deltaTime);
			
			requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);
	};
}
Pepo.extend = function(that,cls){
	cls.call(that);
};
Pepo.plugin = function(name,plug){
	Pepo.prototype[name] = plug;
};

var pepo = new Pepo();