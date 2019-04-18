import base from './_base';
import template from 'templates/home';
import 'styles/home';
import stockModel from 'models/stock';
import stockCollection from 'collections/stock';
import $ from 'jquery';

const initialStocks = ['SPLK', 'FTNT'];

// Declare our options we'll use to extend the base view
const viewOptions = {
    template,
    collection: [],

    async initialize() {
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
        this.collection = new stockCollection(resolvedModels);

        this.render();

        this.collection.on('add', this.render, this);
    },

    events: {
        'submit .stock-form': 'handleSubmit'
    },

    handleSubmit: function(event) {
        event.preventDefault();
        const symbolElement = $('#stock-input')[0];
        const { value: symbol } = symbolElement;
        if (symbol && typeof symbol === 'string') {
            const model = new stockModel();
            model.fetch({
                data: $.param({ symbol: symbol.toUpperCase() }),
                success: model => {
                    this.collection.add(model);
                }
            });
        }
        symbolElement.value = '';
    },

    render() {
        this.$el.html(this.template(this.collection));
        return this;
    }
};

// Export our extended view
export default base.extend(viewOptions);
