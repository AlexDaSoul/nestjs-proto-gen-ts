import { registerHelper } from 'handlebars';

registerHelper('uncapitalize', function (conditional) {
    return conditional[0].toLowerCase() + conditional.slice(1);
});
