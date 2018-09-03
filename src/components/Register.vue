
<template>

  <div class="register-wrapper border border-light">
   
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">{{"Donar d'alta la meva empresa" | translate}}</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" v-bind:placeholder="'Correu electronic'|translate" required autofocus>
      <div v-if="currentRoute" class="form-check float-left">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="admin">
        <label class="form-check-label" for="exampleCheck1">Administrator</label>
     </div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" v-bind:placeholder="'contrasenya'|translate" required>
<label for="confirmInputPassword" class="sr-only">Password</label>
<input v-model="confirmPassword" type="password" id="confirmInputPassword" class="form-control" v-bind:placeholder="'contrasenya'|translate" required>
      <div v-if="!currentRoute" class="form-check float-left">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="accept">
        <label class="form-check-label" for="exampleCheck1"><a href="#/conditions"> {{'Al registrar-te acceptes les nostres Condicions i la Política de privacitat'|translate}}</a></label>
     </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
      <span>{{error|translate}}</span>
    </form>
  </div>
</template>


<script>
import auth from '../auth/index.js'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword : '',
      error:'',
      admin:true,
      accept:false
    }
  },
  computed: {
    currentRoute(){
       //console.log(this.$route.path=='/registerAdmin')
       return this.$route.path=='/registerAdmin'
    },
  comparePasswords () {
    if (this.password === this.confirmPassword ) return true
    else {
     this.error=this.$i18n.translate('contrasenya no coincideix');
return false
    }
}
},
  methods: {

 register () {
  this.error='';
  if (!this.comparePasswords)
    { this.error=this.$i18n.translate('contrasenya no coincideix');
    return
  }

  if (this.currentRoute)
  {
   this.$http.post('adminregistration', { username: this.email, password: this.password ,admin:this.admin},{ headers: auth.getAuthHeader() })
    .then(request => {
                      this.error="created"
                      this.$router.replace(this.$route.query.redirect || '/registercompany/'+request.data.user_id)
                       })
    .catch(() => this.error = message)
   
  }
   else {
    if (!this.accept)
      {this.error='Has de acceptar les condicions legals';
       return }
  this.$http.post('registration', { username: this.email, password: this.password })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.loginFailed())
  }
}
,
    registerSuccessful (req) {
      if (!req.data.access_token) {
        this.loginFailed(req.data.message)
        return
      }
      this.error = ''
      localStorage.access_token = req.data.access_token
      localStorage.refresh_token = req.data.refresh_token
      auth.user.authenticated=true;
      this.$router.replace(this.$route.query.redirect || '/registercompany')    }
    ,
    loginFailed (message) {
      this.error = message
      //this.$store.dispatch('logout')
      delete localStorage.token
   

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">

body {
  background: #605B56;
}

.register-wrapper {
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
