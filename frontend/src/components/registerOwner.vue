<template>
  <div id="vuejs">
    <main id="mainForm" style="display: flex;">
      <form id="registerForm" action class="registerForm">
        <div class="formHeader">
          <span @click="closeForm()" class="closeBtn"> x </span>

        <div class="form-subheader">
          <h2 class="formSubtitle">Registo Administrador</h2>
        </div>
        <div class="sub-container">
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
          <label for="password">Password</label>
        </div>
        <div>
          <input type="password" required="required" id="password" name="password" placeholder="password">
        </div> 
        <div>
          <label for="password">Verificar Password</label>
        </div>
        <div>
          <input type="password" required="required" id="password" name="password" placeholder="verificar password">
        </div> 
        <div>
          <label for="name">Nome do establecimento</label>
        </div>
        <div>
          <input type="text" required="required" id="name" name="name" placeholder="Nome do establecimento">
        </div>
        <div>
          <label for="contact">Contactos do establecimento</label>
        </div>
        <div>
          <input type="number" required="required" id="contact" placeholder="Contato telefónico">
        </div>
        <div>
          <label for="text">Morada completa</label>
        </div>
        <div>
          <input type="text" required="required" id="address" placeholder="Morada completa">
        </div>
        <div>
          <label for="text">Ementa</label>
        </div>
        <div>
          <input type="file" required="required" id="ementa" name="ementa">
        </div>
        <div>
          <label for="message">Esclarecimentos/outros</label>
        </div>
        <div>
          <textarea name="message" id="message" rows="10"></textarea>
        </div>
        
        <br>

        <div>
          <input type="submit" value="Enviar Registo">
        </div>
      </form>
    </main>
  </div>
</template>

<script>

// function closeForm() {
//   document.getElementById('mainForm').style.display = "none";
// }
    
</script>


<style scoped>
