const lastViewed = sessionStorage.getItem("lastViewed");
if (lastViewed) {
  console.log(`🐾 คุณดูรูปหมาครั้งล่าสุดเมื่อ: ${lastViewed}`);
} else {
  console.log("🐾 ยังไม่เคยดูรูปหมามาก่อน!");
}

const dogHistory = JSON.parse(localStorage.getItem("dogHistory")) || [];
console.log(`คุณเคยดูรูปหมาไปแล้วทั้งหมด ${dogHistory.length} รูป!`);

function clearDogHistory() {
  localStorage.removeItem("dogHistory");
  sessionStorage.removeItem("lastViewed");
  alert("ประวัติการดูรูปหมาถูกล้างเรียบร้อย!");
}
window.clearDogHistory = clearDogHistory;

const theme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark-mode", theme === "dark");

document.addEventListener("keydown", (e) => {
  if (e.key === "t") {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    console.log("เปลี่ยนธีมเป็น:", newTheme);
  }
});
