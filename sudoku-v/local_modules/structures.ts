export class Cell {
    value: number | null;
    readonly index: number;

    constructor(value: null | number, index: number) {
        this.value = value;
        this.index = index;
    }

    computeCol(): number {
        return this.index % 9;
    }

    computeLine(): number {
        return Math.floor(this.index / 9);
    }

    computeSquare(): number {
        return Math.floor(this.computeCol() / 3) + 3 * Math.floor(this.computeLine() / 3);
    }

    setValue(value: number) {
        this.value = value;
    }

    copy() {
        return new Cell(this.value, this.index);
    }
}

class C {
    index: number;
    cells: Array<Cell>;

    constructor(index: number) {
        this.index = index;
        this.cells = [];
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
    }
}

class L {
    index: number;
    cells: Array<Cell>;

    constructor(index: number) {
        this.index = index;
        this.cells = [];
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
    }
}

class S {
    index: number;
    cells: Array<Cell>;

    constructor(index: number) {
        this.index = index;
        this.cells = [];
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
    }
}

export class Problem {
    cols: Array<C>;
    lins: Array<L>;
    squs: Array<S>;
    cells: Array<Cell>;

    constructor() {
        this.cols = [];
        for (let i = 0; i < 9; ++i) {
            this.cols.push(new C(i));
        }
        this.lins = [];
        for (let i = 0; i < 9; ++i) {
            this.lins.push(new L(i));
        }
        this.squs = [];
        for (let i = 0; i < 9; ++i) {
            this.squs.push(new S(i));
        }
        this.cells = [];
    }

    putCellInCol(cell: Cell) {
        let colId = cell.computeCol();
        this.cols.find(col => col.index === colId)?.addCell(cell);
    }

    putCellInLin(cell: Cell) {
        let linId = cell.computeLine();
        this.lins.find(lin => lin.index === linId)?.addCell(cell);
    }

    putCellInSqu(cell: Cell) {
        let squId = cell.computeSquare();
        this.squs.find(squ => squ.index === squId)?.addCell(cell);
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
        this.putCellInCol(cell);
        this.putCellInLin(cell);
        this.putCellInSqu(cell);
    }

    printProblem() {
        let lines = this.lins.map(lin => lin.cells.map(cell => cell.value));
        console.log(lines);
    }

    printDenseSolution() {
        let out = this.lins.map(lin => lin.cells.map(cell => cell.value?.toString()).join(' ')).join('\n');
        console.log(out);
    }

    setValue(index: number, value: number) {
        if (this.cells[index].value !== null) {
            throw new Error("The cell is already filled");
        }
        this.cells[index].setValue(value);
    }

    /* Copy */
    copy(): Problem {
        let newProblem = new Problem();
        this.cells.forEach(
            function (cell) {
                newProblem.addCell(cell.copy());
            }
        )
        return newProblem;
    }

    /* Constraints */
    checkLine(index: number) {
        let line = this.lins.find(lin => lin.index === index)?.cells.map(cell => cell.value);
        let valuesCount = this.countValuesArray(line!!);
        if (Array.from(valuesCount.values()).includes(2)) {
            return false;
        }
        return true;
    }

    checkColumn(index: number) {
        let column = this.cols.find(col => col.index === index)?.cells.map(cell => cell.value);
        let valuesCount = this.countValuesArray(column!!);
        if (Array.from(valuesCount.values()).includes(2)) {
            return false;
        }
        return true;
    }

    checkSquare(index: number) {
        let square = this.squs.find(squ => squ.index === index)?.cells.map(cell => cell.value);
        let valuesCount = this.countValuesArray(square!!);
        if (Array.from(valuesCount.values()).includes(2)) {
            return false;
        }
        return true;
    }
    countValuesArray(arr: Array<(number | null)>): Map<number, number> {
        const counts: Map<number, number> = new Map();
        arr.forEach(
            function (x) {
                if (x !== null) {
                    let val = counts.get(x);
                    if (val !== undefined) {
                        counts.set(x, val + 1);
                    } else {
                        counts.set(x, 1);
                    }
                }
            }
        );

        return counts;
    }
}
