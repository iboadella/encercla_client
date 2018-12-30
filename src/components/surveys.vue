<template>
  <div class="hello">
    <h4 style="color:white">{{company.commercial_name}}</h4>
<button class="btn btn-primary" type="button" @click="showModal">
<icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="deleteSurvey">
<icon name="remove"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="duplicate()">
<icon name="copy"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nom questionari</th>
      <th scope="col">Estat</th>
      <th scope="col">Ultima data modificacio</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>Puntuacio obtinguda</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>Puntuacio futurible</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in company_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
    <td color="white"><a v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
     
     <td>{{item.status}}</td>
     <td>{{item.last_modified}}</td>
     <td>       <icon name="circle" style="height: 1em" color="green"/>
       {{item.score}}</td>
     <td>       <icon name="circle" style="height: 1em" color="green"/>
       {{item.score + item.score_future}}</td>
     
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
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModal">{{'Cancel·lar'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="createCompanySurvey">Create</button>
    </b-modal>
    <b-modal ref="myModalError" id="myModalError">
    {{this.error}}
     </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/clipboard'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/download'
import 'vue-awesome/icons/copy'
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
      error:'',
      selected:''
    }
  },methods: {

duplicate(){
  
  var selected;
  this.company_surveys.forEach(function(item,index){if (item.selected)  selected=item.id})
  if (selected==undefined)
  { 
    this.error="you have to select one survey"
    this.showModalError()
  }
  else{
      this.$http.get('duplicatecompanysurvey/'+selected, { headers: auth.getAuthHeader() })
    .then(request => {
    console.log("duplicated")
    this.company_surveys=[]
    this.fetchCompanySurvey ()
    })
    .catch(() => "")
    
  }
},
deleteSurvey(){
  
  var selected;
  this.company_surveys.forEach(function(item,index){if (item.selected)  selected=item.id})
  if (selected==undefined)
  { 
    this.error="you have to select one survey"
    this.showModalError()
  }
  else{
      this.$http.delete('companysurvey/'+selected, { headers: auth.getAuthHeader() })
    .then(request => {
    console.log("deleted")
    this.company_surveys=[]
    this.fetchCompanySurvey ()
    })
    .catch(() => "")
    
  }
},

setOption(index){

this.company_surveys.forEach(function(item,i){ if (i!=index) item.selected=false})
this.company_surveys[index].selected=!this.company_surveys[index].selected 
console.log("sel")
},
 fetchCompany () {
  this.$http.get('company', { headers: auth.getAuthHeader() })
    .then(request => this.company=request.data)
    .catch(() => "")
},
 fetchSurvey () {
  this.$http.get('survey', { headers: auth.getAuthHeader() })
    .then(request => this.survey=request.data)
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('companysurvey', { headers: auth.getAuthHeader() })
    .then(request => {
    request.data.map(function(item){item.selected=false})
      this.company_surveys=request.data
    })
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
  this.$http.post('companysurvey',  { 
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
    showModalError () {
      this.$refs.myModalError.show()
    },
    hideModalError () {
      this.$refs.myModalError.hide()
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
