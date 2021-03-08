import jsdom from 'jsdom';

const { JSDOM } = jsdom;

describe('index.js tests will go here', () => {
  it('expects first test to equal 1', () => {
    const firstTest = 1;
    expect(firstTest).toBe(1);
  });
});

describe('replacing text in the paragraph tag', () => {
  const dom = new JSDOM('<doctype html><p>Hello, world</p>');
  const domParagraph = dom.window.document.querySelector('p');
  it('expects the paragraph to have a value of "Hello, world"', () => {
    expect(domParagraph.textContent).toBe('Hello, world');
  });
});
