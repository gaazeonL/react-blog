const defaultColors = [
  "magenta",
  "green",
  "purple",
  "red",
  "lime",
  "geekblue",
  "volcano",
  "cyan",
  "gold",
  "blue",
  "orange",
];

export default function (index: number, cusColors?: string[]) {
  const colors = cusColors ? cusColors : defaultColors;
  index = index % colors.length;
  return colors[index];
}
