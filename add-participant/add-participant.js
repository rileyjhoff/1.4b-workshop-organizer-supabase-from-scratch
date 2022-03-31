import { 
    checkAuth, 
    logout,
    getWorkshops
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

// window.addEventListener('load', displayAllWorkshops());

logoutButton.addEventListener('click', () => {
    logout();
});
