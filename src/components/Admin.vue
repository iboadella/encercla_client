<template>
  <div class="container">
       
    <ul class="list-group">
    <li class="list-group-item">Gestio usuari
    <icon name="user" style="height: 1em" scale="4"/></li>
    <li class="list-group-item">Visualitzacio de questionaris
		<icon name="clipboard" style="height: 1em" scale="4"/></li>
    <li class="list-group-item">Ranquing de resultats
		<icon name="line-chart" style="height: 1em" scale="4"/></li>
    <li class="list-group-item">Extraccio d'informes
		<icon name="download" style="height: 1em" scale="4"/></li>
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
