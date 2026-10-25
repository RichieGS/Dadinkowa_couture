import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';
const path = process.argv[2];
if (!path) throw new Error('Pass the absolute path to the standalone preview HTML.');
const html = readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script(?: type="module")?>([\s\S]*?)<\/script>/g)].map(
  (match) => match[1],
);
assert.equal(scripts.length, 2);
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (error) => errors.push(error.message));
const dom = new JSDOM(html, {
  url: 'file:///preview/Dadinkowa-Preview.html',
  runScripts: 'outside-only',
  virtualConsole,
});
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
dom.window.requestAnimationFrame = (callback) => dom.window.setTimeout(() => callback(0), 0);
dom.window.cancelAnimationFrame = (timer) => dom.window.clearTimeout(timer);
dom.window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
dom.window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
  this.querySelector('button')?.focus();
};
dom.window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};
for (const script of scripts) dom.window.eval(script);
const wait = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));
const doc = dom.window.document;
const until = async (predicate, label) => {
  const deadline = Date.now() + 3000;
  while (!predicate() && Date.now() < deadline) await wait(15);
  assert.ok(predicate(), label);
};
await until(
  () => doc.querySelector('h1')?.textContent.includes('Cloth. Form.'),
  'Home should render',
);
assert.match(doc.querySelector('h1').textContent, /Cloth. Form./);
assert.match(doc.querySelector('.brand img').src, /^data:image\/png;base64,/);
const checkPhotography = (selector) => {
  const photo = doc.querySelector(`${selector} img`);
  assert.ok(photo, `Expected installed photography at ${selector}`);
  assert.match(photo.src, /^data:image\/webp;base64,/);
  assert.match(photo.srcset, /data:image\/webp;base64,/);
  assert.equal(doc.querySelector(`${selector} .photo-slot`), null);
};
checkPhotography('.living-garment');
assert.equal(doc.querySelectorAll('.living-garment img').length, 1);
assert.equal(doc.querySelectorAll('.living-look').length, 3);
assert.equal(doc.querySelectorAll('.photo-slot').length, 0);
doc.querySelector('.living-actions a').click();
assert.equal(doc.activeElement.id, 'collections');
doc.querySelector('.skip-link').click();
assert.equal(doc.activeElement.id, 'main');
const collections = [...doc.querySelectorAll('.desktop-nav a')].find(
  (link) => link.textContent === 'Collections',
);
assert.equal(collections.getAttribute('href'), '#/lookbook');
collections.click();
await until(() => !!doc.querySelector('.lookbook-page'), 'Lookbook should render');
assert.match(doc.querySelector('h1').textContent, /Cloth. Form/);
assert.equal(doc.querySelectorAll('.look-card').length, 3);
[...doc.querySelectorAll('.filters button')]
  .find((button) => button.textContent === 'Tailoring')
  .click();
await until(
  () => doc.querySelector('.filters button[aria-pressed="true"]')?.textContent === 'Tailoring',
  'Tailoring filter should render three concepts',
);
assert.equal(doc.querySelectorAll('.look-card').length, 3);
checkPhotography('.look-card');
const before = dom.window.location.href;
doc.querySelector('.skip-link').click();
assert.equal(dom.window.location.href, before);
const trigger = doc.querySelector('.look-image');
trigger.focus();
trigger.click();
await until(() => !!doc.querySelector('.look-dialog[open]'), 'Look dialog should open');
assert.ok(doc.querySelector('.look-dialog[open]'));
doc.querySelector('.dialog-close').click();
await until(() => !doc.querySelector('.look-dialog[open]'), 'Look dialog should close');
assert.equal(doc.querySelector('.look-dialog[open]'), null);
assert.ok(doc.activeElement === trigger, 'Dialog should restore focus to its connected trigger');
[...doc.querySelectorAll('.desktop-nav a')].find((link) => link.textContent === 'Contact').click();
await until(
  () => doc.querySelector('h1')?.textContent.includes('Good style starts'),
  'Contact should render',
);
assert.match(doc.querySelector('h1').textContent, /Good style starts/);
assert.ok(doc.querySelector('textarea'));
[...doc.querySelectorAll('.desktop-nav a')].find((link) => link.textContent === 'Atelier').click();
await until(() => doc.activeElement?.id === 'atelier', 'Atelier should receive focus');
assert.equal(doc.activeElement.id, 'atelier');
assert.deepEqual(errors, []);
console.log(
  'PASS: offline production bundle: 3 HashRouter routes, section/skip/Atelier navigation, filtering, three concept records, modal close/focus restoration, embedded logo and AI concept WebP imagery. No simulated runtime errors.',
);
dom.window.close();
