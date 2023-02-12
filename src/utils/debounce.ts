export default function (fn: any, timeout: number, apply = window) {
  let timer: null | NodeJS.Timer = null;
  return function (...any: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(apply, args);
      timer = null;
    }, timeout);
  };
}
