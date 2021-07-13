<template>
  <div class="container">
<!--layout for search bar and searchboxes-->
    <div class="search-container">
      <div class="searchBox">
        <input placeholder="PESQUISAR" type="search">
        <button id="searchBox" class="btn-search">GO!</button>
      </div>
    </div>
      
    <div class="search-checkbox-Container">  
    
      <v-row class="mt-12"
      width="800px">
        <v-col cols="12" sm="3" md="3" lg="3" xl="3"
         v-for="category in categories"
          :key="category.id">
          <div class="searchCheckboxes">
            <input type="checkbox" name="categories" v-model="selectedCategories" :value=category.id :id=category.id>
            <label for="categories">{{category.name}}</label>
          </div>
      </v-col>
      </v-row>
      
    </div>

    <div>
      <v-row class="mt-12"
      width="1200px">

        <v-col cols="12" sm="6" md="4" lg="4" xl="4"
          v-for="restaurant in restaurants"
          :key="restaurant.id">

          <v-card
            class="mx-auto"
            width="400px">

          <div class="5oceanosImg d-flex flex-no-wrap justify-between" style="text-align: center; width:100%; margin-top:80px">
            <v-img
              :src="getRestaurantImage(restaurant.image)"
              max-height="200"
              min-width="128"
              min-height="200"
              style="text-align: center; width:100%;">
            </v-img>
          </div>

          <v-card-title>
            {{restaurant.name}}
          </v-card-title>

          <span>{{restaurant.address}}</span>
            <br>
          <span>{{restaurant.contact}}</span>
          <!-- goToRestaurant @click with restaurant.id is to bring through each restaurant when selected -->
          <v-card-actions>
            <v-btn
              color="orange darken-4"
              text
              @click="goToRestaurant(restaurant.id)"> 
              VER
            </v-btn>
          </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

 export default {
  data:() => ({
    restaurants: [],
    categories: [],
    selectedCategories: []
  }),

  methods:{
    // retrieves all restaurants //   
    getRestaurants () {
      axios.get('http://localhost:3000/restaurant').then((response) => {
        this.restaurants = response.data.data 
      })
    },
    // retireves all categories 
    getCategories () {
      axios.get('http://localhost:3000/categories').then((response) =>{
        this.categories = response.data
      })
    },

    // get each image from restaurants - return a defualt image if none available // 
    getRestaurantImage (image) {
      if (!image) {
        return require('../assets/default.png') //create default img
      }
        return require('../assets/' + image)
    },

    //in response to the "VER" btn - redirects to each restaurants own path // 
    goToRestaurant(id){
        this.$router.push('/restaurant/' + id)
    }
  },

  async created() {
        await this.getRestaurants()
        await this.getCategories()
        

    },

    



  

}

</script>

<style scoped>

.search-container{
  background-color: #05c1c1;
  height: 45px;
  width: 600px;
  margin-left: 33%;
  margin-top: -270px;
  padding:10px 10px;
  border-radius: 5px;
  position: relative;

}

.btn-search{
  background-color: #05c1c1;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 7px 24px;
  border: none;
  border-radius: 5px;
  top: -4px;
  left: 74%;
  height: 45px;
  width: 40px;
  padding: 10px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.btn-search:hover{
  background-color: #ff7503;
  color: white;
}

::placeholder{
  color:white;
  padding-bottom: 15px;
}

.searchCheckboxes{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: right;
  margin-top: 25px;
  margin-left: 63px;
  padding: 5px;
  align-items: center;
  width: 150px;
}

label{
  color: #05c1c1;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 2px;
}

.v-card__title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  color: #05c1c1;
}

span{
  margin-left: 20px;
}

.searchBox{
  margin-top: -6px;
}
/* change checkbox colors and alignment with time */
</style>