import Backbone from 'backbone';
import HomeView from 'views/home';

const initializeApp = () => {
    Backbone.$(function() {
        // Create an instance of our view
        new HomeView();
    });
};

export default initializeApp;
