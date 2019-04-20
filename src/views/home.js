import base from './_base';
import template from 'templates/home';
import 'styles/home';
import stockModel from 'models/stock';
import stockCollection from 'collections/stock';
import $ from 'jquery';
import { debounce } from 'debounce';

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
        this.collection.on('add', this.render, this);

        this.render();
    },

    events: {
        'submit .stock-form': 'handleSubmit',
        'keypress .stock-form': 'handleKeyPress'
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

    handleKeyPress: debounce(function() {}, 300),

    render() {
        this.$el.html(this.template(this.collection));
        return this;
    }
};

// Export our extended view
export default base.extend(viewOptions);
