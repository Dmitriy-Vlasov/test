'use strict';

// DOM-элементы
const botListElem = document.querySelector('.botList');
const modalElem = document.querySelector('.closeModalField');
const addNewBotElem = document.querySelector('.addNewBotBtn');
const closeModalElem = document.querySelector('.closeModal');
const botFormElem = document.querySelector('.botForm');

const idField = document.querySelector('#id');
const titleField = document.querySelector('#title');
const descriptionField = document.querySelector('#description');
const fileField = document.querySelector('#file');
const dateField = document.querySelector('#date');



// Обработчики событий
addNewBotElem.addEventListener('click', onAddNewBotClick);
closeModalElem.addEventListener('click', onCloseModalClick);
botListElem.addEventListener('click', onBotListClick);
botFormElem.addEventListener('submit', onbotFormSubmit);
modalElem.addEventListener('click', onModalFieldClick)

let botList = [
    { id: Math.random(), title: 'UA News 24', description: 'Актуальные новости Украины! Политика, спорт, финансы', date: '', file: '' },
    { id: Math.random(), title: 'Dnipro News', description: 'Новости из Нью-Йорка про белых и черных!', date: '', file: '' },
];

let targetBotId;

init();

// Функция инициализации
function init() {
    console.log(botList)
    const botListItems = botList.map(el => {
        return (
            `<li class='botListItem' data-id=${el.id}>
                ${el.title}
                <span class="descriptionBot">${el.description}</span>
                <span class="deleteBot">&#215;</span>
            </li>`
        )
    })

    botListElem.innerHTML = botListItems.join('');
};


// Событийные функции
function onAddNewBotClick() {
    openModal();
}

function onCloseModalClick() {
    closeModal();
    clearForm();
}

function onBotListClick(e) {
    console.log(e.target)
    if (e.target.classList.contains('deleteBot')) {
        deleteBot(e.target);
    } else if (e.target.classList.contains('botListItem')) {
        openModal();
        setModal(e.target);
    }
}

function onbotFormSubmit(e) {
    e.preventDefault();

    if (idField.value === '') {
        createNewBot();
        closeModal();
        clearForm();
    } else {
        changeBot();
    }
}

function onModalFieldClick(e) {
    if (e.target.classList.contains('closeModalField')) {
        closeModal();
        clearForm();
    }
}

// Общие функции
function openModal() {
    modalElem.classList.remove('hide');
}

function closeModal() {
    modalElem.classList.add('hide');
}

function clearForm() {
    botFormElem.reset();
}

function deleteBot(el) {
    const deletedDomItem = el.parentNode;
    deletedDomItem.remove();

    const deleteBotID = deletedDomItem.dataset.id;
    botList = botList.filter(el => el.id != deleteBotID);
}

function setModal(el) {
    const editedBotID = el.dataset.id;
    const targetBot = botList.find(el => el.id == editedBotID);

    titleField.value = targetBot.title;
    descriptionField.value = targetBot.description;
    dateField.value = targetBot.date;
    idField.value = targetBot.id;

    targetBotId = editedBotID;
}

function createNewBot() {
    const newBot = {
        title: titleField.value,
        description: descriptionField.value,
        file: fileField.value,
        date: dateField.value,
        id: Math.random()
    }

    botList.push(newBot);

    botListElem.innerHTML +=
        `<li class='botListItem' data-id=${newBot.id}>
            ${newBot.title}
            <span class="descriptionBot">${newBot.description}</span>
            <span class="deleteBot">&#215;</span>
        </li>`
}

function changeBot() {
    const changedDataItem = botList.find(el => el.id == targetBotId);

    changedDataItem.title = titleField.value;
    changedDataItem.description = descriptionField.value;
    changedDataItem.date = dateField.value;

    const changedBot = botListElem.querySelector(`li[data-id="${targetBotId}"]`);
    changedBot.innerHTML =
        `${changedDataItem.title}
        <span class="descriptionBot">${changedDataItem.description}</span>
        <span class="deleteBot">&#215;</span>`
}