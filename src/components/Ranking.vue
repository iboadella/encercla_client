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
      <div class="col-sm-2" >

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
<div class="row" style="color:white">
  <div class="col-sm-4">
              <label class="control-label">Comarca</label>
      <select v-model="filter_comarca">
  	    <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item}}</option>
    </select>
  </div>
        <div class="col-sm-4">

    <label class="control-label">{{'Territori Leader'|translate}}</label>  
      <select v-model="filter_leader">
        <option value=""></option>
        <option v-for="item in unique_leader" :value="item">{{item}}</option>
    </select>    
       </div>  
     </div>
  <div class="row">
    <div class="col-sm-12">
<button class="btn btn-primary"  style="color:#e84d20; background-color:white" @click="renderBarChart('score')">{{'Comparar'|translate}} {{'Puntuació obtinguda'|translate}} </button>
<button class="btn btn-primary"  style="color:#e84d20; background-color:white" @click="renderBarChart('score_future')">{{'Comparar'|translate}} {{'Puntuació futurible'|translate}} </button>
 </div>


          <div class="col-sm-5">

<table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">
        <img src="/static/img/svgs/10.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        Nom empresa</th>
      <th scope="col">
        <img src="/static/img/svgs/16.svg" alt="Smiley face"  height="33" width="33" style="float:left">
        {{'Puntuació obtinguda'|translate}}</th>
      <th scope="col">
                <img src="/static/img/svgs/16.svg" alt="Smiley face"  height="33" width="33" style="float:left">
 {{'Puntuació futurible'|translate}}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in filtered_surveys">
    <td></td>
     <td>{{item.commercial_name}}</td>
     <td>{{item.score}}</td>
       <td>{{item.score_future}}</td>
   

     
</tr>
</tbody>
</table>

</div>

        <div class="col-sm-6">



<div id="chart" class="chart" style="background-color:#e84d20">
  </div>
  <b-button v-on:click="exportToPDF()">Export</b-button>

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
  name: 'Ranking',
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
      filter_empresa:'',
      companies:'',
      filter_leader:'',
      filtered:[],
      filtered_evolution:[],
      filtered_evolution_avg:[],
      dataExcel:[],
      value:'score',
      plot:'compare'
    }
  },
  computed:{
    unique_any () {
    return uniq(this.filtered.map(p => p.pub_date))
  },
    unique_leader () {
    return uniq(this.filtered.map(p => p.territori_leader).filter(p=>p!=null))
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
              unique_empresa () {
    return uniq(this.filtered.map(p => p.commercial_name).filter(p=>p!=null))
  },

  filtered_surveys(){

  	var filtered=this.company_surveys
    filtered=_.filter(filtered, {status:'submitted' });
      if (this.filter_leader!='')
    filtered=_.filter(filtered, {territori_leader:this.filter_leader });  
    if (this.filter_any!='')
    filtered=_.filter(filtered, {pub_date:this.filter_any });
      if (this.filter_sector!='')
    filtered=_.filter(filtered, {sector:this.filter_sector});
      if (this.filter_subsector!='')
    filtered=_.filter(filtered, {subsector:this.filter_subsector });
      if (this.filter_comarca!='')
    filtered=_.filter(filtered, {comarca:this.filter_comarca });
    
    var grouped=_.groupBy(filtered,'id_company')
    var maxScores=Object.keys(grouped).map(function(company){return _.maxBy(grouped[company],'score')})
    filtered=[]
    maxScores.map(function(item){  filtered.push(item)})
    this.filtered=filtered;
    return filtered
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
      var element= window.document.getElementById("chart");
      var opt = {
  margin:       0.75,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
      html2pdf(element,opt);
    },
setScore(value){
this.value=value;
if (this.plot=="compare"){
this.renderBarChart()
}
else
{
this.renderChart()
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

    var filtered=this.company_surveys
    filtered=_.filter(filtered, {status:'submitted' });
    //substitute id_company 1 by selected
    filtered=_.filter(filtered, {commercial_name:this.filter_empresa });
    
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
    var sector=this.filtered_evolution[0].sector
    //substitue industrail by seelcted sector
    filtered=_.filter(filtered, {sector:sector});
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
this.selected= this.filtered[index].id_company
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
            renderChart: function(data) {
     this.filtered_surveys_evolution()
     this.filtered_surveys_evolution_avg()
        this.plot='evolution'
      var score_company=this.filtered_evolution.map(x=>x.score)
        var date_company=this.filtered_evolution.map(x=>x.pub_date)
        var avg_sector=this.filtered_evolution_avg
        var results=this.filtered_surveys;
        var data = [ { label: "", 
               x: date_company, 
               y: score_company }, 
             { label: "", 
               x: date_company, 
               y: avg_sector } ] ;
var xy_chart = d3_xy_chart()
    .width(600)
    .height(500)
    .xlabel("Any")
    .ylabel("puntuació (0-100)") ;
    d3.select("svg").remove()
var svg = d3.select("#chart").append("svg")
    .datum(data)
    .call(xy_chart) ;

    function d3_xy_chart() {
    var width = 440,  
        height = 480, 
        xlabel = "X Axis Label",
        ylabel = "Y Axis Label" ;
    
    function chart(selection) {
        selection.each(function(datasets) {
            //
            // Create the plot. 
            //
            var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            var x_scale = d3.scale.ordinal()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }) -1, 
                          d3.max(datasets, function(d) { return d3.max(d.x); })  ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ 0,
                          100]) ;

            var color_scale = d3.scale.category10()
                .domain(d3.range(datasets.length)) ;

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom") ;

            var y_axis = d3.svg.axis()
                .scale(y_scale)
                .orient("left") ;

            var x_grid = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .tickSize(-innerheight)
                .outerTickSize(0)
                .tickFormat("");

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left") 
                .tickSize(-innerwidth)
                .tickFormat("")
;

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .attr("fill","#e84d20")
                .style("stroke", "white")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            svg.append("g")
                .attr("class", "x grid")
                 .attr("color","white")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis.ticks(2))
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("color","white")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .style("color","white")
                .text(ylabel) ;
              svg.data(data).enter().append("circle").attr("r", 3.5).style("color","black")


            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {
                  if (i==0) return "white";
                  else return "grey"}) ;
            


            data_lines.append("text")
                .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                .attr("transform", function(d) { 
                    return ( "translate(" + x_scale(d.final[0]) + "," + 
                             y_scale(d.final[1]) + ")" ) ; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .attr("fill", function(_, i) { return "white"; })
                .text(function(d) { return d.name; }) ;

        }) ;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function(value) {
        if(!arguments.length) return xlabel ;
        xlabel = value ;
        return chart ;
    } ;

    chart.ylabel = function(value) {
        if(!arguments.length) return ylabel ;
        ylabel = value ;
        return chart ;
    } ;

    return chart;
}

      },
      renderBarChart: function(type) {
        this.plot='compare'
        var value=type
var data = this.filtered_surveys
        if (value=='score_future'){
        data = data.sort(function (a, b) {
            return d3.ascending( a[value]+a['score'], b[value]+b['score']);
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

        var width = 660 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom;
        
           d3.select("svg").remove()
        var svg = d3.select("#chart").append("svg")
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
