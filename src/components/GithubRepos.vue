<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-autocomplete
          v-model="user"
          label="Find your user"
          :items="userList"
          :loading="userLoading"
          :search-input.sync="userSearch"
          item-text="login"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="repo"
          :items="repoList"
          :loading="repoLoading"
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
      userSearch: null,
      repoList: [],
      userList: [],
      repoLoading: false,
      userLoading: false,
    }),
    methods: {
      searchUsersGithub: debouncerDecorator( async function () {
        this.userLoading = true
        const data = await api.search_users(this.userSearch)
        this.userList = data.items
        this.userLoading = false
      }, 500),
      async listReposGithub () {
        this.repoLoading = true
        const data = await api.list_repos(this.user)
        this.repoList = data
        this.repoLoading = false
      }
    },
    watch: {
      userSearch() {
        this.searchUsersGithub()
      },
      user() {
        if(this.user)
          this.listReposGithub()
      },
      repo() {
        this.$emit('repo-selected', this.repo)
      }
    },
  }
</script>