<template>
  <div id="app">
    <navbar>this is navbar</navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar'

export default {
  name: 'App',
  components:{navbar}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #edf0f4;/*#e8e2e2*/
  
}
</style>


