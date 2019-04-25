import Backbone from 'backbone';
import HomeView from 'views/home';
import DetailsView from 'views/details';
import ErrorView from 'views/error';

export default Backbone.Router.extend({
    routes: {
        'details/:symbol': 'details',
        '': 'home',
        '*default': 'default'
    },

    home() {
        new HomeView();
    },

    details(symbol) {
        new DetailsView({ model: symbol });
    },

    default() {
        new ErrorView();
    }
});
