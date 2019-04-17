import Backbone from 'backbone';
import stock from 'models/stock';

export default Backbone.Collection.extend({
    model: stock
});
