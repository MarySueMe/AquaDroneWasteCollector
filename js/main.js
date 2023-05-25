class Game {
  constructor() {
    this.player = null; //
    this.garbageArr = []; // bags, water bottles, coffee cups, plastic garbage...
    this.score = 0;
    this.addEventListeners();
    this.gameOver = false;
    this.scoreDisplay = document.getElementById("score");
    this.gameOverDisplay = document.getElementById("gameOver");
  }

  start() {
    this.player = new Player();

    this.score = 0;
    this.garbageArr = [];
    this.scoreDisplay.innerText = "Your Score:  " + this.score;
    this.gameOverDisplay.style.display = "none";
    this.gameOver = false;
  }

  //Implement a game loop to drop "obstacles" (garbage)
  gameLoop() {
    //Creation of New garbage
    setInterval(() => {
      const garbageInstance = new Garbage(); // new Instance of "Obstacle"
      this.garbageArr.push(garbageInstance);
      console.log(garbageInstance);
    }, 4000);

    // Garbage captured in collision: we want this!
    setInterval(() => {
      this.garbageArr.forEach((garbageInstance) => {
        // Move current obstacle
        garbageInstance.moveDown();

        // detect if obstacle needs to be removed, once "collected"
        this.removeGarbageIfOutside(garbageInstance);
      });
    }, 1000);

    // GameOver Timer
    const timeLeft = 30;
    const elem = document.getElementById("gameOver");
    const timerId = setInterval(countdown, 30000);
    function countdown() {
      if (timeLeft == -1 || this.score === 50) {
        clearTimeout(timerId);
        environmentalMessage.innerText =
          "Keep our waterways clean. Protect our oceans!";
      } else {
        elem.innerHTML = timeLeft + " seconds remaining";
        timeLeft--;
      }
    }
  }

  addEventListeners() {
    const startButton = document.getElementById("startButton");
    console.log("start!!!", startButton);
    startButton.addEventListener("click", (event) => {
      console.log(event, "Event");
      this.gameLoop();
      startButton.setAttribute("hidden", true);
    });

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
    const playerRect = this.player.domElement.getBoundingClientRect();
    const garbageRect = garbageInstance.divElement.getBoundingClientRect();
    console.log("playerRect", playerRect, "garbageRect", garbageRect);
    if (
      playerRect.x < garbageRect.x + garbageRect.width &&
      playerRect.x + playerRect.width > garbageRect.x &&
      playerRect.y < garbageRect.y + garbageRect.height &&
      playerRect.height + playerRect.y > garbageRect.y
    ) {
      this.score += garbageInstance.garbageInfo.points; // Increment the score
      this.updateScoreDisplay(); // update the score display
      console.log(`Captured garbage! Total Score: ${this.score}`);
      return true;
    }
    return false;
  }

  updateScoreDisplay() {
    this.scoreDisplay.innerText = "Your Score:  " + this.score;
    //Update the text content
  }

  removeGarbageIfOutside(garbageInstance) {
    // const board = document.getElementById("board");
    // const board.height = board.clientHeight;
    console.log("garbageInstance.positionY", garbageInstance.positionY);
    if (
      garbageInstance.positionY > 85 ||
      this.detectCollision(garbageInstance)
    ) {
      // 1. remove element from the DOM
      garbageInstance.divElement.remove();
      // 2. remove from the garbage array
      const index = this.garbageArr.indexOf(garbageInstance);
      if (index !== -1) {
        this.garbageArr.splice(index, 1);
      }
    }
  }
}
// end of the Game class (includes start method)

class Player {
  //robot ocean garbage collector
  constructor() {
    this.width = 15;
    this.height = 15;
    this.positionX = 50 - this.width / 2;
    this.positionY = 0;
    this.domElement = null; // this element stores a reference to the dom element of the player
    this.createDomElement();
  }

  createDomElement() {
    //Step 1: Create the element
    this.domElement = document.createElement("img"); // add image here??

    //Step 2: Add content or modify
    this.domElement.id = "player";
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

  //   moveUp() {
  //     this.positionY++;
  //     this.domElement.style.bottom = this.positionY + "vh";
  //   }

  //   moveDown() {
  //     this.positionY--;
  //     this.domElement.style.bottom = this.positionY + "vh";
  //   }
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
    imageSrc: "./images/plasticBags.jpg",
    points: 10,
  },
  {
    name: "plastic bottles",
    imageSrc: "./images/plasticBottles.jpg",
    points: 5,
  },
  {
    name: "coffee cups",
    imageSrc: "./images/coffeeCups.jpg",
    points: 10,
  },

  {
    name: "plastic garbage",
    imageSrc: "./images/PlasticBinOfGarbage.png",
    points: 1,
  },
  {
    name: "rubber duck",
    imageSrc: "./images/rubberDuck.jpg",
    points: 20,
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
    this.height = 20;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.positionY = 0; //Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100 - this.width
    this.divElement = null;
    this.createDomElement();
  }

  createDomElement() {
    // Step 1: create the element (the garbage bags, plastic bottles...)
    this.divElement = document.createElement("div");

    // Step 2: Add content or modify (ex. innerHTML)
    this.divElement.className = "garbage";
    // this.domElement.innerHTML = this.garbageType;
    this.divElement.style.width = this.width + "vw";
    this.divElement.style.height = this.height + "vh";
    this.divElement.style.left = this.positionX + "vw";
    this.divElement.style.top = this.positionY + "vh";
    this.divElement.style.backgroundImage = `url(${this.garbageInfo.imageSrc})`;

    // Step 3: Append to the DOM: parentElm.appendChild()
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.divElement);
    // //Step 1: create
    // const imgElement = document.createElement("img");

    // // Step 2: Add content or modify

    // imgElement.src = this.garbageInfo.imageSrc;
    // // imgElement.alt = this.garbageInfo.name;
    // imgElement.style.width = "100%";
    // imgElement.style.height = "100%";

    // // Step 3: Append to the DOM: parentElm.appendChild()
    // //const parentElm = document.getElementById("board");
    // parentElm.appendChild(imgElement);
  }
  moveDown() {
    this.positionY += 10;
    this.divElement.style.top = this.positionY + "vh";
    console.log("moveDown", this.positionY);
  }
}

//game instance:
const game = new Game();
game.start();
