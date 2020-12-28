
var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var back, backgroundImage; 
var score; 

var survivalTime= 0

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
              
  backgroundImage= loadImage("jungle.jpg"); 
 
}



function setup() {
  
  createCanvas(displayWidth-20, displayHeight-30);
  
  score=0; 
  
  back= createSprite(0,0, 800, 400); 
  back.addImage(backgroundImage);  
  back.scale= 1.5; 
  back.velocityX= -4; 
  
  monkey= createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale= 0.15; 
  
  ground= createSprite(400, 350, 900, 10);
  ground.velocityX= -4;
  
  ground.x= ground.width/2;
  console.log(ground.x); 
  
  foodGroup= new Group();
  obstacleGroup= new Group();
}


function draw() {
  
  background("white");
  ground.visible= false; 
  
  if(back.x<0){
      back.x= back.width/2; 

  }
  
  if(ground.x<0){
      ground.x= ground.width/2; 

  }
  
  
  if(foodGroup.isTouching(monkey)){
    
    foodGroup.destroyEach();
    score= score+2; 
  
  }
  
  switch(score){
      
    case 10: monkey.scale= 0.12; 
    break;
    
    case 20: monkey.scale= 0.14; 
    break;
    
    case 30: monkey.scale= 0.16; 
    break;
    
    case 40: monkey.scale= 0.18; 
     break;
         default: break;

      
  }
  
  if(keyDown("space")){
    monkey.velocityY= -12; 
  }
  
  
  monkey.velocityY= monkey.velocityY + 0.8; 
  
  
  if(obstacleGroup.isTouching(monkey)){
  
    ground.velocityX= 0;
    ground.velocityY= 0;
    back.velocityX=0; 
    back.velocityY=0; 
    monkey.velocityY= 0; 
    monkey.velocityX= 0; 
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    foodGroup.destroyEach(); 
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    score=0; 
    
    monkey.scale= 0.15; 
  }
  
  
  
  
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  

  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score:"+ score, 500, 50); 
  
}


function spawnFood(){
  
  if(frameCount%80===0){
    banana= createSprite(400, 250, 40, 10);
    banana.y= random(120, 200);
    banana.velocityX= -5; 
    banana.lifetime= 300;
    banana.addImage(bananaImage);
    banana.scale= 0.1; 
    monkey.depth= banana.depth+1;
    
    foodGroup.add(banana);

    camera.position.x= displayWidth/2; 
    camera.position.y= displayHeight/2; 
  }
  
}


function spawnObstacles(){
  
  if(frameCount%80===0){
    
    obstacle= createSprite(400, 320, 10, 40);
    obstacle.velocityX= -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale= 0.1; 
    obstacle.lifetime= 300; 
    
    obstacleGroup.add(obstacle);

    camera.position.x= displayWidth/2; 
    camera.position.y= displayHeight/2; 
    
  }
  
}



