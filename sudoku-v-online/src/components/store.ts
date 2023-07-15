// store.js
import { reactive } from 'vue'

export declare interface GraphicCell {
    index: number,
    value: number | "",
    type: CellType,
    isWrongValue: boolean
}

export enum CellType {
    HARDCODED,
    COMPUTED,
    EMPTY
}

export const store = reactive({
    cells: new Array<GraphicCell>()
})