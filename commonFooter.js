(async function () {
  const mount = document.getElementById("footer");
  if (!mount) return;

  try {
    // 같은 도메인/경로에 있는 footer.html을 가져와서 삽입
    const res = await fetch("/common/footer.html", { cache: "no-store" });
    if (!res.ok) throw new Error("footer load failed: " + res.status);

    mount.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
    // 실패 시 최소한 빈칸이라도 방지(선택)
    mount.innerHTML = "";
  }
})();
