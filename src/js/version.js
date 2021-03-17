export async function getVersionNumber() {
  const response = await fetch('./version');
  const versionNumber = await response.json();
  return versionNumber;
}
export async function updateVersionNumber(versionText) {
  // eslint-disable-next-line no-param-reassign
  versionText.innerText = await getVersionNumber();
}
