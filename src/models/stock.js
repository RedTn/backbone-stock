import Backbone from 'backbone';
import * as R from 'ramda';
import { API_KEY } from 'config/default';

const renameKeysWith = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(0, fn), R.toPairs(obj))));

export default Backbone.Model.extend({
    urlRoot: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${API_KEY}`,
    initialize() {
        this.on('invalid', (model, error) => {
            console.error(error);
        });
    },
    fetch(options) {
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    parse(data) {
        const { 'Global Quote': globalQuote = {} } = data || {};
        const model = renameKeysWith(R.drop(4), globalQuote);
        return model;
    },
    defaults: {
        symbol: '',
        name: '',
        price: '',
        change: ''
    }
});
