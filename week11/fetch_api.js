const dogContainer = document.getElementById("dog-container");
const loadBtn = document.getElementById("load-btn");

async function loadDog() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/3");
    if (!res.ok) throw new Error("ไม่สามารถโหลดรูปหมาได้ 😢");
    
    const data = await res.json();
    renderDogs(data.message);
    saveDogHistory(data.message);
  } catch (error) {
    alert(error.message);
  }
}

function renderDogs(images) {
  dogContainer.innerHTML = "";
  images.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Cute Dog";
    dogContainer.appendChild(img);
  });
}

function saveDogHistory(images) {
  const history = JSON.parse(localStorage.getItem("dogHistory")) || [];
  const updated = [...history, ...images];
  localStorage.setItem("dogHistory", JSON.stringify(updated));
  sessionStorage.setItem("lastViewed", new Date().toLocaleString());
}

loadBtn.addEventListener("click", loadDog);

window.addEventListener("load", () => {
  const history = JSON.parse(localStorage.getItem("dogHistory")) || [];
  if (history.length > 0) {
    renderDogs(history.slice(-3)); 
  } else {
    loadDog();
  }
});
