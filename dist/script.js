const mood_display = document.getElementById("display_mood");
const happy_mood = document.getElementById("happy");
const neutral_mood = document.getElementById("neutral");
const sad_mood = document.getElementById("sad");
const angry_mood = document.getElementById("angry");
const mood_dial = document.getElementById("mood_page");
const calendar_dial = document.getElementById("calendar_page");
const toggle_mood_pg = document.getElementById("m-pg");
const toggle_calendar_pg = document.getElementById("c-pg");
const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const popupContainer = document.createElement("div");

const mood_array = {
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    angry: "😡"
};

let moodData = JSON.parse(localStorage.getItem("moodData")) || {}; // Load stored moods
let currentDate = new Date();

// Function to change the mood
function change_mood(mood) {
    mood_display.textContent = mood_array[mood];
}

// Function to change pages between mood and calendar
function change_pages(page) {
    if (page === 'mood_page') {
        mood_dial.classList.add("bg-slate-50");
        calendar_dial.classList.remove("bg-slate-50");
        toggle_mood_pg.classList.remove("hidden");
        toggle_calendar_pg.classList.add("hidden");
    } else if (page === 'calendar_page') {
        mood_dial.classList.remove("bg-slate-50");
        calendar_dial.classList.add("bg-slate-50");
        toggle_mood_pg.classList.add("hidden");
        toggle_calendar_pg.classList.remove("hidden");
    }
}

// Function to render the calendar
function renderCalendar(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Update the month-year display
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous calendar days
    calendarDays.innerHTML = "";

    // Get the first day of the month and how many days in the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("p-2");
        calendarDays.appendChild(emptyCell);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add(
            "p-3", "text-center", "border", "border-gray-200", "hover:bg-gray-100", "rounded-lg", "cursor-pointer"
        );

        dayCell.textContent = day;

        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;

        // If mood is recorded, add a small red dot
        if (moodData[dateKey]) {
            const redDot = document.createElement("div");
            redDot.classList.add("w-2", "h-2", "bg-red-500", "rounded-full", "mx-auto", "mt-1");
            dayCell.appendChild(redDot);
        }

        // Event listener for date click
        dayCell.addEventListener("click", () => showPopup(dateKey));

        calendarDays.appendChild(dayCell);
    }
}

// Function to show the mood popup
function showPopup(dateKey) {
    if (!moodData[dateKey]) return; // Only show popup if mood is recorded

    // Create the popup
    popupContainer.classList.add(
        "fixed", "top-1/3", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2",
        "bg-white", "p-5", "rounded-lg", "shadow-lg", "flex", "flex-col", "items-center", "z-50"
    );

    popupContainer.innerHTML = `
        <p class="text-lg font-bold">Your Mood on this Day</p>
        <span class="text-3xl">${moodData[dateKey]}</span>
    `;

    document.body.appendChild(popupContainer);

    // Auto-close popup after 3 seconds
    setTimeout(() => {
        popupContainer.remove();
    }, 3000);
}

// Event listeners for mood buttons
happy_mood.addEventListener('click', () => {
    change_mood('happy');
    saveMood('happy');
});
neutral_mood.addEventListener('click', () => {
    change_mood('neutral');
    saveMood('neutral');
});
sad_mood.addEventListener('click', () => {
    change_mood('sad');
    saveMood('sad');
});
angry_mood.addEventListener('click', () => {
    change_mood('angry');
    saveMood('angry');
});

// Function to save the selected mood for the current date
function saveMood(mood) {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    moodData[dateKey] = mood_array[mood];

    localStorage.setItem("moodData", JSON.stringify(moodData)); // Save to local storage
    renderCalendar(currentDate); // Update the calendar
}

// Event listeners for page changes
mood_dial.addEventListener('click', () => change_pages('mood_page'));
calendar_dial.addEventListener('click', () => change_pages('calendar_page'));

// Event listeners for month navigation
prevMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Initial render of the calendar
renderCalendar(currentDate);
