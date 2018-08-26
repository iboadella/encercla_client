<template>
<div class="container bg-primary">
   <div class="row">
      <div class="col-12">
        <span v-on:click="moveLeft()">
         <icon name="arrow-left"  scale="1.5" class="float-left"  style="height: 1em" />
       </span>
         <li style="background-color:#e84d20" v-for="(item,index) in questions">
            <span v-on:click="setSelected(index)">
               <icon v-if="index==selected&& answers[selected].score!=-1"name="circle" style="height: 1em" color="green"/>
               <icon v-if="index==selected&& answers[selected].score==-1"name="circle" style="height: 1em" color="black"/>
               <icon v-if="index!=selected&& answers[index].score!=-1"name="circle-o" style="height: 1em" color="green"/>
               <icon v-if="index!=selected&& answers[index].score==-1"name="circle-o" style="height: 1em" color="black"/>
            </span>
         </li>
        <span v-on:click="moveRight()">
         <icon class="float-right" scale="1.5" name="arrow-right" style="height: 1em" />
       </span>
      </div>
    </div>
   <div class="row" style="padding-top: 1em;">
      <div class="col-12">
        Score: {{this.answers[this.selected].score}} {{selected+1 +'/'+answers.length}}
         <h5 class="text-left" style="color:white">
            {{questions[selected][lang].statement}}
            <span id="exButton2" v-on:click="showModaltooltip()" >
               <icon name="question-circle"   scale="1.5" style="vertical-align: middle;"/>
            </span>
            <div id="dav" class="container" style="max-width:100%">
               <!--b-tooltip  boundary="window" target="exButton2" placement="bottom">
                  <div class="container" style="word-wrap: break-word;width: 750px;max-height:500px; font-size:14px">
                     {{questions[selected].more_information}}
                  </div>
               </b-tooltip-->
            </div>
            </li>
         </h5>
      </div>
   </div>
   <div class="row">
      <div class="col-12">
         <ul class="list-group">
            <li v-for ="item in items" class="list-group-item" v-on:click="setOption(item)" 
               v-bind:style="compare(item)"  v-if="questions[selected][lang]['q'+item]!=''"> {{ questions[selected][lang]['q'+item]}}</li>
         </ul>
      </div>
   </div>
   <div class="row" style="padding-top:1em">
      <div v-if="answers[selected].justification_file==''"class="col-sm-3">
         <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
         </label>
      </div>
      <div v-else class="col-sm-3">
         {{answers[selected].justification_file}}
         <button class="btn btn-primary" type="button" @click="deleteFile">
<icon name="remove"  scale="1.5" style="vertical-align: middle;"/></button>
         </label>
      </div>
   </div>
   <div class="row" style="padding-top:1em">
      <div class="col-12">
         <input v-model="answers[selected].justification_text" type="text" id="inputcommercial_name" class="form-control" required autofocus @input="onInput()" 
            style="height:100px;background-color:#e84d20; color:white; ">
      </div>
   </div>
   <div class="row" style="padding-top:2em">
      <div class="col-sm-2">
         <input type="checkbox" class="form-check-input" v-model="answers[selected].future">
         <label class="form-check-label" for="exampleCheck1"> Futurible</label>
      </div>
      <div class="col-12">
         <input v-model="answers[selected].future_justification_text" type="text" id="inputcommercial_name" class="form-control" :placeholder="questions[selected][lang].futurible" required autofocus @input="onInput()" 
            style="height:100px;background-color:#e84d20; color:white; ">
      </div>
   </div>
   <!--div class="form-group">
      <div class="container">
      <div class="large-12 medium-12 small-12 cell">
       {{answers[selected].justification_file}}
      
      </div>
      </div-->

   <div style="padding-top:1em">
        <span v-on:click="moveLeft()">
         <icon name="arrow-left"  scale="1.5" class="float-left"  style="height: 1em" />
       </span>
      <b-button v-on:click="submitSurvey()" v-bind:class="{disabled: !submittable}" variant="success">Submit</b-button>
        <span v-on:click="moveRight()">
         <icon class="float-right" scale="1.5" name="arrow-right" style="height: 1em" />
       </span>
   </div>
        <b-modal ref="myModalRef" id="myModal">
    {{this.error}}
     </b-modal>
             <b-modal ref="tooltip" id="tooltip">
    {{questions[selected][lang].more_information}}
  <img v-bind:src="'/static/img/'+questions[selected][lang].id+'.jpg'">
     </b-modal>
