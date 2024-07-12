import { Player } from './player.js';
import { Boat } from './boat.js';
import { Airplane } from './airplane.js';
export class Game {
    constructor() {
        //set the boat height and width here because we need to pass it to the boat constructor(boat Y setting wiil use boat height)
        this.boatHeight = 40;
        this.boatWidth = 100;
        this.seaHeight = 30;
        this.canvas = document.getElementById('gameCanvas');
        // Set Boat position(X,Y) on the top of sea picture,boat bounds, with the boat height and width
        this.boat = new Boat(this.canvas.width / 2, this.canvas.height - this.seaHeight - this.boatHeight, this.canvas.width, this.boatHeight, this.boatWidth);
        this.parachutists = [];
        this.context = this.canvas.getContext('2d');
        this.player = new Player();
        this.airplane = new Airplane(this.canvas.width);
        this.seaImage = new Image();
        this.seaImage.src = 'assets/images/sea.png';
        this.background = new Image();
        this.background.src = 'assets/images/background.png';
        console.log('Game initialized');
    }
    start() {
        console.log('Game started');
        this.update();
    }
    update() {
        console.log('Game update called');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw sea and background
        this.context.drawImage(this.seaImage, 0, this.canvas.height - this.seaHeight, this.canvas.width, this.seaHeight);
        this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height - this.seaHeight);
        // Update game objects
        this.boat.update();
        this.airplane.update();
        this.parachutists = this.airplane.getParachutists(); // get latest parachutists list
        this.parachutists.forEach(parachutist => parachutist.update());
        this.checkCollisions();
        // Draw game objects
        this.boat.draw(this.context);
        this.airplane.draw(this.context);
        this.parachutists.forEach(parachutist => parachutist.draw(this.context));
        this.drawScore();
        requestAnimationFrame(() => this.update());
    }
    //show score and lives
    drawScore() {
        function padStartWithZeros(num, targetLength) {
            let str = num.toString();
            while (str.length < targetLength) {
                str = '0' + str;
            }
            return str;
        }
        const formattedScore = padStartWithZeros(this.player.getScore(), 4);
        this.context.font = '16px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${formattedScore}`, 30, 50);
        this.context.fillText(`Lives: ${this.player.getLives()}`, 30, 80);
    }
    checkCollisions() {
        const remainingParachutists = [];
        this.parachutists.forEach(parachutist => {
            // Collision logic between Parachutist and ship
            if (parachutist.getY() + parachutist.getHeight() >= this.boat.getY() && // Check if the bottom of the paratrooper has reached the top of the ship
                parachutist.getY() <= this.boat.getY() + this.boat.getHeight() && // Check if the top of the paratrooper is within the range of the top of the ship
                parachutist.getX() + parachutist.getWidth() >= this.boat.getX() && // Check if the right side of the paratrooper exceeds the left side of the ship
                parachutist.getX() <= this.boat.getX() + this.boat.getWidth()) { // Check if the left side of the paratrooper is within the right side of the ship
                this.player.addScore(10);
            }
            // Check if the Parachutist has reached the sea
            else if (parachutist.getY() >= this.canvas.height - parachutist.getHeight() - this.seaHeight) {
                this.player.loseLife();
            }
            else {
                remainingParachutists.push(parachutist); // Retain parachutists that have not been removed
            }
        });
        this.airplane.setParachutists(remainingParachutists); // Update the list of parachutists
        this.parachutists = remainingParachutists;
        if (this.player.isGameOver()) {
            this.player.reset();
            alert("Game Over!");
            window.location.reload();
        }
    }
}
