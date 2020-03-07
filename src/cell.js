class Cell {
    constructor(ball, state) {
        this.state = state;
        this.ball = ball;
    }

    get color() {
        return this.ball.color;
    }

    set color(c) {
        this.ball.color = c;
    }

    draw(color) {
        if (color != undefined && color !== this.ball.color) {
            this.ball.color = color;
            this.ball.draw();
        }
    }
}