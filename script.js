let selectedMood = "";
const moodButtons = document.querySelectorAll(".mood");
const noteInput = document.getElementById("note");
const productivitySlider = document.getElementById("productivity");
const prodValue = document.getElementById("prodValue");
const saveBtn = document.getElementById("saveBtn");
const entriesDiv = document.getElementById("entries");

// Mood selection
moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedMood = btn.textContent;

        moodButtons.forEach(b => b.style.transform = "scale(1)");
        btn.style.transform = "scale(1.4)";
    });
});

// Update productivity value live
productivitySlider.addEventListener("input", () => {
    prodValue.textContent = productivitySlider.value;
});

// Save entry
saveBtn.addEventListener("click", () => {
    if (!selectedMood) {
        alert("Please select your mood Dude 😎");
        return;
    }

    const entry = {
        mood: selectedMood,
        note: noteInput.value,
        productivity: productivitySlider.value,
        date: new Date().toDateString()
    };

    let savedEntries = JSON.parse(localStorage.getItem("mindData")) || [];
    savedEntries.push(entry);
    localStorage.setItem("mindData", JSON.stringify(savedEntries));

    noteInput.value = "";
    productivitySlider.value = 15;
    prodValue.textContent = 5;
    selectedMood = "";
    moodButtons.forEach(b => b.style.transform = "scale(1)");

    displayEntries();
});

// Display entries
function displayEntries() {
    const savedEntries = JSON.parse(localStorage.getItem("mindData")) || [];
    entriesDiv.innerHTML = "";

    savedEntries.forEach(e => {
        const card = document.createElement("div");
        card.classList.add("entry-card");
        card.innerHTML = `
            <div>${e.date}</div>
            <div>${e.mood}</div>
            <div>${e.note}</div>
            <div>🔥 ${e.productivity}/10</div>
        `;
        entriesDiv.appendChild(card);
    });
}

// Load on start
displayEntries();
