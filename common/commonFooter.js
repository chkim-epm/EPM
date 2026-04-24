(async function () {
  const mount = document.getElementById("footer");
  if (!mount) return;

  try {
    // footer.html 불러오기
    const res = await fetch("/common/footer.html", { cache: "no-store" });
    if (!res.ok) throw new Error("footer load failed: " + res.status);

    mount.innerHTML = await res.text();

    /* =========================
       이메일 모달 스크립트 (여기 추가)
    ========================= */

    window.openEmailModal = function () {
      const modal = document.getElementById("emailModal");
      if (modal) modal.style.display = "flex";
    };

    window.closeEmailModal = function () {
      const modal = document.getElementById("emailModal");
      if (modal) modal.style.display = "none";
    };

    window.addEventListener("click", function (e) {
      const modal = document.getElementById("emailModal");
      if (modal && e.target === modal) {
        modal.style.display = "none";
      }
    });

  } catch (e) {
    console.error(e);
    mount.innerHTML = "";
  }
})();
