import param from 'jquery-param';
import stockModel from 'models/stock';

const handleSubmit = context => {
    const symbolElement = document.getElementById('stock-input');
    const { value: symbol } = symbolElement;
    if (symbol && typeof symbol === 'string') {
        const model = new stockModel();
        model.fetch({
            data: param({ symbol: symbol.toUpperCase() }),
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
