<template> 
<!--individual restaurant layout from vuetify--->
  <v-card
    :loading="loading"
    class="mx-auto my-12 m-20 pa-10 ma-5"
  >
  <template slot="progress"> <!--loading bar above image-->
    <v-progress-linear
      color="#4db6ac"
      height="10"
      indeterminate
    >
    </v-progress-linear>
  </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    >
    </v-img> <!--image brought from DB --->

    <v-card-title>Cafe Badilico</v-card-title> <!-- name of restuarant -->

    <v-card-text> 
      <v-row
        align="center"
        class="mx-0"
      >
      <v-rating
        :value="4.5"
        color="#f57c00"
        dense
        half-increments
        readonly
        size="14"
      >
      </v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

        <div class="my-4 text-subtitle-1">
          $ • Italian, Cafe
        </div>

        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
          <v-btn
            color="#009688"
            text
            @click="reserve"
          >
            Reservar
          </v-btn>

          <v-btn
            color="#009688"
            text
            @click="take-away"
          >
            Take-away
          </v-btn>
        </v-card-actions>
      </v-card>

</template>


<script>
// import axios from 'axios'

  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 1000) 
      },

      // get() {axios}
    },

    created() {
      this.loading = true

        setTimeout(() => (this.loading = false), 1000) // setting for loading bar speed
    }
  }
</script>
