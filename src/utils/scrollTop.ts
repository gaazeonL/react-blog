export default function () {
  let target = document.querySelector(".ant-layout-content");
  let scrollTop = target?.scrollTop;
  let v = 0;
  let a = 0.5;
  function scroll() {
    v += a;
    if (!scrollTop || !target) return;
    if (scrollTop - v > 0) {
      target.scrollTo(0, scrollTop - v);
      scrollTop -= v;
    } else {
      target.scrollTo(0, 0);
      scrollTop = 0;
    }
    if (scrollTop !== 0) {
      requestAnimationFrame(scroll);
    }
  }
  requestAnimationFrame(scroll);
}
