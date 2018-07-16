<template>
  <div>
  <div class="container bg-primary">
    <h4>List of Users</h4>
    <li v-for="(user,index) in users">
	{{user.email}}
    </li>
    <a href="#/register" style="color:white"> Add user
<icon name="plus" style="vertical-align: middle;" scale="1" color="white"/></a>
</div>
  <div class="container bg-primary">
    <h4>List of Company</h4>
    <li v-for="(company,index) in companies	">
	{{user.email}}
    </li>
    <a href="#/registercompany" style="color:white"> Add company
<icon name="plus" style="vertical-align: middle;" scale="1" color="white"/></a>
  </div>
</div>
</template>

<script>
import 'vue-awesome/icons/plus'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  name: 'UsersManagement',
  data () {
    return {
       users :[],
    }
  },methods: {
 fetchUsers () {
  this.$http.get('users', { })
    .then(request => this.users=request.data.data)
    .catch(() => "")
},
 fetchUsers () {
  this.$http.get('users', { })
    .then(request => this.users=request.data.data)
    .catch(() => "")
}
},mounted(){this.fetchUsers()}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
