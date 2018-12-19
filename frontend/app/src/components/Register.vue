<template>
    <div id="login">
        <h1>Register</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
         <input type="password" name="confirm_password" v-model="input.confirmPassword" placeholder="Confirm password" />
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
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    register () {
      const { username, password, confirmPassword } = this.input
      console.log(username.length, password.length)
      if (!username.length || !password.length || !confirmPassword.length) {
        console.log('Please fulfill all fields')
        return
      }
      if (password !== confirmPassword) {
        console.log('Password and confirm password are not equal')
        return
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, password_confirmation: confirmPassword })
      }

      fetch(`${config.apiUrl}/users/register`, requestOptions)
        .then((res) => {
          this.$router.push('login')
        }).catch(e => console.log(e))
    }
  }
}
</script>
