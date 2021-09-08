const dropdownDefault = document.querySelector('.dropdown-lists__list--default'),
    dropdownSelect = document.querySelector('.dropdown-lists__list--select'),
    dropdownAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
    dropdownLists = document.querySelector('.dropdown-lists'),
    label = document.querySelector('.label');

const selectCities = document.getElementById('select-cities'),
    closeBtn = document.querySelector('.close-button'),
    btn = document.querySelector(".button");
let data;
dropdownDefault.style.display = 'none';

const animationOpen = (openItem) => {
    let transformCounter = -100,
        opacityCounter = 0,
        animateId;
    openItem.style.opacity = 0;
    openItem.style.transform = "translateX(-100%)";
    openItem.style.display = 'block';

    const animate = () => {
        if (opacityCounter < 1 && transformCounter < 0) {
            animateId = requestAnimationFrame(animate);
            opacityCounter += 0.05;
            transformCounter += 5;
            openItem.style.opacity = opacityCounter;
            openItem.style.transform = `translateX(${transformCounter}%)`;
        } else {
            cancelAnimationFrame(animateId);
        }
    }
    animateId = requestAnimationFrame(animate);
}

const addListeners = () => {
    selectCities.addEventListener('click', () => {
        if (selectCities.value === '') {
            dropdownDefault.style.display = 'block';
            dropdownSelect.style.display = 'none';
        }
    });

    closeBtn.addEventListener('click', e => {
        selectCities.value = '';
        dropdownDefault.style.display = 'none';
        dropdownAutocomplete.style.display = 'none';
        dropdownSelect.style.display = 'none';
        closeBtn.style.display = "none"
        label.style.display = "block";
        btn.setAttribute("href", "#");
    });

    dropdownDefault.addEventListener('click', e => {
        let target = e.target;
        let tmpTarget = target.closest('.dropdown-lists__total-line');
        if (tmpTarget) {
            selectCities.value = tmpTarget.querySelector('.dropdown-lists__country').textContent;
            createSelect(tmpTarget.querySelector('.dropdown-lists__country').textContent);
            dropdownAutocomplete.style.display = 'none';
            dropdownDefault.style.display = "none";
            animationOpen(dropdownSelect);

        } else {
            tmpTarget = target.closest('.dropdown-lists__line');
            if (tmpTarget) {
                selectCities.value = tmpTarget.querySelector('.dropdown-lists__city').textContent;
                btn.setAttribute("href", tmpTarget.dataset.link);
                selectCities.dispatchEvent(new Event('input'));
            }
        }
        closeBtn.style.display = "block";
        label.style.display = "none";
    });
    dropdownSelect.addEventListener('click', e => {
        let target = e.target;
        let tmpTarget = target.closest('.dropdown-lists__total-line')
        if (tmpTarget) {
            dropdownAutocomplete.style.display = 'none';
            dropdownSelect.style.display = "none";
            animationOpen(dropdownDefault);
        } else {
            tmpTarget = target.closest('.dropdown-lists__line');
            if (tmpTarget) {
                selectCities.value = tmpTarget.querySelector('.dropdown-lists__city').textContent;
                btn.setAttribute("href", tmpTarget.dataset.link);
                selectCities.dispatchEvent(new Event('input'));
            }
        }
        closeBtn.style.display = "block";
        label.style.display = "none";
    });
    dropdownAutocomplete.addEventListener('click', e => {
        let target = e.target;
        let tmpTarget = target.closest('.dropdown-lists__line');
        if (tmpTarget) {
            selectCities.value = tmpTarget.querySelector('.dropdown-lists__city').textContent;
            btn.setAttribute("href", tmpTarget.dataset.link);
            selectCities.dispatchEvent(new Event('input'));
        }
        closeBtn.style.display = "block";
        label.style.display = "none";
    });
    selectCities.addEventListener('input', () => {
        label.style.display = "none";
        dropdownDefault.style.display = 'none';
        dropdownSelect.style.display = 'none';
        dropdownAutocomplete.style.display = 'block';
        const drops = dropdownAutocomplete.querySelectorAll('.dropdown-lists__line');
        const value = selectCities.value;
        if (value === '') {
            dropdownDefault.style.display = 'block';
            dropdownAutocomplete.style.display = 'none';
            label.style.display = "block";
        }
        const expr = new RegExp('^' + value, 'i');
        let counter = 0;
        drops.forEach(item => {
            let city = item.querySelector('.dropdown-lists__city');
            if (!expr.test(city.textContent)) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
                city.innerHTML = city.textContent.replace(expr, match => `<b>${match}</b>`);
                counter++;
            }
        });
        if (counter === 0) {
            dropdownAutocomplete.insertAdjacentHTML('beforeend', `
            <div class="dropdown-lists__line nothing">
                <div class="dropdown-lists__city">Ничего не найдено</div>
            </div>
        `);
        } else if (dropdownAutocomplete.querySelector('.nothing')) {
            dropdownAutocomplete.querySelector('.nothing').remove();
        }
    });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const getData = async () => {
    let local;
    if (!getCookie('local')) {
        local = prompt("Введите локаль (RU/EN/DE)");
        document.cookie = `local=${local}`;
    } else {
        local = getCookie('local');
    }
    let data;
    await fetch('http://localhost:3000/' + local)
        .then(res => {
            return res.json();
        })
        .then(res => {
            localStorage.setItem('countryData', JSON.stringify(res));
            data = res;
        })
        .catch(() => {
            console.error("Ошиииииибка");
        });
    return data;
};

