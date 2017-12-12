var bird;
var pipes = [];
var score = 0
var words = ["fire","lit","gucci gang","fam","blow","ma dude"]
var index = 0

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}


function draw() {
  background(255,255,255,25);
	textSize(105);
	text(score,180,100);
//draws all obstacles
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
		new Audio('http://www.bensound.com/royalty-free-music?download=dubstep').play()

    if (pipes[i].hits(bird)) {
      console.log("HIT");
			textSize(100)
			fill(0)
			text("loser",random(1,300),random(1,500))
			score=0
			
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  //shows bird
  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
	
}
//controls, Changed to left click on mouse

	
function mouseClicked() {
  if (mouseButton == LEFT) {
	
		
	bird.up()
		score = score+1
		fill(0)
		textSize(50)
		text(words[index], random(1,300), random(1,400));
		index = index + 1
 
 if (index == 6) {
    index = 0;
 }
    //console.log("SPACE");
		}
  }
	
function Bird() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

	
  this.show = function() {
    fill(random(255),random(255),random(255));
    ellipse(this.x, this.y, 32, 32);
		fill(random(255),random(255),random(255))
		 ellipse(this.x+8, this.y-9, 7, 7);
		fill(0)
		ellipse(this.x+9, this.y-9, 3, 3);
		fill(0,200,0)
		ellipse(this.x-4,this.y-4,10,10);
		
		line(this.x+15,this.y,this.x+20,this.y);
		 
		
	
		}
		
	
		 

  

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Pipe() {
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(random(1,255),random(1,255), random(1,255));
    if (this.highlight) {
			background(255,0,0)
      fill(255, 0, 0);
			this.speed = 0;
			bird.lift = 0;
			
			
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}





