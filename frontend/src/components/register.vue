<template>
  <div>
    <main id="mainForm" style="display: flex;">
      <form id="registerForm" action class="registerForm">
        <div class="formHeader">
          <button @click="closeForm = !closeForm" class="closeBtn"> x </button>
          <h1 class="formTitle">Registe-se</h1>
        </div>

        <div class="container">
        <div>
          <label for="name">Nome e Apelido</label>
        </div>
        <div>
          <input type="text" required="required" id="name" name="name" placeholder="Nome e Apelido">
        </div>
        <div>
          <label for="dateOfBirth">Data de Nascimento</label>
        </div>
        <div>
          <input type="date" required="required" id="dateOfBirth" name="dateOfBirth" placeholder="dd/mm/yyyy">
        </div>
        <div>
          <label for="email">E-mail</label>
        </div>
        <div>
          <input type="email" required="required" id="email" name="email" placeholder="E-mail">
        </div> 
        <div>
          <label for="contact">Contacto</label>
        </div>
        <div>
          <input type="number" required="required" id="contact" name="contact" placeholder="contacto">
        </div> 
        <div>
          <label for="password">Password</label>
        </div>
        <div>
          <input type="password" required="required" id="password" name="password" placeholder="password">
        </div> 
        <div>
          <label for="text">Morada completa</label>
        </div>
        <div>
          <input type="text" required="required" id="address" placeholder="Morada completa">
        </div>

        <div>
          <input @click="addForm()" type="submit" value="Enviar Registo"/>
        </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>

//  export default {
//     methods:{
//       addForm(){
//         this.$router.push('/restaurants')
//       }
//     }
//   }
    
</script>


<style scoped>

#mainForm {
  display: none;
  justify-content: center;
  z-index: 2;
}

* {
  box-sizing: border-box;
}
 
.registerForm {
  height: 100%;
  max-width: 100%;
  width: 580px;
  position: fixed;
  top: 10px;
  right: 10px;
  background-color:#fff;
  box-shadow: 0 4px 8px 0 darkcyan, 0 6px 20px 0 darkcyan;
  overflow-y: scroll;
  transition: 0.5s all;
  z-index: 3;
  opacity: 0.9;
}

.registerForm .closeBtn {
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 36px;
    color: #fff;
    cursor: pointer;
}

.formHeader, h2 {
  background-color: darkcyan;
  padding: 12px;
  color: #fff;
  padding: 12px;
  border: solid;
  margin-bottom: 10px;
}

.container {
  padding: 0 30px;
  margin-top: 30px;
}

textarea, input[type=file] {
  border: 2px solid darkcyan;
  resize: none;
}

input[type=email], input[type=number], input[type=password], input[type=text], input[type=file], input[type=date], textarea, input[type=submit] {
  width: 97%;
  padding: 8px 45px;
  border: none;
  border: 2px solid darkcyan;
  outline: none;
  line-height: 1;
  margin-top: 5px;
  margin-bottom: 30px;
  margin-left: 10px;
  background-color: #fff;
}

input[type=submit] {
  background-color: darkcyan;
  width: 35%;
  color: #fff;
  padding: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 20px 0 darkcyan;
  border: none;
  border-radius: 50px;
  margin-top: 20px;
  margin-left: 33%;
}

label {
  cursor: default;
  color: darkcyan;
  padding: 8px 45px; 
}

</style>