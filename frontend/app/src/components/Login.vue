<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="register()">Login</button>
    </div>
</template>

<script>
import config from '../config'
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      const { username, password } = this.input

      if (!username.length || !password.length) {
        alert('Please fulfill all fields')
        return
      }

      axios({
        url: `${config.apiUrl}/users/login`,
        method: 'POST',
        data: { username, password }
      }).then(response => {
        console.log(response);
        localStorage.setItem('token', response.data)
        this.$router.push('files')
      }).catch(e => console.log(e))
    }
  }
}
</script>
