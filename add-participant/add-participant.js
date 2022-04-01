import { 
    checkAuth, 
    logout,
    getWorkshops,
    createParticipant
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('add-participant-form');
const selectEl = document.getElementById('workshop-select');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const participant = {
        name: data.get('name'),
        workshop_id: data.get('workshop')
    };
    await createParticipant(participant);
    form.reset();
    location.replace('../workshops');
});

window.addEventListener('load', renderWorkshopOptions());

async function renderWorkshopOptions() {
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const optionEl = document.createElement('option');
        optionEl.value = workshop.id;
        optionEl.textContent = workshop.topic;
        selectEl.append(optionEl);
    }
}

logoutButton.addEventListener('click', () => {
    logout();
});
