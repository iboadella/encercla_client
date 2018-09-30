<template>

  <div class="login-wrapper border border-light" style="background-color: rgb(232,77,32)">
   <!--link rel="icon" type="image/png" href="http://example.com/image.png" />
   <link rel="icon" type="image/png" href="http://localhost:8080/static/img/01.png" />
<img src="http://localhost:8080/static/img/01.png" alt="Smiley face" class="img-thumbnail" height="30" width="30"-->
    <form class="form-signin" @submit.prevent="callReset">
      
      <h2 class="form-signin-heading">{{'Recuperar contrasenya'|translate}}</h2>
      <label for="inputEmail" class="sr-only">Correu electronic</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" v-bind:placeholder="'Correu electronic'|translate" required autofocus>

      <button @click="callReset()" class="btn btn-lg btn-primary btn-block" type="submit" >{{'Recuperar contrasenya'|translate}}</button>

      <span>{{error|translate}}</span>
    </form>
   <p> {{text1|translate}}</p>
   <p> {{text2|translate}}</p>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email:'',
      error:''
    }
  },
  methods: {
    callReset(){
     this.$http.get('password/'+this.email, {})
    .then(request => this.error='Email enviada')
    .catch(() => this.error='Hi hagut un error')
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
body {
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>