<template>
    <div class="grid-container">
        <div class="cell" v-for="cell in  store.cells " :key="cell.index">
            <input type="number" min="1" max="9" :name="cell.index.toString()" :id="cell.index.toString()"
                :value="cell.value"
                @input="cell.value = (checkInput($event.target!.value) ? $event.target!.value : cell.value); cell.value = cell.value; updateCellType(cell)"
                :class="{ wrongvalue: cell.isWrongValue, computedvalue: isComputedValue(cell) }">
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { CellType, GraphicCell, store } from '@/components/store'

export default defineComponent({
    name: 'SudokuGrid',
    data() {
        return {
            store
        }
    },
    created() {
        for (let i = 0; i <= 80; ++i) {
            let newCell: GraphicCell = {
                index: i,
                value: "",
                type: CellType.EMPTY,
                isWrongValue: false

            }
            store.cells.push(newCell);
        }
    },
    methods: {
        checkInput(input: number | "") {
            //console.log(input);
            if (input === "") {
                return true;
            }
            if (input < 1 || input > 9) {
                return false;
            }
            return true;
        },
        updateCellType(cell: GraphicCell) {
            if (cell.value === null) {
                cell.type = CellType.EMPTY;
            } else {
                cell.type = CellType.HARDCODED;
            }
        },
        isComputedValue(cell: GraphicCell) {
            return cell.type === CellType.COMPUTED;
        }
    }
});
</script>

<style scoped>
.grid-container {
    background-color: rgb(1, 20, 37);
    box-shadow: 1vw 1vw 0 rgb(8, 85, 151);
    display: grid;
    width: 100%;
    aspect-ratio: 1 / 1;
    grid-template-columns: repeat(9, 9.2%);
    grid-template-rows: repeat(9, 9.2%);
    grid-gap: 5px;
    place-content: center;
    border-radius: 3vw;
}

.cell {
    border: none;
    border-radius: 1vw;
    background-color: aliceblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 4vw;
}

.cell>input {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 4vw;
    color: rgb(1, 21, 39);
    background-color: rgba(0, 0, 0, 0);
    border: none;
}

.cell>input.wrongvalue {
    font-weight: bold;
    color: rgb(175, 51, 51);
}

.cell>input.computedvalue {
    color: rgb(79, 133, 204);
}

@media(min-width: 500px) {
    .grid-container {
        grid-template-columns: repeat(9, 9.8%);
        grid-template-rows: repeat(9, 9.8%);
    }
}

@media (min-aspect-ratio: 4/3) and (min-width: 1200px) {
    .grid-container {
        width: 50vh;
        height: 50vh;
        grid-template-columns: repeat(9, 9.5%);
        grid-template-rows: repeat(9, 9.5%);
        box-shadow: .5vw .5vw 0 rgb(8, 85, 151);
        border-radius: 1.5vh;
        grid-gap: 7px;
    }

    .cell {
        border-radius: .5vh;
    }

    .cell>input {
        font-size: 2VW;
    }


}

.left {
    border-left: none;
}

.right {
    border-right: none;
}

.top {
    border-top: none;
}

.bottom {
    border-bottom: none;
}

.bold-left {
    border-left: 1rem solid black;
}

.bold-right {
    border-right: 1rem solid black;
}

.bold-top {
    border-top: 1rem solid black;
}

.bold-bottom {
    border-bottom: 1rem solid black;
}
</style>