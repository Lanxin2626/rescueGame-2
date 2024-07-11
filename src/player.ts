export class Player {
    private score: number;
    private lives: number;

    constructor() {
        this.score = 0;
        this.lives = 3;
    }

    addScore(points: number) {
        this.score += points;
    }

    loseLife() {
        this.lives--;
    }

    isGameOver(): boolean {
        return this.lives <= 0;
    }

    reset(){
        this.score = 0;
        this.lives = 3;
    }

    getScore(): number {
        return this.score;
    }

    getLives(): number {
        return this.lives;
    }
}
