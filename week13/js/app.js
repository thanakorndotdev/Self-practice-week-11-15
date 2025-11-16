// js/app.js
// ui handles

import {
  loadQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from "./quoteManagement.js"

document.addEventListener("DOMContentLoaded", async () => {
  const quoteList = document.getElementById("quoteList")
  const quoteForm = document.getElementById("quoteForm")
  const quoteIdInput = document.getElementById("quoteId")
  const contentInput = document.getElementById("content")
  const authorInput = document.getElementById("author")
  const submitButton = quoteForm.querySelector("button[type='submit']")

  async function renderQuotes() {
    const quotes = await loadQuotes()
    quoteList.innerHTML = "" // เคลียร์ list เดิมก่อน
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
        // UPDATE
        await updateQuote(id, data)
      } else {
        // CREATE
        await createQuote(data)
      }

      // ✅ reset form ทุกครั้งหลัง add / edit
      quoteForm.reset()
      quoteIdInput.value = ""
      submitButton.textContent = "Add/Edit Quote"

      // โหลดรายการใหม่
      await renderQuotes()
    } catch (e) {
      // alert ทำใน quoteManagement แล้ว
      console.error(e)
    }
  })

  // ใช้ event delegation บน quoteList
  quoteList.addEventListener("click", async (e) => {
    const target = e.target
    const card = target.closest(".quote-card")
    if (!card) return

    const id = card.dataset.id

    if (target.classList.contains("edit")) {
      // เติมค่าลง form เพื่อแก้ไข
      const quoteTextEle = card.querySelector("p:not(.author)")
      const authorTextEle = card.querySelector("p.author")

      contentInput.value = quoteTextEle.textContent
      authorInput.value = authorTextEle.textContent
      quoteIdInput.value = id
      submitButton.textContent = "Update Quote"
    }

    if (target.classList.contains("delete")) {
      const confirmDelete = confirm("Delete this quote?")
      if (!confirmDelete) return

      try {
        await deleteQuote(id)
        await renderQuotes()
      } catch (e) {
        console.error(e)
      }
    }
  })

  // โหลดครั้งแรก
  await renderQuotes()
})

function newQuoteElement(quote) {
  //<div class="quote-card" data-id="1">
  const divEle = document.createElement("div")
  divEle.className = "quote-card" //class=quote-card
  divEle.dataset.id = quote.id //data-id

  //<p>No one is perfect</p>
  const pQuoteEle = document.createElement("p")
  pQuoteEle.textContent = quote.content
  divEle.appendChild(pQuoteEle)

  //   <p class="author">someone</p>
  const pAuthorEle = document.createElement("p")
  pAuthorEle.className = "author"
  pAuthorEle.textContent = quote.author
  divEle.appendChild(pAuthorEle)

  //   <div class="actions">
  const divButtons = document.createElement("div")
  divButtons.className = "actions"

  //<button class="edit" data-id="1">Edit</button>
  const editButton = document.createElement("button")
  editButton.className = "edit"
  editButton.dataset.id = quote.id
  editButton.textContent = "Edit"
  divButtons.appendChild(editButton)

  //   <button class="delete" data-id="1">delete</button>
  const deleteButton = document.createElement("button")
  deleteButton.className = "delete"
  deleteButton.dataset.id = quote.id
  deleteButton.textContent = "Delete"
  divButtons.appendChild(deleteButton)

  divEle.appendChild(divButtons)

  return divEle
}
