<template>
    <div id="login">
        <ul id="example-1" class="list">
          <li v-for="(file, index) in files" v-bind:key="index">
            {{ file.name }}
            <input type="password" v-model="passwords[index]" />
            <img v-if="file.file" v-bind:src="file.file" />
            {{file.file}}
            <button v-on:click="viewFile(index, file.id)" >View</button>
            <button v-on:click="deleteFile(file)" >x</button>
        </li>
      </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import config from '../config'
import File from './File'

export default {
  name: 'Register',
  components: {
    File
  },
  data () {
    return {
      files: [],
      passwords: []
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
    },
    viewFile (index, fileId) {
      const secret = this.passwords[index]

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ secret })
      }

      fetch(`${config.apiUrl}/file/${fileId}`, requestOptions)
        .then(r => r.json())
        .then(result => {
          const findIndex = this.files.findIndex(({id}) => id === fileId)
          if (findIndex >= 0) {
            // const files = this.files
            // //@TODO: add watch method
            // //force replace all files
            // files[findIndex] = { ...files[findIndex], file: `data:image/png;base64,${result.file}` }
            // this.files = {...files}
            const newFileData = { ...this.files[findIndex], file: `data:image/png;base64,${result.file}` }
            Vue.set(this.files, findIndex, newFileData)
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    deleteFile ({ id: deletedId }) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        }
      }

      fetch(`${config.apiUrl}/file/${deletedId}`, requestOptions)
        .then(r => {
          this.files = this.files.filter(({id}) => id !== deletedId)
          console.log(r)
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
  width: 50%;
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
