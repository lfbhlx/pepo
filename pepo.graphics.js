
function Texture(textureset,img,option)
{
	var that = this;
	this.textureset = textureset;
	this.image = img;
	this.option = option;
	this.draw = function(g,x,y,width,height){
		if(that.textureset.isLoad){
			g.drawImage(that.image,x,y,width,height,that.option.x,that.option.y,that.option.width,that.option.height);
		}else{
			g.drawRect(x,y,width,height,'rgba(60,60,60,0.35)');
		}
	};
}

function TextureSet(src,map)
{
	var that = this;
	this.image = new Image();
	this.image.src = src;
	this.isLoad = false;
	this.image.onload = function(){
		that.isLoad = true;
	};
	this.map = map;
	this.textures = {};
	this.get = function(name){
		if(!that.textures[name]) that.textures[name] = new Texture(that, that.image, that.map[name]);
		return that.textures[name];
	};
}

function Graphics()
{
	var that = this;
	this.canvas = null;
	this.ctx = null;
	this.width = 0;
	this.height = 0;
	this.modelWidth = 320;
	this.modelHeight = 480;
	this.deviceWidth = $(window).width();
	this.deviceHeight = $(window).height() - 5;
	this.scaleWidth = 1.0;
	this.scaleHeight = 1.0;
	this.DEVICE_ORIENTATION = this.deviceWidth/this.deviceHeight>1?Graphics.ORIENTATION_HORIZON:Graphics.ORIENTATION_VERTICAL;
	this.GAME_ORIENTATION = Graphics.ORIENTATION_VERTICAL;
	this.setCanvas = function(canvas){
		that.canvas = canvas;
		that.ctx = that.canvas.getContext('2d');
	};
	this.model = function(width,height){
		that.modelWidth = width;
		that.modelHeight = height;
		that.GAME_ORIENTATION = that.modelWidth/that.modelHeight>1?Graphics.ORIENTATION_HORIZON:Graphics.ORIENTATION_VERTICAL;
	};
	this.init = function(canvas,width,height){
		that.setCanvas(canvas);
		if(!width && !height){
			if(that.DEVICE_ORIENTATION == that.GAME_ORIENTATION){
				if(that.deviceWidth < that.deviceHeight){
					that.width = that.deviceWidth;
					that.height = that.width/that.modelWidth*that.modelHeight;
				}else{
					that.height = that.deviceHeight;
					that.width = that.height/that.modelHeight*that.modelWidth;
				}
				//that.width = that.deviceWidth;
				//that.height = that.deviceHeight;
				that.scaleWidth = that.modelWidth / that.width;
				that.scaleHeight = that.modelHeight / that.height;
			}else{
				if(that.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
					&& that.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
					that.width = that.deviceWidth;
					//that.height = that.width/that.modelHeight*that.modelWidth;
					that.height = that.deviceHeight;
					that.scaleWidth = that.modelWidth / that.height;
					that.scaleHeight = that.modelHeight / that.width;
				}else{
					that.width = that.deviceHeight*(that.modelWidth/that.modelHeight);
					that.height = that.deviceHeight;
					that.scaleWidth = that.modelWidth / that.width;
					that.scaleHeight = that.modelHeight / that.height;
				}
			}
		}else{
			that.width = width;
			that.height = height;
			that.scaleWidth = that.modelWidth / that.width;
			that.scaleHeight = that.modelHeight / that.height;
		}
		$(that.canvas).attr('width',that.width).attr('height',that.height);
	};
	this.clear = function(color){
		that.ctx.fillStyle = color;
		that.ctx.fillRect(0,0,$(that.canvas).width(),$(that.canvas).height());
	};
	this.drawPoint = function(x,y,color){
		var p = Graphics.pointMapping(that, x, y);
		that.ctx.strokeStyle = color;
		that.ctx.save();
		that.ctx.beginPath();
		that.ctx.moveTo(p.x,p.y);
		that.ctx.lineTo(p.x+1,p.y+1);
		that.ctx.stroke();
		that.ctx.restore();
	};
	this.drawLine = function(x1,y1,x2,y2,color){
		var srcPoint = Graphics.pointMapping(that,x1,y1);
		var dstPoint = Graphics.pointMapping(that,x2,y2);
		that.ctx.strokeStyle = color;
		that.ctx.save();
		that.ctx.beginPath();
		that.ctx.moveTo(srcPoint.x,srcPoint.y);
		that.ctx.lineTo(dstPoint.x,dstPoint.y);
		that.ctx.stroke();
		that.ctx.restore();
	};
	this.drawRect = function(x,y,width,height,color){
		var p = Graphics.pointMapping(that, x, y);
		var size = Graphics.sizeMapping(that, width, height);
		that.ctx.fillStyle = color;
		that.ctx.fillRect(p.x,p.y,size.width,size.height);
	};
	this.drawCircle = function(x,y,rad,color){
		var p = Graphics.pointMapping(that,x,y);
		var size = Graphics.sizeMapping(that, rad, rad);
		that.ctx.fillStyle = color;
		that.ctx.beginPath();
		that.ctx.arc(p.x,p.y,Math.abs(Math.min(size.width,size.height)),0,360,false);
		that.ctx.fill();
		that.ctx.closePath();
	};
	this.drawImage = function(img,x,y,width,height,sx,sy,swidth,sheight){
		var point = null;
		var size = null;
		switch(arguments.length)
		{
		case 3:
			point = Graphics.pointMapping(that, x, y);
			if(that.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
					&& that.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
				that.ctx.save();
				that.ctx.translate(point.x,point.y);
				that.ctx.rotate(90 * Math.PI / 180);
				that.ctx.drawImage(img,0,0);
				that.ctx.restore();
			}else{
				that.ctx.drawImage(img,point.x,point.y);
			}
			break;
		case 5:
			point = Graphics.pointMapping(that, x, y);
			size = Graphics.sizeMapping(that, width, height);
			if(that.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
				&& that.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
				that.ctx.save();
				that.ctx.translate(point.x,point.y);
				that.ctx.rotate(90 * Math.PI / 180);
				that.ctx.drawImage(img,0,0,width/that.scaleWidth,height/that.scaleHeight);
				that.ctx.restore();
			}else{
				that.ctx.drawImage(img,point.x,point.y,size.width,size.height);
			}
			break;
		case 9:
			point = Graphics.pointMapping(that, x, y);
			size = Graphics.sizeMapping(that, width, height);
			if(that.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
					&& that.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
				that.ctx.save();
				that.ctx.translate(point.x,point.y);
				that.ctx.rotate(90 * Math.PI / 180);
				that.ctx.drawImage(img,sx,sy,swidth,sheight,0,0,width/that.scaleWidth,height/that.scaleHeight);
				that.ctx.restore();
			}else{
				that.ctx.drawImage(img,sx,sy,swidth,sheight,point.x,point.y,size.width,size.height);
			}
			break;
		}
	};
}
Graphics.ORIENTATION_HORIZON = 0;
Graphics.ORIENTATION_VERTICAL = 1;
Graphics.pointMapping = function(graph,x,y){
	var ret = {'x':x,'y':y};
	if(graph.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
		&& graph.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
		ret.x = graph.modelHeight - y;
		ret.y = x;
		ret.x = (graph.width/graph.modelHeight)*ret.x;
		ret.y = (graph.height/graph.modelWidth)*ret.y;
		return ret;
	}
	ret.x = (graph.width/graph.modelWidth)*ret.x;
	ret.y = (graph.height/graph.modelHeight)*ret.y;
	return ret;
};
Graphics.sizeMapping = function(graph,width,height){
	var size = null;
	if(graph.DEVICE_ORIENTATION == Graphics.ORIENTATION_VERTICAL 
			&& graph.GAME_ORIENTATION == Graphics.ORIENTATION_HORIZON){
		size = {
			'width':-(graph.height/graph.modelWidth)*height,
			'height':(graph.width/graph.modelHeight)*width
		};
	}else{
		size = {
			'width':(graph.width/graph.modelWidth)*width,
			'height':(graph.height/graph.modelHeight)*height
		};
	}
	return size;
};

Pepo.plugin('graphics', new Graphics());