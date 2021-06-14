export const fetcher = (url) => {
  return fetch(url).then((response) => {
    return response.json()
  })
}
