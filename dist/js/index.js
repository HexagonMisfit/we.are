$(function () {

    /***********/
    /* Theming */
    /***********/
    var brandColors = {
        magentaLight: 0xFF0066,
        magentaDark: 0xB21252,
        blueLight: 0x14ACCC,
        blueDark: 0x0995B2,
        brightYellow: 0xFFE919,
        nearWhite: 0xfafafa,
        nearBlack: 0x060606
    }
    /**********************************************************************/
    /* THREE.JS code initialize scene, draw basic floating blueLight cube */
    /**********************************************************************/
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xFFFFFF);

    // Cube
    // TODO: make a cool geometry and animate it. Maybe an extruded hexagon with a cloud-ring of cubes orbiting it.

    var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.blueLight });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);

    var loader = new THREE.ColladaLoader();
    loader.load('../assets/3d_models/hexagon.dae', function(hexagon) {
        console.log('debug hexagon', hexagon);
    })

    cube.rotation.x = 0.5;
    cube.rotation.y = 0.5;

    // Background plane

    var planeGeometry = new THREE.PlaneGeometry(50, 50, 32);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.magentaLight, side: THREE.DoubleSide });
    var pinkPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    pinkPlane.position.z = -10;
    pinkPlane.name = '0';

    scene.add(pinkPlane);

    // Camera

    camera.position.z = 5;

    // Animate the scene

    var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.001;
        renderer.render(scene, camera);
    };

    animate();

    // Draw it on a canvas fixed behind everything in the site

    $('canvas').addClass('fixed-canvas');

    /**************/
    /* UI Stuff */
    /**************/

    // Check if user is using iPhone; if so, use iOS default scrolling behavior for now
    // TODO: Dopify mobile experience by 50%

    function isMobile() {
        var Uagent = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(Uagent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(Uagent.substr(0, 4)));
    };

    /**************/
    /* Navigation */
    /**************/

    // Store info about the various pages. This will be a single page application, 
    // so all pages except for the active one will need to be hidden.

    var pages = {
        home: {
            sections: ['hero', 'contact'],
            name: 'home'
        },
        work: {
            sections: ['project1'],
            name: 'work'
        },
        team: {
            sections: ['team'],
            name: 'team'
        },
        vr: {
            sections: ['vr'],
            name: 'vr'
        }
    };

    var activePage = pages.home;

    var viewSection = 0;
    var backgroundPlane;

    _.forIn(pages, function (page) {
        TweenMax.to($('#' + page.name + '-container'), 0, { autoAlpha: 0 });
        TweenMax.to('.navigation', 0.25, { autoAlpha: 1, ease: Power3.easeIn });
        TweenMax.to($('#' + activePage.name + '-container'), 0.25, { autoAlpha: 1, ease: Power3.easeIn });
        TweenMax.to($('#' + activePage.name + '-button'), 0.1, { className: '+= nav-link-active' })
    });

    // Navigate between pages and animate page transitions

    function navigateTo(name) {
        var navArray = _.keys(pages);

        removeActiveNavClass(activePage.name);

        var currentPageContainer = $('#' + activePage.name + '-container');
        var nextPageContainer = $('#' + name + '-container');

        console.log('currentPageContainer', currentPageContainer);
        console.log('nextPageContainer', nextPageContainer);

        // Determine index of active page and next page in navArray. 

        // If index of next page > index of active page, 
        // set next page's autoAlpha to 1, set its position to right of current page, and slide it into view

        if (_.indexOf(navArray, name) > _.indexOf(navArray, activePage.name)) {
            TweenMax.to(nextPageContainer, 0.1, { xPercent: '100', autoAlpha: 1 });
            TweenMax.staggerTo([currentPageContainer, nextPageContainer], 0.75, { xPercent: '-=100', ease: Power2.easeInOut }, 0);
            TweenMax.to(currentPageContainer, 1, { autoAlpha: 0, ease: Power4.easeIn })
        }

        // If index of next page < index of active page, do the converse

        if (_.indexOf(navArray, name) < _.indexOf(navArray, activePage.name)) {
            TweenMax.to(nextPageContainer, 0.1, { xPercent: '-100', autoAlpha: 1 });
            TweenMax.staggerTo([currentPageContainer, nextPageContainer], 0.75, { xPercent: '+=100', ease: Power2.easeInOut }, 0);
            TweenMax.to(currentPageContainer, 1, { autoAlpha: 0, ease: Power4.easeIn })
        }

        // Set active page to next page and we're done!

        activePage = pages[name];

    }

    var navLink = $('.nav-link');

    function removeActiveNavClass(name) {
        TweenMax.to($('#' + name + '-button'), 0.5, { className: '-= nav-link-active' });
    }

    navLink.hover(function () {

        console.log('hover this', this);

        if (this.id !== activePage.name + '-button') {
            TweenMax.to(this, 0.3, {
                className: '+= nav-link-active'
            });
        }
    }, function () {
        if (this.id !== activePage.name + '-button') {
            TweenMax.to(this, 0.3, {
                className: '-= nav-link-active'
            });
        }
    });

    navLink.click(function () {
        console.log('clicked navLink', this.id);

        if (this.id === 'home-button') {
            navigateTo('home');
        }
        if (this.id === 'work-button') {
            navigateTo('work');
        }
        if (this.id === 'team-button') {
            navigateTo('team');
        }
        if (this.id === 'vr-button') {
            navigateTo('vr');
        }

        TweenMax.to(this, 0.2, {
            className: '-= nav-link-clicked'
        });
    });

    navLink.mousedown(function() {
        TweenMax.to(this, 0.1, {className: '+= nav-link-clicked'});
    });

    navLink.mouseup(function() {
        TweenMax.to(this, 0.1, {className: '-= nav-link-clicked'});
    });

    // navLink.bind('touchstart',
    //     function (event) {
    //         event.preventDefault();
    //         TweenMax.to(this, 0.1, {
    //             backgroundColor: brandColors.nearWhite,
    //             color: brandColors.magentaLight,
    //         });
    //     }).bind('touchend', function () {
    //         TweenMax.to(this, 0.3, {
    //             color: brandColors.nearWhite,
    //             backgroundColor: 'rgba(0,0,0,0)',
    //             borderBottom: 'none'
    //         });
    //     });

    /**********************/
    /* Home page UI stuff */
    /**********************/

    function homeScrollToSection() {
        TweenMax.to('#home-container', 0.75, { scrollTo: { y: "#" + viewSection.toString(), autoKill: false }, ease: Power3.easeOut });
    }

    function homeNextSection() {
        if (viewSection < activePage.sections.length - 1) {
            viewSection++;
            homeScrollToSection();
        }
    }

    function homePrevSection() {
        if (viewSection > 0) {
            viewSection--;
            homeScrollToSection();
        }
    }

    $('#home-container').on('wheel', _.throttle(function (event) {

        console.log('debug wheel event', event);
        if (event.originalEvent.deltaY > 0) {
            console.log('next');
            homeNextSection();
        } else if (event.originalEvent.deltaY < 0) {
            console.log('prev');
            homePrevSection();
        }
    }, 200));

    $(window).on('keydown', _.throttle(function (event) {

        //TODO: Figure out capturing keydown input for different pages, i.e. not on window object

        if (activePage.name === 'home') {
            if (event.keyCode === 40) {
                nextSection();
            } else if (event.keyCode === 38) {
                prevSection();
            }
        } else {

            //Disable key-based scrolling on pages other than home for now

            event.preventDefault();
        }
    }, 200));

});