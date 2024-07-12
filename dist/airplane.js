import { Parachutist } from './parachutist.js';
import { randomBetween } from './utils.js';
export class Airplane {
    constructor(canvasWidth) {
        this.x = canvasWidth / 2;
        this.y = 50;
        this.speed = 2;
        this.dropInterval = 1500; // Drop a parachutist every 1.5 seconds
        this.parachutists = [];
        this.bounds = canvasWidth;
        this.image = new Image();
        this.image.src = 'assets/images/plane.png';
        this.direction = 1; // Initial direction, 1 means right, -1 means left
        this.airplaneWidth = 100;
        this.airplaneHeight = 40;
        this.startDropping();
    }
    getParachutists() {
        return this.parachutists;
    }
    setParachutists(parachutists) {
        this.parachutists = parachutists;
    }
    startDropping() {
        setInterval(() => {
            const parachutist = new Parachutist(this.x, this.y, randomBetween(1, 3));
            this.parachutists.push(parachutist);
        }, this.dropInterval);
    }
    update() {
        this.x += this.speed;
        //set the airplane bounds
        if (this.x > this.bounds - this.airplaneWidth || this.x < 0) {
            this.speed = -this.speed; // Change direction when hitting the boundary
            this.direction = -this.direction; // Flip direction horizontally
        }
        this.parachutists.forEach(parachutist => parachutist.update());
    }
    draw(context) {
        // Save the current drawing state
        context.save();
        // If the direction is right, flip the picture horizontally (depending on the picture orientation) 
        if (this.direction === 1) {
            context.scale(-1, 1);
            context.drawImage(this.image, -this.x - this.airplaneWidth, this.y, this.airplaneWidth, this.airplaneHeight);
        }
        else {
            context.drawImage(this.image, this.x, this.y, this.airplaneWidth, this.airplaneHeight);
        }
        // Restore the drawing state
        context.restore();
        // Draw parachutists
        this.parachutists.forEach(parachutist => parachutist.draw(context));
    }
}
