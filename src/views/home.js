import base from './_base';
import home from 'templates/home';
import 'styles/home';
import stockModel from 'models/stock';
import stockCollection from 'collections/stock';
import $ from 'jquery';

const initialStocks = ['MSFT', 'SPLK', 'FTNT'];

// Declare our options we'll use to extend the base view
const viewOptions = {
    template: home,

    initialize() {
        this.render();
    },

    async render() {
        const promises = initialStocks.map(symbol => {
            const model = new stockModel();
            return new Promise(resolve => {
                model.fetch({
                    data: $.param({ symbol }),
                    success: model => {
                        resolve(model);
                    }
                });
            });
        });
        const resolvedModels = await Promise.all(promises);
        const collection = new stockCollection(resolvedModels);
        this.$el.html(this.template(collection));
    }
};

// Export our extended view
export default base.extend(viewOptions);
