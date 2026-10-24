// 1. Select all required HTML elements
const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearButton = document.getElementById("clear-btn");
const themeButton = document.getElementById("theme-toggle");

// 2. Define localStorage keys and character limits
const DRAFT_KEY = "quicknotes-draft";
const THEME_KEY = "quicknotes-theme";

const MAX_CHARACTERS = 200;
const WARNING_LIMIT = 180;

// 3. Update both counters and the warning classes
function updateCounts() {
  const text = textarea.value;
  const characters = text.length;

  // Count words, ignoring extra spaces
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Update counter text
  charCount.textContent = `${characters} / ${MAX_CHARACTERS} characters`;

  wordCount.textContent = `${words} words`;

  // Remove previous warning classes
  charCount.classList.remove("warning", "over");

  // Apply the appropriate class
  if (characters > MAX_CHARACTERS) {
    charCount.classList.add("over");
  } else if (characters > WARNING_LIMIT) {
    charCount.classList.add("warning");
  }
}

// 4. Save the current draft
function saveDraft() {
  localStorage.setItem(DRAFT_KEY, textarea.value);
}

// 5. Clear the textarea, counters, and saved draft
function clearEverything() {
  textarea.value = "";

  localStorage.removeItem(DRAFT_KEY);

  updateCounts();
}

// 6. Update the theme button label
function updateThemeLabel() {
  themeButton.textContent = document.body.classList.contains("dark")
    ? "Light mode"
    : "Dark mode";
}

// 7. Toggle the theme and save the choice
function toggleTheme() {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem(THEME_KEY, theme);

  updateThemeLabel();
}

// 8. Restore the saved draft and theme when the page loads
function restoreSettings() {
  // Restore draft if one exists
  const savedDraft = localStorage.getItem(DRAFT_KEY);

  if (savedDraft !== null) {
    textarea.value = savedDraft;
  }

  // Restore theme
  const savedTheme = localStorage.getItem(THEME_KEY);

  document.body.classList.toggle("dark", savedTheme === "dark");

  updateThemeLabel();

  // Update both counters after restoring the draft
  updateCounts();
}

// 9. On every input event, update counters and save the draft
textarea.addEventListener("input", () => {
  updateCounts();
  saveDraft();
});

// 10. Clear everything when the Clear button is clicked
clearButton.addEventListener("click", clearEverything);

// 11. Clear everything when Escape is pressed in the textarea
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearEverything();
  }
});

// 12. Toggle the theme when the theme button is clicked
themeButton.addEventListener("click", toggleTheme);

// 13. Restore saved settings when the page loads
restoreSettings();
