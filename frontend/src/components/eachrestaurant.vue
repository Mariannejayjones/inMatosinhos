<template>
  <div class="restaurantMain">
    <v-card
      v-if="restaurant"
      :loading="loading"
      class="mx-auto my-12"
      max-width="650">

      <template slot="progress">
        <v-progress-linear
          color="cyan darken-3"
          height="10"
          indeterminate>
        </v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="getRestaurantImage(restaurant.image)">
      </v-img>
    <!-- restaurant.image ---- to bring through each image from each restaurant  -->
      <v-card-title>{{restaurant.name}}</v-card-title> 

      <v-card-text>
        <v-row
          align="center"
          class="mx-0">

          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14">
          </v-rating>

        </v-row>

        <div class="my-4 text-subtitle-1">
          <div>
          Preço médio: {{avgPrice}} 
          </div>
          <div>
          {{restaurant.category}}
          </div>
        </div>

      </v-card-text>

      <v-card-title>HORÁRIO DISPONÍVEL (hoje)</v-card-title>

      <v-card-text>
        <v-chip-group
          v-for="timeSlot in this.timeSlots"
          :key="timeSlot.id"
          v-model="selection"
          active-class="orange darken-4 white--text"
          column>

          <v-chip>{{timeSlot.start_time}}</v-chip>
<!-- 
          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip> -->

        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange darken-4"
          text
          @click="reserve()">

          <!-- <v-row justify="center">
            <v-date-picker
              v-model="picker"
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              header-color="cyan darken-2">
            </v-date-picker>
          </v-row> -->
          Reserve
        </v-btn>

        <!-- ementa -->
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500">

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange darken-4"
                text
                v-bind="attrs"
                v-on="on"
                @click="ementa()">
                Ementa
              </v-btn>
            </template>

            <v-card
              v-if="restaurant.menu">
                <v-card-title class="text-h5 grey lighten-2">
                  EMENTA
                </v-card-title>

<!-- // @change - allows the event to vary if selected or not selected -in this case, within the checkbox selection // -->
                <v-card-text 
                  v-for="menuItem in restaurant.menu"
                  :key="menuItem.id">
                    <input v-model="eachItem" type="checkbox" :id="menuItem.id" :value="menuItem.id" @change="changeOrder($event, menuItem)">
                    <label :for="menuItem.id">{{menuItem.name}}</label>
                    <div>{{menuItem.price}}€</div>
                    <br>
                </v-card-text>

              <v-divider></v-divider>

                <v-card-text
                  v-if="checkItems">
                    <v-list-item>
                      <v-list-item-content
                        v-for="checkItem in checkItems"
                        :key="checkItem.id">
                          <v-list-item-title>{{checkItem.name}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </v-card-text>

              Total: {{totalPrice.toFixed(2)}} € 
<!-- // toFixed - enforces number of decimal places to change // -->

              <!-- encomendar -->
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn
                    color="orange daken-4"
                    text
                    @click="addTocheckItems()">
                  ENCOMENDAR
                  </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import axios from 'axios'
// import moment from 'moment'

  export default {
    data: () => ({
      loading: false,
      selection: 1,
      dialogm1: '',
      dialog: false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menuItems: {}, 
      eachItem: [],
      checkItems: [],
      dishItem: {},
      restaurant: null,
      timeSlots: {},
    }),

    methods: {
      reserve() {
        this.picker = true
      },

      addTocheckItems() {
        this.loading = true
        axios.get(`http://localhost:3000/menuitems/${this.eachItem}/name`).then((response) => {
          console.log(response)
            this.dishItem = response.data.data
        })
            this.loading = false
              this.checkItems.push(this.dishItem)
                this.eachItem = null
      },

      getRestaurant() {
        this.loading = true
        axios.get('http://localhost:3000/restaurant/' + this.$route.params.id).then((response) => {
          console.log(response)
          this.restaurant = response.data.data
        })
        this.loading= false

      },

      getRestaurantImage (image) {
      if (!image) {
        return  require('../assets/default.png') //create default img
      }
        return require('../assets/' + image)
      },

// get time slot for every restaurant - each id //
      getTimeSlot(){
        this.loading = true
          axios.get('http://localhost:3000/timeslots/' + this.$route.params.id).then((response) => { 
            console.log(response) // id in params refers to id named in path and not a a value of an attribute - router - index.js
            this.timeSlots = response.data.data
          })
          this.loading= false
      },
// if checkbox selected - add amount or substract amount  - price and name // 
      changeOrder(event, menuItem){
        if(event.target.checked) {
          this.checkItems.push(menuItem);
          this.totalPrice += parseFloat(menuItem.price); // parseFloat -  converts strings to float- as in decimal number //
        } else {
          this.totalPrice -= parseFloat(menuItem.price);
          this.checkItems = this.checkItems.filter(function(obj){ // function applied to all items in list -  Filter 
            return obj.id !== menuItem.id // function must return true for all items we want to keep listed as selected 
          })
        }
      }

    },

    computed:{
    // create average between the max price and min price range -  max + min divided by 2 // 
      avgPrice(){
        if(!this.restaurant.pricerangemaxmin||!this.restaurant.pricerangemax){return}
        let min = this.restaurant.pricerangemin
        let max  = this.restaurant.pricerangemax

        return (max + min) /2
      },

      // reservationTime(){
      //   let start = this.timeSlot[0].start_time
      //   let date = moment(start,'HH:mm:ss')
      //   var travelTime = date.add(2, 'hours').format('HH:mm');

      //     return travelTime        
        
      // },
    },

    created(){
      this.totalPrice = 0.0;
      // this.ementa()
      this.getRestaurant()
      this.getTimeSlot()
    }
  }
</script>

<style scoped>

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

.restaurantMain{
  margin-top: -40px;
  margin-bottom: 60px;
}

label{
  padding:5px;
}

</style>