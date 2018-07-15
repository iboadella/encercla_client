<template>
  <div class="hello">
    <h4 style="color:white">{{company.commercial_name}}</h4>
<button class="btn btn-primary" type="button" @click="showModal">
<icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/></button>Questionari nou
</button>

<table class="table table-light table-bordered">
  <thead>
    <tr>

      <th scope="col">Nom questionari</th>
      <th scope="col">Estat</th>
      <th scope="col">Ultima data modificacio</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>Puntuacio obtinguda</th>

      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in company_surveys">

    <td color="white"><a v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
     <td>{{item.status}}</td>
     <td>{{item.last_modified}}</td>
     <td>       <icon name="circle" style="height: 1em" color="green"/>
       {{item.score}}</td>

     
</tr>
</tbody>
</table>
    <b-modal ref="myModalRef" hide-footer title="">
      <div class="d-block text-center">
        <h3>Crear un formulari</h3>

<div v-if="DARI_needed()==true" class="custom-file">
      <label class="custom-file-label" for="file">Adjuntar DARI </label>
        <input type="file" class="form-control-file" id="file" ref="file" v-on:change="setFileName()"/>
</div>
      
      {{error}}
      </div>
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModal">Cancel</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="createCompanySurvey">Create</button>
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/clipboard'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/download'
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
      DARI_filename:'',
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
DARI_needed(){
 return (this.company.sector=='Industrial' || this.company.sector=='Agroalimentari' )
}

,
 createCompanySurvey () { 
  if( this.DARI_needed() && this.DARI_filename == ''){
     this.error="you need to upload a DARI file"
     return
     }
  this.$http.post('http://127.0.0.1:5000/companysurvey',  { 
    id_survey : this.survey.id,
    file_dari: this.DARI_filename,
    id_company : this.company.id}
, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(request => this.registerFailed(request))
},
    registerSuccessful (req) {
      this.handleFileUpload(req.data.message.split(" ")[2])
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
    },
setFileName(){
		this.DARI_filename=this.$refs.file.files[0].name;
	},
handleFileUpload(id_companysurvey){
		this.DARI_filename=this.$refs.file.files[0].name;
		let formData = new FormData();
		formData.append('file', this.$refs.file.files[0]);
		this.$http.post( 'http://localhost:5000/upload?surveycompany_id='+id_companysurvey,
		  formData,
		  {
		    headers: {
			'Content-Type': 'multipart/form-data'
		    }
		  }
		).then(request=> {
		  console.log('OK')
		})
		.catch(function(){
		  console.log('FAILURE!!');
		});
	},
},mounted(){this.fetchCompany(), this.fetchSurvey(), this.fetchCompanySurvey()}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.table-bordered{
    border:3px solid #e84d20;
    margin-top:20px;
  }
table.table-bordered > thead > tr > th{
    border:3px solid #e84d20;
}
table.table-bordered > tbody > tr > td{
    border:3px solid #e84d20;
}
</style>
