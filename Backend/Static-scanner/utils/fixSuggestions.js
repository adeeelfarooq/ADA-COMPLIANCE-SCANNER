// utils/fixSuggestions.js

const fixSuggestions = {
  /* 1️⃣ Image alt missing */
  'img-alt': {
    solution: 'Add a meaningful alt attribute that describes the image content.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
  },

  /* 2️⃣ Empty alt used incorrectly */
  'image-empty-alt': {
    solution: 'Avoid empty alt attributes unless the image is purely decorative.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
  },

  /* 3️⃣ Missing document title */
  'document-title': {
    solution: 'Provide a descriptive and unique title for each page.',
  
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html'
  },

  /* 4️⃣ Missing HTML lang */
  'html-lang': {
    solution: 'Specify the primary language of the document using the lang attribute.',
 
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html'
  },

  /* 5️⃣ Input without label */
  'input-label': {
    solution: 'Associate form inputs with visible labels.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html'
  },

  /* 6️⃣ Button without accessible name */
  'button-name': {
    solution: 'Ensure buttons have clear accessible text.',

    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
  },

  /* 7️⃣ Link without text */
  'link-name': {
    solution: 'Links must have descriptive text explaining their purpose.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html'
  },

  /* 8️⃣ Incorrect heading order */
  'heading-order': {
    solution: 'Maintain a logical heading hierarchy without skipping levels.',
    
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
  },

  /* 9️⃣ Form without submit control */
  'form-submit': {
    solution: 'Provide a submit button for every form.',
  
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
  },

  /* 🔟 Video without controls */
  'video-controls': {
    solution: 'Provide controls so users can pause or adjust video playback.',
    
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html'
  },

  /* 1️⃣1️⃣ Missing viewport meta */
  'meta-viewport': {
    solution: 'Add a viewport meta tag for responsive scaling.',
    
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html'
  },

  /* 1️⃣2️⃣ Table without headers */
  'table-headers': {
    solution: 'Use table headers to define relationships between data cells.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
  },

  /* 1️⃣3️⃣ Audio without controls */
  'audio-controls': {
    solution: 'Provide controls to pause or stop audio.',
    
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html'
  },

  /* 1️⃣4️⃣ Missing main landmark */
  'landmark-main': {
    solution: 'Wrap main content inside a <main> landmark.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
  },

  /* 1️⃣5️⃣ Missing skip link */
  'skip-link': {
    solution: 'Provide a skip navigation link to bypass repeated content.',
   
    learnMore: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html'
  }
};

function getFixSuggestion(ruleId) {
  return fixSuggestions[ruleId] || null;
}

module.exports = { getFixSuggestion };
