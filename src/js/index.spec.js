/* eslint-disable quotes */
import jsdom from 'jsdom';
import { enableFetchMocks } from 'jest-fetch-mock';
import { getVersionNumber, updateVersionNumber } from './version';

const { JSDOM } = jsdom;

enableFetchMocks();

describe('Show the current version number', () => {
  it('Returns a current version of 1.0.0', async () => {
    fetch.mockResponseOnce(JSON.stringify('1.0.0'));
    const versionNumber = await getVersionNumber();
    expect(versionNumber).toBe('1.0.0');
  });
  it('Shows the source URL for the current version', async () => {
    expect(fetch.mock.calls[0][0]).toEqual('./version');
  });
  it('Shows the version number is 1.0.0 on the Tic Tac Toe page', async () => {
    const versionNumberDom = new JSDOM('<h2 class="app-version">Version <span class="app-version_version">0.0.1</span></h2>');
    const appVersion = versionNumberDom.window.document.querySelector('.app-version_version');
    fetch.mockResponseOnce(JSON.stringify('1.0.0'));
    await updateVersionNumber(appVersion);
    expect(appVersion.innerText).toBe('1.0.0');
  });
});
