<template>
  <div id='app'>
    <router-view></router-view>
    <p v-if='loading'>loading...</p>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Editor from './components/Editor.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to My Markdown',
      isLogin: false,
      userData: null,
      loading: true
    }
  },
  components: {
    'Home': Home,
    'Editor': Editor,
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
      this.loading = false;
    });
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
