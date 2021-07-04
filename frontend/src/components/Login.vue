<template>
  <div class="container">
    <div class="login-box">
      <input placeholder="Email" type="text">
      <input placeholder="Password" type="password">
      <button @click="toRestaurants()">Login</button>
	    <!-- <button>Registe-se</button> -->
    </div>

  </div>
</template>

<script>
  export default {
      
    methods:{
      toRestaurants(){
		    this.$router.push('/restaurants')
      },
      
    }
  }


</script>

<style> 

* {
	box-sizing: border-box;
}

body {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 16px;
	color: #fff;
}

.login-box {
	background-color: darkcyan;
	margin: auto auto;
	padding: 40px;
	border-radius: 5px;
	box-shadow: 0 0 10px #000;
	position: absolute;
	top: 115px;
	bottom: 42%;
	left: 65%;
	right: 0;
	width: 400px;
	height: 355px;
	opacity:0.8;

}

.login-box:before {
	background-image:('./assets/backgroundImage.png');
	width: 100%;
	height: 100%;
	background-size: cover;
	content: "";
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: -1;
	display: block;
	filter: blur(2px);
}

.login-box input {
	margin: 10px 0px;
	border: none;
	padding: 10px;
	border-radius: 5px;
	width: 100%;
	background-color: white;
	font-size: 18px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.login-box button {
	background-color: #05c1c1;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	width: 100%;
	font-size: 18px;
	padding: 10px;
	margin: 10px 0px;
}

button, input, select, textarea {
    background-color: white;
}

::placeholder{
	color: #05c1c1;	
}


</style>