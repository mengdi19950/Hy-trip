export function convertNumberToWords(num) {
  var words = [
    "",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九"
  ];
  if (num < 20) return words[num];
  if (num < 100)
    return (
      words[Math.floor(num / 10)] +
      (num % 10 !== 0 ? "" : "") +
      words[num % 10]
    );
  if (num < 1000)
    return (
      words[Math.floor(num / 100)] +
      "" +
      (num % 100 === 0 ? "" : "") +
      convertNumberToWords(num % 100)
    );
  if (num < 1000000)
    return (
      convertNumberToWords(Math.floor(num / 1000)) +
      "" +
      (num % 1000 === 0 ? "" : "") +
      convertNumberToWords(num % 1000)
    );
};