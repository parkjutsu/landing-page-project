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
const activeClass = 'your-active-class';
const sectionStyles = [];
let navItemStyle;
let scrollTimer = null;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Returns the corresponding navItem for a Section
const getNavFromSection = (section) => {
    const navItems = navList.getElementsByTagName('a');
    const index = section.id.replace('section','') - 1;
    return navItems[index];
}

const styleNavBar = () => {
    navList.style.backgroundColor = 'black';
    navList.style.padding = '0.75em';
    navList.style.color = 'white';
    navList.style.display = 'flex';
    navList.style.justifyContent = 'space-around';
    navList.style.alignItems = 'center';
    
    const navItems = navList.getElementsByTagName('a');
    for (const navItem of navItems) {
        navItem.style.color = 'white';
        navItem.style.textDecoration = 'none';

        // Initialize default navItem style
        if (!navItemStyle) {
            navItemStyle = navItem.style.cssText;
        }
    }
};

// Active section styling for border radius and box shadow taken from 
// Udacity homepage (udacity.com)
const styleActiveClass = () => {
    const section = document.querySelector(`.${activeClass}`);
    section.style.borderRadius = '8px';
    section.style.boxShadow = '0 0 4px 0 rgba(17,22,26,.16), 0 2px 4px 0 rgba(17,22,26,.08), 0 4px 8px 0 rgba(17,22,26,.08)';
    section.style.backgroundColor = 'rgba(0,0,0,0.5)';

    const navItem = getNavFromSection(section);
    navItem.style.color = '#cc1';
    navItem.style.borderBottom = '1px solid #cc1';
    navItem.style.paddingBottom = '0.75em';
};

const nearViewportTop = (element) => {
    const elementRect = element.getBoundingClientRect();
    const divider = window.innerHeight * 0.33;

    return divider >= elementRect.top && divider <= elementRect.bottom;
};

// Used to save the default styles of each section
const initSectionStyles = () => {
    let index = 0;
    for (const section of sections) {
        sectionStyles[index] = section.style.cssText;
        index++;
    }
};

// Based off of an answer from Stack Overflow 
// (https://stackoverflow.com/questions/4620906/how-do-i-know-when-ive-stopped-scrolling)
const styleAfterScrolling = () => {
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(styleActiveClass, 10);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
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
const addActiveClass = () => {
    let activeSection;

    // Get section that is near top of viewport
    for (const section of sections) {
        if (nearViewportTop(section)) {
            activeSection = section;
            break;
        }
    }

    // Remove 'active' class from previous section and add
    // to current active section
    if (activeSection && !activeSection.classList.contains(activeClass)) {
        let index = 0;
        for (const section of sections) {
            if (section.classList.contains(activeClass)) {
                // Set section style to default
                section.style.cssText = sectionStyles[index];
                section.classList.remove(activeClass);

                // Set navItem style to default
                getNavFromSection(section).style.cssText = navItemStyle;
            }
            index++;
        }
        activeSection.classList.add(activeClass);
    }
    styleAfterScrolling();
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
styleNavBar();

// Scroll to section on link click
navList.addEventListener('click', scrollToAnchor);

// Set sections as active
initSectionStyles();
styleActiveClass();
document.addEventListener('scroll', addActiveClass);