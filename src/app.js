import Backbone from 'backbone';
import router from 'routes/router';

const initializeApp = () => {
    new router();
    Backbone.history.start();
};

export default initializeApp;
