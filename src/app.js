import Backbone from 'backbone';
import AppView from 'views/home';

const initializeApp = () => {
    Backbone.$(function() {
        // Create an instance of our view
        new AppView();
    });
};

export default initializeApp;
