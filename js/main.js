class Game {
  constructor() {
    this.player = null; //
    this.garbageArr = []; // bags, water bottles, coffee cups, plastic garbage...
    this.score = 0;
    this.gameOver = false;
    this.scoreDisplay = document.getElementById("score");
    this.gameOverDisplay = document.getElementById("gameOver");
  }

  start() {
    this.player = new Player();
    this.addEventListeners();
    this.gameOver = false;
    this.score = 0;
    this.garbageArr = [];
    this.scoreDisplay.textContent = "Score:  " + this.score;
    this.gameOverDisplay.style.display = "none";
    // this.updateGame();

    // if (this.gameOver) {
    //   this.endGame();
    //   return;
    // }

    //Generate New garbage
    setInterval(() => {
      const garbageInstance = new Garbage();
      this.garbageArr.push(garbageInstance);
      console.log(garbageInstance);
    }, 4000);

    // Garbage captured:  collision
    setInterval(() => {
      this.garbageArr.forEach((garbageInstance) => {
        // Move current obstacle
        garbageInstance.moveDown();

        // detect collision
        this.detectCollision(garbageInstance);
        // detect if obstacle needs to be removed, once "collected"
        this.removeGarbageIfOutside(garbageInstance);
      });
    }, 1000);
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      console.log("event", event);
      if (event.code === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.code === "ArrowRight") {
        this.player.moveRight();
      } else if (event.code === "ArrowUp") {
        this.player.moveUp();
      } else {
        this.player.moveDown();
      }
    });
  }

  detectCollision(garbageInstance) {
    if (
      garbageInstance.positionX < this.player.positionX + this.player.width &&
      garbageInstance.positionX + garbageInstance.width >
        this.player.positionX &&
      garbageInstance.positionY < this.player.positionY + this.player.height &&
      garbageInstance.height + garbageInstance.positionY > this.player.positionY
    ) {
      console.log(`captured garbage!`);
    }
  }

  removeGarbageIfOutside(garbageInstance) {
    if (garbageInstance.positionY > 90) {
      // 1. remove element from the DOM
      garbageInstance.domElement.remove();
      // 2. remove from the garbage array
      this.garbageArr.shift();
    }
  } // end of Game class (includes start method)
}

class Player {
  //robot ocean garbage collector
  constructor() {
    this.width = 15;
    this.height = 15;
    this.positionX = 25 - this.width / 2;
    this.positionY = 25;
    this.domElement = null; // this element stores a reference to the dom element of the player
    this.createDomElement();
  }

  createDomElement() {
    //Step 1: Create the element
    this.domElement = document.createElement("img"); // add image here??

    //Step 2: Add content or modify
    this.domElement.id = "player";
    this.domElement.src = "images/Robot for Game Small.jpeg";
    // this.domElement.style.this.domElement.style.backgroundColor = "rgb(111,40, 166)";
    this.domElement.style.position = "absolute";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //Step 3: Append to DOM
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }

  moveUp() {
    this.positionY++;
    this.domElement.style.bottom = this.positionY + "vh";
  }

  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveLeft() {
    this.positionX--;
    this.domElement.style.left = this.positionX + "vw";
  }
}

const GarbageType = [
  {
    name: "plastic bags",
    imageSrc: "images/plasticBags.jpg",
  },
  {
    name: "plastic bottles",
    imageSrc: "images/plasticBottles.jpg",
  },
  {
    name: "coffee cups",
    imageSrc: "images/coffeeCups.jpg",
  },
  {
    name: "plastic bags",
    imageSrc: "images/plasticBags.jpg",
  },
  {
    name: "plastic garbage",
    imageSrc: "images/Plastic bin garbage.png",
  },
  {
    name: "plastic bottles",
    imageSrc: "images/plasticBottles.jpg",
  },
  {
    name: "rubber duck",
    imageSrc: "images/rubberDuck.jpg",
  },
];

class Garbage {
  constructor() {
    // this.domElement.id = "garbage";
    // this.domElement.style.backgroundColor = "green";
    // this.domElement.style.position = "relative";
    this.garbageInfo =
      GarbageType[Math.floor(Math.random() * GarbageType.length)];
    this.width = 10;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.positionY = 0; //Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    // Step 1: create the element (the garbage bags, plastic bottles...)
    this.domElement = document.createElement("div");

    // Step 2: Add content or modify (ex. innerHTML)
    this.domElement.className = "garbage";
    // this.domElement.innerHTML = this.garbageType;
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.top = this.positionY + "vh";

    const imgElement = document.createElement("img");
    imgElement.src = this.garbageInfo.imageSrc;
    // imgElement.alt = this.garbageInfo.name;
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";

    // Step 3: Append to the DOM: parentElm.appendChild()
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
    this.domElement.appendChild(imgElement);
  }
  moveDown() {
    this.positionY += 5;
    this.domElement.style.top = this.positionY + "vh";
    console.log("moveDown", this.positionY);
  }
}

//game instance:
const game = new Game();
game.start();
