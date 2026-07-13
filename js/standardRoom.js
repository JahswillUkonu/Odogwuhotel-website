//code from standardRoom.html

//code for carousel
// let currentSlide = 0;

// function moveSlide(direction) {
//     const slides = document.querySelectorAll('.carousel-slide img');
//     const totalSlides = slides.length;
//     currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
//     const carouselContainer = document.querySelector('.carousel-container');
//     carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
// }
//end of carousel code

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


// ================= RESERVE NOW FUNCTIONALITY =================
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const reserveBtn = document.getElementById('reserveBtn');
    const resultBox = document.getElementById('reservationResult');

    if (!reserveBtn) return; // guard in case markup changes

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

    reserveBtn.addEventListener('click', function() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const adults = parseInt(adultsInput.value, 10);
        const children = childrenInput.value ? parseInt(childrenInput.value, 10) : 0;
        const roomName = reserveBtn.getAttribute('data-room-name');
        const pricePerNight = parseFloat(reserveBtn.getAttribute('data-room-price'));

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

        if (!adults || adults < 1) {
            showResult('Please enter at least 1 adult.', true);
            return;
        }

        if (children < 0) {
            showResult('Number of children cannot be negative.', true);
            return;
        }

        const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        const total = (nights * pricePerNight).toFixed(2);

        showResult(
            `Reservation confirmed: ${roomName} for ${adults} adult${adults > 1 ? 's' : ''}${children > 0 ? ` and ${children} child${children > 1 ? 'ren' : ''}` : ''}, ${nights} night${nights > 1 ? 's' : ''} (${checkin} to ${checkout}). Estimated total: $${total}.`,
            false
        );
    });
});

//back to top button

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