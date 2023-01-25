<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Docs</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in docs" :key="doc.url">
                <td>{{ doc.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-progress-circular indeterminate class="text-center" color="primary" v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { api } from '~api'

export default {
	props: ['repo'],
	data: () => ({
		docs: [],
		loading: false,
	}),
	methods: {
		async getFiles(){
			this.loading = true
			const files = await api.get_files(this.repo.owner.login, this.repo.name)
		this.docs = this.docs.concat(files)
			this.loading = false
		}
	},
	watch: {
		repo(){
			this.docs = []
			if(this.repo){
				this.getFiles()
			}
		}
	}
}
 </script>