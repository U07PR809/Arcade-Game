const lifeDiv = document.querySelector("#life"),
	scoreDiv = document.querySelector("#score");

// Enemies our player must avoid

const Enemy = function(x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	this.x = x;
	this.y = y;

	this.speed = setSpeed();

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images

	this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	this.x += this.speed * dt;

	// On off canvas, reset enemy position to move across again

	if (this.x > xMax + 101) {
		this.x = xMin - 101;
		this.speed = setSpeed();
	}
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(sprite) {
	// Variables applied to each of our instances go here,

	this.x = 2 * 101;
	this.y = -83 / 2 + 5 * 83;

	this.dx = 101;
	this.dy = 83;

	this.score = 0;
	this.life = 3;

	// The image/sprite for our player, this uses
	// a helper we've provided to easily load images

	this.sprite = sprite;
};

// Update the player's position, required method for game

Player.prototype.update = function() {
	lifeDiv.innerHTML = `You have ( ${this.life} ) Lives`;
	scoreDiv.innerHTML = `Your Score is ( ${this.score} ) Points`;
};

Player.prototype.setPosition = function(rowIndex, colIndex) {
	this.x = colIndex * 101;
	this.y = -83 / 2 + rowIndex * 83;
};

// Draw the player on the screen, required method for game

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
	switch (keyInput) {
		case "left":
			if (this.x > xMin) this.x -= this.dx;
			break;
		case "right":
			if (this.x < xMax) this.x += this.dx;
			break;
		case "up":
			if (this.y > 0) this.y -= this.dy;
			break;
		case "down":
			if (this.y < yMax) this.y += this.dy;
			break;
	}
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
	const allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down"
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// GEM CLASS

const Gem = function(color) {
	this.x;
	this.y;
	this.color = color;
};

// Add points to player's score

Gem.prototype.addPoint = function() {
	switch (this.color) {
		case "Blue":
			player.score += 5;
			break;
		case "Green":
			player.score += 10;
			break;
		case "Orange":
			player.score += 15;
	}
};

// Set Gems position

Gem.prototype.setPosition = function(rowIndex, colIndex) {
	this.x = colIndex * 101;
	this.y = rowIndex * 83;
};

// Draw the collectible gems on the screen

Gem.prototype.render = function() {
	let gem = `images/Gem ${this.color}.png`;

	const width = 0.8 * Resources.get(gem).width;
	const height = 0.8 * Resources.get(gem).height;

	ctx.drawImage(Resources.get(gem), this.x, this.y, width, height);
};

// Heart Class

const Heart = function() {
	this.name = "Heart";
	this.x;
	this.y;
};

// Adds life to players life if less than 4

Heart.prototype.addLife = function() {
	if (player.life < 3) player.life++;
};

// Set Hearts location method

Heart.prototype.setPosition = function(rowIndex, colIndex) {
	this.x = colIndex * 101;
	this.y = rowIndex * 83;
};

// Draws collectible Heart on the canvas

Heart.prototype.render = function() {
	const heart = `images/${this.name}.png`;
	const width = 0.9 * Resources.get(heart).width;
	const height = 0.9 * Resources.get(heart).height;
	ctx.drawImage(Resources.get(heart), this.x, this.y, width, height);
};

function getAnIndex(lowerIndex, upperIndex) {
	const anIndex =
		Math.floor(Math.random() * (upperIndex - lowerIndex + 1)) + lowerIndex;
	return anIndex;
}

function setSpeed() {
	//console.log( 'score', player.score );
	const baseSpeed = 50,
		dSpeed = 20,
		aSpeed = baseSpeed + Math.ceil(Math.random() * 10) * dSpeed;

	return aSpeed;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const sprite = "images/char-boy.png";
const player = new Player(sprite);

const numEnemies = 3;

const xMin = 0,
	xMax = 4 * 101, // xMax = canvasWidth = ctx.canvas.width = 505;
	yMin = -83 / 2, // yMin = canvasHeight = ctx.canvas.height = 606;
	yMax = -83 / 2 + 5 * 83;

let allEnemies = [];

for (let count = 1; count <= 3; count++) {
	xInit = -101;
	yInit = count * 83 - 20; // yOffset = 20

	allEnemies.push(new Enemy(xInit, yInit));
}

// ITEMS
// All item objects will be stored in items array.

const gemsColor = ["Blue", "Green", "Orange"];

const items = [
	new Gem("Blue"),
	new Gem("Green"),
	new Gem("Orange"),
	new Heart("Heart")
];

items.forEach(item => {
	const rowIndex = getAnIndex(1, 3),
		colIndex = getAnIndex(0, 4);
	item.setPosition(rowIndex, colIndex);
});
