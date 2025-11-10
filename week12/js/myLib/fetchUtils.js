async function getItems(url){
    try {
        const res = await fetch(url)
        const items = await res.json()
        return items
    } catch (e) {
        throw new Error(`There is a problem,cannot read items`)
    }
}

export { getItems }