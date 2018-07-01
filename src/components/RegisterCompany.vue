
<template>

  <div class="register-wrapper border border-light">
 
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">Please Register Company</h2>
      <label for="inputSector" class="sr-only">Sector </label>
      <input v-model="Sector" type="text" id="inputSector" class="form-control" placeholder="Sector" required autofocus>
      <label for="inputSubSector" class="sr-only">SubSector </label>
      <input v-model="SubSector" type="text" id="inputSubSector" class="form-control" placeholder="SubSector" required autofocus>
      <label for="inputcommercial_name" class="sr-only">commercial_name </label>
      <input v-model="commercial_name" type="text" id="inputcommercial_name" class="form-control" placeholder="Commercial Name" required autofocus>
      <label for="inputfiscal_name" class="sr-only">fiscal_name </label>
      <input v-model="fiscal_name" type="text" id="inputfiscal_name" class="form-control" placeholder="Fiscal Name" required autofocus>
      <label for="inputnif" class="sr-only">nif </label>
      <input v-model="nif" type="text" id="inputnif" class="form-control" placeholder="nif" required autofocus>
      <label for="inputname_surname" class="sr-only">nif </label>
      <input v-model="name_surname" type="text" id="inputname_surname" class="form-control" placeholder="name_surname" required autofocus>
      <label for="inputtelephone_number" class="sr-only">telephone_number </label>
      <input v-model="telephone_number" type="text" id="inputtelephone_number" class="form-control" placeholder="telephone_number" required autofocus>
      <label for="in																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			putdescription" class="sr-only">description </label>
      <input v-model="description" type="text" id="inputdescription" class="form-control" placeholder="description" required autofocus>
      <label for="inputcomarca" class="sr-only">comarcan </label>
      <input v-model="comarca" type="text" id="inputcomarca" class="form-control" placeholder="comarca" required autofocus>
      <label for="inputterritori_leader" class="sr-only">territori_leader </label>
      <input v-model="territori_leader" type="text" id="inputterritori_leader" class="form-control" placeholder="territori_leader" required autofocus>
      <label for="inputnumber_workers" class="sr-only">territori_leader </label>
      <input v-model="number_workers" type="text" id="inputnumber_workers" class="form-control" placeholder="number_of_workers																																																											" required autofocus>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <span>{{error}}</span>
    </form>
  </div>
</template>


<script>
export default {
  name: 'RegisterCompany',
  data () {
    return {
sector : '',
    subsector : '',
    comercial_name : '',
    fiscal_name : '',
    nif : '',
    number_survey : '',
    duplication_survey : '',
    name_surname : '',
    telephone_number : '',
    description : '',
    comarca : '',
    territori_leader : '',
    number_workers : '',
    error:''
    }
  },
  methods: {
 register () {
  this.$http.post('http://127.0.0.1:5000/registrationcompany', { 
    sector : this.sector,
    subsector : this.subsector,
    commercial_name : this.commercial_name,
    fiscal_name : this.fiscal_name,
    nif : this.nif,
    duplication_survey : this.duplication_survey,
    name_surname : this.name_surname,
    telephone_number : this.telephone_number,
    description : this.description,
    comarca : this.comarca,
    territori_leader : this.territori_leader ,
    number_workers : this.number_workers})
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
