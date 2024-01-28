const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key = 'empty') {
    const data = localStorage.getItem(key);

    try {
        const result = JSON.parse(data);
        return result;
    } catch {
        return data;
    }
}

form.addEventListener('input', () => {
    const userName = form.elements.email.value;
    const userMessage = form.elements.message.value;

    const data = {
    email: userName,
    message: userMessage,
    };

    saveToLS(STORAGE_KEY, data);
});

function restoreData() {
    const data = loadFromLS(STORAGE_KEY) || {};
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
}
restoreData();

form.addEventListener('submit', e => {
    e.preventDefault();
    const userName = form.elements.email.value;
    const userMessage = form.elements.message.value;

    if (userName.trim() === '' || userMessage.trim() === '') {
    alert('Please fill in both fields of the form');
    return;
    }
    
    const data = loadFromLS(STORAGE_KEY) || {};

    console.log(data);

    form.reset();
    
    localStorage.removeItem(STORAGE_KEY);
});