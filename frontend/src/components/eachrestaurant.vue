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
<!-- array is at 0 to allow for each index  -->
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
          v-model="selection"
          active-class="orange darken-4 white--text"
          column>

          <v-chip>{{restaurant.timeSlot}}</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>

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

                <v-card-text 
                  v-for="menuItem in restaurant.menu"
                  :key="menuItem.id">
                    <input v-model="eachItem" type="checkbox" :id="menuItem.id" :value="menuItem.id" @change="changeTotal($event, menuItem.price)">
                    <label :for="menuItem.id">{{menuItem.name}}</label>
                    <div>{{menuItem.price}}€</div>
                    <br>
                </v-card-text>

              <v-divider></v-divider>

                <v-card-text
                  v-if="checkItems">
                    <v-list-item>
                      <v-list-item-content
                        v-for="(check, index) in checkItems"
                        :key="index">
                          <v-list-item-title>{{check[index].name}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </v-card-text>

              Total price: {{totalPrice.toFixed(2)}}€
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
import moment from 'moment'

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
      timeSlot: {},
      slots: {}
    }),

    methods: {
      reserve() {
        this.picker = true
      },

      // ementa() {
      //   this.loading = true
      //   axios.get('http://localhost:3000/menuitems/6').then((response) => {
      //     console.log(response)
      //       this.menuItems = response.data.data
      //       })
      //         this.loading= false

      // },

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

      getTimeSlot(){
        this.loading = true
          axios.get('http://localhost:3000/time-slots' + this.$route.params.id).then((response) => {
            console.log(response)
              this.timeSlot = response.data.data
              })
                this.loading= false
      },

      changeTotal(event, price){
        if(event.target.checked) {
          this.totalPrice += parseFloat(price);
        } else {
          this.totalPrice -= parseFloat(price);
        }
      }

    },

    computed:{
      avgPrice(){
        if(!this.restaurant.pricerangemin||!this.restaurant.pricerangemax){return}
        let min = this.restaurant.pricerangemin
        let max  = this.restaurant.pricerangemax

          return (max + min) /2
      },

      reservationTime(){
        let start = this.timeSlot[0].start_time
        let date = moment(start,'HH:mm:ss')
        var travelTime = date.add(2, 'hours').format('HH:mm');

          return travelTime        
        
      },
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