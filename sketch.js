//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage

var play


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}



function setup() {
  createCanvas(600, 600);
  sword = createSprite(200, 200, 50, 50)
  sword.addImage(swordImage)
  sword.scale = 0.75
  enemyGroup = new Group();
  fruitGroup = new Group();
  score = 0
 
}
function draw() {
  background("cyan");
  
  drawSprites();
  text ("score"+ score, 200, 30)
  sword.x = World.mouseX
  sword.y = World.mouseY
  if (gameState === PLAY){
    Enemy();
    fruits();
    if (fruitGroup.isTouching(sword)){
      score = score +1
      fruitGroup.destroyEach()
    }
    // increase score if sword touching fruit 
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
     
      score=score+2;
    }
    if(enemyGroup.isTouching(sword)){
       gameState=END;
       //gameover sound
      
       }
    if (enemyGroup.isTouching(sword)) {
      gameState = END
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      sword.addImage(gameOverImage)
    }
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
position = Math.round(random(1,2));

if (position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
      }
    else
  {
    if(position==2){
      fruit.x=0;
      
      
      //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+(score/4));
    }
  }
  }
}