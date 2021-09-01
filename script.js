document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const selectTo = document.getElementById('toRUB__select'),
        selectFrom = document.getElementById('fromRUB__select'),
        outputTo = document.getElementById('toRub2'),
        outputFrom = document.getElementById('fromRub2'),
        inputTo = document.getElementById('toRub1'),
        inputFrom = document.getElementById('fromRub1'),
        btnTo = document.getElementById('convert_to_RUB'),
        btnFrom = document.getElementById('convert_from_RUB');

    const getData = () => fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
        mode: 'cors',
        method: 'GET',
    });

    btnTo.addEventListener('click', e => {
        e.preventDefault();
        getData()
            .then((response) => {
                if (response.status !== 200) throw new Error('error');
                return response.json();
            })
            .then((data) => {
                console.log(data);
                outputTo.value = data["Valute"][selectTo.value].Value * inputTo.value;
            })
            .catch((err) => {
                console.error(err);
            });
    });
    btnFrom.addEventListener('click', e => {
        e.preventDefault();
        getData()
            .then((response) => {
                if (response.status !== 200) throw new Error('error');
                return response.json();
            })
            .then((data) => {
                console.log(data);
                outputFrom.value = inputFrom.value / data["Valute"][selectFrom.value].Value;
            })
            .catch((err) => {
                console.error(err);
            });
    });
});