import { 
    checkAuth, 
    logout,
    getWorkshops,
    getParticipant,
    updateParticipant
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('edit-participant-form');
const nameEl = document.getElementById('name');
const selectEl = document.getElementById('workshop-select');

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
}

logoutButton.addEventListener('click', () => {
    logout();
});
