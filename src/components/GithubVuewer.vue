<template>
    <v-container>
      <GithubRepos @reposelected="onRepoSelected"/>
      <GithubIssues :repo="repo"/>
    </v-container>
</template>

<script>
import GithubRepos from './GithubRepos';
import GithubIssues from './GithubIssues';
export default {
    components: {
      GithubRepos,
      GithubIssues,
    },
    data: () => ({
      repo: null
    }),
    methods: {
      onRepoSelected(repo){
        this.repo = repo
      }
    }
}
</script>
