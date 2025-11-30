import { loadQuotes,createQuote,updateQuote,deleteQuote,showConfirmQuoteDialog } from "./quoteManagement.js"

document.addEventListener("DOMContentLoaded", async () => {
  const quoteList = document.getElementById("quoteList")
  const quoteForm = document.getElementById("quoteForm")
  const quoteIdInput = document.getElementById("quoteId")
  const contentInput = document.getElementById("content")
  const authorInput = document.getElementById("author")
  const submitButton = quoteForm.querySelector("button[type='submit']")

  async function renderQuotes() {
    const quotes = await loadQuotes()
    quoteList.innerHTML = ""
    quotes.forEach((quote) => {
      const divQuoteEle = newQuoteElement(quote)
      quoteList.appendChild(divQuoteEle)
    })
  }

  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const content = contentInput.value.trim()
    const author = authorInput.value.trim()
    const id = quoteIdInput.value.trim()

    if (!content || !author) {
      alert("Please fill in both quote and author.")
      return
    }

    const data = { content, author }

    try {
      if (id) {
        await updateQuote(id, data)
      } else {
        await createQuote(data)
      }
      quoteForm.reset()
      quoteIdInput.value = ""
      submitButton.textContent = "Add/Edit Quote"
      await renderQuotes()
    } catch (e) {
      console.error(e)
    }
  })

  quoteList.addEventListener("click", async (e) => {
    const target = e.target
    const card = target.closest(".quote-card")
    if (!card) return

    const id = card.dataset.id

    if (target.classList.contains("edit")) {
      const quoteTextEle = card.querySelector("p:not(.author)")
      const authorTextEle = card.querySelector("p.author")
      contentInput.value = quoteTextEle.textContent
      authorInput.value = authorTextEle.textContent
      quoteIdInput.value = id
      submitButton.textContent = "Update Quote"
    }

    if (target.classList.contains("delete")) {
      const quoteTextEle = card.querySelector("p:not(.author)")
      const authorTextEle = card.querySelector("p.author")
      const content = quoteTextEle?.textContent 
      const author = authorTextEle?.textContent

      showConfirmQuoteDialog({
        id,
        content,
        author,
        onConfirm: async () => {
          try {
            await deleteQuote(id)
            await renderQuotes()
          } catch (e) {
            console.error(e)
          }
        },
      })
    }
  })
  await renderQuotes()
})

function newQuoteElement(quote) {
  const divEle = document.createElement("div")
  divEle.className = "quote-card"
  divEle.dataset.id = quote.id

  const pQuoteEle = document.createElement("p")
  pQuoteEle.textContent = quote.content
  divEle.appendChild(pQuoteEle)

  const pAuthorEle = document.createElement("p")
  pAuthorEle.className = "author"
  pAuthorEle.textContent = quote.author
  divEle.appendChild(pAuthorEle)

  const divButtons = document.createElement("div")
  divButtons.className = "actions"

  const editButton = document.createElement("button")
  editButton.className = "edit"
  editButton.dataset.id = quote.id
  editButton.textContent = "Edit"
  divButtons.appendChild(editButton)

  const deleteButton = document.createElement("button")
  deleteButton.className = "delete"
  deleteButton.dataset.id = quote.id
  deleteButton.textContent = "Delete"
  divButtons.appendChild(deleteButton)

  divEle.appendChild(divButtons)

  return divEle
}