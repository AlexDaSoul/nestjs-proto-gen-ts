import { registerHelper } from 'handlebars';

import { EGoogleTypes, ENumberTypes } from '../../types';

const KNOWN_PREFIX = 'google.protobuf.';

function jsType(protoType: string): string {
    if (protoType === 'string') {
        return 'string';
    }

    if (protoType === 'bool') {
        return 'boolean';
    }

    if (protoType === 'bytes') {
        return 'Uint8Array';
    }

    if (protoType in ENumberTypes) {
        return 'number';
    }

    if (protoType in EGoogleTypes) {
        return `${KNOWN_PREFIX}${protoType}`;
    }

    if (protoType.substr(0, KNOWN_PREFIX.length) === KNOWN_PREFIX) {
        return protoType;
    }

    return null;
}

registerHelper('type', function (field) {
    // Check for known JS types
    let type = jsType(field.type);

    if (!type) {
        // If it's not a known type, default to the field type
        type = field.type;

        // Check for a parent
        if (field.options && field.options.parent) {
            type = `${field.options.parent}.${type}`;
        }
    }

    // Maps
    if (field.keyType) {
        type = `{ [key: ${jsType(field.keyType)}]: ${type} }`;
    }

    // Repeated
    if (field.repeated) {
        type += `[]`;
    }

    return type;
});
