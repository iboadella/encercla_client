
<template>

  <div class="register-wrapper border border-light">
 
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">Registrar empresa</h2>
  {{decoded.identity}}
  
  <div class="form-group">
    <select class="custom-select" v-model='sector' >
       <option value="" disabled selected>Sector</option>
  <option v-for="sectorItem in sectorCategories" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
<div v-if="sector" class="form-group">

          <select  class="form-control" v-model='subsector'>

  <option v-for="(subsectorItem,index) in subsectorCategories" v-bind:value="subsectorItem.item"> 
    {{subsectorItem.item|translate}}  

 
  </option>
</select>
    
</div>

      
      <label for="inputcommercial_name" class="sr-only">{{'nom comercial'|translate}}</label>
      <input v-model="commercial_name" type="text" id="inputcommercial_name" class="form-control" v-bind:placeholder="'Nom comercial'|translate" required autofocus>
      <label for="inputfiscal_name" class="sr-only">fiscal_name </label>
      <input v-model="fiscal_name" type="text" id="inputfiscal_name" class="form-control" placeholder="Fiscal Name" required autofocus>
      <label for="inputnif" class="sr-only">nif </label>
      <input v-model="nif" type="text" id="inputnif" class="form-control" placeholder="NIF" required autofocus>
      <label for="inputname_surname" class="sr-only">nif </label>
      <input v-model="name_surname" type="text" id="inputname_surname" class="form-control" v-bind:placeholder="'Nom i cognoms'|translate" required autofocus>
      <label for="inputtelephone_number" class="sr-only">telephone_number </label>
      <input v-model="telephone_number" type="text" id="inputtelephone_number" class="form-control" v-bind:placeholder="'Telèfon'|translate" required autofocus>
      <label for="inputdescription" class="sr-only">description </label>
      <div v-if="currentRoute" class="form-check float-left">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="duplication_survey">
        <label class="form-check-label" for="exampleCheck1">Duplicacion questionari</label>
     </div>
      <input v-model="description" type="text" id="inputdescription" class="form-control" v-bind:placeholder="'Descripció activitat'|translate" required autofocus>
  <div class="form-group">
    <select class="custom-select" v-model='comarca' >
      <option value="" disabled selected>Comarca</option>
  <option v-for="sectorItem in comarcas" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
  <div class="form-group">
    <select class="custom-select" v-model='territori_leader' >
      <option value="" disabled selected>Territori leader</option>
  <option v-for="sectorItem in leaders" v-bind:value="sectorItem"> 
    {{sectorItem|translate}}
  </option>
</select>
</div>
      <label for="inputnumber_workers" class="sr-only">territori_leader </label>
      <input v-model="number_workers" type="text" id="inputnumber_workers" class="form-control" v-bind:placeholder="'Número de treballadors'|translate" required autofocus>
      <button class="btn btn-lg btn-primary btn-block" type="submit">{{status|translate}}</button>
      <span>{{error}}</span>
    </form>
  </div>
</template>


<script>
import auth from '../auth/index.js'
import uniq from 'lodash/uniq'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/circle-o'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/arrow-left'
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio';
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'RegisterCompany',
    components: {
      Icon,
   'b-button': bButton,
   'b-tooltip': bTooltip,
   'b-modal': bModal
  },
  data () {
    return {
    sectors:[],
sector : '',
    subsector : '',
    commercial_name : '',
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
    error:'',
    decoded:auth.decoded(),
    company_id:'',
    status:'',
    comarcas:[],
    leaders:[]
    }
  },
computed: {
      currentRoute(){
       //console.log(this.$route.path=='/registerAdmin')
       return this.$route.params.id!=undefined
    },
  sectorCategories () {
    return uniq(this.sectors.map(p => p.sector))
  },
  subsectorCategories () {
    return this.sectors.filter(p => p.sector==this.sector).map(s=>{return {'item':s.subsector, 'info':s.info}})
  }
},
  methods: {
 getSectors(){
  this.$http.get('sectors', { })
    .then(request => this.sectors=request.data)
    .catch(() => "")
},
 getComarcas(){
  this.$http.get('comarcas', { })
    .then(request => this.comarcas=request.data)
    .catch(() => "")
},
 getLeaders(){
  this.$http.get('leaders', { })
    .then(request => this.leaders=request.data)
    .catch(() => "")
},
 fetchCompany () {
  var routeurl=''
  if (this.$route.params.id!=undefined)
      routeurl='company?user_id='+this.$route.params.id
    else
      routeurl='company'
  this.$http.get(routeurl, { headers: auth.getAuthHeader() })
    .then(request =>{ 
     if (request.data.id!='')
      {this.status='Actualitzar'
    this.sector = request.data.sector;
    this.subsector = request.data.subsector;
    this.commercial_name = request.data.commercial_name;
    this.fiscal_name =request.data.fiscal_name;
    this.nif = request.data.nif;
    this.duplication_survey = request.data.duplication_survey,
    this.name_surname =request.data.name_surname;
    this.telephone_number = request.data.telephone_number,
    this.description = request.data.description;
    this.comarca = request.data.comarca;
    this.territori_leader = request.data.territori_leader;
    this.number_workers = request.data.number_workers;
    this.company_id= request.data.id


  }
      
      else {
        this.status='Registrar'
      }})
    .catch(() => "")
},
 register () {
  var routeurl=''
  if (this.$route.params.id!=undefined)
      routeurl='registrationcompany?user_id='+this.$route.params.id
    else
      routeurl='registrationcompany'
  if (this.company_id=='') {
  this.$http.post(routeurl, { 
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
    number_workers : this.number_workers}, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.registerFailed()) }

    else  {
      this.$http.put('registrationcompany/'+this.company_id, { 
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
    number_workers : this.number_workers}, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(() => this.registerFailed())
} },
    registerSuccessful (req) {
      if (this.$route.params.id!=undefined)
         this.$router.replace(this.$route.query.redirect || '/updatesurvey/'+this.$route.params.id)
        else
      this.$router.replace(this.$route.query.redirect || '/users')
    },
    registerFailed (message) {
      this.error = message
    }
  },mounted(){this.getSectors(),this.getComarcas(),this.getLeaders(),this.fetchCompany()}
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
