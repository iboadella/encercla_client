
<template>

  <div class="register-wrapper border border-light">
 
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">Please Register</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
<label for="confirmInputPassword" class="sr-only">Password</label>
<input v-model="confirmPassword" type="password" id="confirmInputPassword" class="form-control" placeholder="Confirm Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <span>{{error}}</span>
    </form>
  </div>
</template>


<script>
export default {
  name: 'Register',
  data () {
    return {
        email: '',
      password: '',
      confirmPassword : '',
      error:''
    }
  },
  computed: {
  comparePasswords () {
    if (this.password === this.confirmPassword ) return true
    else {
     error='Passwords don\'t match';
return false
    }
}
},
  methods: {
 register () {
  this.$http.post('registration', { username: this.email, password: this.password })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.loginFailed())
},
    registerSuccessful (req) {
      if (!req.data.token) {
        this.registerFailed(req.data.message)
        return
      }
      this.error = false
      localStorage.token = req.data.token
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/authors')
    },
    registerFailed (message) {
      this.error = message
      this.$store.dispatch('logout')
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
