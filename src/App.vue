<template>
  <div id="app">
    <router-view/>
      <div class="mastfoot col-lg-12">
        <div class="inner">
           <p>Our shop <a href="/">Shop</a>, by <a href="/">Evgeniy</a>.</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
   data(){
            return {
               
            }
      },   
        
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.inner p {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding-top: 20px
}
.mastfoot {
  background-color: black;
  height: 60px;
}
</style>
