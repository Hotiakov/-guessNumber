const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

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
    return guessNumber;
}

let guessNumber = startGame(72);

guessNumber();