const baseUrl=process.env.NEXT_PUBLIC_API_URL

export const API_SERVICE = {
	blog:`${baseUrl}/blogs/`,
	team:`${baseUrl}/team/`,
	category:`${baseUrl}/blog/categories/`,
	services:`${baseUrl}/services/`,
	contact:`${baseUrl}/contacts/`,
	project:`${baseUrl}/works/`,
	projectcategory:`${baseUrl}/work-categories/`
}
