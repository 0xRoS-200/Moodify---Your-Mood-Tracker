const mood_display = document.getElementById("display_mood");
const happy_mood = document.getElementById("happy");
const neutral_mood = document.getElementById("neutral");
const sad_mood = document.getElementById("sad");
const angry_mood = document.getElementById("angry");
const mood_dial = document.getElementById("mood_page");
const calendar_dial = document.getElementById("calendar_page");
const toggle_mood_pg = document.getElementById("m-pg");
const toggle_calendar_pg = document.getElementById("c-pg");

const mood_array = ["./img/angry.png", "./img/sad.png", "./img/neutral.png", "./img/smile.png"]



function change_mood(mood) {
    if (mood === 'happy') {
        mood_display.src = mood_array[3];
    } else if (mood === 'neutral') {
        mood_display.src = mood_array[2];
    } else if (mood === 'sad') {
        mood_display.src = mood_array[1];
    } else if (mood === 'angry') {
        mood_display.src = mood_array[0];
    }
}

function change_pages(page) {
    if (page === 'mood_page') {
        mood_dial.classList.add("bg-slate-50")
        calendar_dial.classList.remove("bg-slate-50")
        toggle_mood_pg.classList.remove("hidden")
        toggle_calendar_pg.classList.add('hidden')
    }
    else if (page === 'calendar_page') {
        mood_dial.classList.remove("bg-slate-50")
        calendar_dial.classList.add("bg-slate-50")
        toggle_mood_pg.classList.add("hidden")
        toggle_calendar_pg.classList.remove('hidden')
    }
}

// Add event listeners for each mood button
happy_mood.addEventListener('click', () => change_mood('happy'));
neutral_mood.addEventListener('click', () => change_mood('neutral'));
sad_mood.addEventListener('click', () => change_mood('sad'));
angry_mood.addEventListener('click', () => change_mood('angry'));
mood_dial.addEventListener('click', () => change_pages('mood_page'));
calendar_dial.addEventListener('click', () => change_pages('calendar_page'));