const createDefault = () => {
    const defaultWrapper = dropdownDefault.querySelector('.dropdown-lists__col');
    for (const item of data) {
        const countryBlock = document.createElement('div');
        countryBlock.className = '"dropdown-lists__countryBlock';
        countryBlock.insertAdjacentHTML('beforeend', `
            <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${item['country']}</div>
                <div class="dropdown-lists__count">${item['count']}</div>
            </div>
        `);
        let counter = 0;
        for (const item2 of item["cities"]) {
            if (counter < 3) {
                countryBlock.insertAdjacentHTML('beforeend', `
                    <div class="dropdown-lists__line" data-link="${item2["link"]}">
                        <div class="dropdown-lists__city">${item2["name"]}</div>
                        <div class="dropdown-lists__count">${item2["count"]}</div>
                    </div>
                `);
                counter++;
            } else {
                break;
            }
        }
        if (item['country'] === "Россия" || item['country'] === "United Kingdom" || item['country'] === "Deutschland") {
            defaultWrapper.prepend(countryBlock);
        } else {
            defaultWrapper.append(countryBlock);
        }
    }
};

const createSelect = country => {
    const selectWrapper = dropdownSelect.querySelector('.dropdown-lists__col');
    selectWrapper.textContent = '';
    for (const item of data) {
        if (item["country"] !== country) {
            continue;
        }
        const countryBlock = document.createElement('div');
        countryBlock.className = '"dropdown-lists__countryBlock';
        countryBlock.insertAdjacentHTML('beforeend', `
            <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${item['country']}</div>
                <div class="dropdown-lists__count">${item['count']}</div>
            </div>
        `);
        for (const item2 of item["cities"]) {
            countryBlock.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__line" data-link="${item2["link"]}">
                    <div class="dropdown-lists__city">${item2["name"]}</div>
                    <div class="dropdown-lists__count">${item2["count"]}</div>
                </div>
            `);
        }
        selectWrapper.append(countryBlock);
        break;
    }
};

const createAutocomplite = () => {
    const autoWrapper = dropdownAutocomplete.querySelector('.dropdown-lists__col');
    for (const item of data) {
        const countryBlock = document.createElement('div');
        countryBlock.className = '"dropdown-lists__countryBlock';
        for (const item2 of item["cities"]) {
            countryBlock.insertAdjacentHTML('beforeend', `
                <div class="dropdown-lists__line" data-link="${item2["link"]}">
                    <div class="dropdown-lists__city">${item2["name"]}</div>
                    <div class="dropdown-lists__count">${item2["count"]}</div>
                </div>
            `);
        }
        autoWrapper.append(countryBlock);
    }
};

const init = async () => {
    addListeners();
    if (localStorage.getItem('countryData')) {
        data = JSON.parse(localStorage.getItem('countryData'));
    } else {
        data = await getData();
    }
    document.body.className = 'loaded';
    createDefault();
    createAutocomplite();
};
init();














