const fs = require("fs");

// Завантаження фрагментів з файлу
const loadFragments = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  return data.split("\n").filter(Boolean);
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
