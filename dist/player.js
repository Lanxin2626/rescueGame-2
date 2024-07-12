export class Player {
    constructor() {
        this.score = 0;
        this.lives = 3;
    }
    addScore(points) {
        this.score += points;
    }
    loseLife() {
        this.lives--;
    }
    isGameOver() {
        return this.lives <= 0;
    }
    reset() {
        this.score = 0;
        this.lives = 3;
    }
    getScore() {
        return this.score;
    }
    getLives() {
        return this.lives;
    }
}
