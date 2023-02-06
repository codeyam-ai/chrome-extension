import { readFileSync } from 'fs';
import Mustache from 'mustache';
import { join } from 'path';

const loadTemplateAsString = function (templateName: string) {
    return readFileSync(
        join(__dirname, `mockchain-templates/${templateName}.json.mustache`),
        'utf-8'
    );
};

export function renderTemplate(templateName: string, view: unknown) {
    const templateAsString = loadTemplateAsString(templateName);
    const renderedString = Mustache.render(templateAsString, view);
    // console.log("renderedString", renderedString)
    return JSON.parse(renderedString);
}
