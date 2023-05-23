class Game {
  constructor() {
    this.player = null; //
    this.garbageArr = []; // bags, water bottles, coffee cups...
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
    this.updateGame();

    // if (this.gameOver) {
    //   this.endGame();
    //   return;
    // }

    //Generate New garbage
    setInterval(() => {
      const garbageInstance = new Garbage();
      this.garbageArr.push(garbageInstance);
    }, 3000);
    console.log(garbageInstance);

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
    }, 2000);
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
    if (garbageInstance.positionY < 0 - garbageInstance.height) {
      // 1. remove element from the DOM
      garbageInstance.domElement.remove();
      // 2. remove from the garbage array
      this.garbageArr.shift();
    }
  } // end of Game class (includes start method)
}

class Player {
  //robot river garbage collector
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionX = 25 - this.width / 2;
    this.positionY = 25;
    this.domElement = null; // this element stores a reference to the dom element of the player
    this.createDomElement();
  }

  createDomElement() {
    //Step 1: Create the element
    this.domElement = document.createElement("div"); // add image here??

    //Step 2: Add content or modify
    this.domElement.id = "player";
    this.domElement.style.backgroundColor = "rgb(111,40, 166)";
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

// random-shaped and sized garbage
class Garbage {
  constructor() {
    // this.domElement.id = "garbageInstance";
    // this.domElement.style.backgroundColor = "green";
    // this.domElement.style.position = "relative";
    this.width = 10;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.positionY = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    // Step 1: create the element (the garbage bags, plastic bottles...)
    this.domElement = document.createElement("div");

    // Step 2: Add content or modify (ex. innerHTML)
    this.domElement.className = "garbage";
    this.domElement.innerHTML = "garbage1";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.left = this.height + "vh";
    this.domElement.style.width = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    // Step 3: Append to the DOM: parentElm.appendChild()
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

//game instance:
const game = new Game();
game.start();
