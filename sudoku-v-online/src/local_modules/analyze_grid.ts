import { Problem, Cell } from "./structures";

export function analyzeGrid(input: string): Array<string> {
    const lines = input.split('\n');
    const stringCells = lines
        .map(
            line => line.split(' ')
        ).reduce((acc, cur) => acc.concat(cur), []);
    return stringCells;
}

export function fillGrid(input: Array<string>): Problem {
    const problem = new Problem();
    let index = 0;
    for (const cell of input) {
        const convertedCellValue: number | null = isNaN(+cell) || !(+cell > 0 && +cell < 9) ? null : +cell;
        problem.addCell(new Cell(convertedCellValue, index));
        index++;
    }
    return problem;
}