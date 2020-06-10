import { registerHelper } from 'handlebars';

import { ENumberTypes } from '../../types';

registerHelper('defaultValue', function (field) {
    if (field.type === 'string') {
        return '""';
    }

    if (field.type === 'bool') {
        return 'false';
    }

    if (field.type === 'bytes') {
        return 'new Uint8Array(0)';
    }

    if (field.type in ENumberTypes || field.options.enum) {
        return '0';
    }

    // Map
    if (field.keyType) {
        return '{}';
    }

    // Default
    return 'null';
});
