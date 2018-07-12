<template>
  <div class="container bg-primary">
    <li v-for="(item,index) in questions">
    <span v-on:click="setSelected(index)">
       
       <icon v-if="index==selected"name="circle" style="height: 1em" color="green"/>
       <icon v-if="index!=selected"name="circle" style="height: 1em" color="black"/>
    </span>
    </li>
    <h5 class="text-left" style="color:white">{{questions[selected].statement}}
    <icon name="question-circle"  scale="1.5" style="vertical-align: middle;"/></li>
   </h5>
    <ul class="list-group">
    <li v-for ="item in items" class="list-group-item" v-on:click="setOption(item)" 
v-bind:class="compare(item)" > {{ questions[selected]['q'+item]}}</li>

  </ul>
    <input v-model="answers[selected].justification_text" type="text" id="inputcommercial_name" class="form-control" placeholder="survey Name" required autofocus @input="onInput()">
  <div class="form-group">
      <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
    </div>
  </div>
  </div>
    

  </div>
</template>

<script>
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/question-circle'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  name: 'Questions',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      questions :[],
      selected:0,
      answers:[],
      company_survey:'',
      selected_class : 'list-group-item-secondary',
      items:[1,2,3,4],
      timeoutId:''
      
    }
  },methods: {
onInput(e) {
    updateAnswer=this.updateAnswer()
      // this will be called on change of value
	console.log('Textarea Change');
        clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(function() {
        // Runs 1 second (1000 ms) after the last change    
        this.updateAnswer();
    }, 1000);

   },
/* updateAnswer(answer) {
  this.$http.put('http://127.0.0.1:5000/answer/'+answer.id, {answer })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => console.log("KO")
         )
},*/
 updateAnswer() {
  var answer= this.answers[this.selected]
  this.$http.put('http://127.0.0.1:5000/answer/'+answer.id, {answer })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => console.log("KO")
         )
},
 fetchAnswers (arrays) {
  this.$http.get('http://127.0.0.1:5000/answers?ids='+arrays, { })
    .then(request => {this.answers=request.data.data 
                      
                })
    .catch(() => "")
},

 fetchQuestions (arrays) {
  this.$http.get('http://127.0.0.1:5000/questions?ids='+arrays, { })
    .then(request => {this.questions=request.data.data 
                      
                })
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('http://127.0.0.1:5000/companysurvey/'+this.$route.params.id, { })
    .then(request => {this.company_survey=request.data
                      this.fetchQuestions(request.data.questions)
                      this.fetchAnswers(request.data.answers)
                      })
    .catch(() => "")
},
   setSelected(index){
    this.selected=index;
   },
compare(item){
if (item==this.answers[this.selected].id_option) return 'list-group-item-success' 
else return false
},
setOption(value){
	this.answers[this.selected].id_option=value;
	this.updateAnswer(this.answers[this.selected])
},
handleFileUpload(){
this.answers[this.selected].justification_file=this.$refs.file.files[0];
let formData = new FormData();
formData.append('file', this.answers[this.selected].justification_file);
this.$http.post( 'http://localhost:5000/upload',
  formData,
  {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  }
).then(function(){
  console.log('SUCCESS!!');
})
.catch(function(){
  console.log('FAILURE!!');
});
}
},mounted(){this.fetchCompanySurvey()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.list-group-item {
    float: left;
    margin: 0px;
    padding: 10px 0px;
    border-radius: 5ex !important;

}
</style>
