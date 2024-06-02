const currentDate = moment();

function renderWeekdays() {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekdaysContainer = document.querySelector(".calendar-weekdays");
    weekdaysContainer.innerHTML = "";

    weekdays.forEach(function (day) {
        const li = document.createElement("li");
        li.innerText = day;
        weekdaysContainer.append(li);
    });
}

function renderCurrentDate() {
    const currentDateContainer = document.querySelector(".calendar-current-date");
    currentDateContainer.innerText = currentDate.format("MMMM YYYY");

    const month = currentDate.month();
    const calendarContainer = document.querySelector(".calendar-container");

    calendarContainer.className = "calendar-container";

    if (month >= 2 && month <= 4) {
        calendarContainer.classList.add("spring");
    } else if (month >= 5 && month <= 7) {
        calendarContainer.classList.add("summer");
    } else if (month >= 8 && month <= 10) {
        calendarContainer.classList.add("autumn");
    } else {
        calendarContainer.classList.add("winter");
    }
}

function renderDays() {
    const daysContainer = document.querySelector(".calendar-dates");
    daysContainer.innerHTML = "";

    const firstDay = currentDate.startOf('month');
    const skipDays = firstDay.weekday() - 1;

    for (let i = 0; i < skipDays; i++) {
        const li = document.createElement("li");
        li.innerText = "";
        daysContainer.append(li);
    }

    const daysInMonth = currentDate.daysInMonth();
    const today = moment();

    for (let i = 1; i <= daysInMonth; i++) {
        const li = document.createElement("li");
        li.innerText = i.toString();

        if (currentDate.format("MM-YYYY") === today.format("MM-YYYY") && today.date() === i) {
            li.className = "active";
        }

        const dayOfWeek = currentDate.date(i).weekday();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            li.classList.add("weekend");
        }

        daysContainer.append(li);
    }
}

function renderCalendar() {
    renderWeekdays();
    renderCurrentDate();
    renderDays();
}

renderCalendar();

const prevBtn = document.getElementById("calendar-prev");
const nextBtn = document.getElementById("calendar-next");

prevBtn.onclick = function () {
    currentDate.subtract(1, "month");
    renderCalendar();
}

nextBtn.onclick = function () {
    currentDate.add(1, "month");
    renderCalendar();
}
