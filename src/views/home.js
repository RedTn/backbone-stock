import base from './_base';
import template from 'templates/home';
import 'styles/home';
import stockModel from 'models/stock';
import stockCollection from 'collections/stock';
import { debounce } from 'debounce';
import param from 'jquery-param';
import Backbone from 'backbone';
import nativeAjax from 'backbone.nativeajax';

Backbone.ajax = nativeAjax;

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
                    data: param({ symbol }),
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
        return import(/* webpackChunkName: "home.lazy" */ './home.lazy').then(
            ({ default: { handleSubmit } }) => {
                return handleSubmit(this);
            }
        );
    },

    handleKeyPress: debounce(function() {}, 300),

    render() {
        this.el.innerHTML = this.template(this.collection);
        return this;
    }
};

// Export our extended view
export default base.extend(viewOptions);
