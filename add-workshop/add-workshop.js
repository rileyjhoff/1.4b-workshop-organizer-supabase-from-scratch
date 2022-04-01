import { 
    checkAuth, 
    logout,
    createWorkshop
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('add-workshop-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    await createWorkshop(data.get('topic'));
    form.reset();
    location.replace('../workshops');
});

logoutButton.addEventListener('click', () => {
    logout();
});
