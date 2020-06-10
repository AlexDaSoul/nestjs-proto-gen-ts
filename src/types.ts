export interface IGenOptions {
    // Path to root directory
    path: string[];
    // Path to output directory
    output: string;
    // Proto files
    target: string[];
    // Ignore file or directories
    ignore: string[];
    // Template url
    template?: string;
    //Keeps field casing instead of converting to camel case
    keepCase?: boolean;
    // Comments from proto
    comments?: boolean;
    // Log all output to console
    verbose?: boolean;
}

export enum ENumberTypes {
    'double',
    'float',
    'int32',
    'int64',
    'uint32',
    'uint64',
    'sint32',
    'sint64',
    'fixed32',
    'fixed64',
    'sfixed32',
    'sfixed64'
}

export enum EScalarTypes {
    string,
    'bool',
    'bytes',
    'double',
    'float',
    'int32',
    'int64',
    'uint32',
    'uint64',
    'sint32',
    'sint64',
    'fixed32',
    'fixed64',
    'sfixed32',
    'sfixed64'
}

export enum EGoogleTypes {
    'Any',
    'Timestamp',
    'Duration',
    'Struct',
    'Wrapper',
    'FieldMask',
    'ListValue',
    'Value',
    'NullValue'
}
