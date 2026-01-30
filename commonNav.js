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

  /* =====================================================
     TOP 버튼
  ===================================================== */
  const btn = document.getElementById("toTop");
  if (btn){
    const onScroll = () => {
      if (window.scrollY > 200) btn.classList.add("is-visible");
      else btn.classList.remove("is-visible");
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();

    btn.addEventListener("click", ()=>{
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  /* =====================================================
     햄버거 + 오른쪽 드로어 메뉴
  ===================================================== */
  const burger   = document.getElementById("navBurger");
  const drawer   = document.getElementById("navDrawer");
  const backdrop = document.getElementById("navDrawerBackdrop");
  const closeBtn = document.getElementById("navDrawerClose");

  const openDrawer = () => {
    if(!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if(!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  };

  if (burger && drawer){
    burger.addEventListener("click", openDrawer);
    backdrop && backdrop.addEventListener("click", closeDrawer);
    closeBtn && closeBtn.addEventListener("click", closeDrawer);

    // ESC 닫기
    window.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") closeDrawer();
    });

    // 링크 클릭 시 닫기
    drawer.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", closeDrawer);
    });
  }

  /* =====================================================
     드로어 내부 아코디언 (회사소개 / 제품소개)
  ===================================================== */
  document.querySelectorAll(".drawer-acc").forEach((group)=>{
    const head = group.querySelector(".drawer-acc-head");
    if(!head) return;

    head.addEventListener("click", ()=>{
      const isOpen = group.classList.contains("is-open");

      // 하나만 열기
      document.querySelectorAll(".drawer-acc").forEach(g=>{
        g.classList.remove("is-open");
        const h = g.querySelector(".drawer-acc-head");
        if(h) h.setAttribute("aria-expanded","false");
      });

      if(!isOpen){
        group.classList.add("is-open");
        head.setAttribute("aria-expanded","true");
      }
    });
  });

  /* =====================================================
     모바일 상단 네비 드롭다운 (회사소개/제품소개)
     - 깜빡임/충돌 방지: inline style(display) 직접 제어 X
     - 모바일(<=1024): 클릭하면 열고, 다른거 자동으로 닫기
     - 바깥 클릭하면 닫기
  ===================================================== */
  const mqTop = window.matchMedia("(max-width: 1024px)");

  const topItems = Array.from(document.querySelectorAll("nav .nav-item.has-sub"));
  if (topItems.length){

    const closeAllTop = () => {
      topItems.forEach(it => it.classList.remove("is-open"));
    };

    // 모바일에서만 hover 열림 무력화 + 토글은 class로만 처리
    topItems.forEach((item)=>{
      const link = item.querySelector(":scope > a");
      const sub  = item.querySelector(":scope > .nav-sub");
      if(!link || !sub) return;

      // 중복 바인딩 방지
      if (link.dataset.boundTopDrop === "1") return;
      link.dataset.boundTopDrop = "1";

      // 서브메뉴는 전파 차단(바깥 클릭 닫기랑 충돌 방지)
      sub.addEventListener("click", (e)=> e.stopPropagation());

      link.addEventListener("click", (e)=>{
        if (!mqTop.matches) return; // PC는 기존 hover 사용(링크도 정상)

        // 모바일에서는 "열기"가 우선
        e.preventDefault();
        e.stopPropagation();

        const isOpen = item.classList.contains("is-open");

        // 하나만 열기
        closeAllTop();
        if (!isOpen) item.classList.add("is-open");
      });
    });

    // 바깥 클릭 시 닫기 (모바일에서만)
    document.addEventListener("click", ()=>{
      if (!mqTop.matches) return;
      closeAllTop();
    });

    // 화면 크기 바뀔 때 상태 정리
    if (mqTop.addEventListener){
      mqTop.addEventListener("change", ()=> closeAllTop());
    } else {
      // 구형 브라우저 대응
      mqTop.addListener(()=> closeAllTop());
    }
  }

})();
