import { 
    checkAuth, 
    logout,
    getWorkshops,
    getNullParticipants,
    updateParticipantWorkshop
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
            anchor.dataset.id = participant.id;
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
            anchor.dataset.id = participant.id;
            anchor.append(participantDiv);
            participantsEl.append(anchor);
        }
        workshopDiv.append(nameEl, participantsEl);
        workshopsEl.append(workshopDiv);
    }
}

window.addEventListener('load', async () => {
    await displayAllWorkshops();
});

logoutButton.addEventListener('click', () => {
    logout();
});


let dragged;
let dragWorkshopId;
let dropzone;
let dragParticipantId;

/* events fired on the draggable target */
document.addEventListener('drag', () => {

}, false);

document.addEventListener('dragstart', (e) => {
    // store a ref. on the dragged elem
    if (e.target.tagName === 'A') {
        dragged = e.target;
    } else {
        dragged = e.path[2];
    }
    dragParticipantId = dragged.dataset.id;
    // make it half transparent
    dragged.style.opacity = .5;
}, false);

document.addEventListener('dragend', () => {
    // reset the transparency
    dragged.style.opacity = '';
    dropzone.style.background = '';
    dropzone.style.opacity = '';
}, false);

/* events fired on the drop targets */
document.addEventListener('dragover', (e) => {
    // prevent default to allow drop
    e.preventDefault();
}, false);

document.addEventListener('dragenter', (e) => {
    // highlight potential drop target when the draggable element enters it
    if (e.target.className === 'workshop' && e.target.id !== dragWorkshopId) {
        dragWorkshopId = e.target.id;
        const dropzones = document.querySelectorAll('.workshop');
        for (let clearDropzone of dropzones) {
            clearDropzone.style.background = '';
            clearDropzone.style.opacity = '';
        }
        dropzone = document.getElementById(dragWorkshopId);
        dropzone.style.background = 'green';
        dropzone.style.opacity = 0.8;
        console.log(dragWorkshopId);
    }
    if (e.path[1].className === 'workshop' && e.path[1].id !== dragWorkshopId) {
        dragWorkshopId = e.path[1].id;
        const dropzones = document.querySelectorAll('.workshop');
        for (let clearDropzone of dropzones) {
            clearDropzone.style.background = '';
            clearDropzone.style.opacity = '';
        }
        dropzone = document.getElementById(dragWorkshopId);
        dropzone.style.background = 'green';
        dropzone.style.opacity = 0.8;
        console.log(dragWorkshopId);
    }
}, false);

document.addEventListener('drop', async (e) => {
    // prevent default action (open as link for some elements)
    e.preventDefault();
    // move dragged elem to the selected drop target
    dropzone.lastChild.append(dragged);
    await updateParticipantWorkshop(dragParticipantId, dragWorkshopId);
}, false);