export interface Drawable {
    update(): void;
    draw(context: CanvasRenderingContext2D): void;
}
