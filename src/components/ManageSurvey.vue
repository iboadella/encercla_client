<template>
  <div class="hello">
    <div class="row" >
      <div class="col-sm-2" style="opacity: 0.4">
    <a href="#/admin/users" style="color:white">
    <figure>
    <img src="/static/img/svgs/14.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Gestió d'usuaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" >

    <a href="#/admin/surveys" style="color:white">
    <figure>
    <img src="/static/img/svgs/15.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Visualització de qüestionaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" style="opacity: 0.4">

    <a href="#/ranking" style="color:white">
    <figure>
    <img src="/static/img/svgs/16.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{'Rànquing de resultats'|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" style="opacity: 0.4">

    <a href="#/informes"style="color:white">
    <figure>
    <img src="/static/img/svgs/17.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Extracció d'informes"|translate}}</figcaption>
  </figure>
</a>
</div>
 </div>

       <div class="row" style="color:white">
      <div class="col-sm">
      <label style="width:120px;font-size: 0.9rem;" class="control-label">{{'Estat'|translate}}</label>
  <select v-model="filter_status">
  	    <option value=""></option>
        <option v-for="item in unique_status" :value="item">{{getStatus(item)|translate}}</option>
    </select> 
    </div>
    <div class="col-sm">   
      <label style="width:120px;font-size: 0.9rem;" class="control-label">{{'Empresa'|translate}}</label>
  <select v-model="filter_company">
  	    <option value=""></option>
        <option v-for="item in unique_company" :value="item">{{item}}</option>
    </select> 
  </div>
  <div class="col-sm">
      <label style="width:120px;font-size: 0.9rem;" class="control-label">Sector</label>
      <select v-model="filter_sector">
        <option value=""></option>
        <option v-for="item in unique_sector" :value="item">{{item|translate}}</option>
    </select>  
  </div>

   </div>

       

  <div class="row" style="color:white">
  <div class="col-sm">
          <label style="width:120px;font-size: 0.9rem;" class="control-label">Subsector</label>
      <select v-model="filter_subsector">
  	    <option value=""></option>
        <option v-for="item in unique_subsector" :value="item">{{item|translate}}</option>
    </select> 
  </div>


  <div class="col-sm">
              <label style="width:120px;font-size: 0.9rem;" class="control-label">Comarca</label>
      <select v-model="filter_comarca">
  	    <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item|translate}}</option>
    </select> 
  </div>
    <div class="col-sm">
    <label style="width:120px;font-size: 0.9rem;" class="control-label">{{'Territori Leader'|translate}}</label>  
      <select v-model="filter_leader">
        <option value=""></option>
        <option v-for="item in unique_leader" :value="item">{{item}}</option>
    </select> 
    </div> 
  </div>
   <div class="row" style="color:white">
  <div class="col-sm-5">
    <label style="width:150px;font-size: 0.9rem;"  class="control-label">{{'Any de convocatòria'|translate}}</label>  
      <select v-model="filter_year">
        <option value=""></option>
        <option v-for="item in unique_year" :value="item">{{item}}</option>
    </select>
  </div>
  <div class="col-sm-5">
    <label style="width:150px;font-size: 0.9rem;"  class="control-label">{{'Es presenta a Leader'|translate}}</label>  
      <select v-model="filter_convocatoria">
        <option value=""></option>
        <option v-for="item in unique_convocatoria" :value="item">{{fromEn(item)}}</option>
    </select>      
  </div>
</div>
 <div class="row" style="color:white">
<button class="btn btn-primary" type="button" @click="showModalConfirmation">
  <figure>
<img src="/static/img/svgs/34.svg" alt="Smiley face"  height="35" width="35">
<figcaption style="font-size: 0.8rem;">{{'Esborrar el qüestionari'|translate}}</figcaption>
</figure>
</button>
<button class="btn btn-primary" type="button" @click="downloadSurvey">
   <figure>
<img src="/static/img/svgs/36.svg" alt="Smiley face"  height="35" width="35">
<figcaption style="font-size: 0.8rem;">{{'Documents adjunts del qüestionari seleccionat'|translate}}</figcaption>
</figure>
</button>

