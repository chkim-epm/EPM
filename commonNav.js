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

  if (burger && drawer){

    const openDrawer = () => {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    };

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
     - 모바일(<=1024)에서: 첫 탭 = 서브메뉴 열기, 두번째 탭 = 링크 이동
  ===================================================== */
  const mqTopDrop = window.matchMedia("(max-width: 1024px)");

  document.querySelectorAll("nav .nav-item.has-sub").forEach((item)=>{
    const link = item.querySelector(":scope > a");
    const sub  = item.querySelector(":scope > .nav-sub");
    if(!link || !sub) return;

    // 중복 바인딩 방지(네비를 다른 페이지에서 여러번 로딩할 수도 있으니)
    if (link.dataset.boundTopDrop === "1") return;
    link.dataset.boundTopDrop = "1";

    link.addEventListener("click", (e)=>{
      if (!mqTopDrop.matches) return; // PC는 기존 hover 동작 유지

      const isOpen = (sub.style.display === "block");

      // 닫혀있으면: 이동 막고 열기
      if (!isOpen){
        e.preventDefault();
        e.stopPropagation(); // ← 이거 한 줄

        // 다른 메뉴 열려있으면 닫기(선택)
        document.querySelectorAll("nav .nav-item.has-sub .nav-sub").forEach((s)=>{
          if (s !== sub) s.style.display = "none";
        });

        sub.style.display = "block";
      }
      // 열려있으면: 이동 허용 (preventDefault 안함)
    });
  });

  // 바깥 클릭하면 닫기(선택)
  document.addEventListener("click", (e)=>{
    if (!mqTopDrop.matches) return;
    if (e.target.closest("nav .nav-item.has-sub")) return;

    document.querySelectorAll("nav .nav-item.has-sub .nav-sub").forEach((s)=>{
      s.style.display = "none";
    });
  });

  
})();


