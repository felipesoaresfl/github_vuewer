async function fetch_all_pages(url){
	let nextPage = true
	let result = []
	let page = 1
	while(nextPage){
			const response = await fetch(`${url}?page=${page}`)
			const tmpitems = await response.json()
			if(tmpitems.length > 0){
					result = result.concat(tmpitems)
					page++
			} else {
					nextPage = false
			}
	}
	return result
}

export const api = {
  async search_users(searchstring){
		const url = `https://api.github.com/search/users?q=${searchstring}`
    const response = await fetch(url)
		return await response.json()
  },
	async list_repos(username){
		const url = `https://api.github.com/users/${username}/repos`
		const data = await fetch_all_pages(url)
    return await data
	}
}
