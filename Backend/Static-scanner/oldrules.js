module.exports = [

  // Rule 1: Image missing alt text (WCAG 1.1.1 - A)
  {
    id: 'image-alt',
    wcag: '1.1.1',
    level: 'A',
    check: (document, $) => {
      const issues = [];
      $('img').each((i, img) => {
        const alt = $(img).attr('alt');
        if (!alt || alt.trim() === '') {
          issues.push({
            id: 'image-alt',
            description: 'Image is missing alternative text.',
            explanation: 'Screen readers cannot describe images without alt text.',
            helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
            wcag: '1.1.1',
            level: 'A',
            impact: 'serious',
            impactScore: 3,
            frequencyScore: 2,
            scopeScore: 2,
            elements: [{ html: $.html(img), selector: 'img' }]
          });
        }
      });
      return issues;
    }
  },

  // Rule 2: Missing page title (WCAG 2.4.2 - A)
  {
    id: 'document-title',
    wcag: '2.4.2',
    level: 'A',
    check: (document) => {
      const title = document.querySelector('title');
      if (!title || title.textContent.trim() === '') {
        return [{
          id: 'document-title',
          description: 'Page title is missing or empty.',
          explanation: 'Titles help users understand page purpose.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
          wcag: '2.4.2',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<head>', selector: 'title' }]
        }];
      }
      return [];
    }
  },

  // Rule 3: HTML lang missing (WCAG 3.1.1 - A)
  {
    id: 'html-lang',
    wcag: '3.1.1',
    level: 'A',
    check: (document) => {
      const html = document.querySelector('html');
      if (!html || !html.getAttribute('lang')) {
        return [{
          id: 'html-lang',
          description: 'HTML element missing lang attribute.',
          explanation: 'Language helps screen readers pronounce content correctly.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html',
          wcag: '3.1.1',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<html>', selector: 'html' }]
        }];
      }
      return [];
    }
  },

  // Rule 4: Form input missing label (WCAG 1.3.1 - A)
  {
    id: 'input-label',
    wcag: '1.3.1',
    level: 'A',
    check: (document, $) => {
      const issues = [];
      $('input').each((i, input) => {
        const id = $(input).attr('id');
        if (id && $(`label[for="${id}"]`).length === 0) {
          issues.push({
            id: 'input-label',
            description: 'Form input missing label.',
            explanation: 'Labels help users understand form fields.',
            helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
            wcag: '1.3.1',
            level: 'A',
            impact: 'serious',
            impactScore: 3,
            frequencyScore: 2,
            scopeScore: 2,
            elements: [{ html: $.html(input), selector: 'input' }]
          });
        }
      });
      return issues;
    }
  },

  // Rule 5: Empty links (WCAG 2.4.4 - A)
  {
    id: 'empty-link',
    wcag: '2.4.4',
    level: 'A',
    check: (document, $) => {
      const issues = [];
      $('a').each((i, link) => {
        if ($(link).text().trim() === '') {
          issues.push({
            id: 'empty-link',
            description: 'Link has no text.',
            explanation: 'Screen readers need link text to convey purpose.',
            helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
            wcag: '2.4.4',
            level: 'A',
            impact: 'moderate',
            impactScore: 2,
            frequencyScore: 2,
            scopeScore: 2,
            elements: [{ html: $.html(link), selector: 'a' }]
          });
        }
      });
      return issues;
    }
  },

  // Rule 6: Missing heading structure (WCAG 1.3.1 - A)
  {
    id: 'heading-order',
    wcag: '1.3.1',
    level: 'A',
    check: (document) => {
      const h1 = document.querySelector('h1');
      if (!h1) {
        return [{
          id: 'heading-order',
          description: 'Page missing main heading (h1).',
          explanation: 'Headings provide content structure.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
          wcag: '1.3.1',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<body>', selector: 'h1' }]
        }];
      }
      return [];
    }
  },

  // Rule 7: Button without accessible text (WCAG 4.1.2 - A)
  {
    id: 'button-name',
    wcag: '4.1.2',
    level: 'A',
    check: (document, $) => {
      const issues = [];
      $('button').each((i, btn) => {
        if ($(btn).text().trim() === '') {
          issues.push({
            id: 'button-name',
            description: 'Button has no accessible name.',
            explanation: 'Buttons must be understandable to assistive tech.',
            helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
            wcag: '4.1.2',
            level: 'A',
            impact: 'serious',
            impactScore: 3,
            frequencyScore: 2,
            scopeScore: 2,
            elements: [{ html: $.html(btn), selector: 'button' }]
          });
        }
      });
      return issues;
    }
  },

  // Rule 8: Table missing headers (WCAG 1.3.1 - A)
  {
    id: 'table-headers',
    wcag: '1.3.1',
    level: 'A',
    check: (document) => {
      const table = document.querySelector('table');
      if (table && table.querySelectorAll('th').length === 0) {
        return [{
          id: 'table-headers',
          description: 'Table missing header cells.',
          explanation: 'Headers help users understand table data.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
          wcag: '1.3.1',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<table>', selector: 'table' }]
        }];
      }
      return [];
    }
  },

  // Rule 9: Missing viewport (WCAG 1.4.10 - AA)
  {
    id: 'viewport',
    wcag: '1.4.10',
    level: 'AA',
    check: (document) => {
      const meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        return [{
          id: 'viewport',
          description: 'Viewport meta tag missing.',
          explanation: 'Required for responsive content.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html',
          wcag: '1.4.10',
          level: 'AA',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<head>', selector: 'meta[name="viewport"]' }]
        }];
      }
      return [];
    }
  },

  // Rule 10: Multiple h1 headings (WCAG 2.4.6 - AA)
  {
    id: 'multiple-h1',
    wcag: '2.4.6',
    level: 'AA',
    check: (document) => {
      const h1s = document.querySelectorAll('h1');
      if (h1s.length > 1) {
        return [{
          id: 'multiple-h1',
          description: 'Multiple h1 elements found.',
          explanation: 'Pages should have a single main heading.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html',
          wcag: '2.4.6',
          level: 'AA',
          impact: 'minor',
          impactScore: 1,
          frequencyScore: 1,
          scopeScore: 2,
          elements: [{ html: '<h1>', selector: 'h1' }]
        }];
      }
      return [];
    }
  },

  // Rule 11: Missing main landmark (WCAG 1.3.1 - A)
  {
    id: 'main-landmark',
    wcag: '1.3.1',
    level: 'A',
    check: (document) => {
      if (!document.querySelector('main')) {
        return [{
          id: 'main-landmark',
          description: 'Main landmark missing.',
          explanation: 'Landmarks help users navigate content.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
          wcag: '1.3.1',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<body>', selector: 'main' }]
        }];
      }
      return [];
    }
  },

  // Rule 12: Missing meta charset (WCAG 4.1.1 - A)
  {
    id: 'charset',
    wcag: '4.1.1',
    level: 'A',
    check: (document) => {
      if (!document.querySelector('meta[charset]')) {
        return [{
          id: 'charset',
          description: 'Character encoding not defined.',
          explanation: 'Encoding ensures text is read correctly.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
          wcag: '4.1.1',
          level: 'A',
          impact: 'minor',
          impactScore: 1,
          frequencyScore: 1,
          scopeScore: 3,
          elements: [{ html: '<head>', selector: 'meta[charset]' }]
        }];
      }
      return [];
    }
  },

  // Rule 13: Iframe missing title (WCAG 2.4.1 - A)
  {
    id: 'iframe-title',
    wcag: '2.4.1',
    level: 'A',
    check: (document) => {
      const iframe = document.querySelector('iframe');
      if (iframe && !iframe.getAttribute('title')) {
        return [{
          id: 'iframe-title',
          description: 'Iframe missing title.',
          explanation: 'Title describes embedded content.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html',
          wcag: '2.4.1',
          level: 'A',
          impact: 'moderate',
          impactScore: 2,
          frequencyScore: 1,
          scopeScore: 2,
          elements: [{ html: '<iframe>', selector: 'iframe' }]
        }];
      }
      return [];
    }
  },

  // Rule 14: Missing list semantics (WCAG 1.3.1 - A)
  {
    id: 'list-structure',
    wcag: '1.3.1',
    level: 'A',
    check: (document) => {
      const ul = document.querySelector('ul');
      if (ul && ul.querySelectorAll('li').length === 0) {
        return [{
          id: 'list-structure',
          description: 'List missing list items.',
          explanation: 'Lists require proper structure.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
          wcag: '1.3.1',
          level: 'A',
          impact: 'minor',
          impactScore: 1,
          frequencyScore: 1,
          scopeScore: 2,
          elements: [{ html: '<ul>', selector: 'ul' }]
        }];
      }
      return [];
    }
  },

  // Rule 15: Deprecated HTML elements (WCAG 4.1.1 - A)
  {
    id: 'deprecated-html',
    wcag: '4.1.1',
    level: 'A',
    check: (document) => {
      const deprecated = document.querySelector('font, center');
      if (deprecated) {
        return [{
          id: 'deprecated-html',
          description: 'Deprecated HTML elements used.',
          explanation: 'Deprecated elements break accessibility.',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
          wcag: '4.1.1',
          level: 'A',
          impact: 'minor',
          impactScore: 1,
          frequencyScore: 1,
          scopeScore: 2,
          elements: [{ html: deprecated.outerHTML, selector: deprecated.tagName.toLowerCase() }]
        }];
      }
      return [];
    }
  }

];
