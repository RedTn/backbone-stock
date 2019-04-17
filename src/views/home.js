import base from './_base';
import home from 'templates/home';
import 'styles/home';
import model from 'models/stock';
import $ from 'jquery';

//const initialStocks = ['MSFT', 'SPLK', 'FTNT'];

// Declare our options we'll use to extend the base view
const viewOptions = {
    template: home,

    initialize() {
        this.render();
    },

    render() {
        const myModel = new model();
        myModel.fetch({
            data: $.param({ symbol: 'MSFT' }),
            success: model => {
                this.$el.html(this.template(model.toJSON()));
                console.log(model);
            }
        });
    }
};

// Export our extended view
export default base.extend(viewOptions);
