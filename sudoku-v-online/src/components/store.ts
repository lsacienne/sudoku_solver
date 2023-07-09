// store.js
import { reactive } from 'vue'

declare interface GraphicCell {
    index: number,
    value: number | ""
}

export const store = reactive({
    cells: new Array<GraphicCell>()
})