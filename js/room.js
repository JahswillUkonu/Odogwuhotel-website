// Description: JavaScript code for the room.html page.
// Used in: room.html
//nav bar behavior
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.style.top = '-60px'; // Adjust the value based on your navbar height
    } else {
        // Scroll up
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

//end of nav bar behavior




document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Show or hide the button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    // Scroll back to the top when the button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const button = document.querySelector('#btn')
const iframe = document.querySelector('iframe')
button.addEventListener('click', () => {
    const divbox = document.querySelector('iframe')
    if (divbox.classList.toggle('map')) {
        iframe.style.display = 'none';
    } else {
        iframe.style.display = 'flex';
    }

})

// ================= CHECK AVAILABILITY FORM =================
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');
    const checkBtn = document.getElementById('checkAvailability');
    const resultBox = document.getElementById('availabilityResult');

    if (!checkBtn) return; // guard in case markup changes

    // Prevent picking a check-in date in the past
    const todayStr = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', todayStr);

    checkinInput.addEventListener('change', () => {
        checkoutInput.setAttribute('min', checkinInput.value);
    });

    function showResult(message, isError) {
        resultBox.textContent = message;
        resultBox.classList.remove('form-result--success', 'form-result--error');
        resultBox.classList.add(isError ? 'form-result--error' : 'form-result--success');
    }

    checkBtn.addEventListener('click', function() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = parseInt(guestsInput.value, 10);

        if (!checkin || !checkout) {
            showResult('Please select both a check-in and check-out date.', true);
            return;
        }

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const today = new Date(todayStr);

        if (checkinDate < today) {
            showResult('Check-in date cannot be in the past.', true);
            return;
        }

        if (checkoutDate <= checkinDate) {
            showResult('Check-out date must be after the check-in date.', true);
            return;
        }

        if (!guests || guests < 1 || guests > 10) {
            showResult('Please enter a number of guests between 1 and 10.', true);
            return;
        }

        const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

        showResult(
            `Great news! Rooms are available for ${guests} guest${guests > 1 ? 's' : ''} over ${nights} night${nights > 1 ? 's' : ''}. Choose a room below to complete your reservation.`,
            false
        );

        // Guide the user to the room options
        const roomContainer = document.querySelector('.room-container');
        if (roomContainer) {
            roomContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});