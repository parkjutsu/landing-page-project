/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    const docFrag = document.createDocumentFragment();

    for (const section of sections) {
        const navItem = document.createElement('li');
        const anchor = document.createElement('a');

        anchor.href = `#${section.id}`;
        anchor.innerText = section.dataset.nav;
        // Using HTML data-* attribute to store section id
        anchor.dataset.id = section.id;

        navItem.appendChild(anchor);
        docFrag.appendChild(navItem);
    }
    navList.appendChild(docFrag);
};

// Add class 'active' to section when near top of viewport
const addActiveClass = (activeSection) => {
    // const listOfClasses = section.classList;

    // sections.forEach(section => {
    //     if (!listOfClasses.contains('active')) {
    //         listOfClasses.add('active');
    //     }
    // });
};

// Scroll to anchor ID using scrollTO event
const scrollToAnchor = (event) => {
    if (event.target.nodeName === 'A') {
        event.preventDefault();
        
        const anchorElement = document.getElementById(event.target.dataset.id);
        anchorElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
navList.addEventListener('click', scrollToAnchor);

// Set sections as active


