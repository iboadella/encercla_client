<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },methods: {
 fetchQuestions () {
  this.$http.get('http://127.0.0.1:5000/questions', { })
    .then(request => this.msg=request.data.message)
    .catch(() => "")
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
