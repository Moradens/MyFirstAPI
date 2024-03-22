const api = "https://swapi.dev/api/people";
async function getPeople() {
        const response = await fetch(api);
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to fetch data');
}
async function displayPeople() {
    const loadDataButton = document.getElementById('loadDataButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadDataButton.disabled = true;
    loadingIndicator.style.display = 'block';
    try {
        const data = await getPeople();
        if (data) {
            data.results.forEach(person => appendCard(person));
        }
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.innerText = 'Chyba při načítání dat.';
        document.querySelector('.content').appendChild(errorMessage);
    } finally {
        loadDataButton.disabled = false;
        loadingIndicator.style.display = 'none';
    }
}
function appendCard(person) {
    const card = document.createElement('div');
    card.innerText = person.name;
    const list = document.querySelector('.content');
    list.appendChild(card);
}
document.getElementById('loadDataButton').addEventListener('click', displayPeople);