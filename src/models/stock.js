import Backbone from 'backbone';

export default Backbone.Model.extend({
    urlRoot: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo',
    initialize() {
        this.on('invalid', (model, error) => {
            console.error(error);
        });
    },
    fetch(options) {
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    parse(data) {
        console.warn(data);
    },
    defaults: {
        symbol: '',
        name: '',
        price: '',
        change: ''
    }
});
