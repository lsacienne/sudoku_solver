import { Problem } from "./structures";

export function generateAndTest(problem: Problem): null | Problem {
    if (!problem.isComplete()) {
        let cellIndex = problem.findFirstEmptyCell();
        if (cellIndex === undefined) {
            throw new Error("The problem is already complete !");
        }
        for (let i = 1; i <= 9; ++i) {
            let newPb = problem.copy();
            newPb.setValue(cellIndex, i);
            if (newPb.isCorrect(cellIndex)) {
                let res = generateAndTest(newPb);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    } else {
        return problem;
    }
}

export function generateAndTest2(problem: Problem, cellIndex: number | undefined): null | Problem {
    if (!problem.isComplete()) {
        if (cellIndex === undefined) {
            throw new Error("The problem is already complete !");
        }
        for (let i = 1; i <= 9; ++i) {
            let newPb = problem.copy();
            newPb.setValue(cellIndex, i);
            if (newPb.isCorrect(cellIndex)) {
                newPb.localUpdateScore(cellIndex);
                let nextCell = newPb.findMostConstraints();
                let res = generateAndTest2(newPb, nextCell);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    } else {
        return problem;
    }
}