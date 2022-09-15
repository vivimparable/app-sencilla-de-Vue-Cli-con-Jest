<template>
  <indecision-app  title="¡Welcome to the indecision game!" />
  <HiW/>
</template>

<script>
import IndecisionApp from './components/IndecisionComponent.vue'

export default {
  name: 'App',
  components: {
    IndecisionApp,
 
  },data(){
    return{
      numerito:1,
      hi:"HOLA"
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

html, body{
  background-color: rgb(30, 76, 84);
}
</style>
