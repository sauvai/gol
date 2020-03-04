class gol {
    //cellArr => 0 dead, 1 alive, 2 dying, 3 growing
    constructor(width, height, cellArr) {
        this.height = height;
        this.width = width;
        this.originalCellArr = JSON.parse(JSON.stringify(cellArr));
        this.cellArr = cellArr;
        this.step = 0;

        this.grid = new Grid(new Pos(0, 0), width, height, 20, 2);
        this.DEAD = 0;
        this.ALIVE = 1;
        this.DYING = 2;
        this.GROWING = 3;
    }

    getStateFrom(x, y) {
        // if (x < 5 && y < 5)
            // console.log("old: " + x + "," + y);
            let oldX = x;
            let oldY = y;
        if (x >= this.width) x = 0;
        else if (x < 0) x = this.width - 1;
        if (y >= this.height) y = 0;
        else if (y < 0) y = this.height - 1;
        if (x < 5 && y < 5 && this.cellArr[y][x] != 0) {
            console.log("old: " + oldX + "," + oldY);
            console.log("new: " + x + "," + y);
            console.log(this.cellArr[y][x])
        }
        return this.cellArr[y][x];
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

        // if (y < this.height - 1) {
        //     count += this.cellArr[y + 1][x] == state;
        //     if (x < this.width - 1) count += this.cellArr[y + 1][x + 1] == state;
        //     if (x > 0) count += this.cellArr[y + 1][x - 1] == state;
        // }
        // if (x < this.width - 1) count += this.cellArr[y][x + 1] == state;
        // if (x > 0) count += this.cellArr[y][x - 1] == state;
        // if (y > 0) {
        //     count += this.cellArr[y - 1][x] == state;
        //     if (x < this.width - 1) count += this.cellArr[y - 1][x + 1] == state;
        //     if (x > 0) count += this.cellArr[y - 1][x - 1] == state;
        // }
        return count;
    }

    clear() {
        this.step = 0;
        console.log(this.height, this.width)
        for (let y = 0; y < this.height; y++) {
            if (this.height > 0)
                for (let x = 0; x < this.width; x++) {
                    this.cellArr[y][x] = this.DEAD;
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
                if (this.cellArr[y][x] == this.DYING) {
                    this.cellArr[y][x] = this.DEAD;
                }
                // growing
                if (this.cellArr[y][x] == this.GROWING) {
                    this.cellArr[y][x] = this.ALIVE;
                }
            }
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cellState = this.cellArr[y][x];
                let aliveNeighbour = this.countNeighbour(new Pos(x, y), this.ALIVE)
                    + this.countNeighbour(new Pos(x, y), this.DYING);

                if (aliveNeighbour == 3 && cellState != this.ALIVE) { //born
                    this.cellArr[y][x] = this.GROWING;
                }
                else if (cellState == this.ALIVE && aliveNeighbour != 2 && aliveNeighbour != 3)
                    this.cellArr[y][x] = this.DYING;
            }
        }
    }

    draw() {
        this.grid.draw();
        let width = this.grid.width;
        let height = this.grid.height;
        let boxSize = this.grid.boxSize;
        let thickness = this.grid.thickness;
        let pos = this.grid.pos;
        let color = 'white';

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let offset = (boxSize + thickness);
                let p = new Pos(pos.x + thickness + i * offset + 1,
                    pos.y + thickness + j * offset + 1);

                if (this.cellArr[j][i] == this.DEAD) color = 'white';
                else if (this.cellArr[j][i] == this.ALIVE) color = 'blue';
                else if (this.cellArr[j][i] == this.DYING) color = 'red';
                else if (this.cellArr[j][i] == this.GROWING) color = 'green';

                new Cell(p, (boxSize / 2) - 1, color).draw();
            }
        }
    }

    addCell(p) {
        if (p.x < this.width && p.x >= 0 &&
            p.y < this.height && p.y >= 0)
            this.cellArr[p.y][p.x] = (this.cellArr[p.y][p.x] == this.ALIVE ? this.DEAD : this.ALIVE);
    }
}