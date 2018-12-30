<template>
  <div class="container" >
    <div class="row" >
      <div class="col-sm-3">
    <a href="#/admin/users" style="color:white">
    <figure>
    <img src="/static/img/svgs/14.svg" alt="Smiley face"  height="100" width="100">
    <figcaption>{{"Gestió d'usuaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-3">

    <a href="#/admin/surveys" style="color:white">
    <figure>
    <img src="/static/img/svgs/15.svg" alt="Smiley face"  height="100" width="100">
    <figcaption>{{"Visualització de qüestionaris"|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-3">

    <a href="#/ranking" style="color:white">
    <figure>
    <img src="/static/img/svgs/16.svg" alt="Smiley face"  height="100" width="100">
    <figcaption>{{'Rànquing de resultats'|translate}}</figcaption>
  </figure>
</a>
</div>
      <div class="col-sm-3">

    <a href="#/informes" style="color:white">
    <figure>
    <img src="/static/img/svgs/17.svg" alt="Smiley face"  height="100" width="100">
    <figcaption>{{"Extracció d'informes"|translate}}</figcaption>
  </figure>
</a>
</div>
 </div>

  </div>
</template>

<script>
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/clipboard'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/download'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  name: 'Admin',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
