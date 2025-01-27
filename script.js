function lookupHolidays() {
    const year = document.getElementById('yearInput').value;
    const countryCode = document.getElementById('countrySelect').value;
    const loading = document.getElementById('loading');
    const holidayList = document.getElementById('holidayList');

    // Input validation
    if (!year || !countryCode) {
        showError('Please enter both a year and select a country');
        return;
    }

    // Show loading state
    loading.classList.remove('hidden');
    loading.classList.add('visible');
    holidayList.classList.add('hidden');

    fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch holidays');
            }
            return response.json();
        })
        .then(data => {
            displayHolidays(data);
        })
        .catch(error => {
            showError('Error fetching holidays. Please try again later.');
            console.error('Error:', error);
        })
        .finally(() => {
            loading.classList.remove('visible');
            loading.classList.add('hidden');
        });
}

function displayHolidays(holidays) {
    const holidayList = document.getElementById('holidayList');
    holidayList.innerHTML = '';

    if (holidays.length === 0) {
        showError('No holidays found for the selected year and country');
        return;
    }

    holidays.forEach(holiday => {
        const listItem = document.createElement('li');
        listItem.classList.add('holiday-item');

        const date = new Date(holiday.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        listItem.innerHTML = `
            <div class="holiday-date">${formattedDate}</div>
            <div class="holiday-name">${holiday.name}</div>
            <div class="holiday-details">
                <div>
                    <i class="fas fa-globe"></i>
                    Local Name: ${holiday.localName}
                </div>
                <div>
                    <i class="fas fa-thumbtack"></i>
                    Fixed Date: ${holiday.fixed ? 'Yes' : 'No'}
                </div>
                <div>
                    <i class="fas fa-map-marker-alt"></i>
                    Global: ${holiday.global ? 'Yes' : 'No'}
                </div>
            </div>
            <div class="holiday-types">
                ${holiday.types.map(type => `<span class="holiday-tag">${type}</span>`).join('')}
            </div>
        `;

        holidayList.appendChild(listItem);
    });

    // Show the holiday list with animation
    holidayList.classList.remove('hidden');
    setTimeout(() => {
        holidayList.classList.add('visible');
    }, 10);
}

function showError(message) {
    const holidayList = document.getElementById('holidayList');
    holidayList.innerHTML = `
        <li class="holiday-item" style="text-align: center; color: #ef4444;">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </li>
    `;
    holidayList.classList.remove('hidden');
    holidayList.classList.add('visible');
}

// Initialize the current year in the input field
document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('yearInput');
    yearInput.value = new Date().getFullYear();
});

// Handle Enter key press
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        lookupHolidays();
    }
});