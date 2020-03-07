class gol {
    //cellArr => 0 dead, 1 alive, 2 dying, 3 growing
    constructor(width, height) {
        this.DEAD = 0;
        this.ALIVE = 1;
        this.DYING = 2;
        this.GROWING = 3;
        this.height = height;
        this.width = width;
        this.grid = new Grid(new Pos(0, 0), this.width, this.height, 20, 2);
        this.cellArr = new Array(height);
        for (let y = 0; y < this.height; y++) {
            this.cellArr[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                let boxSize = this.grid.boxSize;
                let thickness = this.grid.thickness;
                let pos = this.grid.pos;
                let offset = (boxSize + thickness);
                let p = new Pos(pos.x + thickness + x * offset + 1,
                    pos.y + thickness + y * offset + 1);
                this.cellArr[y][x] = new Cell(new Ball(p, (boxSize / 2) - 1), this.DEAD, "white");
            }
        }
        this.originalCellArr = JSON.parse(JSON.stringify(this.cellArr));
        this.step = 0;

    }

    getStateFrom(x, y) {
        let oldX = x;
        let oldY = y;

        if (x >= this.width) x = 0;
        else if (x < 0) x = this.width - 1;
        if (y >= this.height) y = 0;
        else if (y < 0) y = this.height - 1;

        return this.cellArr[y][x].state;
    }

    countNeighbour(p, state) {
        let count = 0;

        let x = p.x;
        let y = p.y;

        count += this.getStateFrom(x + 1, y + 1) == state;
        count += this.getStateFrom(x + 1, y - 1) == state;
        count += this.getStateFrom(x + 1, y) == state;
        count += this.getStateFrom(x, y + 1) == state;
        count += this.getStateFrom(x, y - 1) == state;
        count += this.getStateFrom(x - 1, y + 1) == state;
        count += this.getStateFrom(x - 1, y - 1) == state;
        count += this.getStateFrom(x - 1, y) == state;

        return count;
    }

    clear() {
        this.step = 0;
        document.getElementById("NextStep").innerHTML = "Next Step (0)";

        for (let y = 0; y < this.height; y++) {
            if (this.height > 0) {
                for (let x = 0; x < this.width; x++) {
                    this.cellArr[y][x].state = this.DEAD;
                }
            }
        }
    }

    reset() {
        this.cellArr = JSON.parse(JSON.stringify(this.originalCellArr));
        this.step = 0;
    }

    save() {
        this.originalCellArr = JSON.parse(JSON.stringify(this.cellArr));
    }

    update() {
        document.getElementById("NextStep").innerHTML = "Next Step (" + ++this.step + ")";
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                //dying
                if (this.cellArr[y][x].state == this.DYING) {
                    this.cellArr[y][x].state = this.DEAD;
                }
                // growing
                if (this.cellArr[y][x].state == this.GROWING) {
                    this.cellArr[y][x].state = this.ALIVE;
                }
            }
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cellState = this.cellArr[y][x].state;
                let aliveNeighbour = this.countNeighbour(new Pos(x, y), this.ALIVE) +
                    this.countNeighbour(new Pos(x, y), this.DYING);

                if (aliveNeighbour == 3 && cellState != this.ALIVE) { //born
                    this.cellArr[y][x].state = this.GROWING;
                } else if (cellState == this.ALIVE && aliveNeighbour != 2 && aliveNeighbour != 3)
                    this.cellArr[y][x].state = this.DYING;
            }
        }
    }

    draw() {
        if (this.step == 0)
            this.grid.draw();
        let width = this.grid.width;
        let height = this.grid.height;
        let color = 'white';

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (this.cellArr[j][i].state == this.DEAD) color = 'white';
                else if (this.cellArr[j][i].state == this.ALIVE) color = 'blue';
                else if (this.cellArr[j][i].state == this.DYING) color = Utils.getSelectedFromId("colorDying");
                else if (this.cellArr[j][i].state == this.GROWING) color = Utils.getSelectedFromId("colorGrowing");

                this.cellArr[j][i].draw(color);
            }
        }
    }

    addCell(p) {
        if (p.x < this.width && p.x >= 0 &&
            p.y < this.height && p.y >= 0)
            this.cellArr[p.y][p.x].state = (this.cellArr[p.y][p.x].state == this.ALIVE ? this.DEAD : this.ALIVE);
    }
}