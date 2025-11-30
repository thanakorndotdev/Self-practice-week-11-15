import { getItems } from "./myLib/fetchUtils.js"

const BASE_URL = import.meta.env.VITE_APP_URL

async function loadQuotes() {
  try {
    const quotes = await getItems(`${BASE_URL}/quotes`)
    return quotes
  } catch (e) {
    alert(e.message)
    return []
  }
}

async function createQuote(data) {
  try {
    const res = await fetch(`${BASE_URL}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      throw new Error("Cannot create quote")
    }
    return await res.json()
  } catch (e) {
    alert(e.message)
    throw e
  }
}

async function updateQuote(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      throw new Error("Cannot update quote")
    }
    return await res.json()
  } catch (e) {
    alert(e.message)
    throw e
  }
}

async function deleteQuote(id) {
  try {
    const res = await fetch(`${BASE_URL}/quotes/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) {
      throw new Error("Cannot delete quote")
    }
    return true
  } catch (e) {
    alert(e.message)
    throw e
  }
}

function showConfirmQuoteDialog({ id, content, author, onConfirm }) {
  document.querySelectorAll(".quote-dialog-overlay").forEach(el => el.remove())
  const overlay = document.createElement("div")
  overlay.className = "quote-dialog-overlay"
  const dialog = document.createElement("div")
  dialog.className = "quote-dialog"

  const title = document.createElement("h3")
  title.textContent = "Confirm delete this quote?"
  dialog.appendChild(title)

  const pContent = document.createElement("p")
  pContent.className = "quote-dialog-content"
  pContent.textContent = `"${content}"`
  dialog.appendChild(pContent)

  const pAuthor = document.createElement("p")
  pAuthor.className = "quote-dialog-author"
  pAuthor.textContent = `— ${author}`
  dialog.appendChild(pAuthor)
  const actions = document.createElement("div")
  actions.className = "quote-dialog-actions"

  const cancelBtn = document.createElement("button")
  cancelBtn.type = "button"
  cancelBtn.textContent = "Cancel"
  cancelBtn.addEventListener("click", () => {
    overlay.remove()
  })

  const okBtn = document.createElement("button")
  okBtn.type = "button"
  okBtn.textContent = "Delete"
  okBtn.addEventListener("click", async () => {
    overlay.remove()
    if (typeof onConfirm === "function") {
      await onConfirm()
    }
  })

  actions.appendChild(cancelBtn)
  actions.appendChild(okBtn)
  dialog.appendChild(actions)

  overlay.appendChild(dialog)
  document.body.appendChild(overlay)
}

export { loadQuotes, createQuote, updateQuote, deleteQuote, showConfirmQuoteDialog }