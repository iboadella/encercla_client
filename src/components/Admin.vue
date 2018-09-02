<template>
  <div class="container">
       
    <ul class="list-group">
    <li class="list-group-item"><a href="#/admin/users">{{"Gestió d'usuaris"|translate}}
    <icon name="user" style="height: 1em;vertical-align: middle;" scale="4"/></a></li>
    <li class="list-group-item"><a href="#/admin/surveys">{{"Visualització de qüestionaris"|translate}}
		<icon name="clipboard" style="height: 1em;vertical-align: middle;" scale="4"/></a> </li>
    <li class="list-group-item"><a href="#/ranking">{{'Rànquing de resultats'|translate}}</a>
		<icon name="line-chart" style="height: 1em;vertical-align: middle;" scale="4"/></li>
    <li class="list-group-item">{{"Extracció d'informes"|translate}}
		<icon name="download" style="height: 1em;vertical-align: middle;" scale="4"/></li>
    </ul>

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
