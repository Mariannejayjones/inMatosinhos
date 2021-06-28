<template>
<div class="restaurantMain">
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="450">

    <template slot="progress">
      <v-progress-linear
        color="cyan darken-3"
        height="10"
        indeterminate>
      </v-progress-linear>
    </template>

    <v-img
      height="250"
      src="../assets/5oceanos.png"
    ></v-img>

    <v-card-title>5 OCEANOS</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

      </v-row>

      <div class="my-4 text-subtitle-1">
        $$ . Marisco; Peixe; Carne
      </div>

    </v-card-text>

    <v-card-title>HORÁRIO DISPONÍVEL</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="orange darken-4 white--text"
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
        color="orange darken-4"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>

      <v-btn
        color="orange darken-4"
        text
        @click="encomende"
      >
        Encomende
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card
    class="mx-auto my-12"
    max-width="450">

    <v-card-title>EMENTA</v-card-title>

    <v-card-text>

      <div class="menuItems display: flex; justify-content: space-around; padding-left: 10%; padding-bottom: 38px;">
        <input type="checkbox" id="jack" value="Jack" v-model="menuItems">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="menuItems">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="menuItems">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>

      </div> 

       
    </v-card-text>



  </v-card>
    
</div>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      menuItems: []
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },

      encomende () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
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

</style>