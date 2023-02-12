export default function (target: any) {
  return target ? JSON.parse(JSON.stringify(target)) : "undefind";
}
