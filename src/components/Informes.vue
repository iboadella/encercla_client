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
      <div class="col-sm-2" style="opacity: 0.4">

    <a href="#/admin/surveys" style="color:white">
    <figure>
    <img src="/static/img/svgs/15.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Visualització de qüestionaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" style="opacity: 0.4" >

    <a href="#/ranking" style="color:white">
    <figure>
    <img src="/static/img/svgs/16.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{'Rànquing de resultats'|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-2" >

    <a href="" style="color:white">
    <figure>
    <img src="/static/img/svgs/17.svg" alt="Smiley face"  height="30" width="30">
    <figcaption>{{"Extracció d'informes"|translate}}</figcaption>
  </figure>
</a>
</div>
 </div>

         <div class="row" style="color:white">

      <div class="col-sm-4">
      <label class="control-label">Any</label>
  <select v-model="filter_any">
  	    <option value=""></option>
        <option v-for="item in unique_any" :value="item">{{item}}</option>
    </select>  
    </div>
    <div class="col-sm-4">  
      <label class="control-label">Sector</label>
      <select v-model="filter_sector">
  	    <option value=""></option>
        <option v-for="item in unique_sector" :value="item">{{item}}</option>
    </select>  
  </div>
  <div class="col-sm-4">
          <label class="control-label">Subsector</label>
      <select v-model="filter_subsector">
  	    <option value=""></option>
        <option v-for="item in unique_subsector" :value="item">{{item}}</option>
    </select> 
  </div>
</div>
 
  <div class="row">



        <div class="col-sm-8 .offset-sm-4">



 <span v-show="false">{{filtered_surveys}}</span>
 <div id="printable" style="">
<table class="table table-light table-bordered">
  <tbody style="">
 <tr> 
  <td>{{'Mitjana puntuació obtinguda'|translate}}</td>
  <td>{{avg_score.toFixed(2)}}</td>
</tr>

 <tr>
  <td>{{'Mitjana puntuació futurible'|translate}}</td>
  <td> {{avg_score_future.toFixed(2)}}</td>
</tr>
 <tr>
  <td>{{'Preguntes millor puntuades'|translate}}</td>
  <td>
 
 1 - {{questions[answers[1].id-1][lang].statement}}
</td>
</tr>
 <tr>
  <td></td>
  <td>
 2 - {{questions[answers[2].id-1][lang].statement}}
</td>
</tr>
 <tr>
  <td></td>
  <td>
 3 - {{questions[answers[3].id-1][lang].statement}}
</td>
</tr>
 <tr>
  <td> {{'Preguntes pitjor puntuades'|translate}}</td>
  <td>
 1 - {{questions[answers[answers.length-1].id-1][lang].statement}}
</td>
</tr>
 <tr>
  <td> </td>
  <td>
 2 - {{questions[answers[answers.length-2].id-1][lang].statement}}
</td>
</tr>
 <tr>
  <td> </td>
  <td>
 3 - {{questions[answers[answers.length-3].id-1][lang].statement}}
</td>
</tr>
</tbody>
</table>


<div id="chart" class="chart" style="background-color:#e84d20">
  </div>
  <div id="chart_future" class="chart" style="background-color:#e84d20">
  </div>
</div>
            <div class="col-sm-2">

<button class="btn btn-primary" type="button" v-on:click="exportToPDF()">
<img src="/static/img/svgs/17.svg" alt="Smiley face"  height="40" width="40">
</button>
</div>
    </div>
  </div>
    <b-modal ref="myModalError" id="myModalError">
    {{this.error}}
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
import 'vue-awesome/icons/copy'
import Icon from 'vue-awesome/components/Icon'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import XLSX from 'xlsx';
import auth from '../auth/index.js'
import { saveAs } from 'file-saver/FileSaver';
import html2pdf from 'html2pdf.js'

