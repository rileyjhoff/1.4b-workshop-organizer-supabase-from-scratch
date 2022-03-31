import { 
    checkAuth, 
    logout,
    getWorkshops
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsEl = document.getElementById('workshops-container');

async function displayAllWorkshops() {
    workshopsEl.textContent = '';
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const workshopDiv = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        workshopDiv.classList.add('workshop');
        nameEl.classList.add('workshop-name');
        participantsEl.classList.add('participants');

        // nameEl.textContent = workshop;
        
        for (let participant of workshop.participants) {
            const anchor = document.createElement('a');
            const participantDiv = document.createElement('div');
            participantDiv.classList.add('participant');
            participantDiv.textContent = participant.name;
            anchor.href = `../edit-participant/?id=${participant.id}`;
            anchor.append(participantDiv);
            participantsEl.append(anchor);
        }
        workshopDiv.append(nameEl, participantsEl);
        workshopsEl.append(workshopDiv);
    }
}

window.addEventListener('load', displayAllWorkshops());

logoutButton.addEventListener('click', () => {
    logout();
});
