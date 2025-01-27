function lookupHolidays() {
    const year = document.getElementById('yearInput').value;
    const countryCode = document.getElementById('countrySelect').value;

    fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`)
        .then(response => response.json())
        .then(data => {
            displayHolidays(data);
        })
        .catch(error => {
            console.error('Error fetching holidays:', error);
        });
}

function displayHolidays(holidays) {
    const holidayList = document.getElementById('holidayList');
    holidayList.innerHTML = '';

    holidays.forEach(holiday => {
        const listItem = document.createElement('li');
        listItem.classList.add('holiday-item');

        const date = document.createElement('div');
        date.textContent = `Date: ${holiday.date}`;

        const localName = document.createElement('div');
        localName.textContent = `Local Name: ${holiday.localName}`;

        const name = document.createElement('div');
        name.textContent = `Name: ${holiday.name}`;

        const fixed = document.createElement('div');
        fixed.textContent = `Fixed: ${holiday.fixed ? 'Yes' : 'No'}`;

        const global = document.createElement('div');
        global.textContent = `Global: ${holiday.global ? 'Yes' : 'No'}`;

        const types = document.createElement('div');
        types.textContent = `Type: ${holiday.types.join(', ')}`;

        listItem.appendChild(date);
        listItem.appendChild(localName);
        listItem.appendChild(name);
        listItem.appendChild(fixed);
        listItem.appendChild(global);
        listItem.appendChild(types);

        holidayList.appendChild(listItem);
    });

    // Show the holiday list
    holidayList.classList.remove('hidden');
}


