<template>
    <h1>Sudoku solver</h1>
    <h2>Click the grid to fill it!</h2>
    <!-- <FirstAI></FirstAI> -->
    <EfficientAI></EfficientAI>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FirstAI from '@/components/FirstAI.vue';
import EfficientAI from './components/EfficientAI.vue';

export default defineComponent({
    name: 'App',
    components: {
        //FirstAI,
        EfficientAI
    }
});
</script>

<style>
@font-face {
    font-family: Roboto-Mono;
    src: url('~@/assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf');
    font-weight: normal;
}

@font-face {
    font-family: Roboto-Mono-Italic;
    src: url('~@/assets/fonts/Roboto_Mono/RobotoMono-Italic-VariableFont_wght.ttf');
    font-weight: normal;
}

body {
    background: url('~@/assets/background-desktop.png');
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#app {
    font-family: Roboto-Mono, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: aliceblue;
    border: solid .6rem rgb(1, 20, 37);
    border-radius: .8rem;
    box-shadow: .3rem .3rem 0 rgb(1, 20, 37);
    width: 95%;
    align-self: center;
    margin-top: 60px;
}

@media (min-aspect-ratio: 8/5) {

    #app {
        width: 60%;
    }
}
</style>

<style scoped>
h1 {
    font-family: Roboto-Mono-Italic, arial, sans-serif;
    font-weight: bold;
    margin-bottom: .5rem;
}

h2 {
    font-family: Roboto-Mono-Italic, arial, sans-serif;
    font-weight: lighter;
    margin-top: 0;
}
</style>
