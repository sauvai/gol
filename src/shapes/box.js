class Box {
    constructor(p, width, height, options) {
        this.options = {
            color: 'black',
            angle: 0
        }
        if (typeof options != 'undefined')
            this.options = Utils.extend(this.options, options);
        this.width = width;
        this.height = height;
        this.color = this.options.color;
        this.pos = p;
    }

    draw() {
        var angle = this.options.angle;

        pDraw.drawMode = CORNER;
        pDraw.pushAppearance();
        pDraw.translateDrawing(this.pos);
        pDraw.rotateDrawing(angle, RADIANS);
        pDraw.drawRectangle(new Pos(0, 0), this.width, this.height, this.color);
        pDraw.popAppearance();
    }

    offScreen() {
        var x = this.pos.x;
        var y = this.pos.y;

        return (x < -50 || x > canvasWidth + 50 ||
            y < -50 || y > canvasHeight + 50);
    }
}