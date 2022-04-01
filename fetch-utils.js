const SUPABASE_URL = 'https://zhmowgcybteqgiwwrxln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobW93Z2N5YnRlcWdpd3dyeGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTQ2NjYsImV4cCI6MTk2MzU3MDY2Nn0.e8IeeowEcZ9C7aazuyONAepUhFvdOgDSLq8EKRJWwls';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getWorkshops() {
    const response = await client
        .from('workshops')
        .select('*, participants (*)')
        .order('topic', { ascending: true });

    return checkError(response);
}

export async function getCreatedWorkshops() {
    const user = await getUser();
    const response = await client
        .from('workshops')
        .select('*')
        .order('topic', { ascending: true })
        .match({ user_id:user.id });

    return checkError(response);
}

export async function createWorkshop(topic) {
    const response = await client
        .from('workshops')
        .insert({ topic });

    return checkError(response);
}

export async function createParticipant(participant) {
    const response = await client
        .from('participants')
        .insert(participant);

    return checkError(response);
}

export async function createNullParticipant(name) {
    const response = await client
        .from('participants')
        .insert({ name });

    return checkError(response);
}

export async function updateParticipant(participant) {
    const response = await client
        .from('participants')
        .update(participant)
        .match({ id: participant.id });

    return checkError(response);
}

export async function updateParticipantWorkshop(participant) {
    const response = await client
        .from('participants')
        .update({ workshop_id: 'NULL' })
        .match({ id: participant.id });

    return checkError(response);
}

export async function getParticipant(id) {
    const response = await client
        .from('participants')
        .select()
        .match({ id })
        .single();

    return checkError(response);
}

export async function getParticipantsByWorkshop(workshopId) {
    const response = await client
        .from('participants')
        .select()
        .match({ workshop_id:workshopId });

    return checkError(response);
}

export async function deleteParticipant(id) {
    const response = await client
        .from('participants')
        .delete()
        .match({ id });

    return checkError(response);
}

export async function deleteWorkshop(id) {
    const response = await client
        .from('workshops')
        .delete()
        .match({ id });

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
