import { 
    checkAuth, 
    logout,
    getWorkshops
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('add-participant-form');
const nameEl = document.getElementById('name');
const selectEl = document.getElementById('workshop-select');



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
