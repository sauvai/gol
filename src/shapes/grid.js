class Grid {
    constructor(p, width, height, boxSize, thickness, options) {
        this.options = {
            color: 'black',
        }
        if (typeof options != 'undefined')
            this.options = Utils.extend(this.options, options);
        this.width = width;
        this.height = height;
        this.color = this.options.color;
        this.pos = p;
        this.boxSize = boxSize;
        this.thickness = thickness;
    }

    draw() {
        for (let i = 0; i <= this.width; i++) {
            let x = (i * (this.boxSize + this.thickness) + this.pos.x);
            let length = this.height * (this.boxSize + this.thickness) + this.thickness;

            new Box(new Pos(x, this.pos.y),
                this.thickness,
                length).draw();
        }

        for (let i = 0; i <= this.height; i++) {
            let y = (i * (this.boxSize + this.thickness) + this.pos.y);
            let length = this.width * (this.boxSize + this.thickness) + this.thickness;

            new Box(new Pos(this.pos.x, y),
                length,
                this.thickness).draw();
        }
    }
}