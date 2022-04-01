import { 
    checkAuth, 
    logout,
    createWorkshop,
    getCreatedWorkshops
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

window.addEventListener('load', async () => {
    const createdWorkshops = await getCreatedWorkshops();
    console.log(createdWorkshops);
    if (createdWorkshops.length > 0) {
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
    
            nameEl.textContent = workshop.topic;
            workshopDiv.append(nameEl, deleteButton);
            workshopsEl.append(workshopDiv);
        }
    }
});

logoutButton.addEventListener('click', () => {
    logout();
});
