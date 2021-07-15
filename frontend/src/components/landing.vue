<template>
<!-- landing layout --->
  <div>
    <div class="top-banner">
      <!-- <img :src="require('../assets/backgroundImage.png')"/> // this image for landing and login --> 
    </div>

    <div class="intro">
      <div id="sub-intro" style="margin-left: -30px;">
        <em>
          "Só é preciso perceber
          a beleza que está aí, à nossa frente: 
            <br>
          No mar, na flôr, nos livros, na música,
          na presença dos que amamos... 
            <br>
          E ver a vida através dos olhos da alma,
          com alegria e gratidão.""
        </em>
      </div>
    </div>

    <div style="display: flex; justify-content: space-around; padding-left: 7%; padding-bottom: 38px; margin-left: -45px;">
      <div style="width: 25%; max-height: 250px;">
        <img :src="require('@/assets/restaurant.png')"/>
        <button id="goToRestaurant" @click="goToRestaurant()" class="btnRestaurant">
          Restaurantes
        </button>
      </div>

      <div style="width: 25%; max-height: 250px;">
        <img :src="require('@/assets/store.png')" style="opacity: 0.3;"/>
        <button id="goToStore" @click="goToStore()" class="btnStore">
          Lojas
        </button>
      </div>

      <div style="width: 25%; max-height: 250px;">
        <img :src="require('@/assets/services.png')" style="opacity: 0.3;"/>
        <button id="goToServices" @click="goToServices()" class="btnServices">
        Serviços
        </button>
      </div>

      <div style="width: 25%; max-height: 250px">
        <img :src="require('@/assets/agenda.png')" style="opacity: 0.3;"/>
        <button id="goToAgenda" @click="goToAgenda()" class="btnAgenda">
        Agenda
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  // on click - go to restaurant page // 
  methods: {
    goToRestaurant(){
      this.$router.push('/restaurants')
    }
  }
}
   
</script>

<style scoped>

.intro{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 28px;
  margin-top: -70px;
  margin-left: 33%;
  margin-bottom: 60px;
  color: #05c1c1;
}

.btnRestaurant, .btnStore, .btnServices, .btnAgenda{
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

img{
  border-style: none;
  height: 200px;
}

em{
  font-size:21px;
}


</style>
