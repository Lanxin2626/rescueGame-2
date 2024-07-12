export class Boat {
    constructor(x, y, canvasWidth, boatHeight, boatWidth) {
        this.x = x;
        this.y = y;
        this.boatWidth = boatWidth;
        this.boatHeight = boatHeight;
        this.speed = 10;
        this.direction = 1; // 1 means direction is right, -1 means direction is left
        this.image = new Image();
        this.image.src = 'assets/images/boat.png';
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.bounds = canvasWidth;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.setupControls();
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.boatWidth;
    }
    getHeight() {
        return this.boatHeight;
    }
    setupControls() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.isMovingLeft = true;
                this.direction = -1;
            }
            else if (e.key === 'ArrowRight') {
                this.isMovingRight = true;
                this.direction = 1;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                this.isMovingLeft = false;
            }
            else if (e.key === 'ArrowRight') {
                this.isMovingRight = false;
            }
        });
        window.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const newBoatX = e.clientX - rect.left;
            if (newBoatX > this.x) {
                this.direction = 1;
            }
            else {
                this.direction = -1;
            }
            this.x = newBoatX;
        });
    }
    update() {
        // use keyboard to control the boat
        if (this.isMovingLeft) {
            this.x -= this.speed;
        }
        if (this.isMovingRight) {
            this.x += this.speed;
        }
        // ensure boat does not go out of bounds
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > this.bounds - this.boatWidth) {
            this.x = this.bounds - this.boatWidth;
        }
    }
    draw(context) {
        if (this.imageLoaded) {
            //save the current drawing state
            context.save();
            if (this.direction === 1) {
                context.scale(-1, 1);
                context.drawImage(this.image, -this.x - this.boatWidth, this.y, this.boatWidth, this.boatHeight);
            }
            else {
                context.drawImage(this.image, this.x, this.y, this.boatWidth, this.boatHeight);
            }
            context.restore();
        }
    }
}
