<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-autocomplete
          v-model="user"
          label="Find your user"
          :items="userlist"
          :loading="userloading"
          :search-input.sync="usersearch"
          item-text="login"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="repo"
          :items="repolist"
          :loading="repoloading"
          item-text="name"
          label="Select your repository"
          return-object
          single-line
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {debouncerDecorator} from '@/helpers/debouncer.js'
  import {api} from '@/api/api.js'

  export default {
    data: () => ({
      repo: null,
      user: null,
      usersearch: null,
      repolist: [],
      userlist: [],
      repoloading: false,
      userloading: false,
    }),
    methods: {
      searchUsersGithub: debouncerDecorator( async function () {
        this.userloading = true
        const data = await api.search_users(this.usersearch)
        this.userlist = data.items
        this.userloading = false
      }, 500),
      async listReposGithub () {
        this.repoloading = true
        const data = await api.list_repos(this.user)
        this.repolist = data
        this.repoloading = false
      }
    },
    watch: {
      usersearch() {
        this.searchUsersGithub()
      },
      user() {
        if(this.user)
          this.listReposGithub()
      },
      repo() {
        console.log(this.repo)
      }
    },
  }
</script>