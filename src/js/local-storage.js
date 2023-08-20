// LOCAL STORAGE ДЛЯ СВІТЧЕРА

const themeCheckbox = document.querySelector('.switch>input');
themeCheckbox.addEventListener('change', switchThemeColor);
reloadThemeAndFormData();

function switchThemeColor() {
    if (themeCheckbox.checked) {
        document.documentElement.setAttribute('theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.documentElement.removeAttribute('theme');
        localStorage.removeItem('theme');
    }
}

function reloadTheme() {
    // Встановлення стану теми
    if (localStorage.getItem('theme') === 'dark-theme') {
        themeCheckbox.checked = true;
        document.documentElement.setAttribute('theme', 'dark-theme');
    } else {
        themeCheckbox.checked = false;
        document.documentElement.removeAttribute('theme');
    }
};

// LOCAL STORAGE ДЛЯ МОДАЛКИ ЗАМОВЛЕННЯ

const form = document.querySelector('.form-oder');
form.addEventListener('input', saveInLocalStorage);
form.addEventListener('submit', resetLocalStorage);


function saveInLocalStorage() {
    let dataForm = JSON.stringify({
        name: form.name.value,
        number: form.number.value,
        email: form.email.value
    });
    localStorage.setItem("key_form", dataForm);
};

function resetLocalStorage() {
    localStorage.removeItem("key_form")
};

function reloadForm() {
    let savedInfo = JSON.parse(localStorage.getItem("key_form"));
    if(savedInfo) {
        form.name.value = savedInfo.name;
        form.number.value = savedInfo.number;
        form.email.value = savedInfo.email;
    }
};
function reloadThemeAndFormData() {
    reloadTheme(); // Відновлення стану теми
    reloadForm(); // Відновлення даних форми
    reloadCategory(); // Відновлення обраної категорії
}

// LOCAL STORAGE ДЛЯ КАТЕГОРІЙ
// const localStorageKey = 'selected-category';
const categoriesList = document.querySelector('.categories-list-js');
categoriesList.addEventListener('click', handleCategoryClick);

function handleCategoryClick(event) {
    const categoryOption = event.target;
    if (categoryOption.classList.contains('category-option')) {
        const selectedCategory = categoryOption.textContent;
        localStorage.setItem('selected-category', selectedCategory);
        categoryOption.classList.add('selected')
        console.log(`Selected category: ${selectedCategory}`);
    }
}
function reloadCategory() {
    const selectedCategory = localStorage.getItem('selected-category');
    if (selectedCategory) {
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(option => {
            if (option.textContent === selectedCategory) {
                option.classList.add('selected'); // Додати стиль для відображення вибраної категорії
                console.log(`Reloaded selected category: ${selectedCategory}`);
            } else {
                option.classList.remove('selected'); // Видалити стиль для інших категорій
            }
        });
    }
};

// LOCAL STORAGE ДЛЯ ФІЛЬТРІВ