</div>

</div>

</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/circle-o'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/arrow-left'
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
      timeoutId:1000,
      error:''
      
    }
  },
  computed: {

        lang: function () {
      return this.$i18n.locale()
    }
  ,
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
  deleteFile(){
    this.$http.delete('upload?answer='+this.answers[this.selected].id, { headers: auth.getAuthHeader() })
    .then(request => {
    console.log("deleted")
    this.answers[this.selected].justification_file=''
    this.updateAnswer()
    })
    .catch(() => "")
   

  },
  canMove(){
    if (this.answers[this.selected].score==-1 && this.answers[this.selected].id_option!=-1)
      {
        this.error="you have to complete the answer"
        this.showModal()
        return false
     }
     else {
        if (this.answers[this.selected].future && this.answers[this.selected].future_justification_text.length<2)
           {
            this.error="you have to complete the futurible answer"
            this.showModal()
            return false
           } 
      else         
      return true}

  },
  scoreable(){
   if (this.answers[this.selected].id_option!=-1 &&  
    (this.answers[this.selected].justification_file!='' || this.answers[this.selected].justification_text.length>2)
      )
    {
      return true;
    }
  else 
    {
      return false;
    }

  },

    moveLeft(){
      if (this.canMove()){
      if(this.selected!=0) this.selected=this.selected-1;
        else this.selected= this.questions.length-1;
      this.$refs.file.value=""
      }
   },
    moveRight(){
      if (this.canMove()){
      this.canMove()
      if(this.selected!=this.questions.length-1) this.selected=this.selected+1;
        else this.selected= 0;
        this.$refs.file.value=""
      }
   },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
        showModaltooltip () {
      this.$refs.tooltip.show()
    },
    hideModaltooltip () {
      this.$refs.tooltip.hide()
    },
onInput(e) {
    //updateAnswer=this.updateAnswer()
      // this will be called on change of value
	console.log('Textarea Change');
        clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
        // Runs 1 second (1000 ms) after the last change    
        this.updateAnswer();
    }, 1000);

   },
 submitSurvey() {
  this.company_survey.status="submitted"
  var company_survey= this.company_survey
  this.$http.put('companysurvey/'+company_survey.id, {company_survey},
 { headers: auth.getAuthHeader() })
    .then(request => {
         console.log("OK")
         this.$router.replace(this.$route.query.redirect || '/results/'+this.$route.params.id)
                      
                })
    .catch(() => this.company_survey.status="created"
         )
},
 updateAnswer() {
  var answer= this.answers[this.selected]
  if (this.scoreable()!=false)
      {
        this.answers[this.selected].score= this.getpoints(this.questions[this.selected][this.lang],this.answers[this.selected].id_option)
        console.log("scoreable")
        if (this.answers[this.selected].future_justification_text.length>2 && this.answers[this.selected].future)
          this.answers[this.selected].score_future=1-this.answers[this.selected].score
        else 
          this.answers[this.selected].score_future=0;
      }
  else 
      {
        this.answers[this.selected].score=-1
        this.answers[this.selected].score_future=0
        console.log("not scoreable")
      }
  this.$http.put('answer/'+answer.id, {answer },
 { headers: auth.getAuthHeader() })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => console.log("KO")
         )
},
 fetchAnswers (arrays) {
  this.$http.get('answers?ids='+arrays,  { headers: auth.getAuthHeader() })
    .then(request => {this.answers=request.data.data 
                      
                })
    .catch(() => "")
},

 fetchQuestions (arrays) {
  this.$http.get('questions?ids='+arrays, { headers: auth.getAuthHeader() })
    .then(request => {this.questions=request.data.data 
                      
                })
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('companysurvey/'+this.$route.params.id, { headers: auth.getAuthHeader() })
    .then(request => {this.company_survey=request.data
                      this.fetchQuestions(request.data.questions)
                      this.fetchAnswers(request.data.answers)
                      })
    .catch(() => "")
},
   setSelected(index){
    if (this.canMove()){
    this.selected=index;
    this.$refs.file.value="";
   }
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
