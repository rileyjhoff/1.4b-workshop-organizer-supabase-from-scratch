import { 
    checkAuth, 
    logout,
    getWorkshops,
    getNullParticipants
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
        workshopDiv.id = workshop.id;
        nameEl.classList.add('workshop-name');
        participantsEl.classList.add('participants');

        nameEl.textContent = workshop.topic;
        
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
    const participantsNeedingWorkshop = await getNullParticipants();
    if (participantsNeedingWorkshop.length > 0) {
        const workshopDiv = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        workshopDiv.classList.add('workshop');
        workshopDiv.id = 0;
        nameEl.classList.add('workshop-name');
        participantsEl.classList.add('participants');

        nameEl.textContent = 'Need New Workshop';
        for (let participant of participantsNeedingWorkshop) {
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

window.addEventListener('load', async () => {
    const participants = await getNullParticipants();
    console.log(participants);
    displayAllWorkshops();
});

logoutButton.addEventListener('click', () => {
    logout();
});
