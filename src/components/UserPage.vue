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
      <th scope="col">Any</th>
      <th scope="col">Version</th>
      <th scope="col">Sector</th>
    </tr>
  </thead>
  <tbody>
    <tr>{{company.commercial_name}}</tr>
    <tr>{{company.sector}}</tr>
     <tr>{{company.subsector}}</tr>
</tbody>
</table>
    <b-modal ref="myModalRef" hide-footer title="">
      <div class="d-block text-center">
        <h3>Name of survey</h3>
<input v-model="survey_name" type="text" id="inputcommercial_name" class="form-control" placeholder="survey Name" required autofocus>

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
      survey:''
    }
  },methods: {
 fetchCompany () {
  this.$http.get('http://127.0.0.1:5000/company/1', { })
    .then(request => this.company=request.data)
    .catch(() => "")
},
 fetchSurvey () {
  this.$http.get('http://127.0.0.1:5000/survey', { })
    .then(request => this.survey=request.data)
    .catch(() => "")
},
 createCompanySurvey () {
  this.$http.post('http://127.0.0.1:5000/companysurvey',  { 
    id_survey : this.survey.id,
    id_company : this.company.id,
    name_survey: this.survey_name})
    .then(request => this.registerSuccessful(request))
    .catch(() => "")
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
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
},mounted(){this.fetchCompany(), this.fetchSurvey()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
