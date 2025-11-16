//fetchUtils.js
//fetch API
async function getItems(url) {
  let message = ""
  try {
    const res = await fetch(url)
    if (res.status !== 200) {
      switch (res.status) {
        case 401:
          message = "401 - UnAuthorized"
          break
        case 404:
          message = "404 - Item not found"
          break
        default:
          message = "There is a problem, Please try again"
      }
      throw new Error(message)
    }
    const items = await res.json() 
    return items
  } catch (e) {
    // console.log(e)
    throw new Error(message || e.message)
  }
}
export { getItems }