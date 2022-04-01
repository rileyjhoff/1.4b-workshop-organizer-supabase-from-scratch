import { 
    checkAuth, 
    logout,
    createWorkshop,
    getCreatedWorkshops,
    deleteWorkshop,
    getParticipantsByWorkshop,
    updateParticipantWorkshop,
    deleteParticipant,
    createNullParticipant
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('add-workshop-form');
const workshopsContainer = document.getElementById('created-workshops-container');
const workshopsEl = document.getElementById('created-workshops');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    await createWorkshop(data.get('topic'));
    form.reset();
    location.replace('../workshops');
});

document.addEventListener('click', async (e) => {
    if (e.target.id === 'delete') {
        if (confirm(`Are you sure you want to delete ${e.path[1].firstChild.textContent}?`)) {
            const workshopId = e.path[1].id;
            const participantsNeedingAHome = await getParticipantsByWorkshop(workshopId);
            for (let participant of participantsNeedingAHome) {
                await createNullParticipant(participant.name);
                await deleteParticipant(participant.id);
            }
            await deleteWorkshop(workshopId);
            location.reload();
        }
    }
});

window.addEventListener('load', async () => {
    const createdWorkshops = await getCreatedWorkshops();
    console.log(createdWorkshops);
    if (createdWorkshops.length > 0) {
        workshopsContainer.classList.remove('hide');
        const deleteWorkshopsHeader = document.createElement('h1');
        deleteWorkshopsHeader.textContent = 'Delete Created Workshops:';
        workshopsContainer.prepend(deleteWorkshopsHeader);
        for (let workshop of createdWorkshops) {
            const workshopDiv = document.createElement('div');
            const nameEl = document.createElement('h3');
            const deleteButton = document.createElement('button');
    
            workshopDiv.classList.add('delete-workshop');
            workshopDiv.id = workshop.id;
            nameEl.classList.add('workshop-name');
            deleteButton.textContent = 'Delete';
            deleteButton.id = 'delete';
    
            nameEl.textContent = workshop.topic;
            workshopDiv.append(nameEl, deleteButton);
            workshopsEl.append(workshopDiv);
        }
    }
});

logoutButton.addEventListener('click', () => {
    logout();
});
