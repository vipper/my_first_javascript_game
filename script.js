var context;
var level = 1;
var sprites = {};
var speed = 5;
var start = 0;
var hero = {
	x:0,
	y: 220,
	w: 40,
	h: 50,
	image: "hero.png",
	updateImage: function() {
		if(this.isMoving) {
			this.imagePosition = this.imageRunning;	
		} else {
			this.imagePosition = this.imageStop;
		}
		
	},
	imageStop: {
		height: 204,
		width: 204,
		x: 0,
		y: 0
	},
	imageRunning: {
		height: 204,
		width: 204,
		x: 408,
		y: 0
	},
	isMoving: false
}

var enemies = [
	{
		x: 120,
		y: 0,
		speed: 3,
		w: 48,
		h: 32,
		imagePosition: {
			x: 0,
			y:0,
			positionChange:96
		},
	},
	{
		x: 250,
		y: 50,
		speed: 5,
		imagePosition: {
			x: 0,
			y:64,
			positionChange:96
		},
		w: 48,
		h: 32
	},
	{
		x: 360,
		y: 200,
		speed: 4,
		imagePosition: {
			x: 0,
			y:128,
			positionChange:96
		},
		w: 48,
		h: 32
	},
	{
		x: 480,
		y: 80,
		speed: 8,
		imagePosition: {
			x: 0,
			y:192,
			positionChange:96
		},
		w: 48,
		h: 32
	}

];

var goal = {
	x: 620,
	y: 240,
	w: 16,
	h: 16
}

window.onload = function() {
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	loadImages();
	step();
};

window.addEventListener("mousedown", function(event) {
	
	hero.isMoving = true;

});

window.addEventListener("mouseup", function(event) {
	
	hero.isMoving = false;

});

var checkCollision = function(rect1, rect2) {

    var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
}

function loadImages() {
	sprites.hero = new Image();
	sprites.hero.src = hero.image;

	sprites.bg = new Image();
	sprites.bg.src = "bg.jpg"

	sprites.enemy = new Image();
	sprites.enemy.src = "Dragoncrnagomi.png";

	sprites.chest = new Image();
	sprites.chest.src = "chest.png";
}

function update () {
	hero.updateImage();
	if(hero.isMoving)
		hero.x += 10;

	enemies.forEach(function(element, index, length) {
		if(checkCollision(hero, element)) {
			hero.isMoving = false;
			alert("You lose!")
			hero.x = 0;
			level = 1;
		}
		element.y += element.speed;
		if(element.y > 480) {
			element.y = 480;
			element.speed *= -1;
		}

		if(element.y < 0) {
			element.y = 0;
			element.speed *= -1;
		}
		if(element.y % 20 == 0) {

			if(element.imagePosition.x >= 192) {
				element.imagePosition.x = 192;
				element.imagePosition.positionChange *= -1;
			}

			if(element.imagePosition.x <= 0) {
				element.imagePosition.x = 0;
				element.imagePosition.positionChange *= -1;
			}
			element.imagePosition.x += element.imagePosition.positionChange;
		}
	});
	if(checkCollision(hero, goal)) {
		hero.isMoving = false;
		
		hero.x = 0;
		level ++;

		enemies.forEach(function(element, index, length) {
			element.speed += element.speed / Math.abs(element.speed);
		});

	}
}

function draw (rgb) {
	context.clearRect(0, 0, 640, 480);
	context.drawImage(sprites.bg, 0, 0, 680, 382, 0, 0, 640, 480);
	context.drawImage(sprites.chest, 0, 0, 64, 64, goal.x, goal.y, 16, 16);
	context.drawImage(sprites.hero, hero.imagePosition.x, hero.imagePosition.y, hero.imagePosition.width, hero.imagePosition.height, hero.x, hero.y, 50, 60)

	enemies.forEach(function(element, index, length) {
		context.drawImage(sprites.enemy, element.imagePosition.x, element.imagePosition.y, 96, 64, element.x, element.y, 48, 32)
	});
	context.font = "30px Arial";
	context.fillText("Level "+ level, 10, 40);
	
	
	
	
}

function step () {
	update();
	draw(200);
	window.requestAnimationFrame(step);
}