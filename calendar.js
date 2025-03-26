document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const monthYearDisplay = document.getElementById('current-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const currentTimeDisplay = document.getElementById('current-time');

    // Current date tracking
    let currentDate = new Date();

    // Function to update the calendar
    function updateCalendar() {
        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Get current month details
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month and year display
        monthYearDisplay.textContent = currentDate.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Get first and last day of the month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Determine starting day of the week
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Add empty cells for days before the first day
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'other-month');
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('calendar-day');

            // Check if this is today's date
            const checkDate = new Date(year, month, day);
            const today = new Date();
            if (checkDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    // Function to update current time
    function updateCurrentTime() {
        const now = new Date();
        currentTimeDisplay.textContent = now.toLocaleTimeString();
    }

    // Event listeners for month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Initial calendar setup
    updateCalendar();

    // Update time immediately and then every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});
