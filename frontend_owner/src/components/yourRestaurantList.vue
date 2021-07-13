<template>
    <v-card>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="restaurants"
            :search="search"
            :items-per-page="5"
            item-key="name"
            class="elevation-1 pa-4"
            :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
            }">

            <template v-slot:item="props">
                <tr>
                    <td >{{ props.item.name }}</td>
                    <td >{{ props.item.category }}</td>
                    <td>{{ props.item.address }}</td>
                    <td>{{ props.item.contact }}</td>
                    <td @click="pushToRestaurant(props.item)" style="pointer: click">SHOW 
                        <v-btn @click="editRestaurant">EDITAR</v-btn>
                    </td>

                    
                    <!-- <td>  -->

      <!-- <v-btn
      fab
      dark
      large
      color="cyan"
      @click="openMaintenaceModal(props.item, 'check')>
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>
               -->
                        <!-- <i class="fas fa-edit" style="cursor: pointer" @click="openMaintenaceModal(props.item, 'edit')"> </i> -->
                                                                                 
                    <!-- </td>                     -->
                </tr>
            </template>
        </v-data-table>
      
    </v-card>
</template>

<script>
import axios from 'axios'
import{ mapGetters } from 'vuex'
    export default {

        data () {
            return {
                
                restaurants: [],
                search: '',
                headers: [
                    {
                        text: 'Nomes',
                        align: 'center',
                        sortable: false,
                        value: 'name',
                    },       
                    { text: 'Categorias', value: 'categories', align: 'center' },
                    { text: 'Morada', value: 'address', align: 'center' },
                    { text: 'Contacto', value: 'contact', align: 'center' },
                    
                    { text: 'Edit', value: 'edit', align: 'center'}
                ],
               
                
            }
        },

      computed:{
        ...mapGetters([
          'user',
          'token'
        ]),
      },
    
        methods: {
            getOwnedRestaurants () {
                axios.get(`http://localhost:3000/ownedRestaurants/${this.user.id}`).then((response) => {
                   
                    this.restaurants = response.data.data 
                })
            },           
            
            openMaintenaceModal (row, mode) {
                // user que estas a editar
        
                this.user = row
                this.mode= mode
                this.show = true
            },
            async saveUser (user, mode) {
                debugger
                this.show = false
                if (mode == 'check') {
                    return
                }
                console.log(user)
                
                let doctorUpdate = {
                    "certificate_number": user.certificate_number,
                    "name": user.name,
                    "birthdate": user.birthdate,
                    "address": user.address,
                    "zip_code": user.zip_code,
                    "email": user.email,
                    "mobile_phone": user.mobile_phone,
                    "nif": user.nif,
                    "password": user.password,
                    "status":user.status,
                    "gender": user.gender,
                    "image_src": user.image_src
                }
                
                await axios.put(`http://localhost:3000/doctors/${user.id}`, doctorUpdate).then((response) => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.status,
                        showConfirmButton: false,
                        timer: 1500
                    })                  
                })
                .catch((error) => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'ERROR!',
                        text: error,
                        showConfirmButton: false,
                        timer: 1500
                    })
                });   
                this.getDoctors()                        
            },

            pushToRestaurant(item){
                debugger
              this.$router.push(`restaurants/${item.restaurant_id}`)
            }

                
        },
        
        created() {
            this.getOwnedRestaurants()
  
            
        }
    }
</script>

<style>
tbody tr:nth-of-type(odd) {
background-color: rgba(0, 0, 0, .05);
}
</style>