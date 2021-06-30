<template>
  <div class="restaurantMain">
    <v-card
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
        src="../assets/5oceanos.png">
      </v-img>

      <v-card-title>5 OCEANOS</v-card-title>

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
          $$ . Marisco; Peixe; Carne
        </div>

      </v-card-text>

      <v-card-title>HORÁRIO DISPONÍVEL (hoje)</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="orange darken-4 white--text"
          column>

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
          @click="reserve()">

          <v-row justify="center">
            <v-date-picker
              v-model="picker"
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              header-color="cyan darken-2">
            </v-date-picker>
          </v-row>
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

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                EMENTA
              </v-card-title>

              <v-card-text>
                <input type="radio" id="one" value="One">
                <label for="one">One</label>
                <br>
                <input type="radio" id="two" value="Two" >
                <label for="two">Two</label>
                <br>
              </v-card-text>

              <v-divider></v-divider>

              <!-- encomendar -->
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn
                    color="orange daken-4"
                    text
                    @click="dialog = false">
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
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      dialogm1: '',
      dialog: false,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

    methods: {
      reserve() {
        this.picker = true
      },

       ementa() {
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

.restaurantMain{
  margin-top: -40px;
  margin-bottom: 60px;
}

</style>