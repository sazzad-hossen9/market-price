const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const bengaliToEnglishMap = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};
export function toBengaliNumber(num) {
  if (num === null || num === undefined || isNaN(Number(num))) {
    return String(num || "");
  }
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[digit]);
}

export function parseBengaliNumber(str) {
  if (typeof str === "number") return str;
  if (!str) return 0;


  const normalized = String(str)
    .replace(/[০-৯]/g, (digit) => bengaliToEnglishMap[digit] || digit)
    .replace(/[^0-9.-]/g, "");

  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}


export function getNumericPrice(price) {
  if (typeof price === "number") return price;
  return parseBengaliNumber(price);
}


export function formatPrice(price) {
  const num = Number(price);
  if (isNaN(num)) return toBengaliNumber(price);
  return toBengaliNumber(num.toLocaleString("en-IN"));
}


const unitMap = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  hali: "প্রতি হালি",
};


export function getUnitBn(unit) {
  if (!unit) return "";
  return unitMap[unit] || unit;
}


const banglaDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const banglaMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function getBanglaDate(dateInput) {
  const date = dateInput ? new Date(dateInput) : new Date();
  const day = banglaDays[date.getDay()];
  const dateNum = toBengaliNumber(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  return `${day}, ${dateNum} ${month}, ${year}`;
}
