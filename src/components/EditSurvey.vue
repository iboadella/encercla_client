<template>
  <div class="hello">
        <table class="table table-light table-bordered">
  <thead>
  	
    <tr>
      <th scope="col"></th>
     </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in questions">
 
      <td>{{item[lang].statement}}</td>
      <td><input type="checkbox" v-model="item.selected"></td>
     
</tr>
</tbody>
</table>
      <button v-on:click="updateSurvey()" variant="success">Desa</button>

  </div>
</template>

<script>
import auth from '../auth/index.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      company: '',
      survey:'',
      questions:'',
      questions_applied:''
    }
  } , computed: {

        lang: function () {
      return this.$i18n.locale()
    }
  },methods:{

  	updateSurvey(){
        var questions_applied=[]
        this.questions.map(function(item,index){if (item.selected) questions_applied.push(index+1)})
        this.$http.put('survey', { 
        'questions':questions_applied.join(),
        'id_company': this.company.id}, { headers: auth.getAuthHeader() })
    .then(request => {console.log("ok")
      this.$router.replace(this.$route.query.redirect || '/admin/users')

  })
    .catch(() => "")
        

  	},
  	 fetchCompany () {
     this.$http.get('company?user_id='+this.$route.params.id, { headers: auth.getAuthHeader() })
    .then(request => {this.company=request.data
                       this.fetchQuestions()
                       })
    .catch(() => "")
},
    fetchSurvey () {
  this.$http.get('survey?id='+this.company.id, { headers: auth.getAuthHeader() })
    .then(request => {this.survey=request.data
                      this.questions_applied=request.data.questions.split(",")
                      var questions=this.questions
                      this.questions_applied.forEach(function(value,index){questions[value-1].selected=true})
                      this.questions=questions;
                  })
    .catch(() => "")
},
 fetchQuestions (arrays) {
  this.$http.get('questions', { headers: auth.getAuthHeader() })
    .then(request => {request.data.data.map(function(item){item.selected=false});
    	              this.questions=request.data.data;
                    this.fetchSurvey()
    	              
                      
                })
    .catch(() => "")
}


  },mounted(){this.fetchCompany()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>