import { Drawable } from './interfaces.js';

export class Parachutist implements Drawable {
    private x: number;
    private y: number;
    private speed: number;
    private image: HTMLImageElement;
    private imageLoaded: boolean;
    private width: number;
    private height: number;

    constructor(x: number, y: number, speed: number) {
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

    draw(context: CanvasRenderingContext2D) {
        if (this.imageLoaded) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height); // 绘制伞兵图像
        }
    }
}
