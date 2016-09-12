/**
 * http://usejsdoc.org/
 */

function CircleImpactObject(x,y,rad)
{
	this.x = x;
	this.y = y;
	this.rad = rad;
}

function RectImpactObject(x,y,width,height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function Tool()
{
	var that = this;
	this.pointDistance = function(x1,y1,x2,y2){
		return Math.sqrt(Math.abs(x1-x2)*Math.abs(x1-x2)+Math.abs(y1-y2)*Math.abs(y1-y2));
	};
	this.impactTest = function(obj0,obj1){
		if(obj0 instanceof CircleImpactObject && obj1 instanceof CircleImpactObject){
			var distance = that.pointDistance(obj0.x, obj0.y, obj1.x, obj1.y);
			return distance < obj0.rad + obj1.rad?true:false;
		}else if(obj0 instanceof RectImpactObject && obj1 instanceof RectImpactObject){
			var x0 = obj0.x;var x1 = obj0.x + obj0.width;
			var y0 = obj0.y;var y1 = obj0.y + obj0.height;
			var a0 = obj1.x;var a1 = obj1.x + obj1.width;
			var b0 = obj1.y;var b1 = obj1.y + obj1.height;
			if(x0 > a1 || x1 < a0 || y0 > b1 || y1 < b0){
				return false;
			}else{
				return true;
			}
		}else if(obj0 instanceof CircleImpactObject && obj1 instanceof RectImpactObject){
			throw "not support this";
		}else if(obj0 instanceof RectImpactObject && obj1 instanceof CircleImpactObject){
			throw "not support this";
		}else{
			return false;
		}
	};
	this.isInBound = function(x,y,sx,sy,swidth,sheight){
		if(x > sx && x < sx+swidth && y > sy && y< sy+sheight){
			return true;
		}else{
			return false;
		}
	};
}
Tool.CircleImpactObject = CircleImpactObject;
Tool.RectImpactObject = RectImpactObject;

Pepo.plugin('tool', new Tool());
