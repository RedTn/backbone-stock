import base from './_base';
import template from 'templates/error';
import 'styles/error';

// Declare our options we'll use to extend the base view
const viewOptions = {
    template,

    async initialize() {
        this.render();
    },

    render() {
        this.$el.html(this.template());
        return this;
    }
};

// Export our extended view
export default base.extend(viewOptions);
