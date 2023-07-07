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