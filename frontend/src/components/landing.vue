<template>
<!-- landing layout --->
  <div>
    <div class="top-banner">
      <!-- <img :src="require('../assets/backgroundImage.png')"/> // this image for landing and login --> 
      <button id="loginBox" @click="showLogin = !showLogin" class="btn-login">
        Login
      </button>
    </div>

    <div class="intro">
      <div id="em">
        <em>
          [
        </em>
      </div>
      <div id="sub-intro">
        <em>
          Bla bla bla.. small intro....
        </em>
      </div>
      <div id="em2">
        <em>
          ]
        </em>
      </div>

    </div>

    <div style="display: flex; justify-content: space-around; padding-left: 15px; padding-bottom: 38px;">
      <div style="width: 25%; max-height: 250px;">
        <img :src="require('@/assets/restaurant.png')"/>
        <button id="restaurantgo" @click="goToRestaurant()" class="btnRestaurant">
          Restaurantes
        </button>
      </div>

      <div style="width: 25%; max-height: 250px;">
        <img  :src="require('@/assets/store.png')"/>
        <button id="storego" @click="storego()" class="btnRestaurant">
          Lojas
        </button>
      </div>

      <div style="width: 25%; max-height: 250px;">
        <img :src="require('@/assets/services.png')"/>
        <button id="servicesgo" @click="servicesgo()" class="btnRestaurant">
        Serviços
        </button>
      </div>

      <div style="width: 25%; max-height: 250px">
        <img :src="require('@/assets/agenda.png')"/>
        <button id="agendago" @click="agendago()" class="btnRestaurant">
        Agenda
        </button>
      </div>
    </div>

  </div>
</template>

<script>
 export default {
   components:{

   },

  
 }

</script>

<style scoped> 

.intro{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 28px;
  margin-top: -70px;
  margin-left: 25%;
  margin-bottom: 60px;
  color: #05c1c1;
}

.btnRestaurant{
    position: relative;
    left:0%;
    bottom: 70px;
    background-color: #05c1c1;
    color: white;
    opacity: 0.9;
    font-size: 15px;
    font-weight: bold;
    width:60%;
    text-transform: uppercase;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btnRestaurant:hover{
    background-color: #ff7503;
    color: white;
  }

  img[data-v-5016e0b7]{
    border-style: none;
    height: 200px;
}

  #em, #em2{
    font-size: 40px;

}

/* .top-banner img{
    object-fit: cover;
    height: 500px;
    width: 100%;
  }    */


</style>
