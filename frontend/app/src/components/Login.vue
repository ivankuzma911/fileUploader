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
        console.log('Please fulfill all fields')
        return
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }

      fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(response => response.text())
        .then(token => {
          localStorage.setItem('token', token)
          this.$router.push('files')
        }
        )
        .catch(e => console.log(e))
    }
  }
}
</script>
