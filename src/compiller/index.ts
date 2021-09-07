import { Root, common, util, Enum } from 'protobufjs';
import { resolve, basename, extname, join, dirname } from 'path';
import { outputFileSync, existsSync, readFileSync, readdirSync, lstatSync } from 'fs-extra';
import { compile } from 'handlebars';
import * as chalk from 'chalk';

import './handlebars/var-helper';
import './handlebars/comment-helper';
import './handlebars/enum-comment-helper';
import './handlebars/uncapitalize-hepler';
import './handlebars/type-helper';
import './handlebars/default-value-helper';

import { IGenOptions } from '../types';

/** Set Compiller */
export class Compiller {
    constructor(private readonly options: IGenOptions) {}

    private resolveRootPath(root: Root): void {
        const paths = this.options.path;
        const length = paths.length;

        // Search include paths when resolving imports
        root.resolvePath = (origin, target) => {
            let resolved = util.path.resolve(util.path.normalize(origin), util.path.normalize(target), false);

            const idx = resolved.lastIndexOf('google/protobuf/');

            if (idx > -1) {
                const altname = resolved.substring(idx);

                if (resolved.match(/google\/protobuf\//g).length > 1) {
                    resolved = resolved.split('google/protobuf')[0] + util.path.normalize(target);
                }

                if (altname in common) {
                    resolved = altname;
                }
            }

            if (existsSync(resolved)) {
                return resolved;
            }

            for (let i = 0; i < length; ++i) {
                const iresolved = util.path.resolve(paths[i] + '/', target);

                if (existsSync(iresolved)) {
                    return iresolved;
                }
            }

            return resolved;
        };
    }

    private walkTree(item: Root | any): void {
        if (item.nested) {
            Object.keys(item.nested).forEach((key) => {
                this.walkTree(item.nested[key]);
            });
        }

        if (item.fields) {
            Object.keys(item.fields).forEach((key) => {
                const field = item.fields[key];

                if (field.resolvedType) {
                    // Record the field's parent name
                    if (field.resolvedType.parent) {
                        // Abuse the options object!
                        if (!field.options) {
                            field.options = {};
                        }

                        if (field.type.indexOf('.') === -1) {
                            field.options.parent = field.resolvedType.parent.name;
                        }
                    }

                    // Record if the field is an enum
                    if (field.resolvedType instanceof Enum) {
                        // Abuse the options object!
                        if (!field.options) {
                            field.options = {};
                        }

                        field.options.enum = true;
                    }
                }
            });
        }
    }

    private output(file: string, pkg: string, tmpl: string): void {
        const root = new Root();

        this.resolveRootPath(root);

        root.loadSync(file, {
            keepCase: this.options.keepCase,
            alternateCommentMode: this.options.comments
        }).resolveAll();

        this.walkTree(root);

        const results = compile(tmpl)(root);
        const outputFile = this.options.output ? join(this.options.output, file.replace(/^.+?[/\\]/, '')) : file;
        const outputPath = join(dirname(outputFile), `${basename(file, extname(file))}.ts`);

        outputFileSync(outputPath, results, 'utf8');
    }

    private generate(path: string, pkg: string): void {
        const hbTemplate = resolve(__dirname, '../..', this.options.template);

        if (!existsSync(hbTemplate)) {
            throw new Error(`Template ${hbTemplate} is not found`);
        }

        const tmpl = readFileSync(hbTemplate, 'utf8');

        if (this.options.verbose) {
            console.log(chalk.blueBright(`-- found: `) + chalk.gray(path));
        }

        this.output(path, pkg, tmpl);
    }

    private getProtoFiles(pkg: string): void {
        if (!existsSync(pkg)) {
            throw new Error(`Directory ${pkg} is not exist`);
        }

        const files = readdirSync(pkg);

        for (let i = 0; i < files.length; i++) {
            const filename = join(pkg, files[i]);
            const stat = lstatSync(filename);

            if (filename.indexOf(this.options.ignore.join()) > -1) {
                continue;
            }

            if (stat.isDirectory()) {
                this.getProtoFiles(filename);
            } else if (filename.indexOf(this.options.target.join()) > -1) {
                this.generate(filename, pkg);
            }
        }
    }

    public compile(): void {
        this.options.path.forEach((pkg) => {
            if (this.options.path.length === 1) {
                this.getProtoFiles(pkg);
            }
        });
    }
}
