<template>
    <div class="first-ai">
        <SudokuGrid refs="sudokuGrid"></SudokuGrid>
        <button type="button" @click="startAI" class="validate">Solve the sudoku!</button>
    </div>
</template>

<script lang='ts'>
import SudokuGrid from '@/components/SudokuGrid.vue';
import { defineComponent } from 'vue';
import * as ai from '@/local_modules/ai';
import { Problem } from '@/local_modules/structures';
import { fillGrid } from '@/local_modules/analyze_grid';
import { store } from './store';

export default defineComponent({
    name: 'FirstAI',
    components: {
        SudokuGrid
    },
    methods: {
        runAI(inputArray: Array<string>) {
            const problem: Problem = fillGrid(inputArray);
            problem.printDenseSolution()
            let toResolve = new Promise<Problem>((resolve, reject) => {
                const solution: Problem | null = ai.generateAndTest(problem);
                if (solution) {
                    resolve(solution);
                } else {
                    reject("No solution found");
                }
            });

            toResolve.then((solution) => solution.printDenseSolution());
        },
        startAI() {
            let gridContent = store.cells.map(cell => cell.value === "" ? "0" : cell.value.toString());
            this.runAI(gridContent);
        }
    }
});
</script>

<style scoped>
.first-ai {
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
    height: 5vh;
    font-weight: 600;
    font-size: 2vh;


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
</style>