(async function () {
  const mount = document.getElementById("subVisual");
  if (!mount) return;

  try {
    const res = await fetch("/common/subVisual.html", { cache: "no-store" });
    if (!res.ok) throw new Error("subVisual load failed: " + res.status);

    mount.innerHTML = await res.text();

    const section = mount.querySelector(".sub-visual");
    const bgSpan  = mount.querySelector(".sub-visual-bg span");
    const kicker  = mount.querySelector(".sub-visual-kicker");
    const title   = mount.querySelector(".sub-visual-title");
    const desc    = mount.querySelector(".sub-visual-desc");

    const bg    = mount.dataset.bg || "image/1번배경.png";
    const kTxt  = mount.dataset.kicker || "";
    const tTxt  = mount.dataset.title || "";
    const dTxt  = mount.dataset.desc || "";

    if (bgSpan) bgSpan.style.backgroundImage = `url("${bg}")`;
    if (kicker) kicker.textContent = kTxt;
    if (title)  title.textContent = tTxt;
    if (desc)   desc.textContent  = dTxt;

  } catch (e) {
    console.error(e);
    mount.innerHTML = "";
  }
})();
