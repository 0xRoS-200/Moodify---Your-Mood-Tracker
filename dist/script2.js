document.addEventListener("DOMContentLoaded", () => {
    const moodPopup = document.getElementById("moodPopup");
    const closePopup = document.getElementById("closePopup");
    const moodText = document.getElementById("moodText");

    // Sample Data (Replace with actual stored moods)
    let recordedMoods = {
        "2025-03-18": "Happy 😊",
        "2025-03-19": "Sad 😢",
        "2025-03-20": "Neutral 😐"
    };

    document.getElementById("calendarDays").addEventListener("click", (e) => {
        if (e.target.classList.contains("date-item")) {
            const selectedDate = e.target.dataset.date;
            
            if (recordedMoods[selectedDate]) {
                moodText.innerText = `You felt ${recordedMoods[selectedDate]}`;
                moodPopup.classList.remove("hidden");
            }
        }
    });

    closePopup.addEventListener("click", () => {
        moodPopup.classList.add("hidden");
    });

    moodPopup.addEventListener("click", (e) => {
        if (e.target === moodPopup) {
            moodPopup.classList.add("hidden");
        }
    });
});