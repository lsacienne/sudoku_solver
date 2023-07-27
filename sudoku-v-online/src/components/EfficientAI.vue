<template>
    <div class="efficient-ai">
        <SudokuGrid refs="sudokuGrid"></SudokuGrid>
        <button type="button" @click="startAI" class="validate">Solve the sudoku!</button>
        <div class="loading-screen" refs="loadingScreen" :class="{ hidden: !isScreenLoading }">
            <div class="rotating-widget">
                <img src="@/assets/rolling-arrows.png" alt="loading" srcset="">
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import SudokuGrid from '@/components/SudokuGrid.vue';
import { defineComponent } from 'vue';
import * as ai from '@/local_modules/ai';
import { Problem } from '@/local_modules/structures';
import { fillGrid } from '@/local_modules/analyze_grid';
import { CellType, store } from './store';

export default defineComponent({
    name: 'FirstAI',
    data() {
        return {
            isScreenLoading: false
        }
    },
    components: {
        SudokuGrid
    },
    methods: {

        async runAI(inputProblem: Problem) {
            //problem.printDenseSolution();
            let toResolve = new Promise<Problem>((resolve, reject) => {
                const firstCell = inputProblem.globalUpdateScore();
                const solution: Problem | null = ai.generateAndTest2(inputProblem, firstCell);
                if (solution) {
                    resolve(solution);
                } else {
                    reject("No solution found");
                }
            });
            return toResolve;
        },
        async startAI() {
            this.isScreenLoading = true;
            let gridContent = store.cells.map(cell => cell.value === "" ? "0" : cell.value.toString());
            const problem: Problem = fillGrid(gridContent);
            const wrongCells = problem.isCompletelyCorrect();
            if (wrongCells.length > 0) {
                this.highlightWrongCells(wrongCells);
                this.isScreenLoading = false;
            } else {
                let promise = this.runAI(problem);
                promise.then((solution) => {
                    solution.printDenseSolution();
                    this.fillCells(solution.getArrayOfValues());
                    this.isScreenLoading = false;
                });
                promise.catch((e) => console.error(e));
            }

        },
        highlightWrongCells(wrongCellsIndex: Array<number>) {
            for (const cell of store.cells) {
                if (cell.index in wrongCellsIndex) {
                    cell.isWrongValue = true;
                } else {
                    cell.isWrongValue = false;
                }
            }
        },
        fillCells(input: Array<number | "">) {
            for (let i = 0; i <= 80; ++i) {
                store.cells[i] = {
                    index: i,
                    value: input[i],
                    type: store.cells[i].type === CellType.EMPTY ? CellType.COMPUTED : CellType.HARDCODED,
                    isWrongValue: false
                }
            }
        }
    }
});
</script>

<style scoped>
.efficient-ai {
    margin: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5vh;
}

.validate {
    font-family: Roboto-Mono-Italic, arial, sans-serif;
    ;
    text-transform: uppercase;
    width: 90%;
    height: 3rem;
    font-weight: 600;
    font-size: 1.3rem;


    background-color: aliceblue;
    border: solid 0.25rem rgb(1, 20, 37);
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem rgb(1, 20, 37);

    transition: transform 50ms, box-shadow 50ms;
}

.validate:active {
    transform: translate(0.25rem, 0.25rem);
    box-shadow: 0.25rem 0.25rem rgb(1, 20, 37);
}

.loading-screen {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.hidden {
    visibility: hidden;
}

.rotating-widget {
    width: 8vw;
    height: 8vw;
    animation: spin 3s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rotating-widget>img {
    max-width: 100%;
}

@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@media (min-aspect-ratio: 4/3) and (min-width: 1200px) {
    .validate {
        width: 50vh;
    }
}
</style>