/*
 * Made by Stephcraft
 * website: https://stephcraft.net
 * game available at: https://stephcraft.itch.io/flappy-bird
 */

var c;

var sprite_flappy;
var sprite_pipe;
var sprite_city;
var sprite_floor;
var sprite_title;

var sound_point;
var sound_wing;
var sound_hit;
var sound_die;
var sound_sweetwing;

var font_flappy;

//EVENTS
var mousePress = false;
var mousePressEvent = false;
var mouseReleaseEvent = false;
var keyPress = false;
var keyPressEvent = false;
var keyReleaseEvent = false;

var pipes = [];

var score = 0;
var hightscore = 0;
var speed = 3;
var gap = 80;

var gameover = false;
var page = "MENU";

var overflowX = 0;

var startgame = false;

var flappy_bird = {
  
  x : 100,
  y : 0,
  
  target : 0,
  
  velocityY : 0,
  
  fly : false,
  
  angle : 0,
  
  falls : false,
  flashAnim : 0,
  flashReturn : false,
  kinematicAnim : 0,
  
  display : function() {
    
    if((!mousePress) || this.falls) {
      push();
        translate(this.x,this.y);
        rotate(radians(this.angle));
        image(sprite_flappy,0,0, sprite_flappy.width*1.5,sprite_flappy.height*3, 0,0 ,sprite_flappy.width/2,sprite_flappy.height*3);
      pop();
    }
    else {
      push();
        translate(this.x,this.y);
        rotate(radians(this.angle));
        image(sprite_flappy,0,0, sprite_flappy.width*1.5,sprite_flappy.height*3, sprite_flappy.width/2,0 ,sprite_flappy.width/2,sprite_flappy.height*3);
      pop();
    }
  },
  
  update : function() {
    if(this.falls) {
      if(this.flashAnim>255) {
        this.flashReturn = true;
      }
      
      if(this.flashReturn) {
        this.flashAnim -=60;
      }
      else {
        this.flashAnim +=60;
      }
      
      if(this.flashReturn && this.flashAnim === 0) {
        gameover = true;
        menu_gameover.easein();
        try { sound_die.play(); } catch(e) {}
        
        if(score > hightscore) { hightscore = score; }
      }
      
      this.y += this.velocityY;
      this.velocityY += 0.4;
      this.angle += 4;
      
      if(speed > 0) {
        speed = 0;
      }
      
      if(this.angle > 90) {
        this.angle = 90;
      }
    }
    else {
      this.y += this.velocityY;
      this.angle += 2.5;
    
      if(this.angle > 90) {
        this.angle = 90;
      }
    
      if(mousePressEvent || (keyPressEvent && key == ' ') ) {
        try { sound_wing.play(); } catch(e) {}
        
        this.velocityY = 0;
        this.fly = true;
        this.target = clamp(this.y - 60,-19,height);
        this.angle = -45;
      }
    
    
      if(this.y < this.target) {
        this.fly = false;
        this.target = 10000;
      }
    
    
      if(!this.fly) {
        this.velocityY+=0.4;
      }
      else {
        this.y -= 5;
      }
      
      if(this.y > height-49) {
        if(!flappy_bird.falls) { try { sound_hit.play(); } catch(e) {} }
        this.falls = true;
      }
    }
    this.y = clamp(this.y,-20,height-50);
  },
  
  kinematicMove : function() {
    if(gameover) {
      this.x = width/2;
      this.y = height/2;
      
      gameover = false;
      score = 0;
      gap = 90;
    }
    

    this.y = height/2 + map( sin(frameCount*0.1),0,1,-2,2 );
	/*
    if(this.kinematicAnim > 40) {
      this.kinematicAnim = 0;
    }
    
    this.kinematicAnim++;
    
    if(this.kinematicAnim>20) {
      this.y += 0.2;
    }
    else {
      this.y -= 0.2;
    }*/

    
    push();
      translate(this.x,this.y);
      image(sprite_flappy,0,0, sprite_flappy.width*1.5,sprite_flappy.height*3, 0,0 ,sprite_flappy.width/2,sprite_flappy.height*3);
    pop();
  }
}

//var font = new Font();

//var audio = new Audio('data/Assets/sound/sfx_point.wav');

function setup() {
  if(mobile()) {
    c = createCanvas(windowWidth,windowHeight);
  }
  else {
    c = createCanvas(400,600);
  }
  
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER,CENTER);
  
  //disableScroll();
  
  noSmooth();
  
  pipes[0] = new Pipe();
  
  
  
  //load
  sprite_flappy = loadImage('flappybird.png');
  sprite_pipe = loadImage('pipe.png');
  sprite_city = loadImage('city.png');
  sprite_floor = loadImage('floor.png');
  sprite_title = loadImage('title.png');
  
  
  sound_point = loadSound('sfx_point.wav');
  sound_hit = loadSound('sfx_hit.wav');
  sound_die = loadSound('sfx_die.wav');
  //sound_wing = loadSound('http://flappybird.netlify.com/data/Assets/sound/sfx_wing.wav');
  sound_wing = loadSound('sfx_wing.wav');
  sound_sweetwing = loadSound('sfx_swooshing.wav');
  
  
  font_flappy = loadFont('flappy-font.ttf');
  
  
  //font_flappy = loadFont('https://flappybird.netlify.com/data/Assets/flappy-font.ttf');
  
  //var s=httpGet('data/Assets/flappy-font.ttf','.ttf','',ss);
  
  //textFont(font_flappy);
  
  //document.getElementById('h').innerHTML = window.location.href;
  
  flappy_bird.y = height/2;
  
  try { textFont(font_flappy); } catch(e) {}
}

