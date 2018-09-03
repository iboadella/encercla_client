<template>
  <div class="hello">
    <h4  style="color:white">{{company.commercial_name}}
    <a href="#/updateuser"> 
    <icon name="edit"  color="white" scale="1.5" style="vertical-align: middle;"/>
      </a>
      </h4>
<button class="btn btn-primary" type="button" @click="showModal">
<icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="showModalConfirmation">
<icon name="remove"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="duplicate()">
<icon name="copy"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
{{'Puntuació'|translate}}
 <icon name="circle" scale="1.5"  style="hpadding: 2px;
    height: 1em;
    background-color: white;
    padding-bottom: 2px;" color="red" />  (0-49)
 <icon name="circle" scale="1.5"  style="hpadding: 2px;
    height: 1em;
    background-color: white;
    padding-bottom: 2px;" color="orange" /> (50-69)
 <icon name="circle" scale="1.5"  style="hpadding: 2px;
    height: 1em;
    background-color: white;
    padding-bottom: 2px;" color="green" /> (70-100)
<table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">{{'Nom qüestionari'|translate}}</th>
      <th scope="col">{{'Estat'|translate}}</th>
      <th scope="col">{{'Última data de modificació'|translate}}</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>{{'Puntuació obtinguda'|translate}} </th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>{{'Puntuació futurible'|translate}}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in company_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
    <td v-if="item.status=='created'" color="white"><a  v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
      <td v-if="item.status!='created'" color="white"><a  v-bind:href ="'#/results/'+item.id" style="color:black">{{item.name_survey}}  </a></td>   
     <td>{{getStatus(item.status)|translate}}</td>
     <td>{{item.last_modified}}</td>
     <td v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score)"/>
       {{item.score}}</td>
           <td v-else>       
       - </td>

     <td  v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score+item.score_future)"/>
       {{item.score + item.score_future}}</td>
                  <td v-else>       
       - </td>
     
</tr>
</tbody>
</table>
    <b-modal ref="myModalRef" hide-footer title="">
      <div class="d-block text-center">
        <h3>{{'Qüestionari nou'|translate}}</h3>

<div v-if="DARI_needed()==true" class="custom-file">

            <label class="custom-file-label" for="file"></label>

        <input type="file" class="form-control-file" id="file" ref="file" v-on:change="setFileName()"/>
          <div style="padding-top:10px">{{"Adjuntar DARI (Declaració Anual de Residus Industrials) de l'any corresponent a l'exercici que s'està avaluant"|translate}} </div>
</div>
      
      {{error}}
      </div>
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModal">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="createCompanySurvey">{{'Crear'|translate}}</button>
    </b-modal>
    <b-modal ref="myModalError" id="myModalError">
    {{this.error}}
     </b-modal>
         <b-modal ref="instructions" id="instructions" hide-footer>
    1. Fer clic al botó 'Crear'. Això generarà un qüestionari amb nom automàtic (nom empresa+any+versió) i mostrarà la pantalla amb la primera pregunta.
2. Cada pregunta està composada dels següents elements:
a) Barra de progrés: mostra tants punts com preguntes a respondre. Els punts en verd representen preguntes que ja s'han respòs, mentre que els negres representen preguntes pendents.
b) Enunciat de la pregunta: situa el tema que s'està avaluant
c) Més informació sobre la pregunta: la icona (?) mostra informació extra sobre el tema avaluat
d) Possibles respostes: 2,3 o 4 possibles respostes entre les que s'ha d'escollir la situació més propera a la realitat de l'empresa.
e) Botó d'adjuntar document: 
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModalInstructions">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="goToSurvey()">OK</button>
     </b-modal  hide-footer>
         <b-modal ref="Confirmation" id="Confirmation" hide-footer>
      {{'Estàs segur d’esborrar el qüestionari?'|translate}}
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModalConfirmation()">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="deleteSurvey()">OK</button>
     </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/edit'
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
  } , computed:{

  }
,methods: {
      getStatus (status) {
    if (status=='submitted') {
      return 'Enviat'}
      else {
        return 'Pendent'
      }
    },
    getColor(score){

      if (score>0 && score<50) return "red"
      else if (score>=50 && score <70.0) return "orange"
      else return "green"
    },
    goToSurvey(){

      
       this.$router.replace(this.$route.query.redirect || '/questions/'+this.company_surveys[this.company_surveys.length - 1].id)
    },

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
    .catch(() => {
          this.error="No es pot duplicar el qüestionari"
    this.showModalError()
    })
    
  }
},
deleteSurvey(){
  
  var selected,status;
  this.company_surveys.forEach(function(item,index){if (item.selected)  selected=item.id})
  this.company_surveys.forEach(function(item,index){if (item.selected)  status=item.status})
  if (selected==undefined)
  { 
    this.error="has de seleccionar un usuari"
    this.showModalError()
  }
  else if (status=='submitted'){
    this.error="No es pot esborrar un qüestionari enviat"
    this.showModalError()

  }
  else{
      this.hideModalConfirmation()
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
      this.hideModal ()
      this.showModalInstructions ()

    },
    registerFailed (req) {
      this.error = req.response.data.message
    },
    showModal () {
      this.DARI_filename == ''
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
      showModalInstructions () {
      
      this.$refs.instructions.show()
    },
    hideModalInstructions () {
      this.$refs.instructions.hide()
    },
    showModalError () {
      this.$refs.myModalError.show()
    },
    hideModalError () {
      this.$refs.myModalError.hide()
    },
    showModalConfirmation () {
      this.$refs.Confirmation.show()
    },
    hideModalConfirmation () {
      this.$refs.Confirmation.hide()
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
