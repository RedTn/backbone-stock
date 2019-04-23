import $ from 'jquery';
import stockModel from 'models/stock';

const handleSubmit = context => {
    const symbolElement = $('#stock-input')[0];
    const { value: symbol } = symbolElement;
    if (symbol && typeof symbol === 'string') {
        const model = new stockModel();
        model.fetch({
            data: $.param({ symbol: symbol.toUpperCase() }),
            success: model => {
                context.collection.add(model);
            }
        });
    }
    symbolElement.value = '';
};

export default {
    handleSubmit
};
