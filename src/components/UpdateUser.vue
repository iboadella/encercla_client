
<template>

  <div class="register-wrapper border border-light">
   
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">{{"Modificar dades d'usuari"|translate}}</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      {{email}}
      <!--input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus-->
      <!--div v-if="currentRoute" class="form-check float-left">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="admin">
        <label class="form-check-label" for="exampleCheck1">{{'Super-usuari'|translate}}</label>
     </div-->
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" v-bind:placeholder="'Nova contrasenya'|translate" >
<label for="confirmInputPassword" class="sr-only">Password</label>
<input v-model="confirmPassword" type="password" id="confirmInputPassword" class="form-control" v-bind:placeholder="'Repetir nova contrasenya'|translate" >
      <a v-if="decoded.decoded().user_claims.admin==1" href="/#/admin/users" class="btn btn-lg btn-danger btn-block"role="button">{{'Cancel·lar'|translate}}</a>
      <a v-else href="/#/user" class="btn btn-lg btn-danger btn-block"role="button">{{'Cancel·lar'|translate}}</a>
      <button v-if="currentRoute"class="btn btn-lg btn-primary btn-block" type="submit">{{'Actualitzar'|translate}}</button>
      <button v-else class="btn btn-lg btn-primary btn-block" type="submit">{{'Actualitzar'|translate}}</button>
      <span>{{error}}</span>
    </form>
  </div>
</template>


<script>
import auth from '../auth/index.js'
export default {
  name: 'Register',
  data () {
    return {
             decoded:auth,
      email: '',
      password: '',
      confirmPassword : '',
      error:'',
      admin:true,
      user_id:'',
    }
  },
  computed: {
    currentRoute(){
       //console.log(this.$route.path=='/registerAdmin')
       return this.$route.path=='/updateuseradmin'
    },
  comparePasswords () {
    if (this.password=='') return true
    else if (this.password === this.confirmPassword ) return true
    else {
     this.error=this.$i18n.translate('contrasenya no coincideix');
return false
    }
}
},
  methods: {
 fetchUser () {
  var route='user'
  if (this.$route.query.id!=undefined)
    route='user/'+this.$route.query.id
  else this.user_id=-1

  this.$http.get(route, { headers: auth.getAuthHeader() })
    .then(request => {
      this.email=request.data.email
       if (request.data.type_user!=undefined && request.data.type_user==1)
       this.admin=true; else this.admin=false})
    .catch(() => "")
},
 register () {
    if (!this.comparePasswords)
    return
    var route='user'

  if (this.$route.query.id!=undefined)
    route='user/'+this.$route.query.id
  var user_id=this.$route.query.id
   this.$http.put(route, { username: this.email, password: this.password ,admin:this.admin},{ headers: auth.getAuthHeader() })
    .then(request => {
                      this.error="created"
                      if (user_id!=undefined)
                      {
                        if (this.admin){
                          this.$router.replace(this.$route.query.redirect || '/admin/users')
                        } else {

                        this.$router.replace(this.$route.query.redirect || '/user')
                      }


                      }
                      else 
                        {this.$router.replace(this.$route.query.redirect || '/user')}
                       })
    .catch(() => this.error = message)
   

},
    registerSuccessful (req) {
      if (!req.data.access_token) {
        this.loginFailed(req.data.message)
        return
      }
      this.error = ''
      this.$router.replace(this.$route.query.redirect || '/registercompany')    }
    ,
    loginFailed (message) {
      this.error = message

   

    },
    getToken(){
      if (this.$route.query.token!=undefined)
        localStorage.access_token = this.$route.query.token
    }
  },mounted(){this.fetchUser()}
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