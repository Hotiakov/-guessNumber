document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    const day = new Date();
    const hours = day.getHours();
    if (hours >= 0 && hours <= 5) {
        document.querySelector(".dayTime").textContent = "Доброй ночи!"
    }
    else if (hours >= 6 && hours <= 11) {
        document.querySelector(".dayTime").textContent = "Доброе утро!"
    }
    else if (hours >= 12 && hours <= 18) {
        document.querySelector(".dayTime").textContent = "Добрый день!"
    }
    else {
        document.querySelector(".dayTime").textContent = "Добрый вечер!"
    }

    document.querySelector(".dayWeek").textContent = "Сегодня: " + day.toLocaleString("ru", { weekday: "long" });
    document.querySelector(".curTime").textContent = "Текущее время: " + day.toLocaleTimeString('en', { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const happyNewYear = new Date();
    happyNewYear.setFullYear(day.getFullYear() + 1, 0, 1);
    document.querySelector(".newYear").textContent = "До нового года осталось " + (Math.floor(Math.floor(Math.floor(Math.floor((happyNewYear.getTime() - day.getTime()) / 1000) / 60) / 60) / 24)) + " дней";

});