function ss(data) {
  console.log(data);
}

function draw() {
  background(123,196,208);
  
  switch(page) {
    case 'GAME':
      page_game();
      break;
    case 'MENU':
      page_menu();
      break;
  }
  
  //FRAMERATE
  //fill(0);
  //text(int(frameRate()),20,35);
  
  //EVENT
  mousePressEvent = false;
  mouseReleaseEvent = false;
  keyPressEvent = false;
  keyReleaseEvent = false;
}

//EVENT
function mousePressed() {
  mousePress = true;
  mousePressEvent = true;
}
function mouseReleased() {
  mousePress = false;
  mouseReleaseEvent = true;
}
function keyPressed() {
  keyPress = true;
  keyPressEvent = true;
}
function keyReleased() {
  keyPress = false;
  keyReleaseEvent = true;
}

//PAGES
function page_game() {
  
  overflowX += speed;
  if(overflowX > sprite_city.width/2) {
    overflowX = 0;
  }
  
  //City
  image(sprite_city, sprite_city.width/2/2 ,height-sprite_city.height/2/2-40,sprite_city.width/2,sprite_city.height/2);
  //image(sprite_city, sprite_city.width/2/2+sprite_city.width/2-overflowX*0.01 ,height-sprite_city.height/2/2-40,sprite_city.width/2,sprite_city.height/2);

  
  //creator
  if(!flappy_bird.falls) {
    if(parseInt(frameCount)%70 === 0) {
      pipes.push(new Pipe());
    }
  }
  
  for(var i=0; i<pipes.length; i++) {
    if(pipes[i].x < -50) {
      pipes.splice(i,1);
    }
    
    try {
      pipes[i].display();
      pipes[i].update();
    } catch(e) {}
  }
  
  //Floor
  image(sprite_floor,sprite_floor.width-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  image(sprite_floor,sprite_floor.width+sprite_floor.width-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  image(sprite_floor,sprite_floor.width+sprite_floor.width*2-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  
  
  flappy_bird.display();
  flappy_bird.update();
  flappy_bird.x = smoothMove(flappy_bird.x,90,0.02);
  
  //Score
  if(!gameover) {
    push();
      stroke(0);
      strokeWeight(5);
      fill(255);
      textSize(30);
      text(score,width/2,50);
    pop();
  }
  
  push();
    noStroke();
    fill(255,flappy_bird.flashAnim);
    rect(width/2,height/2,width,height);
  pop();
  
  if(gameover) {
    menu_gameover.display();
    menu_gameover.update();
  }
}

function page_menu() {
  speed = 1;
  overflowX += speed;
  if(overflowX > sprite_city.width/2) {
    overflowX = 0;
  }
  
  //City
  image(sprite_city, sprite_city.width/2/2 ,height-sprite_city.height/2/2-40,sprite_city.width/2,sprite_city.height/2);
  
  //Floor
  image(sprite_floor,sprite_floor.width-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  image(sprite_floor,sprite_floor.width+sprite_floor.width-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  image(sprite_floor,sprite_floor.width+sprite_floor.width*2-overflowX,height-sprite_floor.height ,sprite_floor.width*2,sprite_floor.height*2);
  
  image(sprite_title,width/2,100,sprite_title.width/4,sprite_title.height/4);
  
  flappy_bird.kinematicMove();
  
  push();
    fill(230,97,29);
    stroke(255);
    strokeWeight(3);
    text('Tap to play',width/2,height/2-50);
  pop();

  if(mousePressEvent || (keyPressEvent && key == ' ') ) {
  	page = "GAME";
    resetGame();
  	
  	flappy_bird.velocityY = 0;
    flappy_bird.fly = true;
    flappy_bird.target = clamp(this.y - 60,-19,height);
    flappy_bird.angle = -45;
    flappy_bird.update();
  }
  flappy_bird.x = width/2;
	
}

function Pipe() {
  
  this.gapSize = gap;
  this.y = random(150,height-150);
  this.x = width + 50;
  this.potential = true;
  
  this.display = function() {
    push();
      translate(this.x,this.y+this.gapSize+sprite_pipe.height/2/2);
      image(sprite_pipe, 0,0 ,sprite_pipe.width/2,sprite_pipe.height/2);
    pop();
    
    push();
      translate(this.x,this.y-this.gapSize-sprite_pipe.height/2/2);
      rotate(radians(180));
      scale(-1,1);
      image(sprite_pipe,0,0,sprite_pipe.width/2,sprite_pipe.height/2);
    pop();
    
    //Score
    if(this.potential && (flappy_bird.x > this.x-25 && flappy_bird.x < this.x+25)) {
      score++;
      try { sound_point.play(); } catch(e) {}
      
      if(gap > 60) { gap--; }
      //if(speed < 20) { speed+=0.1; }
      
      this.potential = false;
    }
    
    //Pipes collisions
    if( ( 
        (flappy_bird.x+20 > this.x-25 && flappy_bird.x-20 < this.x+25) && 
        (flappy_bird.y+20 > (this.y-this.gapSize-sprite_pipe.height/2/2)-200 && flappy_bird.y-20 < (this.y-this.gapSize-sprite_pipe.height/2/2)+200)
        )
        
        ||
        
        ( 
        (flappy_bird.x+20 > this.x-25 && flappy_bird.x-20 < this.x+25) && 
        (flappy_bird.y+20 > (this.y+this.gapSize+sprite_pipe.height/2/2)-200 && flappy_bird.y-20 < (this.y+this.gapSize+sprite_pipe.height/2/2)+200)
        )
        
        ) {
      
      if(!flappy_bird.falls) { try { sound_hit.play(); } catch(e) {} }
      flappy_bird.falls = true;
    }
  }
  this.update = function() {
    this.x-= speed;
  }
}

//utility
function clamp(value,min,max) {
  
  if(value < min) {
    value = min;
  }
  if(value > max) {
    value = max;
  }
  
  return value;
}

function resetGame() {
  gameover = false;
  gap = 80;
  speed = 3;
  score = 0;
  flappy_bird.y = height/2
  flappy_bird.falls = false;
  flappy_bird.velocityY = 0;
  flappy_bird.angle = 0;
  flappy_bird.flashAnim = 0;
  flappy_bird.flashReturn = false;
  pipes = [];
  flappy_bird.target = 10000;
  menu_gameover.ease = 0;
}

//Menu Gameover
var menu_gameover = {
  
  ease : 0,
  easing : false,
  open : false,
  
  display : function() {
    
    push();
      translate(width/2,height/2);
      scale(this.ease);
      
      stroke(83,56,71);
      strokeWeight(2);
      fill(222,215,152);
      rect(0,0,200,200);
      
      noStroke();
      fill(83,56,71);
      text('by F',0,-50);
      
      //Title
      textSize(20);
      strokeWeight(5);
      stroke(83,56,71);
      fill(255);
      text('Flappy Bird',0,-80);
      
      //Info
      push();
        textAlign(LEFT,CENTER);
        textSize(12);
        noStroke();
        fill(83,56,71);
        text('score : ',-80,0);
        text('hightscore : ',-80,30);
        
        stroke(0);
        strokeWeight(3);
        fill(255);
        text(score,20,0);
        text(hightscore,20,30);
      pop();
      
      if(press('restart',0,140,width/2,height/2)) { 
        resetGame();
      }
      
      if(press(' menu ',0,190,width/2,height/2)) { page = 'MENU'; }
    pop();
  },
  
  update : function() {
    if(this.easing) {
      this.ease += 0.1;
      if(this.ease > 1) {
        this.open = true;
        this.ease = 1;
        this.easing = false;
      }
    }
  },
  
  easein : function() {
    this.easing = true;
  }
}

function press(txt,x,y,tX,tY) {
  var this_h = false;
  
  if(mouseX > tX+x-textWidth(txt)/2-10 && mouseX < tX+x+textWidth(txt)/2+10 && mouseY > tY+y-textAscent()/2-10 && mouseY < tY+y+textAscent()/2+10) {
    this_h = true;
  }
  
  push();
    textSize(16);
    
    if(this_h && mousePress) {
      noStroke();
      fill(83,56,71);
      rect(x,y+3,textWidth(txt)+25+10,textAscent()+10+10);
      
      fill(250,117,49);
      stroke(255);
      strokeWeight(3);
      rect(x,y+2,textWidth(txt)+25,textAscent()+10);
    
      noStroke();
      fill(255);
      text(txt,x,y+2);
    }
    else {
    noStroke();
    fill(83,56,71);
    rect(x,y+2,textWidth(txt)+25+10,textAscent()+10+12);
    
    if(this_h) {
      fill(250,117,49);
    }
    else {
      fill(230,97,29);
    }
    stroke(255);
    strokeWeight(3);
    rect(x,y,textWidth(txt)+25,textAscent()+10);
    
    noStroke();
    fill(255);
    text(txt,x,y);
    }
  pop();
  
  if(this_h && mouseReleaseEvent) { try { sound_sweetwing.play(); } catch(e) {} }
  
  return (this_h && mouseReleaseEvent);
}

function smoothMove(pos,target,speed) {
	return pos + (target-pos) * speed;
}

// js utility

/*
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}*/

function mobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}


