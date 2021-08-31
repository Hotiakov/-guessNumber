document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = () => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                resolve(request.responseText);
            } else if (request.status !== 200) {
                reject('Произошла ошибка');
            } else {
                return;
            }
        });
    });

    select.addEventListener('change', () => {
        getData()
            .then((_data) => {
                const data = JSON.parse(_data);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const { brand, model, price } = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                })
            })
            .catch((err) => {
                output.innerHTML = err;
                console.error(err);
            });
    });
});