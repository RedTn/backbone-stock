import HomeView from 'views/home';

const initializeApp = () => {
    document.addEventListener(
        'DOMContentLoaded',
        function() {
            // Code to run when the DOM has loaded.
            new HomeView();
        },
        false
    );
};

export default initializeApp;
