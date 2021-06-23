<template>
<!-- //v card serves as a container -->
  <v-app>
    <v-card width="400" class="mx-right mt-5">
      <v-card-title> <!-- // proper heading has spacing and positioning -->
        <h1 class="display1">Login</h1>
      </v-card-title> 
      <v-card-text> <!-- // serves as body -->
        <v-form>
          <v-text-field 
            label="email" 
            prepend icon="mdi-email" 
          /> <!-- // input elements are called text field --> <!-- vuetify icons --->
          <v-text-field 
            :type="showPassword ? 'text' : 'password'"   
            label="Password"
            prepend icon="mdi-lock"
            append-icon="showPassword ? 'mdi-eye' : 'mid-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider> <!--create divider between text and action/buttons - resembles a <div class=""> -->
      <v-card-actions> <!--creates our actions - our buttons -->
        <v-btn color="cyan darken-2">Login</v-btn>
        <v-btn color="orange darken-3">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
	
</template>

<script>

// export default {
//     name:"App",
// 	data() {
// 		return {
// 			username:"",
// 			password:""
// 		};
// 	},

	// methods: {
  // // async fetchLogin() const response = await axios.get("http://localhost:3000/{
  //   const { username, password } = this;
  //   const res = await fetch()
  //   ("http://localhost:3000/"),
  // }

	// 	method: "POST",
  //   headers: {

  //   }


	// }

  // }
 export default {
   name:"App",
   components:{

   },
   data() {
     return{
        showPassword: false
     }
  },
 }

</script>

scoped stays in this own content
<style scoped> 

</style>
