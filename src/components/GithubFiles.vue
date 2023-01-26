<template>
  <v-container>
    <v-row>
      <v-col cols="12">
				<v-banner v-if="!actualPath" class="text-left">
					<v-icon> mdi-folder-account</v-icon>
					{{ repo.name }}
				</v-banner>
				<v-banner v-else>
					<v-icon> mdi-folder-account</v-icon>
					{{actualPath}}
				</v-banner>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Documents</th>
              </tr>
            </thead>
            <tbody>
							<tr v-for="content in contents" :key="content.name">
								<td v-if="isDirectory(content.type)">
                  <v-icon class="icon">mdi-folder</v-icon>
                  <button
                    @click="openDirectory(content.path)"
                  >
                    {{ content.name }}
                  </button>
								</td>
								<td v-else>
                  <v-icon class="icon">mdi-file-outline</v-icon>
                    {{ content.name }}
                </td>
							</tr>
							<div v-if="typeof previousPath == 'string'">
								<v-btn class="ma-2" outlined color="teal" @click="goBack">
                  Back
								</v-btn>
							</div>
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
		contents: [],
		loading: false,
    directoryContent: true,
		previousPath: null,
		actualPath: null,
	}),
	methods: {
		async listContent(){
			this.loading = true
			const contents = await api.get_files(this.repo.owner.login, this.repo.name)
			this.contents = this.contents.concat(contents)
			this.previousPath = null
			this.loading = false
		},
		async listFolderContent(path) {
			let gitPath = []
      this.loading = true;
      const contents = await api.list_folder_content(this.repo.owner.login, this.repo.name, path);
			gitPath.push(this.repo.name, path)
      this.actualPath = gitPath.join('/')
			// a lógica está feia mas está funcionando, vou arrumar
      let newPreviousPathList = path.split("/");
      newPreviousPathList.pop();
      const newPreviousPath = newPreviousPathList.join("/");
      this.previousPath = newPreviousPath;
      this.contents = this.contents.concat(contents);
      this.loading = false;
    },
    isDirectory(type) {
      return type == "dir";
    },
    openDirectory(path) {
      this.contents = [];
      this.listFolderContent(path);
    },
    goBack() {
      if (this.previousPath == "") {
        this.contents = [];
        this.listContent();
				this.actualPath = ''
      } else {
        this.contents = [];
        this.listFolderContent(this.previousPath);
      }
    },
	},
	watch: {
		repo(){
			this.contents = []
			this.listContent()
		}
	}
}

 </script>