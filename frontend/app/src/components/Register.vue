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
import axios from 'axios'

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

      const validFields = username.length && password.length && confirmPassword.length
      const equalPassword = password === confirmPassword

      if (!validFields || !equalPassword) {
        return alert('Input not valid')
      }

      axios({
        url: `${config.apiUrl}/users/register`,
        method: 'POST',
        data: { username, password, password_confirmation: confirmPassword }
      }).then(response => {
        this.$router.push('login')
      }).catch(e => console.log(e))
    }
  }
}
</script>
