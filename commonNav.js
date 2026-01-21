(async function loadNav(){
  const holder = document.getElementById("nav");
  if (!holder) return;

  try {
    const res = await fetch("/nav.html");
    holder.innerHTML = await res.text();
  } catch (e) {
    console.error("네비 로딩 실패", e);
    return;
  }

  // ✅ TOP 버튼 동작 연결
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 200) btn.classList.add("is-visible");
    else btn.classList.remove("is-visible");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
