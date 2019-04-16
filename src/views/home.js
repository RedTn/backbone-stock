import base from './_base';
import home from 'templates/home';
import 'styles/home';

// Declare our options we'll use to extend the base view
const viewOptions = {
    template: home,

    initialize() {
        this.render();
    },

    render() {
        this.$el.html(this.template());
    }
};

// Export our extended view
export default base.extend(viewOptions);
