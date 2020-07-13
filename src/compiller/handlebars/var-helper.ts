import { registerHelper } from 'handlebars';

registerHelper('var', function (varName, varValue, options) {
    options.data.root[varName] = varValue;
});
