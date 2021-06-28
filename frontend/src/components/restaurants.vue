<template>
<!--layout for searh bar and searchboxes-->
  <div class="search-container">
    <div class="searchBox">
      <input placeholder="PESQUISAR" type="search">
      <button id="searchBox" class="btn-search">GO!</button>
    </div>
    
    <div class="searchCheckboxes">
      <input type="checkbox" id="portuguesa" name="portuguesa" value="portuguesa"><br><br>
       <label for="portuguesa">Portuguesa</label><br>
      <input type="checkbox" id="marisco" name="marisc" value="marisc"><br><br>
       <label for="marisco">Marisco</label><br>
      <input type="checkbox" id="sushi" name="sushi" value="sushi"><br><br>
       <label for="sushi">Sushi</label><br>
      <input type="checkbox" id="italiana" name="italiana" value="italiana"><br><br>
       <label for="italiana">Italiana</label><br><br>
      <input type="checkbox" id="steakhouse" name="steakhouse" value="steakhouse"><br><br>
       <label for="steakhouse">Steakhouse</label><br>
      <input type="checkbox" id="chinesa" name="chinesa" value="chinesa"><br><br>
       <label for="chinesa">Chinesa</label><br>
      <input type="checkbox" id="indiana" name="indiana" value="indiana"><br><br>
       <label for="indiana">Indiana</label><br>
      <input type="checkbox" id="peixe" name="peixe" value="peixe"><br><br>
       <label for="peixe">Peixe</label><br>
      <input type="checkbox" id="grill" name="grill" value="grill"><br><br>
       <label for="grill">Grill</label><br>
      <input type="checkbox" id="tapas" name="tapas" value="tapas"><br><br>
       <label for="tapas">Tapas</label><br>
    </div>
<!-- layout for restaurant searches -->
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-img
      src="../assets/5oceanos.png"
      height="200px"
      width="450px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/srdopadrao.png"
      height="200px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/bonsai.png"
      height="200px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/omercado.png"
      height="200px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/saltaomuro.png"
      height="200px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/zeferino.png"
      height="200px"
    ></v-img>

    <v-card-title>
      5 Oceanos
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange darken-4"
        text
      >
        VER
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
            small text?
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

 </div>


</template>

<script>
 export default {
  data:() => ({
    show: false,
  })
  
 }

</script>

<style scoped>

.search-container{
    background-color: #05c1c1;
    height: 45px;
    width: 400px;
    margin-left: 33%;
    margin-top: -7px;
    padding:10px 10px;
    border-radius: 5px;
    position: inherit;

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
    top: 3px;
    left: 407px;
    height: 40px;
    width: 40px;
    padding: 10px;
    position: absolute;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.btn-search:hover{
    background-color: #ff7503;
    color: white;
}

::placeholder{
  color:white;
}

.searchCheckboxes{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top:25px;
  padding: 5px;
  align-items: flex-start;
}

label{
  color: #05c1c1;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 2px;
}

.v-card_title{
  color:#05c1c1;
}

/* change checkbox colors and alignment with time */
</style>