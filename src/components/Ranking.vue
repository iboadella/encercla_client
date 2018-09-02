<template>
  <div class="hello">
      <div class="col-sm-12">
      <label class="control-label">Any</label>
  <select v-model="filter_any">
  	    <option value=""></option>
        <option v-for="item in unique_any" :value="item">{{item}}</option>
    </select>    
      <label class="control-label">Company</label>
  <select v-model="filter_company">
  	    <option value=""></option>
        <option v-for="item in unique_company" :value="item">{{item}}</option>
    </select> 
      <label class="control-label">Sector</label>
      <select v-model="filter_sector">
  	    <option value=""></option>
        <option v-for="item in unique_sector" :value="item">{{item}}</option>
    </select>  
          <label class="control-label">SubSector</label>
      <select v-model="filter_subsector">
  	    <option value=""></option>
        <option v-for="item in unique_subsector" :value="item">{{item}}</option>
    </select> 
              <label class="control-label">Comarca</label>
      <select v-model="filter_comarca">
  	    <option value=""></option>
        <option v-for="item in unique_comarca" :value="item">{{item}}</option>
    </select>   
       </div>  

<table class="table table-light table-bordered">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nom compania</th>
      <th scope="col">Score</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in filtered_surveys">
    <td><input type="checkbox" v-model="item.selected" v-on:click="setOption(index)"></td>
     <td>{{item.commercial_name}}</td>
     <td>{{item.score}}</td>

     
</tr>
</tbody>
</table>
<button @click="renderBarChart()"></button>
<button @click="renderChart()"></button>

<div id="chart" class="chart">
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
      companies:'',
      filter_company:'',
      filtered:[],
      dataExcel:[]
    }
  },
  computed:{
    unique_any () {
    return uniq(this.filtered.map(p => p.pub_date))
  },
      unique_company () {
    return uniq(this.filtered.map(p => p.commercial_name))
  },
        unique_sector () {
    return uniq(this.filtered.map(p => p.sector))
  },
          unique_subsector () {
    return uniq(this.filtered.map(p => p.subsector))
  },
            unique_comarca () {
    return uniq(this.filtered.map(p => p.comarca))
  },
  filtered_surveys(){
  	var filtered=this.company_surveys
    filtered=_.filter(filtered, {status:'submitted' });
    if (this.filter_company!='')
  	filtered=_.filter(filtered, {commercial_name:this.filter_company });
    // if (this.filter_status!='')
    //filtered=_.filter(filtered, {status:this.filter_status });
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
  	downloadAnswers(){
      this.$http.get('dataExcel', {  headers: auth.getAuthHeader() })
    .then(request => {
var ws = XLSX.utils.json_to_sheet(request.data);

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

saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");})
.catch(() => "")
},
downloadAllSurvey(){
  

  
      this.$http.get('surveyFiles', { responseType: 'arraybuffer', headers: auth.getAuthHeader() })
    .then(request => {
    console.log("download")
     let blob = new Blob([request.data], { type: 'application/zip' },name='prova' ),
      url = window.URL.createObjectURL(blob)
    blob.name = "survey"
  window.open(url);
 
    })
    .catch(() => "")
    
  
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
            renderChart: function(data) {

        var results=this.filtered_surveys;
        var data = [ { label: "Data Set 1", 
               x: [0, 1, 2, 3, 4], 
               y: [0, 1, 2, 3, 4] }, 
             { label: "Data Set 2", 
               x: [0, 1, 2, 3, 4], 
               y: [0, 1, 4, 9, 16] } ] ;
var xy_chart = d3_xy_chart()
    .width(960)
    .height(500)
    .xlabel("X Axis")
    .ylabel("Y Axis") ;
var svg = d3.select("#chart").append("svg")
    .datum(data)
    .call(xy_chart) ;

    function d3_xy_chart() {
    var width = 640,  
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
            
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                          d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

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
                .tickFormat("") ;

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left") 
                .tickSize(-innerwidth)
                .tickFormat("") ;

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);}) ;
            
            data_lines.append("text")
                .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                .attr("transform", function(d) { 
                    return ( "translate(" + x_scale(d.final[0]) + "," + 
                             y_scale(d.final[1]) + ")" ) ; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .attr("fill", function(_, i) { return color_scale(i); })
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
      renderBarChart: function() {
        var value='score'
var data = this.filtered_surveys

        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a[value], b[value]);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 960 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom;

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
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
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

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
        }
        
        .axis path,
        .axis line {
            fill: none;
            display: none;
        }
        
        .label {
            font-size: 13px;
        }
</style>
