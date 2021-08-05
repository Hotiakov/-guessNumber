const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

function startGame(secret) {
    function guessNumber() {
        let number = prompt("Угадай число от 1 до 100");
        if (number == null) {
            alert("Игра окончена");
        }
        else if (!isNumber(number)) {
            alert("Введи число!")
            guessNumber();
        }
        else {
            number = +number;
            if (number === secret) {
                alert("Поздравляю, Вы угадали!!!");
                return;
            }
            else if (number < secret) {
                alert("Загаданное число больше");
                guessNumber();
            }
            else {
                alert("Загаданное число меньше");
                guessNumber();
            }
        }
    }
    return guessNumber;
}

let guessNumber = startGame(72);

guessNumber();