<button class="btn btn-primary" type="button" @click="downloadAllSurvey">
   <figure>
<img src="/static/img/svgs/36.svg" alt="Smiley face"  height="35" width="35">
<figcaption style="font-size: 0.8rem;">{{'Documents adjunts de tots els qüestionaris'|translate}}</figcaption>
</figure>
</button>
<button class="btn btn-primary" type="button" @click="downloadAnswers">
   <figure>
<img src="/static/img/svgs/36.svg" alt="Smiley face"  height="35" width="35">
<figcaption style="font-size: 0.8rem;">{{'Resum de respostes de tots els qüestionaris'|translate}}</figcaption>
</figure>
</button>
</div>
 <div class="row">
   <div class="col-sm" style="color:white">
{{'Puntuació'|translate}}
 <img src="/static/img/svgs/39.svg" alt="Smiley face"  height="35" width="35">
 0-49
 <img src="/static/img/svgs/41.svg" alt="Smiley face"  height="35" width="35">
 50-69
 <img src="/static/img/svgs/40.svg" alt="Smiley face"  height="35" width="35">
 70-100
</div>
</div>
<table class="table table-light table-bordered" style="font-size:0.9rem">
  <thead>
    <tr>
      <th scope="col"></th>
      <th @click="sortBy('commercial_name')" scope="col">
<img src="/static/img/svgs/10.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Nom empresa'|translate}}</th>
      <th @click="sortBy('name_survey')"  scope="col">
        <img src="/static/img/svgs/58.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Nom qüestionari'|translate}}</th>
      <th @click="sortBy('status')"  scope="col">
        <img src="/static/img/svgs/57.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Estat'|translate}} </th>
      <th @click="sortBy('last_modified')"  scope="col">
        <img src="/static/img/svgs/58.svg" alt="Smiley face"  height="33" width="33" style="float:left">

        {{'Última data de modificació'|translate}}</th>
       <th @click="sortBy('year')"  scope="col">

