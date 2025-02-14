import { HelperOptions, registerHelper } from 'handlebars';

registerHelper('if_equal', function (first: unknown, second: unknown, options: HelperOptions) {
    if (first === second) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
