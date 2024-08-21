const notesContainerEl = document.querySelector(".notesContainer");
const createBtnEl = document.querySelector(".createBtn");

// When we click on the create button it creates a note in the notesContainer
createBtnEl.addEventListener("click", createNote);

function createNote() {
  const title = prompt("Enter note title:", "New Note");
  if (title === null) return; // User cancelled the prompt

  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    <div class="title" contenteditable="true">${title}</div>
    <div class="content" contenteditable="true"></div>
    <span class="delete-icon">×</span>
  `;

  notesContainerEl.appendChild(note);

  // Add event listener for delete icon
  const deleteIcon = note.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Add event listeners to save on content change
  const titleElement = note.querySelector(".title");
  const contentElement = note.querySelector(".content");
  titleElement.addEventListener("input", saveNotes);
  contentElement.addEventListener("input", saveNotes);

  saveNotes();
}

function saveNotes() {
  const notes = document.querySelectorAll(".note");
  const notesData = Array.from(notes).map(note => ({
    title: note.querySelector(".title").textContent,
    content: note.querySelector(".content").textContent
  }));
  localStorage.setItem("notes", JSON.stringify(notesData));
}

function loadNotes() {
  const notesContainer = document.querySelector(".notesContainer");
  const notesData = JSON.parse(localStorage.getItem("notes")) || [];

  notesData.forEach(noteData => {
    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
      <div class="title" contenteditable="true">${noteData.title}</div>
      <div class="content" contenteditable="true">${noteData.content}</div>
      <span class="delete-icon">×</span>
    `;

    notesContainer.appendChild(note);

    // Add event listener for delete icon
    const deleteIcon = note.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => {
      note.remove();
      saveNotes();
    });

    // Add event listeners to save on content change
    const titleElement = note.querySelector(".title");
    const contentElement = note.querySelector(".content");
    titleElement.addEventListener("input", saveNotes);
    contentElement.addEventListener("input", saveNotes);
  });
}

// Call loadNotes when the page loads
document.addEventListener("DOMContentLoaded", loadNotes);

// To prevent from the enter key button
document.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})