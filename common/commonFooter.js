(async function () {
  const mount = document.getElementById("footer");
  if (!mount) return;

  try {
    const res = await fetch("/common/footer.html", { cache: "no-store" });
    if (!res.ok) throw new Error("footer load failed: " + res.status);

    mount.innerHTML = await res.text();

    /* =========================
       푸터 모달 스크립트
    ========================= */

    if (!window.__footerModalInit) {

      window.openEmailModal = function () {
        const modal = document.getElementById("emailModal");
        if (modal) {
          modal.style.display = "flex";
          window.focus();
        }
      };

      window.closeEmailModal = function () {
        const modal = document.getElementById("emailModal");
        if (modal) modal.style.display = "none";
      };

      window.openPrivacyModal = function () {
        const modal = document.getElementById("privacyModal");
        if (modal) {
          modal.style.display = "flex";
          window.focus();
        }
      };

      window.closePrivacyModal = function () {
        const modal = document.getElementById("privacyModal");
        if (modal) modal.style.display = "none";
      };

      window.addEventListener("click", function (e) {
        const emailModal = document.getElementById("emailModal");
        const privacyModal = document.getElementById("privacyModal");

        if (emailModal && e.target === emailModal) {
          emailModal.style.display = "none";
        }

        if (privacyModal && e.target === privacyModal) {
          privacyModal.style.display = "none";
        }
      });

      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          const emailModal = document.getElementById("emailModal");
          const privacyModal = document.getElementById("privacyModal");

          if (emailModal) emailModal.style.display = "none";
          if (privacyModal) privacyModal.style.display = "none";
        }
      });

      window.__footerModalInit = true;
    }

  } catch (e) {
    console.error(e);
    mount.innerHTML = "";
  }
})();
