<template>
  <div id="printable"  class="hello">
 <div class="container">
     <div class="col-md-4 offset-md-4" style="background-color:black;border-radius: 5ex !important;">
 <p class="text-light"> Punctuacio obtinguda  {{results_avg.avg}}/100</p>
<p class="text-light"> Punctuacio futurible  {{results_avg.avg_future}}/100</p>
    </div>
  </div>
  <div id="chart" class="chart">
  </div>
  

  <p class="text-light">
	Propostes de millora per estrategia;
  </p>

  <span v-for="(value,strategy) in results" class="demo">
         <li class="list-group-item" style="color:#e84d20;border-top-left-radius: 5ex !important;
          border-top-right-radius: 5ex !important;">{{strategy}}</li>
          
	  <li class="list-group-item" v-for="(item,index) in filtered(strategy)">
		  <p>
		   {{questions[item][lang].proposta_millora}}
		  </p>
	  </li>
          <li class="list-group-item" style="border-bottom-left-radius: 5ex !important;
          border-bottom-right-radius: 5ex !important;"></li>
           <p></p>
        
  </span>
    <b-button v-on:click="exportToPDF()">Export</b-button>

  </div>
</template>

<script>
import lodash from 'lodash'
import auth from '../auth/index.js'
import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'
import bButton from 'bootstrap-vue/es/components/button/button';
export default {
    components: {
   'b-button': bButton,
  },
  name: 'Results',
  data () {
    return {
      data: [
	{ name: 'IE', percent: 39.10 },
	{ name: 'Chrome', percent: 32.51 },
	{ name: 'Safari', percent: 13.68 },
	{ name: 'Firefox', percent: 8.71 },
	{ name: 'Others', percent: 6.01 }
],
      questions :[],
      selected:0,
      answers:[],
      answerplus:[],
      company_survey:'',
      score:'',
      results_avg:'',
      results:'',
      results_avg_future:0
    }
  },
  computed:{
       lang: function () {
      return this.$i18n.locale()
    }

   },
  methods:{
    exportToPDF :function() {
      console.log("exported")
      var element= window.document.getElementById("printable");
      html2pdf(element);
    },
   filtered :function(strategy) {
    var questions=this.questions
   var lista =[]
   this.answers.filter(function(answer,index){
if (answer.score < 1 && questions[index]['cat'].strategy==strategy) {
lista.push(index)
}})
return lista
   },
computeScore(){


   var answers=[]
   answers= this.answers
   var questions= []
   questions= this.questions.map(x=> x.cat);
   var  answersplus= []
   var results=[]
   answersplus=_.map(answers,function(obj){ return _.assign(obj,_.find(questions, {id:obj.id_question}));})
   results = answersplus.reduce(function(acc,x){
    var id= acc[x.strategy]
    if (id) {
    id.score =id.score + x.score;
    id.score_future =id.score_future + x.score_future;
    id.nums= id.nums+1
    }
    else { 
   acc[x.strategy] ={'score':x.score, 'score_future':x.score_future}
   acc[x.strategy].nums= 1   
      
   }
  return acc},{})
  
  
  var results_avg = {'score':0,'score_future':0, 'numsector':0, 'avg':0, 'avg_future':0};
  
  
  results_avg.score=0
  results_avg.numsector=0
  for (var key in results) {

       results[key].avg= results[key].score/results[key].nums
       results[key].avg_future= results[key].score_future/results[key].nums
      results_avg.score= results_avg.score+results[key].avg;
      results_avg.score_future= results_avg.score_future+results[key].avg_future;
       results_avg.numsector= results_avg.numsector+1

  }
  this.results= results

 // results.forEach(function(result){
   //  results_avg.score= results_avg.score+result.score; results_avg.numsector= results_avg.numsector+1})
  results_avg.avg= results_avg.score*100/results_avg.numsector;
  results_avg.avg_future= results_avg.score_future*100/results_avg.numsector;
  this.results_avg=results_avg;
  this.company_survey.score=results_avg.avg
  this.company_survey.score_future=results_avg.avg_future

  this.updateCompanySurvey()
},
 fetchAnswers (arrays) {
  this.$http.get('answers?ids='+arrays,  { headers: auth.getAuthHeader() })
    .then(request => {this.answers=request.data.data , this.computeScore()
                      
                })
    .catch(() => "")
},

 fetchQuestions (arrays, answers) {
  this.$http.get('questions?ids='+arrays, { headers: auth.getAuthHeader() })
    .then(request => {this.questions=request.data.data;
                      this.fetchAnswers(answers) 
                      
                })
    .catch(() => "")
},
 fetchCompanySurvey () {
  this.$http.get('companysurvey/'+this.$route.params.id, { headers: auth.getAuthHeader() })
    .then(request => {this.company_survey=request.data
                      this.fetchQuestions(request.data.questions,request.data.answers)

                      })
    .catch(() => "")
},
updateCompanySurvey(){
  var company_survey= this.company_survey
      this.$http.put('companysurvey/'+company_survey.id, {company_survey},
 { headers: auth.getAuthHeader() })
    .then(request => {
         console.log("OK")
                      
                })
    .catch(() => this.error=''
         )
},
        renderChart: function(data) {
          // This code is based on https://bost.ocks.org/mike/bar/2/
	var pie=d3.layout.pie()
		.value(function(d){return d.percent})
		.sort(null)
		.padAngle(.03);
	 
	var w=300,h=300;
	 
	var outerRadius=w/2;
	var innerRadius=100;
	 
	var color = d3.scale.category10();
	 
	var arc=d3.svg.arc()
		.outerRadius(outerRadius)
		.innerRadius(innerRadius);
	 
	var svg=d3.select("#chart")
		.append("svg")
		.attr({
		    width:w,
		    height:h,
		    class:'shadow'
		}).append('g')
		.attr({
		    transform:'translate('+w/2+','+h/2+')'
        });

	  var path=svg.selectAll('path')
		.data(pie(data))
		.enter()
		.append('path')
		.attr({
		    d:arc,
		    fill:function(d,i){
		        return color(d.data.name);
		    }
		});
        }

	},mounted(){this.fetchCompanySurvey();
                    this.renderChart(this.$data.data);
	}
        
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
