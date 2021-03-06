var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flappy, flappy_running, flappy_collided;



var obstaclesGroup, obstacle1, obstacle2;
var obstacle1img, obstacle2img;
var score=0;
var bg;

var gameOver, restart;


function preload(){
  flappy_running =   loadImage("download.png");
  flappy_collided = loadAnimation("colided.png");
  
  
  
  obstacle1img = loadImage("obstacle1.png");
  obstacle2img = loadImage("obstacle2.png");

  
  //gameOverImg = loadImage("gameOver.png");
  //restartImg = loadImage("restart.png");
  bg=loadImage("Background.png");
  /*jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); */
}

function setup() {
  createCanvas(600, 200);
  
  flappy = createSprite(50,180,20,50);
  flappy.addImage("running", flappy_running);
 // flappy.addImage("collided", flappy_collided);
  flappy.scale = 0.5;
  
  
  
  
  gameOver = createSprite(300,100);
 // gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
//  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  
 
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(bg);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && flappy.y >= 159) {
      //jumpSound.play();
      flappy.velocityY = -14;
    }
  
    flappy.velocityY = flappy.velocityY + 0.8
  
  
   
  
    spawnObstacles();
    
    if (score>0 && score%100 === 0){
     // checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(flappy)){
     // dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    
    flappy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    //change the flappy animation
    flappy.addImage("collided",flappy_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = flappy.depth;
    flappy.depth = flappy.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}*/

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,0,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage("obstacle",obstacle1img );
    var obstacle2= createSprite(600,200,10,40);
    obstacle2.velocityX = -(6 + 3*score/100);
    obstacle2.addImage("obstacle2",obstacle2img );
    //generate random obstacles
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.05;
    obstacle2.scale = 0.05;
    obstacle.lifetime = 300;
    obstacle2.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(obstacle2);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  flappy.changeAnimation("running",flappy_running);
  
  score = 0;
  
}
