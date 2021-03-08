import jsdom from 'jsdom';
import fs from 'fs';
import handleClickCell from './index';

const { JSDOM } = jsdom;

const indexHtmlFile = fs.readFileSync('./src/html/index.html').toString();

const dom = new JSDOM(indexHtmlFile);

describe('index.js tests will go here', () => {
  it('expects first test to equal 1', () => {
    const firstTest = 1;
    expect(firstTest).toBe(1);
  });
});

describe('replacing text in the paragraph tag', () => {
  const testDom = new JSDOM('<doctype html><p>Hello, world</p>');
  const testDomParagraph = testDom.window.document.querySelector('p');
  it('expects the paragraph to have a value of "Hello, world"', () => {
    expect(testDomParagraph.textContent).toBe('Hello, world');
  });
});
