export function generateColorCode() {
  let code = "";
  const chars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    code += chars[randomNumber];
  }
  return "#" + code;
}
