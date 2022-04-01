import { 
    checkAuth, 
    logout,
    getWorkshops,
    getParticipant,
    updateParticipant,
    deleteParticipant
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('edit-participant-form');
const nameEl = document.getElementById('name');
const selectEl = document.getElementById('workshop-select');
const deleteButton = document.getElementById('delete');

let participant = {};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    participant.name = data.get('name');
    participant.workshop_id = data.get('workshop');
    await updateParticipant(participant);
    form.reset();
    location.replace('../workshops');
});

deleteButton.addEventListener('click', async () => {
    await deleteParticipant(participant.id);
    location.replace('../workshops');
});

window.addEventListener('load', async () => {
    await renderWorkshopOptions();
    await displayParticipant();
});

async function renderWorkshopOptions() {
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const optionEl = document.createElement('option');
        optionEl.value = workshop.id;
        optionEl.textContent = workshop.topic;
        selectEl.append(optionEl);
    }
}

async function displayParticipant() {
    const data = new URLSearchParams(window.location.search);
    const participantId = data.get('id');
    const participantObj = await getParticipant(participantId);
    participant = participantObj;
    nameEl.value = participant.name;
    selectEl.value = participant.workshop_id;
    deleteButton.append(`${participant.name}`);
}

logoutButton.addEventListener('click', () => {
    logout();
});
