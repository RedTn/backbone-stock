import Backbone from 'backbone';
import * as R from 'ramda';
import { API_KEY } from 'config/default';
import Computed from 'backbone-computed-properties';

const renameKeysWith = R.curry((fn, obj) => R.fromPairs(R.map(R.adjust(0, fn), R.toPairs(obj))));

export default Backbone.Model.extend({
    urlRoot: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${API_KEY}`,
    initialize() {
        this.on('invalid', (model, error) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    },
    parse(data) {
        const { 'Global Quote': globalQuote = {} } = data || {};
        const model = renameKeysWith(R.drop(4), globalQuote);
        return model;
    },
    positiveChange: Computed('change', function() {
        return Math.sign(parseInt(this.get('change'))) === 1;
    }),
    defaults: {
        change: '',
        'change percent': '',
        high: '',
        'latest trading day': '',
        low: '',
        name: '',
        open: '',
        'previous close': '',
        price: '11',
        symbol: '',
        volume: ''
    }
});
