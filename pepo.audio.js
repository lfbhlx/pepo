
function Sound(audioNode)
{
	this.element = audioNode.get(0);
	this.play = function(vol){
		if(typeof vol != 'undefined') this.element.volume = vol;
		this.element.play();
	};
	this.pause = function(){
		this.element.pause();
	};
	this.stop = function(){
		this.element.pause();
		this.element.load();
	};
	this.setLoop = function(loop){
		this.element.loop = loop;
	};
	this.isEnd = function(){
		return this.element.ended;
	};
	this.element.load();
	this.element.loop = false;
	this.element.autoplay = false;
}

function PepoAudio()
{
	this.load = function(){
		var audioNode = $('<audio></audio>');
		audioNode.text('Your Browser do not support Audio');
		for(var i=0;i<arguments.length;i++)
		{
			var src = arguments[i];
			$('<source></source>',{
				'src':src,
			}).appendTo(audioNode);
		}
		audioNode.appendTo('body');
		return new Sound(audioNode);
	};
}

Pepo.plugin('audio', new PepoAudio());

