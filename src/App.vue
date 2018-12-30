<template>
  <div id="app" class="bg-primary" role="navigation">
    <nav class="navbar navbar-expand-lg navbar-primary bg-primary">
      <a  v-on:click="goHome()" class="navbar-brand" style="cursor: pointer;">
                
<!--img src="/static/img/pngs/96.png" alt="Smiley face" class="img-thumbnail"-->
<img style="background-color:#e84d20; border:0px" src="/static/img/svgs/100.svg" alt="Smiley face" class="img-thumbnail" height="120" width="120">

      </a> <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler btn btn-lg btn-primary btn-block"><span class="navbar-toggler-icon"></span>
    </button>
     <button type="button" class="btn" v-if="language=='cat'" v-on:click="setLang()">ES</button>
      <button type="button" class="btn" v-if="language=='es'" v-on:click="setLang()">CAT</button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav ml-auto">
          <li v-if="inside" style="cursor: pointer" class="nav-item">
      <a v-on:click="logout()" class="nav-link" style="color:white">{{'Surt'|translate}}</a>
    </li>
        <li class="nav-item">
      <a href="#/conditions"class="nav-link" style="color:white">{{'Condicions legals'|translate}}</a>
    </li>
    <li class="nav-item">
      <a href="#/quisom"class="nav-link" style="color:white">{{'Qui som'|translate}}</a>
    </li>
    <li  v-if="inside"  class="nav-item">
  <b-dropdown style="padding:0px" v-bind:text="decoded.decoded().identity" variant="primary" class="m-2">
    <b-dropdown-item href="#/updateuser" >{{'Canviar contrasenya'|translate}}</b-dropdown-item>
    <b-dropdown-item v-if="decoded.decoded().user_claims.admin!=1"href="#/registercompany/">{{"Modificar dades d'usuari"|translate}}</b-dropdown-item>
  </b-dropdown>
</li>

  </ul>
</div>
     </nav>
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
      user: '',
       decoded:auth,
       header:auth.getAuthHeader(),
       auth:auth
    }
  },
  computed:{
    language: function () {
      return this.$i18n.locale()
    },
    inside:function(){
      console.log(this.$route.path=='/')
      console.log("authenticated "+auth.user.authenticated)
      if (auth.user.authenticated==true)
        return true
      else 
        return false
   
    }
},
methods:{
  setLang(){
    console.log("1 lang "+auth.getLang())
    //this.$emit('changeLang')
    //this.$router.app.$emit('changeLang')
    /*if (this.$i18n.locale()==null)
    this.$i18n.set('cat');
    else {*/
      if (this.$i18n.locale()=='cat')
        {this.$i18n.set('es')}
      else {
        this.$i18n.set('cat')}
    console.log("2 lang "+auth.getLang())
  
  },
  logout(){
    localStorage.removeItem('access_token')
    auth.user.authenticated=false
    this.$router.push('/')
  },
  getLang(){
    console.log(auth.getLang())
    return auth.getLang()
  },
  goHome(){
      if (!auth.user.authenticated)
        {this.$router.push('/')}
        else  if (auth.decoded().user_claims.admin==1)
        this.$router.replace(this.$route.query.redirect || '/admin')
      else
       this.$router.replace(this.$route.query.redirect || '/user')
  }
},mounted(){this.setLang()}
}
</script>

<style>
#app {
  font-family: Raleway;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 1500px;
  margin:0px;
}
#__BVID__5__BV_toggle_
{
  padding: 0px
}
.btn-group>.btn:first-child
{
  padding: 0;
width: 220px;
}
</style>
