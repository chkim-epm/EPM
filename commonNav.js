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


  // ✅ 햄버거 메뉴(Drawer) 초기화
(function(){
  function initDrawer(){
    const burger = document.getElementById("navBurger");
    const drawer = document.getElementById("navDrawer");
    const backdrop = document.getElementById("navDrawerBackdrop");
    const closeBtn = document.getElementById("navDrawerClose");

    if(!burger || !drawer) return;

    const open = () => {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    };

    burger.addEventListener("click", open);
    backdrop && backdrop.addEventListener("click", close);
    closeBtn && closeBtn.addEventListener("click", close);

    // ESC로 닫기
    window.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") close();
    });

    // 메뉴 클릭하면 닫기(원치 않으면 지워도 됨)
    drawer.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", close);
    });
  }

  // nav.html fetch가 완료된 뒤에 실행되도록 약간 기다림
  let retry = 0;
  const t = setInterval(()=>{
    if(document.getElementById("navDrawer") && document.getElementById("navBurger")){
      clearInterval(t);
      initDrawer();
    }
    if(retry++ > 60) clearInterval(t);
  }, 50);
})();

  
})();

