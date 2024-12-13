const fs = require("fs");

function findLongestSequence(numbers) {
  const numbersSet = new Set(numbers);
  let maxLength = 0;
  let maxSequence = [];

  // Для кожного числа як початкового
  for (const startNum of numbers) {
    let sequence = [startNum];
    let visited = new Set([startNum]);

    // Пробуємо додати нові числа до послідовності
    let currentNum = startNum;
    while (true) {
      // Перевіряємо всі можливі наступні числа
      let found = false;
      for (const nextNum of numbers) {
        if (visited.has(nextNum)) continue;

        // Перевіряємо, чи можна з'єднати числа
        const current = String(currentNum).padStart(6, "0");
        const next = String(nextNum).padStart(6, "0");

        // Перевіряємо різні варіанти перекриття
        for (let overlap = 1; overlap <= 5; overlap++) {
          if (current.slice(-overlap) === next.slice(0, overlap)) {
            sequence.push(nextNum);
            visited.add(nextNum);
            currentNum = nextNum;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) break;
    }

    // Рахуємо довжину послідовності в символах
    const sequenceLength = sequence.join("").length;
    if (sequenceLength > maxLength) {
      maxLength = sequenceLength;
      maxSequence = [...sequence];
    }
  }

  return { length: maxLength, sequence: maxSequence };
}

// Читаємо файл
const fileContent = fs.readFileSync("data/file.txt", "utf8");
const numbers = fileContent
  .trim()
  .split("\n")
  .map((n) => parseInt(n.trim()));

// Знаходимо найдовшу послідовність
const result = findLongestSequence(numbers);
console.log(`Довжина максимальної послідовності: ${result.length} символів`);
console.log(
  `Послідовність чисел через стрілку: ${result.sequence.join(" -> ")}`
);
console.log("\nНеперервна послідовність чисел:");
console.log(result.sequence.join(""));
