<template>
  <div class="container bg-primary">
     <div class="row">
    <div class="col-12">
    <li style="background-color:#e84d20" v-for="(item,index) in questions">
    <span v-on:click="setSelected(index)">
       
       <icon v-if="index==selected"name="circle-o" style="height: 1em" color="green"/>
       <icon v-if="index!=selected"name="circle-o" style="height: 1em" color="black"/>
    </span>

    </li>
    <h5 class="text-left" style="color:white">{{questions[selected].statement}}
    <span id="exButton2">
	<icon name="question-circle"   scale="1.5" style="vertical-align: middle;"/>
    </span>
<div id="dav" class="container" style="max-width:100%">
 <b-tooltip  boundary="window" target="exButton2" placement="bottom">
    <div class="container" style="word-wrap: break-word;width: 750px;max-height:500px; font-size:14px">
    {{questions[selected].more_information}}
    </div>
  </b-tooltip>
</div>
   </li>

   </h5>
   </div>
  </div>
   <div class="row">
    <div class="col-9">
    <ul class="list-group">
    <li v-for ="item in items" class="list-group-item" v-on:click="setOption(item)" 
v-bind:style="compare(item)"  v-if="questions[selected]['q'+item]!=''"> {{ questions[selected]['q'+item]}}</li>

  </ul>
   </div>
  </div>
<div class="row">
    <div class="col-sm-2">
	    <input type="checkbox" class="form-check-input">
	    <label class="form-check-label" for="exampleCheck1"> Futurible</label>
    </div>
    <div class="col-sm-3">
              
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
    </div>
</div>
<div class="row">
    <div class="col-9">
    <input v-model="answers[selected].justification_text" type="text" id="inputcommercial_name" class="form-control" :placeholder="questions[selected].futurible" required autofocus @input="onInput()" 
style="height:100px;background-color:#e84d20; color:white; ">
    </div>
</div>
  <!--div class="form-group">
      <div class="container">
    <div class="large-12 medium-12 small-12 cell">
       {{answers[selected].justification_file}}

    </div>
  </div-->
<div>
  <b-button v-on:click="submitSurvey()" v-bind:class="{disabled: !submittable}" variant="success">Submit</b-button>
 
</div>

  </div>


  </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/circle-o'
import 'vue-awesome/icons/question-circle'
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio';
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip';
import Icon from 'vue-awesome/components/Icon'
import auth from '../auth/index.js'
export default {
  components: {
    Icon,
   'b-button': bButton,
   'b-tooltip': bTooltip,
   'b-modal': bModal
  },
  name: 'Questions',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      questions :[],
      selected:0,
      answers:[],
      company_survey:'',
      selected_class : 'list-group-item-primary',
      items:[1,2,3,4],
      timeoutId:''
      
    }
  },
  computed: {

    // a computed getter
    submittable: function () {
      // `this` points to the vm instance
      console.log("sub")
      var submitted=[]
    this.answers.map(function(answer){if (answer.score!= -1) submitted.push(answer.score)})
    this.company_survey.score= submitted.reduce((a, b) => a + b, 0)
     if (submitted.length==this.answers.length) return true
     else return false
    }
  }
,methods: {
 
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
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
 submitSurvey() {
  this.company_survey.status="submitted"
  var company_survey= this.company_survey
  this.$http.put('http://127.0.0.1:5000/companysurvey/'+company_survey.id, {company_survey},
 { headers: auth.getAuthHeader() })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => this.company_survey.status="created"
         )
},
 updateAnswer() {
  var answer= this.answers[this.selected]
  this.$http.put('http://127.0.0.1:5000/answer/'+answer.id, {answer },
 { headers: auth.getAuthHeader() })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => console.log("KO")
         )
},
 fetchAnswers (arrays) {
  this.$http.get('http://127.0.0.1:5000/answers?ids='+arrays,  { headers: auth.getAuthHeader() })
    .then(request => {this.answers=request.data.data 
                      
                })
    .catch(() => "")
},

 fetchQuestions (arrays) {
  this.$http.get('http://127.0.0.1:5000/questions?ids='+arrays, { headers: auth.getAuthHeader() })
    .then(request => {this.questions=request.data.data 
                      
                })
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('http://127.0.0.1:5000/companysurvey/'+this.$route.params.id, { headers: auth.getAuthHeader() })
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
if (item==this.answers[this.selected].id_option) return 'background-color:#e84d20; color:white;' 
else return 'background-color:white; color:black;'
},
getpoints(question,value){
  var n=2;
  if (question.q3!='') n=3;
  if (question.q4 != undefined && question.q4!='') n=4;
  if (value==n) return 1;
  else if (value==1) return 0;
  else if (value==2 & n==3) return 0.5
  else if (value==2 & n==4) return 0.33
  else return 0.66;
},
setOption(value){
	this.answers[this.selected].id_option=value; 
        this.answers[this.selected].score= this.getpoints(this.questions[this.selected],value)
	this.updateAnswer(this.answers[this.selected])
},
handleFileUpload(){
		this.answers[this.selected].justification_file=this.$refs.file.files[0].name;
		let formData = new FormData();
		formData.append('file', this.$refs.file.files[0]);
		this.$http.post( 'http://localhost:5000/upload?answer='+this.answers[this.selected].id,
		  formData,
		  {
		    headers: {
			'Content-Type': 'multipart/form-data'
		    }
		  }
		).then(request=> {
		  this.updateAnswer(this.answers[this.selected]);
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
  background-color: white;
 
}
.list-group-item {
    float: left;
    margin: 5px;
    padding: 10px 0px;
    border-radius: 5ex !important;
    border-width: 1ex;
    border-color:white;
    

}
.popover{
    max-width: 100%; /* Max Width of the popover (depending on the container!) */
}
.tooltip-inner{
max-width:900px !important
}
</style>
