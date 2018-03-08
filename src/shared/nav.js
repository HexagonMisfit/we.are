/**************/
/* Navigation */
/**************/

function navigateTo(position) {
    //transition out of current page and navigate to other pages
}

var navLink = $('.nav-link');

function addActiveNavClass(element) {
    element.addClass('nav-link-active');
}

function removeActiveNavClass(element) {
    element.removeClass('nav-link-active');
}

navLink.click(function () {

    if (this.id === 'home-button') {
        navigateTo('home');
    }
    if (this.id === 'work-button') {
        navigateTo('work');
    }
    if (this.id === 'team-button') {
        navigateTo('team');
    }
    if (this.id === 'contact-button') {
        navigateTo('contact');
    }
});