{{'Any de convocatòria'|translate}}</th>
      <th @click="sortBy('score')"  scope="col">
  <img src="/static/img/svgs/59.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Puntuació obtinguda'|translate}}</th>
      <th @click="sortBy('commercial_name')"  scope="col">
  <img src="/static/img/svgs/59.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Puntuació futurible'|translate}}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in filtered_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(item)"></td>
     <td>{{item.commercial_name}}</td>

    <td v-if="item.status=='created'" color="white"><a  v-bind:href ="'#/questions/'+item.id_surveycompany" style="color:black">{{item.name_survey}}  </a></td>
      <td v-if="item.status!='created'" color="white"><a  v-bind:href ="'#/results/'+item.id_surveycompany" style="color:black">{{item.name_survey}}  </a></td>       
     <td>{{getStatus(item.status)|translate}}</td>
     <td>{{item.last_modified}}</td>
     <td>{{item.year}}</td>
     <td  v-if="item.status=='submitted'">       <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score)"/>
       {{item.score}}</td>
                  <td v-else>       
       - </td>
     <td  v-if="item.status=='submitted'">        <icon name="circle" style="height: 1em" v-bind:color="getColor(item.score_future)"/>
       {{item.score_future}}</td>
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
      filter_leader:'',
      filter_year:'',
      filter_convocatoria:'',
      companies:'',
      filter_company:'',
      filtered:[],
      dataExcel:[],
             sort_field:'email',
       sort_order:['asc', 'desc']
    }
  },
  computed:{
      unique_convocatoria() {
    return uniq(this.filtered.map(p => p.convocatoria).filter(p=>p!=null))
  },
    unique_year() {
    return uniq(this.filtered.map(p => p.year).filter(p=>p!='').filter(p=>p!=null))
  },
    unique_status () {
    return uniq(this.filtered.map(p => p.status).filter(p=>p!=null))
  },
      unique_company () {
    return uniq(this.filtered.map(p => p.commercial_name).filter(p=>p!=null))
  },
        unique_sector () {
    return uniq(this.filtered.map(p => p.sector).filter(p=>p!=null))
  },
          unique_subsector () {
    return uniq(this.filtered.map(p => p.subsector).filter(p=>p!=null))
  },
            unique_comarca () {
    return uniq(this.filtered.map(p => p.comarca).filter(p=>p!=null))
  },
            unique_leader () {
    return uniq(this.filtered.map(p => p.territori_leader).filter(p=>p!=null))
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
      if (this.filter_leader!='')
    filtered=_.filter(filtered, {territori_leader:this.filter_leader });  
      if (this.filter_year!='')
    filtered=_.filter(filtered, {year:this.filter_year });  
      if (this.filter_convocatoria!='')
    filtered=_.filter(filtered, {convocatoria:this.filter_convocatoria });  
  filtered= _.orderBy(filtered, ['type',this.sort_field], this.sort_order);

    this.filtered=filtered;
    return filtered
  }
  }
  ,methods: {

    fromEn(item){

      if (item==true)
        {return "si"}
      else if (item==false)
        {return "no"}
      else {return item}
    },
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
        showModalConfirmation () {
      this.$refs.Confirmation.show()
    },
    hideModalConfirmation () {
      this.$refs.Confirmation.hide()
    },
    getColor(score){
      console.log(score)
      if (score>=0 && score<50) return "red"
      if (score>=50 && score <70) return "orange"
      else return "green"
    },
  	downloadAnswers(){
      var array=this.filtered.map(x=>x.id_surveycompany).join(',')
      var lang=this.$i18n.locale()
      this.$http.get('dataExcel?ids='+array+'&lang='+lang, {  headers: auth.getAuthHeader() })
    .then(request => {
      var data = request.data
      
      var new_order={'id':data[1].id}
      new_order['Preguntes']=data[1]['Preguntes']
      var dati= data[1]
      delete dati.id
      delete dati.Preguntes
      var titles=Object.keys(dati).sort()

      titles.forEach(function(item) {new_order[item]=data[1][item]})
      data[1]=new_order
var ws = XLSX.utils.json_to_sheet(data);

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
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var hours = today.getHours()
var minutes = today.getMinutes()
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
if(hours<10) {
    hours = '0'+hours
} 
if(minutes<10) {
    minutes = '0'+minutes
} 
var filename = dd + mm + yyyy+'_'+hours+minutes+".xlsx";
saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);})
.catch(() => "")
},
downloadAllSurvey(){
  
      var array=this.filtered.map(x=>x.id_surveycompany).join(',')
  
      this.$http.get('surveyFiles?ids='+array, { responseType: 'arraybuffer', headers: auth.getAuthHeader() })
    .then(request => {
        var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var hours = today.getHours()
      var minutes = today.getMinutes()
      if(dd<10) {
          dd = '0'+dd
      } 
      if(mm<10) {
          mm = '0'+mm
      } 
      if(hours<10) {
          hours = '0'+hours
      } 
      if(minutes<10) {
          minutes = '0'+minutes
      } 
      var filename = dd + mm + yyyy+'_'+hours+minutes+".zip";
    console.log("download")
     saveAs(new Blob([request.data], { type: 'application/zip' }),filename)

 
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
        var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var hours = today.getHours()
      var minutes = today.getMinutes()
      if(dd<10) {
          dd = '0'+dd
      } 
      if(mm<10) {
          mm = '0'+mm
      } 
      if(hours<10) {
          hours = '0'+hours
      } 
      if(minutes<10) {
          minutes = '0'+minutes
      } 
      var filename = dd + mm + yyyy+'_'+hours+minutes+".zip";
    
    saveAs(new Blob([request.data], { type: 'application/zip'}), filename)
   /*  let blob = new Blob([request.data], { type: 'application/zip'},name='prova' ),
      url = window.URL.createObjectURL(blob)
    blob.name = "survey"
  window.open(url);*/
 
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

setOption(survey){
     
this.filtered.forEach(function(item,i){ if (i.id!=survey) {item.selected=false} else {item.selected=!item.selected  }  })

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
select {
   margin: 0px;
  width: 200px;
  padding: px 5px 5px 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background: white ;
  background: url(/static/img/svgs/33.svg)   96% / 15% no-repeat #eee;

}
</style>
