class Cell {
    constructor(p, radius, color) {
        if (typeof options != 'undefined')
            this.options = Utils.extend(this.options, options);
        this.radius = radius;
        this.color = color;
        this.pos = p;
    }

    draw() {
        pDraw.drawMode = CORNER;
        pDraw.pushAppearance();
        pDraw.translateDrawing(this.pos);
        pDraw.drawCircle(new Pos(0, 0), this.radius * 2, this.color);
        pDraw.popAppearance();
    }

    offScreen() {
        var x = this.pos.x;
        var y = this.pos.y;

        return (x < -50 || x > canvasWidth + 50 ||
            y < -50 || y > canvasHeight + 50);
    }
}