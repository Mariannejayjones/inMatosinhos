<template>
  <div class="container">
    <div class="login-box">
      <input placeholder="Email" v-model="email" type="text">
      <input placeholder="Password" v-model="password" type="password">
      <button @click="login()">Login</button>
      <button id="openRegister" @click="openRegister()" class="btnRegister">Registe-se</button>
      <button id="openRegisterOwner" @click="openRegisterOwner()" class="btnRegisterOwner">Novo Comércio</button>
      <button id="close" @click="goToLanding()"> Fechar </button>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
import axios from 'axios'
  export default {
    data() { 
      return {
        email: null,
        password: null
      }
  
    },

      // once logged in send to restaurants // 
    methods: {
      ...mapActions([
        'setUser',
        'setToken'
      ]),

      login() {

        let logUser = {
          "email": this.email,
          "password": this.password
        }

        axios.post('http://localhost:3000/login', logUser).then((response) => {
          console.log(response);
          this.setUser(response.data.user)
          this.setToken(response.data.token)
          this.$router.push('/landing')       
        }, (error) => {
            console.log(error);
        });

      },

      goToLanding() {
        this.$router.push('/landing')
      },

      // on click open register form // 
      openRegister() {
        this.$router.push('/register')
      },

      //on click open register owner form //
      openRegisterOwner() {
        this.$router.push('/registerOwner')
      }

    }
}


</script>

<style> 

*{
	box-sizing: border-box;
}

body{
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
  top: 375px;
  bottom: 42%;
  left: 25px;
  right: 0;
  width: 450px;
  height: 450px;
  opacity: 0.8;
}

.login-box:before{
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

.login-box input{
	margin: 10px 0px;
	border: none;
	padding: 10px;
	border-radius: 5px;
	width: 100%;
	background-color: white;
	font-size: 18px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.login-box button{
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

button, input, select, textarea{
    background-color: white;
}

::placeholder{
	color: #05c1c1;	
}


</style>