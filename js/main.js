const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search state.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/indian-cities-with-state.json');
    const stateData = await res.json();

    // Get Matches to current text input
    let matches = stateData.filter(stateDatam => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return stateDatam.name.match(regex) || stateDatam.state.match(regex);
    });
    if (searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }
    renderHTML(matches);
}

const renderHTML = matches => {
    if (matches.length > 0) {
        const HTML = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} <span class="text-success">[${match.state}]</span></h4>
                <small>Latitude: ${match.lat} / Longitude: ${match.lon}</small>
            </div>            
            `).join('');
            
            matchList.innerHTML = HTML;
            console.log(HTML);
    }
}


search.addEventListener('input', () => searchStates(search.value));