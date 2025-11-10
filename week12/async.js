// ฟังก์ชันหลัก: จำลองการทำงานที่อาจสำเร็จหรือไม่สำเร็จ
function doSomething(hasResource) {
  return new Promise((resolve, reject) => {
    console.log("กำลังทำงาน...");
    setTimeout(() => {
      if (hasResource) resolve("Success: Done!");
      else reject("Error: Fail!");
    }, 5000);
  });
}

// วิธีที่ 1: .then().catch()
function working1() {
  console.log("=== [1] .then().catch() ===");
  console.log("starting...");

  doSomething(true)
    .then((result) => {
      console.log(result);
      console.log("ending...");
    })
    .catch((error) => {
      console.log(error);
    });
}

// วิธีที่ 2: async/await
async function working2() {
  console.log("=== [2] async / await ===");
  console.log("starting...");

  try {
    const workStatus = await doSomething(false);
    console.log(workStatus);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("ending...");
  }
}

// เรียกทดสอบฟังก์ชัน
// working1(); // เปิดทดสอบแบบ then/catch
working2(); // ทดสอบแบบ async/await
