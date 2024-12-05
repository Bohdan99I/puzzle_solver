const fs = require("fs");

// Перевірка чи рядок складається тільки з цифр
const isNumeric = (fragment) => {
  return /^\d+$/.test(fragment);
};

// Завантаження фрагментів з файлу
const loadFragments = (filename) => {
  try {
    if (!fs.existsSync(filename)) {
      throw new Error(`Файл ${filename} не знайдено`);
    }

    const data = fs.readFileSync(filename, "utf8");
    const fragments = data.split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    // Перевірка чи всі фрагменти складаються з цифр
    const invalidFragments = fragments.filter(fragment => !isNumeric(fragment));
    if (invalidFragments.length > 0) {
      throw new Error(`Знайдено некоректні фрагменти (не цифри): ${invalidFragments.join(", ")}`);
    }

    return fragments;
  } catch (error) {
    console.error("Помилка при завантаженні фрагментів:", error.message);
    process.exit(1);
  }
};

// Створення графу
const buildGraph = (fragments) => {
  const graph = {};
  fragments.forEach((fragment) => {
    const prefix = fragment.slice(0, 2);
    const suffix = fragment.slice(-2);
    if (!graph[suffix]) graph[suffix] = [];
    graph[suffix].push(fragment);
  });
  return graph;
};

// Пошук найдовшого шляху
const findLongestPath = (graph, fragment, visited = new Set(), path = []) => {
  visited.add(fragment);
  path.push(fragment);

  let maxPath = [...path];

  const suffix = fragment.slice(-2);
  if (graph[suffix]) {
    graph[suffix].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        const newPath = findLongestPath(graph, neighbor, visited, path);
        if (newPath.length > maxPath.length) {
          maxPath = newPath;
        }
      }
    });
  }

  path.pop();
  visited.delete(fragment);

  return maxPath;
};

// Знаходження найбільшої послідовності
const findMaxSequence = (fragments) => {
  const graph = buildGraph(fragments);
  let maxSequence = [];

  fragments.forEach((fragment) => {
    const visited = new Set();
    const path = findLongestPath(graph, fragment, visited);
    if (path.length > maxSequence.length) {
      maxSequence = path;
    }
  });

  return maxSequence.join("");
};

module.exports = { loadFragments, findMaxSequence };
