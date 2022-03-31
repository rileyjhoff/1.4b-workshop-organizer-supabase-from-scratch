import { 
    checkAuth, 
    logout,
    getWorkshops
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const workshopsEl = document.getElementById('workshops-container');

window.addEventListener('load', async () => {
    const workshops = await getWorkshops();
    console.log(workshops);
});

logoutButton.addEventListener('click', () => {
    logout();
});
