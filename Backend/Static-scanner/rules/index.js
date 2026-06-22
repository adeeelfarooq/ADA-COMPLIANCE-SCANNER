const imageAltRule = require('./image-alt');
const documentTitleRule = require('./document-title');
const htmlLangRule = require('./html-lang');
const inputLabelRule = require('./input-label');
const buttonNameRule = require('./button-name');
const linkNameRule = require('./link-name');
const imageEmptyAltRule = require('./image-empty-alt');
const headingOrderRule = require('./heading-order');
const formSubmitRule = require('./form-submit');
const videoControlsRule = require('./video-controls');
const metaViewportRule = require('./meta-viewport');
const tableHeadersRule = require('./table-headers');
const audioControlsRule = require('./audio-controls');
const landmarkMainRule = require('./landmark-main');
const skipLinkRule = require('./skip-link');

module.exports = [
  imageAltRule,
  documentTitleRule,
  htmlLangRule,
  inputLabelRule,
  buttonNameRule,
  linkNameRule,
  imageEmptyAltRule,
  headingOrderRule,
  formSubmitRule,
  videoControlsRule,
  metaViewportRule,
  tableHeadersRule,
  audioControlsRule,
  landmarkMainRule,
  skipLinkRule
];
