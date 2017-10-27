<template>
  <div id="app">
    <router-view/>
  <div class="container-fluid">
      <div class="row">
        <div class="mastfoot col-lg-12">
          <div class="inner">
            <p>Our shop <a href="/">Shop</a>, by <a href="/">Evgeniy</a>.</p>
          </div>
      </div>  
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
* {
    margin: 0;
    padding: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#app {
 
	margin: 0 auto;
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
