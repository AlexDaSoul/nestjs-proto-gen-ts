import { usage } from 'yargs';
import { red } from 'chalk';

import { options } from '../options';
import { Compiller } from '../compiller';

/** Set CLI */
export const cli = usage('Extract and merge locale files.\nUsage: $0 [options]')
    /* eslint-disable @typescript-eslint/no-var-requires */
    .version(require(`${__dirname}/../../package.json`).version)
    /* eslint-enable @typescript-eslint/no-var-requires */
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .option('path', {
        alias: 'p',
        describe: 'Path to root directory',
        type: 'array',
        normalize: true
    })
    .option('output', {
        alias: 'o',
        describe: 'Path to output directory',
        type: 'string',
        normalize: true
    })
    .option('template', {
        describe: "Handlebar's template for output",
        default: options.template,
        type: 'string'
    })
    .option('target', {
        alias: 't',
        describe: 'Proto files',
        default: options.target,
        type: 'array'
    })
    .option('ignore', {
        alias: 'i',
        describe: 'Ignore file or directories',
        default: options.ignore,
        type: 'array'
    })
    .option('comments', {
        alias: 'c',
        describe: 'Add comments from proto',
        default: options.comments,
        type: 'boolean'
    })
    .option('verbose', {
        describe: 'Log all output to console',
        default: options.verbose,
        type: 'boolean'
    })
    .demandOption(['path'], red.bold('Please provide both run and [path] argument to work with this tool'))
    .exitProcess(true)
    .parse(process.argv);

/**
 * Init Compiller
 *
 * @type {Compiller}
 * @param {IGenOptions}
 */
const compiller = new Compiller({ ...options, ...cli });

/** CLI Task Run */
compiller.compile();
