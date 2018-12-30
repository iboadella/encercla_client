<template>
  <div class="container">
  <div class="row">
     <div class="col-sm-3">
    <img src="/static/img/svgs/23.svg" alt="Smiley face"  height="33" width="33" style="float:left">
    <h4  style="color:white">{{'Qüestionaris'|translate}}</h4>
  </div>
   <div class="col-sm-2 offset-sm-2">
    
    <h4  style="color:white">{{company.commercial_name}}
      </h4>
    </div>
  </div>
<div style="color:white">
<button class="btn btn-primary" type="button" @click="showModal">
<img src="/static/img/svgs/33.svg" alt="Smiley face"  height="35" width="35">

<!--icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/-->
</button>
<button class="btn btn-primary" type="button" @click="showModalConfirmation">
<img src="/static/img/svgs/34.svg" alt="Smiley face"  height="35" width="35">
</button>
<button class="btn btn-primary" type="button" @click="duplicate()">
<img src="/static/img/svgs/60.svg" alt="Smiley face"  height="35" width="35">
</button>

{{'Puntuació'|translate}}
 <img src="/static/img/svgs/39.svg" alt="Smiley face"  height="35" width="35">
 0-49
 <img src="/static/img/svgs/41.svg" alt="Smiley face"  height="35" width="35">
 50-69
 <img src="/static/img/svgs/40.svg" alt="Smiley face"  height="35" width="35">
 70-100
</div>
<table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th  scope="col">
                <img src="/static/img/svgs/58.svg" alt="Smiley face"  height="33" width="33" style="float:left">
      {{'Nom qüestionari'|translate}}</th>
      <th scope="col">
        <img src="/static/img/svgs/57.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Estat'|translate}}</th>
      <th scope="col">
        <img src="/static/img/svgs/58.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Última data de modificació'|translate}}</th>
       <th scope="col"> {{'Any de convocatòria'|translate}}</th>
      <th scope="col">
        <img src="/static/img/svgs/59.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Puntuació obtinguda'|translate}} </th>
      <th scope="col">
        <img src="/static/img/svgs/59.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Puntuació futurible'|translate}}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in company_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
    <td v-if="item.status=='created'" color="white"><a  v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
      <td v-if="item.status!='created'" color="white"><a  v-bind:href ="'#/results/'+item.id" style="color:black">{{item.name_survey}}  </a></td>   
     <td>{{getStatus(item.status)|translate}}</td>
     <td>{{item.last_modified}}</td>
     <td>{{item.year}}</td>
     <td v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score)"/>
       {{item.score}}/100</td>
           <td v-else>       
       - </td>

     <td  v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score_future)"/>
       {{item.score_future}}/100</td>
                  <td v-else>       
       - </td>
     
</tr>
</tbody>
</table>
    <b-modal ref="myModalRef" hide-footer title="" size="lg">
      <div class="d-block text-center">
        <h3>{{'Qüestionari nou'|translate}}</h3>

<div v-if="DARI_needed()==true" class="custom-file">

            <label class="custom-file-label" for="file"></label>

        <input type="file" class="form-control-file" id="file" ref="file" v-on:change="setFileName()"/>
          <div style="padding-top:10px"><p>{{"Adjuntar DARI (Declaració Anual de Residus Industrials) de l'any corresponent a l'exercici que s'està avaluant"|translate}} </p>
  </div>
</div>
  <div>
    <div>
       
          <div class="form-check">
      <label class="form-check-label">
        <input type="checkbox" class="form-check-input" name="optionsRadios" id="optionsRadios1" v-model="convocatoria">
       {{"Qüestionari per presentar sol·licitud a una convocatòria d'ajuts Leader" |translate}}
      </label>
    </div>   
      
      <p>
    {{'Any de convocatòria'|translate}}</label>  
        <select v-model="convocatoria_year">
        <option value="" disabled hidden>{{'Any'|translate}}</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2018">2019</option>
    </select>   
      </p>


          </div>
</div>
      
      {{error}}
      </div>
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModal">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="createCompanySurvey">{{'Crear'|translate}}</button>
    </b-modal>
    <b-modal ref="myModalError" id="myModalError">
    {{this.error}}
     </b-modal>
         <b-modal ref="instructions" id="instructions" hide-footer size="lg">
   <Instructions>
   </Instructions>
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
import Instructions from '@/components/Instructions'
export default {
  components: {
    Instructions,
    Icon,
    'b-modal': bModal
  },
  name: 'UserPage',
  data () {
    return {
       decoded:auth.decoded(),
      user: '',
      company:{id:1},
      DARI_filename:'',
      convocatoria:true,
      convocatoria_year:'',
      survey:'',
      company_surveys:[],
      error:'',
      selected:'' , 
      sort_field:'email',
       sort_order:['asc', 'desc']
    }
  } , computed:{

  }
,methods: {
        sortBy(name){
    if (name==this.sort_field)
       {if (this.sort_order[0]=='desc')
         { this.sort_order=['asc', 'desc']}
       else
         { this.sort_order=['desc', 'asc']}
      }
   this.sort_field=name;},

      getStatus (status) {
    if (status=='submitted') {
      return 'Enviat'}
      else {
        return 'Pendent'
      }
    },
    getColor(score){

      if (score>=0 && score<50) return "red"
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
    .then(request => {
     if (request.data.id=='')
     {  this.$router.replace(this.$route.query.redirect || '/registercompany/')
}
   else{
      this.company=request.data
  }
})
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
     this.error="Adjuntar DARI"
     return
     }

     if( this.DARI_needed()  && ( this.DARI_filename.indexOf(' ') > -1)){
     this.error="El nom del fitxer no pot incloure espai"
     return
     }


     if (this.convocatoria && this.convocatoria_year=='') {
     this.error="Has de seleccionar un any "
     return

     }
  this.$http.post('companysurvey',  { 
    id_survey : this.survey.id,
    file_dari: this.DARI_filename,
    convocatoria: this.convocatoria,
    convocatoria_year:this.convocatoria_year,
    id_company : this.company.id}
, { headers: auth.getAuthHeader() })
    .then(request => this.registerSuccessful(request))
    .catch(request => this.registerFailed(request))
},
    registerSuccessful (req) {
      if (this.DARI_needed()){
      this.handleFileUpload(req.data.message.split(" ")[2])
    }
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
    var headers=auth.getAuthHeader()
    headers['Content-Type']='multipart/form-data'
		this.DARI_filename=this.$refs.file.files[0].name;
		let formData = new FormData();
		formData.append('file', this.$refs.file.files[0]);
		this.$http.post( 'upload?surveycompany_id='+id_companysurvey,
		  formData,
		  {
		    headers: headers
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
