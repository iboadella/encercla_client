<template>
  <div class="hello">
    
    <img src="/static/img/svgs/logoinicial.svg" alt="Smiley face" height="620" width="620">
 <a href ="/#/login" role="button" class="btn  btn-lg btn-primary" style="background-color:white; color:black">{{'Iniciar sessió'|translate}}</a>
<a href="/#/register" class="btn btn-lg btn-danger"role="button" style="background-color:white; color:black">{{'Registrar-se'|translate}}</a>
  </div>
</template>

<script>
export default {
  name: 'Inicial',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
