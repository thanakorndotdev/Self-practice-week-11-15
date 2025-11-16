// js/quoteManagement.js
// CRUD Quote
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

export { loadQuotes, createQuote, updateQuote, deleteQuote }