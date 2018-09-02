<template>
  <div class="hello">
    
      <div class="col-sm-12">
      <label class="control-label">{{'Estat'|translate}}</label>
  <select v-model="filter_status">
  	    <option value=""></option>
        <option v-for="item in unique_status" :value="item">{{item}}</option>
    </select>    
      <label class="control-label">{{'Empresa'|translate}}</label>
  <select v-model="filter_company">
  	    <option value=""></option>
        <option v-for="item in unique_company" :value="item">{{item}}</option>
    </select> 
      <label class="control-label">Sector</label>
      <select v-model="filter_sector">
  	    <option value=""></option>
        <option v-for="item in unique_sector" :value="item">{{item}}</option>
    </select>  
          <label class="control-label">SubSector</label>
      <select v-model="filter_subsector">
  	    <option value=""></option>
        <option v-for="item in unique_subsector" :value="item">{{item}}</option>
    </select> 
              <label class="control-label">Comarca</label>
      <select v-model="filter_comarca">
  	    <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item}}</option>
    </select>   
       </div>  
<button class="btn btn-primary" type="button" @click="showModalConfirmation">
<icon name="remove"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="downloadSurvey">
<icon name="download"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="downloadAllSurvey">
<icon name="cloud-download"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="downloadAnswers">
<icon name="file-excel-o"  scale="1.5" style="vertical-align: middle;"/></button>
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
      <th scope="col">{{'Nom empresa'|translate}}</th>
      <th scope="col">{{'Nom qüestionari'|translate}}</th>
      <th scope="col">{{'Estat'|translate}}</th>
      <th scope="col">{{'Última data de modificació'|translate}}</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>{{'Puntuació obtinguda'|translate}}</th>
      <th scope="col"><icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="1"/>{{'Puntuació futurible'|translate}}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in filtered_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
     <td>{{item.commercial_name}}</td>
    <td color="white"><a v-bind:href ="'#/questions/'+item.id" style="color:black">{{item.name_survey}}  </a></td>
    
     <td>{{getStatus(item.status)|translate}}</td>
     <td>{{item.last_modified}}</td>
     <td  v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score)"/>
       {{item.score}}</td>
                  <td v-else>       
       - </td>
     <td  v-if="item.status=='submitted'">        <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score+item.score_future)"/>
       {{item.score + item.score_future}}</td>
                  <td v-else>       
       - </td>
     
</tr>
</tbody>
</table>

    <b-modal ref="myModalError" id="myModalError">
    {{this.error|translate}}
     </b-modal>
         </b-modal  hide-footer>
         <b-modal ref="Confirmation" id="Confirmation" hide-footer>
      {{'Estàs segur d’esborrar el qüestionari?'|translate}}
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModalConfirmation()">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="deleteSurvey()">OK</button>
     </b-modal>
  </div>
</template>

