// 1. Our data: an array of note objects
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

//Search Notes
function searchNotes(word) {
  return notes.filter((note) =>
    note.text.toLowerCase().includes(word.toLowerCase()),
  );
}

console.log(searchNotes("email")); //true
console.log("Pay"); //false

//Longest Note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

console.log(longestNote()); //Note id=3

//Count by Category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    const category = note.category;

    if (counts[category]) {
      counts[category]++;
    } else {
      counts[category] = 1;
    }
  }

  return counts;
}

console.log(countByCategory()); // 2 personal, 2 work, 2 study

//Get Summary
function getSummary() {
  const categories = countByCategory();
  const total = notes.length;

  return "" + total + " notes: " + categories + ".";
}

console.log(getSummary()); //5 notes: 2 personal, 1 work, 2 study.

//Check for duplicates
function isDuplicate(text) {
  const normalizedText = text.trim().replace(/\s+/g, " ").toLowerCase();

  return notes.some((note) => {
    const noteText = note.text.trim().replace(/\s+/g, " ").toLowerCase();

    return noteText === normalizedText;
  });
}

console.log(isDuplicate("call mum")); //true
console.log(isDuplicate("Get ice cream")); //false

//Add Note
function addNote(text, category) {
  if (text.length < 1 || text.length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(text)) {
    console.log("Note is a duplicate.");
    return false;
  }

  const validCategories = ["personal", "work", "study"];

  if (!validCategories.includes(category)) {
    console.log("Invalid category.");
    return false;
  }

  notes.push({
    text: text,
    category: category,
  });

  return true;
}

console.log(addNote("Finish and submit PLP Javascript assignment", "school"));
console.log(addNote("Pay medical aid", "personal"));
