<template>
  <div>
    <div class="row" >
      <div class="col-sm-2">
    <a href="#/admin/users" style="color:white">
    <figure>
    <img src="/static/img/svgs/14.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Gestió d'usuaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" style="opacity: 0.4">

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

    <a href="#/informes" style="color:white">
    <figure>
    <img src="/static/img/svgs/17.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Extracció d'informes"|translate}}</figcaption>
  </figure>
</a>
</div>
 </div>



  <div class="container bg-primary">
    
    <div class="col-sm-12">
      <label class="control-label" style="color:white">Comarca</label>
        <!--img src="/static/img/svgs/37.svg" alt="Smiley face"  height="33" width="33"-->
        <select v-model="filter_comarca">
        <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item}}</option>

    </select> 
    <label class="control-label" style="color:white">{{'Territori Leader'|translate}}</label>  
        <select v-model="filter_leader">
        <option value=""></option>
        <option v-for="item in unique_leader" :value="item">{{item}}</option>
    </select>   
  </div>
    <a href="/#/registerAdmin"><button class="btn btn-primary" type="button"  >
<img src="/static/img/svgs/33.svg" alt="Smiley face"  height="35" width="35">
</button>
</button></a>
<button class="btn btn-primary" type="button"  @click="showModalConfirmation()">
<img src="/static/img/svgs/34.svg" alt="Smiley face"  height="35" width="35">
</button>
</button>
<button class="btn btn-primary" type="button" @click="editUser()">
<img src="/static/img/svgs/35.svg" alt="Smiley face"  height="35" width="35">
</button>
</button>
<button class="btn btn-primary" type="button" @click="exportUsers()">
<img src="/static/img/svgs/36.svg" alt="Smiley face"  height="35" width="35">
</button>
</button>
    <table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th @click="sortBy('email')" scope="col"><img src="/static/img/svgs/06.svg" alt="Smiley face"  height="33" width="33" style="float:left">
      <span>
        {{'Usuari'|translate}}
      </span>
      </th>
      <th @click="sortBy('empresa')"scope="col">
        <img src="/static/img/svgs/10.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Empresa'|translate}}</th>
      <th scope="col">
        <img src="/static/img/svgs/06.svg" alt="Smiley face"  height="33" width="33" style="float:left">{{'Super-usuari'|translate}}</th>
    
      
    </tr>
  </thead>
  <tbody> 
    <tr v-for="(item,index) in filtered_users">
 <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(item)"></td>
      <td>{{item.email}}</td>
     <td>{{item.company}}</td>
     <td>{{item.type}}</td>
     
     
</tr>
</tbody>
</table>
</div>
    <b-modal ref="myModalError" id="myModalError">
    {{this.error}}
     </b-modal>
              <b-modal ref="Confirmation" id="Confirmation" hide-footer>
      {{'Estàs segur d’esborrar el usuari?'|translate}}
      <button class="btn btn-primary" variant="outline-danger" block @click="hideModalConfirmation()">{{'Enrere'|translate}}</button>
      <button class="btn btn-primary" variant="outline-danger" block @click="deleteUser()">OK</button>
     </b-modal>
</div>
</template>

<script>
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/download'
import 'vue-awesome/icons/copy'
import Icon from 'vue-awesome/components/Icon'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import XLSX from 'xlsx';
import auth from '../auth/index.js'
import { saveAs } from 'file-saver/FileSaver';
import uniq from 'lodash/uniq'
export default {
  components: {
    Icon,
    'b-modal': bModal
  },
  name: 'UsersManagement',
  data () {
    return {
       users :[],
       error:'',
       filter_comarca:'',
       filter_leader:'',
       filtered:[],
       sort_field:'email',
       sort_order:['asc', 'desc']
     }

  } , computed:{

            unique_comarca () {
    return uniq(this.filtered.map(p => p.comarca).filter(p=>p!=null))
  },
            unique_leader () {
    return uniq(this.filtered.map(p => p.leader).filter(p=>p!=null))
  },
  filtered_users(){
    var filtered=this.users
      if (this.filter_comarca!='')
    filtered=_.filter(filtered, {comarca:this.filter_comarca });
      if (this.filter_leader!='')
    filtered=_.filter(filtered, {leader:this.filter_leader });
  filtered= _.orderBy(filtered, ['type',this.sort_field], this.sort_order);
  this.filtered=filtered;
    return filtered
    
  }
  },methods: 
{
  sortBy(name){
    if (name==this.sort_field)
       {if (this.sort_order[0]=='desc')
         { this.sort_order=['asc', 'desc']}
       else
         { this.sort_order=['desc', 'asc']}
      }
   this.sort_field=name;
  },

    showModalConfirmation () {
      this.$refs.Confirmation.show()
    },
    hideModalConfirmation () {
      this.$refs.Confirmation.hide()
    },
    setOption(user){

    this.users.forEach(function(item,i){ if (item.id!=user.id) {item.selected=false} else {item.selected=!item.selected  }  })
    //this.users[index].selected=!this.users[index].selected 
     console.log("sel")
},
exportUsers(){
var export_users= []
var i18n=this.$i18n
var user_label=i18n.translate('usuari')
this.users.forEach(function(user){ if(user.type==0){export_users.push({ 'usuari':user.email, 
                                                        "any":user.year,
                                                        "empresa":user.company,
                                                        "sector":user.sector,
                                                        "subsector":user.subsector,
                                                        "persona":user.name_contact,
                                                        "telefon":user.telephone_number,
                                                        "comarca":user.comarca,
                                                        "leader":user.leader})
                                                  }}
                                                  )

var ws = XLSX.utils.json_to_sheet(export_users);

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

saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");

},
 fetchUsers () {
  this.$http.get('users', { headers: auth.getAuthHeader() })
    .then(request => {
          request.data.data.map(function(item){item.selected=false})
      this.users=request.data.data})
    .catch(() => "")
},
editUser(){
  
  var selected;
  this.users.forEach(function(item,index){if (item.selected)  {selected=item.id}})
  if (selected==undefined)
  { 
    this.error="has de seleccionar un usuari"
    this.showModalError()
  }
  else{
       this.$router.replace("/registercompany/?id="+selected)
      
  }
},
deleteUser(){
  
  var selected;
  this.users.forEach(function(item,index){if (item.selected)  {;selected=item.id}})
  if (selected==undefined)
  { 
    this.error="has de seleccionar un usuari"
    this.showModalError()
  }
  else{
    this.hideModalConfirmation()
      this.$http.delete('user/'+selected, { headers: auth.getAuthHeader() })
    .then(request => {
    console.log("deleted")
    this.users=[]
    this.fetchUsers ()
    })
    .catch(() => "")
    
  }
}
    ,showModalError () {
      this.$refs.myModalError.show()
    },
    hideModalError () {
      this.$refs.myModalError.hide()
    }
},mounted(){this.fetchUsers()}
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
   margin: 5px;
  width: 200px;
  padding: 5px 35px 5px 5px;
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
