<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
<button class="btn btn-primary" type="button" @click="showModal">
<icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/></button>Questionari nou
</button>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Nom empresa</th>
      <th scope="col">Nom questionari</th>
      <th scope="col">Any</th>
      <th scope="col">Version</th>
      <th scope="col">Sector</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in company_surveys">
    <td>{{company.commercial_name}}</td>
    <td color="white"><a v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
     <td>{{item.last_modified}}</td>
     <td>{{item.version}}</td>
     <td>{{company.sector}}</td>
     <td>{{item.status}}</td>
</tr>
</tbody>
</table>
    <b-modal ref="myModalRef" hide-footer title="">
      <div class="d-block text-center">
        <h3>Name of survey</h3>
<input v-model="survey_name" type="text" id="inputcommercial_name" class="form-control" placeholder="survey Name" required autofocus>
      {{error}}
      </div>
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModal">Cancel</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="createCompanySurvey">Create</button>
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle'
import Icon from 'vue-awesome/components/Icon'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import auth from '../auth/index.js'
export default {
  components: {
    Icon,
    'b-modal': bModal
  },
  name: 'UserPage',
  data () {
    return {
      user: 'dpiscia',
      company:{id:1},
      survey_name:'',
      survey:'',
      company_surveys:[],
      error:''
    }
  },methods: {
 fetchCompany () {
  this.$http.get('http://127.0.0.1:5000/company', { headers: auth.getAuthHeader() })
    .then(request => this.company=request.data)
    .catch(() => "")
},
 fetchSurvey () {
  this.$http.get('http://127.0.0.1:5000/survey', { headers: auth.getAuthHeader() })
    .then(request => this.survey=request.data)
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('http://127.0.0.1:5000/companysurvey', { headers: auth.getAuthHeader() })
    .then(request => this.company_surveys=request.data)
    .catch(() => "")
},
 createCompanySurvey () {
  this.$http.post('http://127.0.0.1:5000/companysurvey',  { 
    id_survey : this.survey.id,
    id_company : this.company.id,
    name_survey: this.survey_name})
    .then(request => this.registerSuccessful(request))
    .catch(request => this.registerFailed(request))
},
    registerSuccessful (req) {
      this.company_surveys=[]
      this.fetchCompanySurvey()

    },
    registerFailed (req) {
      this.error = req.response.data.message
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
},mounted(){this.fetchCompany(), this.fetchSurvey(), this.fetchCompanySurvey()}
,
    route: {
      // Check the users auth status before
      // allowing navigation to the route
      canActivate() {
        return auth.user.authenticated
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
