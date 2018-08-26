<template>
  <div id="app" class="bg-primary">
    <nav class="navbar navbar-expand-lg navbar-primary bg-primary"><a href="#" class="navbar-brand" style="color: white;">Encercla</a> <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span>
    </button>
     <button type="button" v-if="language=='cat'" v-on:click="setLang()">ES</button>
      <button type="button" v-if="language=='es'" v-on:click="setLang()">CAT</button>
     {{language}}</nav>
    <div class="container">
    <router-view  />
  </div>
</div>
</template>

<script>
import auth from './auth/index.js'
export default {
  name: 'App',
    data () {
    return {
      user: 'dpiscia'
    }
  },
  computed:{
    language: function () {
      return this.$i18n.locale()
    }
},
methods:{
  setLang(){
    console.log(auth.getLang())
    //this.$emit('changeLang')
    //this.$router.app.$emit('changeLang')
    if (this.$i18n.locale()==null)
    this.$i18n.set('cat');
    else {
      if (this.$i18n.locale()=='cat')
    this.$i18n.set('es');
      else this.$i18n.set('cat');
  }
  },
  getLang(){
    console.log(auth.getLang())
    return auth.getLang()
  }
},mounted(){this.setLang()}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 1200px;
  margin:0px;
}
</style>
