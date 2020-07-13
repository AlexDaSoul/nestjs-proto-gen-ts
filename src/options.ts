import { IGenOptions } from './types';

export const options: IGenOptions = {
    path: [],
    output: null,
    target: ['.proto'],
    ignore: ['node_modules', 'dist'],
    template: 'templates/nestjs-grpc.hbs',
    keepCase: false,
    comments: true,
    verbose: true
};
