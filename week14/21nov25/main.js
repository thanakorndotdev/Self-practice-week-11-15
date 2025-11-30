function showDialog({
  title = "Notification",
  message = "",
  okText = "OK",
  cancelText = "Cancel",
  onOk = null,
  onCancel = null,
}) {
  document.querySelectorAll(".custom-dialog-overlay").forEach(el => el.remove());
  const overlay = document.createElement("div");
  overlay.className = "custom-dialog-overlay";
  const dialog = document.createElement("div");
  dialog.className = "custom-dialog";
  const h3 = document.createElement("h3");
  h3.textContent = title;
  dialog.appendChild(h3);
  const p = document.createElement("p");
  p.textContent = message;
  dialog.appendChild(p);
  const btnBox = document.createElement("div");
  btnBox.className = "custom-dialog-buttons";
  if (cancelText) {
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "custom-dialog-cancel";
    cancelBtn.textContent = cancelText;
    cancelBtn.onclick = () => {
      overlay.remove();
      if (typeof onCancel === "function") onCancel();
    };
    btnBox.appendChild(cancelBtn);
  }

  const okBtn = document.createElement("button");
  okBtn.className = "custom-dialog-ok";
  okBtn.textContent = okText;
  okBtn.onclick = () => {
    overlay.remove();
    if (typeof onOk === "function") onOk();
  };
  btnBox.appendChild(okBtn);

  dialog.appendChild(btnBox);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("btn-open-confirm");
  const infoBtn = document.getElementById("btn-open-info");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      showDialog({
        title: "Confirm",
        message: "คุณต้องการลบข้อมูลนี้ใช่ไหม?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: () => {
          console.log("Deleted!");
          alert("ลบข้อมูลแล้ว (ตัวอย่าง)");
        },
        onCancel: () => {
          console.log("Canceled.");
        },
      });
    });
  }

  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      showDialog({
        title: "Information",
        message: "บันทึกข้อมูลเรียบร้อยแล้ว",
        okText: "OK",
        cancelText: "", 
        onOk: () => {
          console.log("OK clicked");
        },
      });
    });
  }
});