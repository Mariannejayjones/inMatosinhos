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
            Preço médio: {{avgPrice}} €
          </div>
          <div>
            {{restaurant.category}}
          </div>
        </div>
      </v-card-text>

<!-- time slots available for that day -->
      <v-card-title>
        HORÁRIO DISPONÍVEL: 
          <div class="date">
            <input type="date" id="date" name="date"
            v-model="pickedDate">
          </div>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-chip-group
              v-model="selection"
              active-class="orange darken-4 white--text"
              column>
             
              <v-chip
                v-for="todaySlot in todaySlots"
                :key="todaySlot.id"
                @click="selection = todaySlot.id">
                {{todaySlot.start_time}}
              </v-chip>

            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="text-center">
      <v-card-actions>
        <v-btn
          color="orange darken-4"
          text
          outlined
          @click="reserve(); text ='Reservado com sucesso!';snackbar = true">
          Reserve
        </v-btn>
      </v-card-actions>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout">

      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="cyan"
          text
          v-bind="attrs"
          @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

        <div class="row">
          <div class="col-lg-12">
            <v-card
              v-if="restaurant.menu">
            </v-card>
          </div>
        </div>
       
  
              <v-divider></v-divider>

              <v-card-title class="text-h5">
                O seu pedido:
              </v-card-title>
              <v-card-text
                  v-if="checkItems">
                  <v-row>
                     <v-col cols="12" sm="12"
                     v-for="checkItem in checkItems"
                        :key="checkItem.id">
                    <v-list-item>
                      <v-list-item-content>

                                    
                                <v-list-item-title>{{checkItem.name}}</v-list-item-title>
                                <v-list-item-title>Doses: {{checkItem.quantity}}</v-list-item-title>
                                <v-list-item-title>Subtotal: {{checkItem.subTotal}} €</v-list-item-title> 
                                <br>
                            
                          
                      </v-list-item-content>
                    </v-list-item>
                    </v-col>
                    </v-row>
              </v-card-text>

              <div class="total">
                Total: {{total}} € 
              </div>
            
              <div>
                <i>* Morada alternativa: *</i><input type="text" id="address" name="address" placeholder="* Morada alternativa *">
              </div>  
              {{user.address}}
              <div class="text-center">
                <v-btn
                  dark
                  color="orange darken-4"
                  @click="delivery(); text ='Encomendado com sucesso!'; snackbar = true">
                  Encomendar
                </v-btn>
              
              </div>   

              <v-divider></v-divider>

              <v-card-title class="text-h5">
                EMENTA
              </v-card-title>
          <v-card-text 
            v-for="menuItem in restaurant.menu"
            :key="menuItem.id">
              <input type="number" v-model="eachItem" :id="menuItem.id" v-model.number="menuItem.quantity">
              <label :for="menuItem.id">{{menuItem.name}}</label><br>
              <i>*{{menuItem.description}}</i><br>
              <div>{{menuItem.price}}€</div>
              <button @click="addOrder(menuItem)" outlined> Add to cart</button>
              <br>
          </v-card-text>       
        
    </v-card> 
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      loading: false,
      selection: 1,
      dialogm1: '',
      dialog: false, 
      eachItem: [],
      checkItems: [],
      restaurant: null,
      timeSlots: {},
      todaySlots: null,
      pickedDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      cartItems: [],
      checkItem: [], 
      snackbar: false,
      text: 'Reservado com sucesso!',
      timeout: 2000,
      deliveryId: null
    }),

    methods: {
      // post reservations to DB //
      reserve() {
        this.loading = true
        let reservationInfo = {
          "user_id": 1,
          "restaurant_id": this.$route.params.id,
          "reservation_time": this.timeSlots[this.selection].start_time,
          "reservation_day" : this.pickedDate
        }
        axios.post(`http://localhost:3000/reservations`, reservationInfo).then((response) => {
          console.log(response)
        })
          this.loading = false
      },

      //post deliveries to DB //
      async delivery() {
        this.loading = true
        let deliveryInfo = {
          "user_id": 1,
          "restaurant_id": this.$route.params.id,
          "price": this.total
        }
       await axios.post(`http://localhost:3000/delivery`, deliveryInfo) .then(response => {
          this.deliveryId = response.data.data.id
            })
            .catch(errors => {
                console.log(errors);
            }); 
            this.itemsForDelivery(this.deliveryId)
        this.loading = false
      },

      itemsForDelivery(id) {
        this.loading = true
        for ( var i = 0;  i < this.checkItems.length ;  i++ ) {
        let deliveryItems = {
          "delivery_id": id,
          "quantity": this.checkItems[i].quantity,
          "restaurant_menu_id": this.checkItems[i].id,
          "sub_total": this.checkItems[i].subTotal,
          "price": this.total
        }
        axios.post(`http://localhost:3000/deliveryitems`, deliveryItems).then((response) => {
          console.log(response)
        })
        }
          this.loading = false
      },

      addToCart(item) {
        this.checkItem = item
        this.checkItem.quantity = 1
        this.checkItem.subTotal = item.price
      },

      getRestaurant() {
        this.loading = true
        axios.get('http://localhost:3000/restaurant/' + this.$route.params.id).then((response) => {
          console.log(response)
          this.restaurant = response.data.data
          _.forEach(this.restaurant.menu, menuItem => {
            menuItem.quantity = 1
          })
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

      addOrder(menuItem){
        let foundedMenuItem = _.find(this.checkItems, checkItem => {
          return checkItem.id === menuItem.id
        })

          if (foundedMenuItem) {
            foundedMenuItem.quantity += menuItem.quantity
            foundedMenuItem.subTotal = foundedMenuItem.quantity * menuItem.price
          } else {
            menuItem.subTotal = menuItem.quantity * menuItem.price
            this.checkItems.push(_.cloneDeep(menuItem))
            }
            
            this.quantity = 1
            this.eachItem = false
 },

      // get time slots for each day for one restaurant // 
      getTodaySlots(){
        this.loading = true
          axios.get('http://localhost:3000/timeslots/' + this.$route.params.id + '/restaurant/') .then((response) => { 
            console.log(response) 
            this.todaySlots = response.data.data
          })
          this.loading= false
      },

    

    },

    computed:{
      // create average between the max price and min price range -  max + min divided by 2 // 
      avgPrice() {
        if(!this.restaurant.pricerangemin||!this.restaurant.pricerangemax){return}
        let min = this.restaurant.pricerangemin
        let max = this.restaurant.pricerangemax
          return (max + min) /2
      }, 

      total(){
        let done = _.sumBy(this.checkItems, 'subTotal') 
        return done 
     
      },

      ...mapGetters([
      'user',
      ])

    },

    watch:{
      pickedDate(val) {
        this.getTodaySlots()
        console.log(val)
      }
    },

    created(){
      this.totalPrice = 0.0;
      this.getRestaurant()
      this.getTimeSlot()
      this.getTodaySlots()
    }
  } 
</script>

<style scoped>

.v-card__title{
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
  margin-top: -80px;
  margin-bottom: 60px;
}

label{
  padding:5px;
  color: #05c1c1;
}

.total{
  color: #05c1c1;
  padding: 25px;
}

.date{ 
  margin-left:10px;
}

button, input, select, textarea{
  background-color: white;
  color: #ff7503;
  padding: 4px;
}

.v-list-item__title{
  color:#05c1c1

}

i{
  color:#ff7503;
  margin-left: 30px
}

#address{
width: 200px;
margin-left: 10px

}





</style>