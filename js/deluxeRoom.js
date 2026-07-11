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


//CODE FOR FULLCALENDAR
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [{
                title: 'Available',
                start: '2025-03-14',
                end: '2025-03-16'
            },
            {
                title: 'Booked',
                start: '2025-03-17',
                end: '2025-03-20',
                color: 'red' // Change color for booked dates
            }
        ]
    });

    calendar.render();
});

//end of fullcalendar code

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