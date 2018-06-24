<template>
  <div class="hello">
    <h1> Questions </h1><li v-for="(item,index) in questions">
    <span v-on:click="setSelected(index)">
       {{ item.id }}
       <icon v-if="index==selected"name="circle" style="height: 1em" color="green"/>
       <icon v-if="index!=selected"name="circle" style="height: 1em" color="green"/>
    </span>
    </li>
    <ul class="list-group">
    <li class="list-group-item">{{ questions[selected].q1 }}</li>
    <li class="list-group-item">{{ questions[selected].q2 }}</li>
    <li class="list-group-item">{{ questions[selected].q3 }}</li>
    </ul>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input class="form-control" placeholder="Answer"  v-model="answers[selected]" >
    
  </div>
    

  </div>
</template>

<script>
import 'vue-awesome/icons/circle'
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
      selected:1,
      answers:[]
      
    }
  },methods: {
 fetchQuestions () {
  this.$http.get('http://127.0.0.1:5000/questions', { })
    .then(request => this.questions=request.data.data)
    .catch(() => "")
},
   setSelected(index){this.selected=index;
   }
},mounted(){this.fetchQuestions()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
