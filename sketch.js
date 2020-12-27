var backImg, walkImg, robber;
var guardLeft, guardRight, dogImage;
var treatImg;
var ladderImg;
var background, backGroundImage, ground;
var block1, block2;
var treatCount = 0;
var guardBlocker1, guardBlocker2;
var door
const play = 1;
const end = 2;
const slow = 3;
var gameState = 1;



function preload()
{
	backgroundImage = loadImage("Images/Background.png");

	backImg = loadAnimation("Images/backImg1.png","Images/backImg2.png");
	walkImg = loadAnimation("Images/walkImg1.png","Images/walkImg2.png");

	guardLeft = loadImage("Images/GuardLeft.png");
	guardRight = loadImage("Images/GuardRight.png");

	dogImage = loadImage("Images/GuardDogRight.png");

	treatImg = loadImage("Images/treat.png");

	ladderImg = loadImage("Images/ladder.png");

	doorImage = loadImage("Images/door.png");


}

function setup() {
	createCanvas(displayWidth-20, displayHeight-30);

	robber = createSprite(130, 325);
	robber.addAnimation("walk", walkImg);
	robber.addAnimation("climb", backImg);
	robber.scale = 1.50;
	robber.debug = true;
	
	guard1 = createSprite(900,567);
	guard1.addAnimation("guardLeft", guardLeft);
	guard1.addAnimation("guardRight", guardRight);
	guard1.scale = 0.25;
	guard1.debug = true;
	guard1.setCollider("rectangle", 320, 0, guard1.width +600, guard1.height)
	guard1.velocityX = 3;

	dog1 = createSprite(400,600);
	dog1.addImage("dog1", dogImage);
	dog1.scale = 0.50;
	dog1.debug = true;
	dog1.setCollider("rectangle", 0, 0, dog1.width/2, dog1.height/2)
	
	treat = createSprite(900,300);
	treat.addImage("treat", treatImg);
	treat.scale = 0.15;
	treat.debug = true;
	treat.setCollider("rectangle", 0, 0, treat.width-40, treat.height-40)

	ladder = createSprite(560, 520);
	ladder.addImage("ladder", ladderImg);
	ladder.scale = 0.50;
	ladder.debug = true;
	ladder.setCollider("rectangle", 0, 0, ladder.width/2, ladder.height)


	block1 = createSprite(displayWidth/2, 400, 1900, 10);
	block1.depth = ladder.depth -1

	block2 = createSprite(displayWidth/2, height -20, 1900, 10)
	block2.shapeColor = "red";
	block2.debug = true;

	invisibleLadderUp = createSprite(550, 400, 150, 10)
	invisibleLadderUp.shapeColor = "red";

	door = createSprite(75, 570);
	door.addImage("door", doorImage);
	door.scale = 0.15;
	door.debug = true;
	door.setCollider("rectangle", 0, 0, door.width -500, door.height)

	guardBlocker1 = createSprite(550, height - 50, 10, 100);
	guardBlocker2 = createSprite(displayWidth -50, height -50, 10, 100)
}


function draw() {
  background(backgroundImage);

  if(gameState === play){
	
	if(keyDown(LEFT_ARROW) && robber.isTouching(block1) || keyDown(LEFT_ARROW) && robber.isTouching(block2)){
		if(robber.isTouching(dog1) && treatCount === 0){
			robber.x = robber.x -3;
			robber.changeImage("walk", walkImg);	
		}
		else{
			robber.x = robber.x -5;
			robber.changeImage("walk", walkImg);
		}
	}
	if(keyDown(RIGHT_ARROW) && robber.isTouching(block1) || keyDown(RIGHT_ARROW) && robber.isTouching(block2)){
		if(robber.isTouching(dog1) && treatCount === 0){
			robber.x = robber.x +3;
			robber.changeImage("walk", walkImg);	
		}
		else{
			robber.x = robber.x +5;
			robber.changeImage("walk", walkImg);
		}
	}
	if(keyDown(DOWN_ARROW) && robber.isTouching(ladder)){
		robber.y = robber.y +5
		robber.changeImage("climb", backImg);
		robber.depth = ladder.depth +1
	}
	if(keyDown(UP_ARROW) && robber.isTouching(ladder)){
		robber.y = robber.y -5
		robber.changeImage("climb", backImg);
		robber.depth = ladder.depth +1
	
	}

	if(guard1.isTouching(guardBlocker2)){
		guard1.bounceOff(guardBlocker2)
		guard1.changeImage("guardLeft", guardLeft);
		guard1.setCollider ("rectangle", -320, 0, guard1.width +600, guard1.height )
	}
	if(guard1.isTouching(guardBlocker1)){
		guard1.bounceOff(guardBlocker1)
		guard1.changeImage("guardRight", guardRight);
		guard1.setCollider ("rectangle", 320, 0, guard1.width +600, guard1.height )
	}

	if(robber.isTouching(treat) && treat.visible === true){
		treatCount +=1;
		treat.visible = false;
		
	}
	console.log(treatCount)
	
	robber.collide(block2)

	

	

	//robber.collide(block2)

  }else if(gameState === end){

  }
  

  

  drawSprites();
}



