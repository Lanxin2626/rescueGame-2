export class Parachutist {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = new Image();
        this.image.src = 'assets/images/parachutist.png';
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.width = 20;
        this.height = 40;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    update() {
        this.y += this.speed;
    }
    draw(context) {
        if (this.imageLoaded) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height); // 绘制伞兵图像
        }
    }
}
