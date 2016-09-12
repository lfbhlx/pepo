# Pepo
A framework For HTML5 Canvas Game.
##What can Pepo do?
  Pepo is a frameword for web game,which can privide a series of tool to let you build your game quickly.And it can adapte all kind of screen size.<br>
  Above all , you can build your own plug for pepo like jQuery.<br>
  This version contains : Kernel module , Audio module , Graphics module , Input module , and a small Tool module . <br>
  Welcome to build your modules and our modules.<br>
##APIs
  ###pepo.js : kernel of pepo
    pepo.require(src)  :  include the pepo module;<br>
    pepo.ready(callback)  :  callback will be run when DOM loaded;<br>
    pepo.setScreen(screen)  :  set the current Screen which will be show;<br>
    pepo.start()  :  start game;<br>
    <br>
    Pepo.plugin(name,plug)  :  to insert plug for pepo;<br>
    Pepo.extend(that,cls)  :  to implement inherit for class;<br>
  ###pepo.audio.js : to play music
    .load(src...)  :  to load music from src and gain the Sound object;<br>
    sound.play(vol)  :  play the music once with volume;<br>
    sound.pause()  :  pause the music;<br>
    sound.stop()  :  stop the music<br>
    sound.setLoop()  :  set loop or not for this music;<br>
    sound.isEnd()  :  get a boolean of whether the music is end;<br>
  ###pepo.graphics.js : to show the view
    .model(width,height)  :  to build the game model's width and height , let pepo adapte the screen;<br>
    .init(canvas,[width],[height])  :  set canvas for pepo , and you can also give it width,height;<br>
    .clear(color)  :  clear the canvas use a color;<br>
    .drawPoint(x,y,color)  :  draw a point on canvas;<br>
    .drawLine(x1,y1,x2,y2,color)  :  draw a line on canvas;<br>
    .drawRect(x,y,width,height,color)  :  draw a rectangle on canvas;<br>
    .drawCircle(x,y,rad,color)  :  draw a Circle on canvas;<br>
    .drawImage(img,x,y,width,height,sx,sy,swidth,sheight)  :  draw an image on canvas;<br>
  ###pepo.input.js : handle user's input
    .openAccel([err])  :  open device's accelerometer or run err if it doesn't have;<br>
    .closeAccel()  :  close accelerometer;<br>
    .isKeyDown(keyCode)  :  charge whethe a key is Down;<br>
    .getKeyEvents()  :  get a serier of keyevent order by time;<br>
    .getClickEvents()  :  get a serier of clickevent order by time;<br>
  ###pepo.tool.js : some tools for game
    .pointDistance(x1,y,x2,y2)  :  get the distance between two point;<br>
    .isInBound(x,y,sx,sy,swidth,sheight)  :  charge whether a point is in a rectangle;<br>
    .impactTest(obj0,obj1)  :  do impact test with impact object;<br>
##How to use it?
  First you cound include jQuery in your page , because Pepo is base on jQuery;<br>
  Then include pepo.js  and your custom file;<br>
  include modules you needed and your screen file , use require function;<br>
  run graphics.model function to set model world size;<br>
  run graphics.init function to set canvas for graphics;<br>
  run pepo.setScreen function to set init screen;<br>
  run pepo.start function to run game;<br>
  An Example : <br>
  ```javascript
pepo.require('../js/pepo/pepo.audio.js');
pepo.require('../js/pepo/pepo.graphics.js');
pepo.require('../js/pepo/pepo.input.js');
pepo.require('../js/pepo/pepo.tool.js');
pepo.require('../js/moveball/component.js');
pepo.require('../js/moveball/MoveballScreen.js');
pepo.require('../js/moveball/WelcomeScreen.js');
pepo.require('../js/moveball/HelpScreen.js');

pepo.ready(function(){
	pepo.graphics.model(480,320);
	pepo.graphics.init($('#gamebox').get(0));
	
	pepo.setScreen(new WelcomeScreen());
	pepo.start();
});
  ```
##Example
this href is an example game used pepo : (example game)[http://120.27.121.189:7777/wx/moveball.html] <br>
source code link : (source code)[https://pan.baidu.com/s/1qYtQp7u] <br>
