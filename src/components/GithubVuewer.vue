<template>
    <v-container>
      <GithubRepos @repo-selected="onRepoSelected"/>
      <!-- <GithubIssues :repo="repo"/> -->
      <GithubFiles :repo="repo"/>
    </v-container>
</template>

<script>
import GithubRepos from './GithubRepos';
import GithubFiles from './GithubFiles';
// import GithubIssues from './GithubIssues';
export default {
    components: {
      GithubRepos,
      GithubFiles,
      // GithubIssues,
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
