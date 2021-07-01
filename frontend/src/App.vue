<template>
  <v-app>
    <div class="top-banner">
      <img :src="require('./assets/thebackground.png')"/>
      <button id="loginBox" @click="showLogin = !showLogin; toLogin()" class="btn-login mb-4">
        Login
      </button>
    </div>

    <hr>

    <div class="footer">
      <div>.inMATOSINHOS</div>
    </div>

     <router-view/>
  </v-app>
</template>

<script>
  export default {
    data() {
      return{
        showLogin: true
      }
    },
    methods:{
      toLogin(){
        if (!this.showLogin){
        this.$router.push('/login')
        }
        else{
          this.router.push('/restaurants')
        }
      }
    }
 }

</script>

<style>
 .top-banner img{
    object-fit: cover;
    height: 285px;
    width: 100%;
    position: relative;
  }   

  .btn-login{
    background-color: #05c1c1;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 7px 24px;
    border: none;
    border-radius: 60px;
    top: 25px;
    left: 90%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btn-login:hover{
    background-color: #ff7503;
    color: white;
  }

  hr{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -10px;
  margin-bottom: 10%;
  border-style: solid;
  border-width: 12px;
  background-color: #05c1c1;
  border-color: #05c1c1;
  width: 100%;
  }

   .footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #05c1c1;
  color: white;
  text-align: center;
  height: 45px;
  padding: 15px;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: bold;
}





</style>
