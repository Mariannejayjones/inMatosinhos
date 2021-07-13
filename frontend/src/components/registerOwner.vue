<template>
  <div>
    <main id="mainForm" style="display: flex;">
      <form id="registerForm" action class="registerForm">

        <div class="formHeader">
          <button @click="closeForm()" class="closeBtn"> x </button>
        </div>
        <div class="form-subheader">
          <h2 class="formSubtitle">REGISTE * Novo Comércio *</h2>
        </div>

        <div class="sub-container">
          <div>
          <label for="name">Nome e Apelido</label>
        </div>
        <div>
          <input type="text" required="required" v-model="name" id="name" name="name" placeholder="Nome e Apelido">
        </div>
        <div>
          <label for="dateOfBirth">Data de Nascimento</label>
        </div>
        <div>
          <input type="date" required="required" v-model="dateOfBirth" id="dateOfBirth" name="dateOfBirth" placeholder="dd/mm/yyyy">
        </div>
        <div>
          <label for="email">E-mail</label>
        </div>
        <div>
          <input type="email" required="required" v-model="email" id="email" name="email" placeholder="E-mail">
        </div>
        <div>
          <label for="password">Password</label>
        </div>
        <div>
          <input type="password" required="required" v-model="password" id="password" name="password" placeholder="password">
        </div> 
        <div>
          <label for="name">Nome do establecimento</label>
        </div>
        <div>
          <input type="text" required="required" v-model="nameOfBusiness" id="nameOfBusiness" name="nameOfBusiness" placeholder="Nome do establecimento">
        </div>
        <div>
          <label for="contact">Contactos do establecimento</label>
        </div>
        <div>
          <input type="number" required="required" v-model="contact" id="contact" placeholder="Contato telefónico">
        </div>
        <div>
          <label for="text">Morada completa</label>
        </div>
        <div>
          <input type="text" required="required" v-model="address" id="address" placeholder="Morada completa">
        </div>
        <div>
          <label for="text">Ementa</label>
        </div>
        <div>
          <input type="file" required="required"  id="ementa" name="ementa">
        </div>
        <div>
          <label for="message">Esclarecimentos/outros</label>
        </div>
        <div>
          <textarea name="message" v-model="message" id="message" rows="10"></textarea>
        </div>
      
        <br>

        <div>
          <input @click="addForm()" type="submit" value="Enviar Registo"/>
        </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data (){
    return {
       name: null,
       dateOfBirth: null,
       email: null,
       contact: null,
       password: null,
       address: null,
       nameOfBusiness: null,
       message: null
    }
  },
    methods:{
      closeForm() {
      document.getElementById('mainForm').style.display = "none";
    },

addForm() {

        let submitInfo= {
        "name": this.name,
        "address": this.address,
        "date_of_birth": this.dateOfBirth,
        "phone": this.contact,
        "email": this.email,
        "password": this.password,
        "is_admin": 1
        
        }
        console.log(submitInfo)
        axios.post(`http://localhost:3000/users`, submitInfo).then((response) => {
          this.newUser = response.data.data.id
          alert('verificação enviada para o seu e-mail!')
                    
      })
        .catch((error) => {
        console.log(error)
        alert('ERROR')
        });
        this.closeForm()
      }
    }

  }

    
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

h2 {
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