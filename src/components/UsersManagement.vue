<template>
  <div>
  <div class="container bg-primary">
    <h4>List of Users</h4>
    <div class="col-sm-12">
      <label class="control-label">Comarca</label>
        <select v-model="filter_comarca">
        <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item}}</option>

    </select> 
    <label class="control-label">Leader</label>  
        <select v-model="filter_leader">
        <option value=""></option>
        <option v-for="item in unique_leader" :value="item">{{item}}</option>
    </select>   
  </div>
    <a href="/#/registerAdmin"><button class="btn btn-primary" type="button"  >
<icon name="plus-circle"  scale="1.5" style="vertical-align: middle;"/></button>
</button></a>
<button class="btn btn-primary" type="button"  @click="deleteUser()">
<icon name="remove"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="editUser()">
<icon name="edit"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
<button class="btn btn-primary" type="button" @click="exportUsers()">
<icon name="download"  scale="1.5" style="vertical-align: middle;"/></button>
</button>
    <table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">User</th>
      <th scope="col">Company</th>
      <th scope="col">Admin</th>
    
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in filtered_users">
 <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
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
       filtered:[]
    }

  } , computed:{

            unique_comarca () {
    return uniq(this.filtered.map(p => p.comarca))
  },
            unique_leader () {
    return uniq(this.filtered.map(p => p.leader))
  },
  filtered_users(){
    var filtered=this.users
      if (this.filter_comarca!='')
    filtered=_.filter(filtered, {comarca:this.filter_comarca });
      if (this.filter_leader!='')
    filtered=_.filter(filtered, {leader:this.filter_leader });
    this.filtered=filtered;
    return filtered
  }
  },methods: {
    setOption(index){

    this.users.forEach(function(item,i){ if (i!=index) item.selected=false})
    this.users[index].selected=!this.users[index].selected 
     console.log("sel")
},
exportUsers(){

var ws = XLSX.utils.json_to_sheet(this.users);

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
    this.error="you have to select one user"
    this.showModalError()
  }
  else{
       this.$router.replace("/updateuseradmin?id="+selected)
      
  }
},
deleteUser(){
  
  var selected;
  this.users.forEach(function(item,index){if (item.selected)  {;selected=item.id}})
  if (selected==undefined)
  { 
    this.error="you have to select one user"
    this.showModalError()
  }
  else{
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

</style>
