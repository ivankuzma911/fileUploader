<template>
    <div id="login">
        <ul id="example-1" class="list">
          <li v-for="(file, index) in files" v-bind:key="index">
            {{ file.name }}
        </li>
      </ul>
    </div>
</template>

<script>
import config from '../config'
import File from './File'

export default {
  name: 'Register',
  components: {
    File
  },
  data () {
    return {
      files: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        }
      }

      fetch(`${config.apiUrl}/file`, requestOptions)
        .then(response => response.json())
        .then(files => {
          this.files = files
        })
        .catch(e => {
          console.error(e)
        })
    }

  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 30%;
  float: left;
  border: 1px solid grey;
  font-size: 25px;
}
li {
  border: 1px solid black;
  padding: 5px;
}
a {
  color: #42b983;
}
</style>
