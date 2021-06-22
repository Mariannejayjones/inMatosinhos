<template>
<!--layout main page and login button -->
  <div id="main">
    <div class="background">
      <img :src="require('./assets/backgroundImage.png')"/>
      <button id="openForm" @click="openform()" class="btnLogin">
        Login
      </button>
    </div>

      <hr> <!----colourful seperator--->

  <!--rows for images with search options and buttons --->

    <div class="row"> 
      <div class="searchColumns1">
        <img :src="require('./assets/restaurant.png')"/>
        <button id="restaurantgo" @click="restaurantgo()" class="btnRestaurant">
          Restaurantes
        </button>
      </div>

      <div class="searchColumns2">
        <img :src="require('./assets/store.png')"/>
        <button id="storego" @click="storego()" class="btnStore">
          Lojas
        </button>
      </div>

      <div class="searchColumns3">
        <img :src="require('./assets/services.png')"/>
        <button id="servicesgo" @click="servicesgo()" class="btnServices">
          Serviços
        </button>
      </div>

      <div class="searchColumns3">
        <img :src="require('./assets/agenda.png')"/>
        <button id="agendago" @click="agendago()" class="btnAgenda">
          Agenda
        </button>
      </div>
    </div>




    














  
      <!-- app
      color="#01579B"
      flat> -->

      <!-- <v-container class="py-0 fill-height"> 
        <v-avatar
          class="mr-10"
          color="#B3E5FC"
          size="32">
        </v-avatar> -->
<!--layout - buttons -->
        <!-- <v-btn
          v-for="link in links"
          :key="link"
          text
          color="#EF6C00">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            class="light-blue lighten-4"
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="category in categories"
                  :key="category.id"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ category.id}}
                      
                      {{ category.name }} 
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="#EF6C00"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            > -->
              <!--  -->
            <!-- </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app> -->
  
  </div>
</template>

<script>
  export default {
    name:''

  }

// import axios from 'axios'

//   export default {
//     data: () => ({
//       links: [
//         'Comunidade',
//         'Restaurantes',
//         'Lojas',
//         'Serviços',
//         'Transportes',
//       ],

//       categories: []
//     }),
//     methods: {
//       async fetchCategories(){


//         const response = await axios.get("http://localhost:3000/categories", {headers: { 
//             'Access-Control-Allow-Origin' : '*',
//             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI0MDY0NTEyfQ.gkFsvwr5S3ybCjDTfChnpz5DSgTMO8zTVEvm_66fDFg'
//           }}) 
//         this.categories = response.data
//       }
//     },

//     created (){
//       this.fetchCategories()

//     }
//   } -->
</script>

<style>
  img{
   height: 90%;
   width: 100%;   
  }

  hr{
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: 25px;
  background-color: #05c1c1;
  border-color: #05c1c1;
  }

  .btnLogin{
    background-color: #05c1c1;
    color: white;
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 30px;
    cursor: pointer;
    border: none;
    border-radius: 60px;
    top: 3%;
    left: 90%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btnRestaurant{
    background-color: #05c1c1;
    color: white;
    opacity: 0.9;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    cursor: pointer;
    border: none;
    top: 95%;
    left: 128px;
    width:16%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btnStore{
    background-color: #05c1c1;
    color: white;
    opacity: 0.9;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    cursor: pointer;
    border: none;
    top: 95%;
    left: 1129px;
    width:16%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btnServices{
    background-color: #05c1c1;
    color: white;
    opacity: 0.9;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    cursor: pointer;
    border: none;
    top: 95%;
    left: 2121px;
    width:16%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .btnAgenda{
    background-color: #05c1c1;
    color: white;
    opacity: 0.9;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    cursor: pointer;
    border: none;
    top: 95%;
    left: 3115px;
    width:16%;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  img.searchColumns1, img.searchColumns2, img.searchColumns3, img.searchColumns4{
    flex: 25%;
    padding: 5px;
  }

  .row{
    display: flex;
    border-style: solid;
    border-color: white;
    border-width: 130px;
  }




</style>
