// store.js
import { reactive } from 'vue'

export declare interface GraphicCell {
    index: number,
    value: number | "",
    reasignment: number,
    isWrongValue: boolean
}

export const store = reactive({
    cells: new Array<GraphicCell>()
})