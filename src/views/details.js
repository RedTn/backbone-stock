import base from './_base';
import template from 'templates/details';
import $ from 'jquery';
import stockModel from 'models/stock';
import 'styles/details';

// Declare our options we'll use to extend the base view
const viewOptions = {
    template,

    async initialize() {
        this.render();
    },

    async render() {
        const model = new stockModel();
        const resolvedModel = await new Promise(resolve => {
            model.fetch({
                data: $.param({ symbol: this.model }),
                success: model => {
                    resolve(model);
                }
            });
        });
        this.$el.html(this.template(resolvedModel));
        return this;
    }
};

// Export our extended view
export default base.extend(viewOptions);
