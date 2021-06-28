<template>
  <div class="container">
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
    </div>

    <div>
        <v-row class="mt-12"
        width="600px">

        <v-col cols="12" sm="6" md="4" lg="6" xl="4"
          v-for="n in 6"
          :key="n"
        >
          <v-card
            class="mx-auto"
            width="400px"
          >
          <div class="5oceanosImg d-flex flex-no-wrap justify-between" style="text-align: center; width:100%; margin-top:80px">
            <v-img
              src="../assets/5oceanos.png"
              max-width="300px"
              max-height="200"
              min-width="128"
              min-height="200"
              style="text-align: center;"
              
            >
            </v-img>
          </div>

          <v-card-title>
            5 Oceanos
          </v-card-title>

          <v-card-actions>
            <v-btn
              color="orange darken-4"
              text
            >
              VER
            </v-btn>
          </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>


</template>

<script>
 export default {
  data:() => ({
    n:[]
  })
  

 }

</script>

<style scoped>

.search-container{
    background-color: #05c1c1;
    height: 45px;
    width: 600px;
    margin-left: 25%;
    margin-top: -25px;
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
    top: 402px;
    left: 955px;
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
  width:423px;
}

label{
  color: #05c1c1;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 2px;
}

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

/* change checkbox colors and alignment with time */
</style>