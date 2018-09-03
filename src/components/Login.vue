<template>

  <div class="login-wrapper border border-light" style="background-color: rgb(232,77,32)">
   <!--link rel="icon" type="image/png" href="http://example.com/image.png" />
   <link rel="icon" type="image/png" href="http://localhost:8080/static/img/01.png" />
<img src="http://localhost:8080/static/img/01.png" alt="Smiley face" class="img-thumbnail" height="30" width="30"-->
    <form class="form-signin" @submit.prevent="login">
      
      <h2 class="form-signin-heading">{{'Iniciar sessió'|translate}}</h2>
      <label for="inputEmail" class="sr-only">Correu electronic</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" v-bind:placeholder="'Correu electronic'|translate" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" v-bind:placeholder="'contrasenya'|translate" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">{{'Iniciar sessió'|translate}}</button>

      <span>{{error|translate}}</span>
    </form>
    <a href="#/register"><button class="btn btn-lg btn-primary btn-block" type="submit">{{'Registrar-se' |translate}}</button></a>
  </div>
</template>

<script>


import auth from '../auth/index.js'
import Vue from 'vue'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error:'',
      lang:auth.user.lang,
      string1:{'cat':'iniciar  sessiò','es':'iniciar session'}
    }
  }
  ,
  computed:{
        language: function () {
      return this.$i18n.locale()
    }
  },
  methods: {
    setValue(lang){
    this.lang=lang
    },
    returnLanguage(){
      console.log("fired")
      this.lang=auth.user.lang
return auth.getLang()
    },
 login () {
  this.$http.post('login', { username: this.email, password: this.password })
    .then(request => this.loginSuccessful(request))
    .catch(() => this.loginFailed())
},
    loginSuccessful (req) {
      if (!req.data.access_token) {
        this.loginFailed(req.data.message)
        return
      }
      this.error = ''
      localStorage.access_token = req.data.access_token
      localStorage.refresh_token = req.data.refresh_token
      auth.user.authenticated=true;
      console.log(auth.decoded())

      setTimeout(() => {
      if (auth.decoded().user_claims.admin==1)
        this.$router.replace(this.$route.query.redirect || '/admin')
      else
       this.$router.replace(this.$route.query.redirect || '/user')
   }, 1000);
    },
    loginFailed (message) {
      this.error = message
      //this.$store.dispatch('logout')
      delete localStorage.token
   

    },
  },updated(){}
}
</script>

<style lang="css">
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
