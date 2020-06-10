import { registerHelper } from 'handlebars';

registerHelper('comment', function () {
    if (this.comment) {
        return `// ${this.comment.replace(/\n/g, '\n// ')}`;
    }
});
