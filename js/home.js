// Description: JavaScript code for the index.html page.
// Used in: index.html
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

//js code for the dining section
// Used in: index.html
document.addEventListener('DOMContentLoaded', function() {
    const diningSection = document.getElementById('dining');
    const diningBackground = document.querySelector('.DiningBackground');
    const diningBackground2 = document.querySelector('.DiningBackground2');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVisibility() {
        if (isElementInViewport(diningSection)) {
            diningBackground.style.animationPlayState = 'running';
            diningBackground2.style.animationPlayState = 'running';
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility(); // Initial check
});

//code for map
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