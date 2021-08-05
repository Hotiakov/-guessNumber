const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function startGame(secret) {
    let counter = 10;
    function guessNumber() {
        if (counter === 0) {
            if (confirm("Попытки закончились:( Хотите сыграть еще?")) {
                counter = 10;
                guessNumber();
            }
            else {
                alert("Игра окончена");
                return;
            }
        }
        else {
            let number = prompt("Угадай число от 1 до 100");
            if (number === null) {
                alert("Игра окончена");
            }
            else if (!isNumber(number)) {
                alert("Введи число!")
                guessNumber();
            }
            else {
                number = +number;
                if (number === secret) {
                    if (confirm("Поздравляю, Вы угадали!!! Хотите сыграть еще?")) {
                        counter = 10;
                        secret = getRandomInt(1, 101);
                        alert("Для вашего удобства, случайное число: " + secret);
                        guessNumber();
                    }
                    else {
                        alert("Игра окончена");
                    }
                    return;
                }
                else if (number < secret) {
                    alert("Загаданное число больше, осталось попыток: " + --counter);
                    guessNumber();
                }
                else {
                    alert("Загаданное число меньше, осталось попыток: " + --counter);
                    guessNumber();
                }
            }
        }
    }
    return guessNumber;
}

let guessNumber = startGame(72);

guessNumber();