export default {
  components: {
    Icon,
    'b-modal': bModal
  },
  name: 'Informes',
  data () {
    return {
      user: 'dpiscia',
      company:{id:1},
      DARI_filename:'',
      survey:'',
      company_surveys:[],
      error:'',
      selected:'',
      filter_any:'',
      filter_sector:'',
      filter_subsector:'',
      filter_comarca:'',
      companies:'',
      filter_leader:'',
      filtered:[],
      filtered_evolution:[],
      filtered_evolution_avg:[],
      dataExcel:[],
      value:'score',
      plot:'compare',
      avg_score:0,
      avg_score_future:0,
      answers:[],
      questions:[]
    }
  },
  computed:{
         lang: function () {
      return this.$i18n.locale()
    },
    unique_any () {
    return uniq(this.filtered.map(p => p.pub_date).filter(p=>p!=null))
  },

        unique_sector () {
    return uniq(this.filtered.map(p => p.sector).filter(p=>p!=null))
  },
          unique_subsector () {
    return uniq(this.filtered.map(p => p.subsector).filter(p=>p!=null))
  },

  filtered_surveys(){

  	var filtered=this.company_surveys
    filtered=_.filter(filtered, {status:'submitted' });
    if (this.filter_any!='')
    filtered=_.filter(filtered, {pub_date:this.filter_any });
      if (this.filter_sector!='')
    filtered=_.filter(filtered, {sector:this.filter_sector});
      if (this.filter_subsector!='')
    filtered=_.filter(filtered, {subsector:this.filter_subsector });
    
    var grouped=_.groupBy(filtered,'id_company')
    var maxScores=Object.keys(grouped).map(function(company){return _.maxBy(grouped[company],'score')})
    filtered=[]
    maxScores.map(function(item){  filtered.push(item)})
    this.avg_score=_.meanBy(maxScores, (p) => p.score)
    this.avg_score_future= _.meanBy(maxScores, (p) => p.score_future)

    this.filtered=filtered;
    var array=this.filtered.map(x=>x.id_surveycompany).join(',')
      var lang=this.$i18n.locale()
      this.$http.get('dataExcel?ids='+array+'&lang='+lang, {  headers: auth.getAuthHeader() })
    .then(request => {
    	request.data.forEach(function(x){  

        var id=x.id;
    		delete x.id; 
    		delete x.Preguntes
    		var score=0;
    		var score_future=0;
    		var counter=0;
            for (var key in x){
            	if (key.endsWith("futurible")){
            		score_future=score_future+x[key]
            	}
                else {
					score=score+x[key]	
                }
                counter=counter+1
            }
            x.score = score/(counter/2)
            x.score_future = score_future/(counter/2)
            x.id=id;


    	}
    	)
            this.answers=_.orderBy(request.data.filter(x=> x.score >= 0 && x.id!="Total"),['score'], ['asc'])

    	console.log("s")
    })

    d3.select("svg").remove()
    d3.select("svg").remove()
    this.renderBarChart("score");
    this.renderBarChart("score_future");

    return true
  },

  keepMax(){

    grouped=_.groupBy(this.filtered,'id_company')
    maxScores=Object.keys(grouped).map(function(company){return _.maxBy(grouped[company],'score')})
    return maxScores;
  }
  }
  ,methods: {

        exportToPDF :function() {
      console.log("exported")
      var element= window.document.getElementById("printable");
      var opt = {
  margin:       0.75,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
  d3.select("svg").remove()
    d3.select("svg").remove()
    this.renderBarChart("score");
    this.renderBarChart("score_future");

      //this.renderBarChart()
      html2pdf(element,opt);
    },
setScore(value){
this.value=value;
if (this.plot=="compare"){
//this.renderBarChart()
}
else
{
//this.renderChart()
}

},
downloadSurvey(){
  
  var selected;
  this.filtered.forEach(function(item,index){if (item.selected)  selected=item.id_surveycompany})
  if (selected==undefined)
  { 
    this.error="you have to select one survey"
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
filtered_surveys_evolution(){

    var filtered=this.filtered

    
    var grouped=_.groupBy(filtered,'pub_date')
    var maxScores=Object.keys(grouped).map(function(company){return _.maxBy(grouped[company],'score')})
    filtered=[]
    maxScores.map(function(item){  filtered.push(item)})
    this.filtered_evolution=filtered;
    return filtered
  },
filtered_surveys_evolution_avg(){

    var filtered=this.company_surveys
    filtered=_.filter(filtered, {status:'submitted' });
    //substitue industrail by seelcted sector
    filtered=_.filter(filtered, {sector:'Industrial' });
    var grouped=_.groupBy(filtered,'pub_date')
    var maxScores=Object.keys(grouped).map(function(company){return _.meanBy(grouped[company],'score')})
    filtered=[]
    maxScores.map(function(item){  filtered.push(item)})
    this.filtered_evolution_avg=filtered;
    return filtered
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
    },
  
      renderBarChart: function(type) {
        this.plot='compare'
        var value=type
        var id='#chart'
var data = this.filtered
        if (value=='score_future'){
        	id="#chart_future"
        data = data.sort(function (a, b) {
            return d3.ascending( a[value], b[value]);
        })
        }
        else {
        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending( a[value], b[value]);
        })
      }

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 50,
            bottom: 15,
            left: 200
        };

        var width = 680 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom;
        
           //if (type=='score') 
           //	d3.select("svg").remove()

        var svg = d3.select('#chart').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill",'white')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d[value];
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.commercial_name;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(3)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
}

// function for the y grid lines
function make_y_axis() {
  return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
}

  

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.commercial_name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d[value]);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            .attr("color","black")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.commercial_name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d[value]) + 3;
            })
            .text(function (d) {
                return d[value];
            });

      },fetchQuestions (arrays) {
  this.$http.get('questions', { headers: auth.getAuthHeader() })
    .then(request => {this.questions=request.data.data 
                      
                })
    .catch(() => "")
}

},mounted(){this.fetchCompanySurvey(),this.fetchQuestions()}
,created() {
      this.renderBarChart("score");
    this.renderBarChart("score_future");
}
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
.bar {
            fill: white;
        }
        
.axis {
            font-size: 13px;
            color:white;
            fill:black;
        }
        
        .axis path,
        .axis line {
            fill: none;
            display: none;
            color:white;
        }
        
        .label {
            font-size: 13px;
        }
select {
   margin: 5px;
  width: 200px;
  padding: 5px 35px 5px 5px;
  font-size: 16px;
  border: 1px solid #white;
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