<script>
import uniq from 'lodash/uniq'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/clipboard'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/download'
import 'vue-awesome/icons/cloud-download'
import 'vue-awesome/icons/copy'
import 'vue-awesome/icons/file-excel-o'
import Icon from 'vue-awesome/components/Icon'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import XLSX from 'xlsx';
import auth from '../auth/index.js'
import { saveAs } from 'file-saver/FileSaver';
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
      selected:'',
      filter_status:'',
      filter_sector:'',
      filter_subsector:'',
      filter_comarca:'',
      companies:'',
      filter_company:'',
      filtered:[],
      dataExcel:[]
    }
  },
  computed:{
    unique_status () {
    return uniq(this.filtered.map(p => p.status))
  },
      unique_company () {
    return uniq(this.filtered.map(p => p.commercial_name))
  },
        unique_sector () {
    return uniq(this.filtered.map(p => p.sector))
  },
          unique_subsector () {
    return uniq(this.filtered.map(p => p.subsector))
  },
            unique_comarca () {
    return uniq(this.filtered.map(p => p.comarca))
  },
  filtered_surveys(){
  	var filtered=this.company_surveys
    if (this.filter_company!='')
  	filtered=_.filter(filtered, {commercial_name:this.filter_company });
     if (this.filter_status!='')
    filtered=_.filter(filtered, {status:this.filter_status });
      if (this.filter_sector!='')
    filtered=_.filter(filtered, {sector:this.filter_sector});
      if (this.filter_subsector!='')
    filtered=_.filter(filtered, {subsector:this.filter_subsector });
      if (this.filter_comarca!='')
    filtered=_.filter(filtered, {comarca:this.filter_comarca });
    this.filtered=filtered;
    return filtered
  }
  }
  ,methods: {
          getStatus (status) {
    if (status=='submitted') {
      return 'Enviat'}
      else {
        return 'Pendent'
      }
    },
        showModalConfirmation () {
      this.$refs.Confirmation.show()
    },
    hideModalConfirmation () {
      this.$refs.Confirmation.hide()
    },
    getColor(score){
      console.log(score)
      if (score>0 && score<50) return "red"
      if (score>=50 && score <70) return "orange"
      else return "green"
    },
  	downloadAnswers(){
      this.$http.get('dataExcel', {  headers: auth.getAuthHeader() })
    .then(request => {
var ws = XLSX.utils.json_to_sheet(request.data);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "People");

/* write workbook (use type 'binary') */
var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");})
.catch(() => "")
},
downloadAllSurvey(){
  

  
      this.$http.get('surveyFiles', { responseType: 'arraybuffer', headers: auth.getAuthHeader() })
    .then(request => {
    console.log("download")
     let blob = new Blob([request.data], { type: 'application/zip' },name='prova' ),
      url = window.URL.createObjectURL(blob)
    blob.name = "survey"
  window.open(url);
 
    })
    .catch(() => "")
    
  
},
downloadSurvey(){
  
  var selected,status;
  this.filtered.forEach(function(item,index){if (item.selected)  selected=item.id_surveycompany})
  this.filtered.forEach(function(item,index){if (item.selected)  status=item.status})
  if (selected==undefined)
  { 
    this.error="has de seleccionar un qüestionari"
    this.showModalError()
  }
  else if (status=='created'){
    this.error="No es pot fer servir aquesta funcionalitat amb un qüestionari pendent"
    this.showModalError()

  }
  else{
      this.$http.get('surveyFiles/'+selected, { responseType: 'arraybuffer', headers: auth.getAuthHeader() })
    .then(request => {
    console.log("download")
     let blob = new Blob([request.data], { type: 'application/zip' },name='prova' ),
      url = window.URL.createObjectURL(blob)
    blob.name = "survey"
  window.open(url);
 
    })
    .catch(() => "")
    
  }
},
deleteSurvey(){
  
  var selected,status;
  this.filtered.forEach(function(item,index){if (item.selected)  selected=item.id_surveycompany})
  this.filtered.forEach(function(item,index){if (item.selected)  status=item.status})
  if (selected==undefined)
  { 
    this.error="has de seleccionar un qüestionari"
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

this.filtered.forEach(function(item,i){ if (i!=index) item.selected=false})
this.filtered[index].selected=!this.company_surveys[index].selected 
console.log("sel")
},
 fetchCompanySurvey () {
  this.$http.get('companysurvey?type=all', { headers: auth.getAuthHeader() })
    .then(request => {
    request.data.map(function(item){item.selected=false; item.id_surveycompany=item.id})
      this.company_surveys=request.data
      this.fetchCompanies()
    })
    .catch(() => "")
},
 fetchCompanies () {
  this.$http.get('companies', { headers: auth.getAuthHeader() })
    .then(request => {
    
      this.companies=request.data //.map(function(item){delete item["id"];return item})
      var merge = _.map(this.company_surveys, function(item) {
    return _.merge(item, _.find(request.data, { 'id' : item.id_company }));
});

      this.company_surveys=merge
    })
    .catch(() => "")
},
 fetchQuestions (arrays) {
  this.$http.get('dataExcel', { headers: auth.getAuthHeader() })
    .then(request => {
    	              this.dataExcel=request.data.data;
    	              
                      
                })
    .catch(() => "")
}

,


    showModalError () {
      this.$refs.myModalError.show()
    },
    hideModalError () {
      this.$refs.myModalError.hide()
    }
},mounted(){this.fetchCompanySurvey()}

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
