import axios from 'axios'
import { BlogFormData } from '..'

export const BLOGS_URL = `${process.env.REACT_APP_API_URL}/blogs`

export function getBlogs(searchFilter: any = {}) {
  var query = "?"
  if (searchFilter.slug != null) query += "slug=" + searchFilter.slug + "&"
  if (searchFilter.from != null && searchFilter.to != null) query += "from=" + searchFilter.from + "&to=" + searchFilter.to
  return axios.get(BLOGS_URL + query)
}

export function updateBlog(id: string | number, values: BlogFormData) {
  const API_URL = `${BLOGS_URL}/${id}`

  return axios.post(API_URL, values)
}

export function createBlog(values: BlogFormData) {
  return axios.post(BLOGS_URL, values)
}

export function removeBlog(id: string | number) {
  if (!id) return

  const API_URL = `${BLOGS_URL}/${id}`

  return axios.delete(API_URL)
}
