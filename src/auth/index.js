import Vue from 'vue'
import jwtDecode from 'jwt-decode'
export  default  {

  user: {
    authenticated: false,
    lang:'cat'
  },
checkAuth() {
    var jwt = localStorage.getItem('access_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },
 getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  },
  decoded(){
    console.log("identity")
    return jwtDecode(localStorage.getItem('access_token'))
  },
  setLang(){
    if (this.user.lang=='cat') {
      this.user.lang='es'
    }
      else {
        this.user.lang='cat'
      }
  },
getLang(){
  return this.user.lang
}
 

}
