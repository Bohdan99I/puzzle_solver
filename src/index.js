const { loadFragments, findMaxSequence } = require("./utils");

const filename = "data/file.txt";
const fragments = loadFragments(filename);
const maxSequence = findMaxSequence(fragments);

console.log("Maximum sequence:", maxSequence);
