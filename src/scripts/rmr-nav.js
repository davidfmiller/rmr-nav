/* global document,window,Element,module,require */


(function() {

  'use strict';

  const
    RMR = require('rmr-util');

  const nav = function(options) {

    if (arguments.length == 0) {
      options = {
        target: 'nav'
      };
    }

    const
      open = RMR.Node.get('.rmr-nav-open button'),
      target = RMR.Node.get(options.target),
      nav = RMR.Node.create('div', { id: 'rmr-nav', 'aria-hidden': true });

    if (! open) {
      console.warn('No `rmr-nav-open` found');
      return;
    }

    if (! target) {
      console.warn('No target for `rmr-nav`');
      return;
    }

    const escapeListener = e => {
      if (e.keyCode == 27) {
        closer();
      }
    };

    open.addEventListener('click', (e) => {
      document.body.classList.add('rmr-nav');
      nav.removeAttribute('aria-hidden');
      document.body.querySelector('.rmr-nav-close button').focus();
      window.setTimeout(() => {
        document.body.classList.add('rmr-nav-open');
      }, 0);

      document.body.addEventListener('keyup', escapeListener);
    });

    const
      clone = target.cloneNode(true),
      container = RMR.Node.create('div'),
      close = RMR.Node.create('div', { class: 'rmr-nav-close' });

    close.innerHTML = RMR.Object.has(options, 'close') ? options.close : '<button>X</button>';

    clone.className = '';
    container.appendChild(close);
    container.appendChild(clone);
    nav.appendChild(container);

    const b = nav.querySelector('.rmr-nav-open');
    b.parentNode.removeChild(b);

    document.body.appendChild(nav);

    const closer = function(e) {

      document.body.classList.remove('rmr-nav-open');
      nav.setAttribute('aria-hidden', true);
      document.body.querySelector('.rmr-nav-open button').focus();

      window.setTimeout(() => { document.body.classList.remove('rmr-nav'); }, 100);

      document.body.removeEventListener('keyup', escapeListener);
    };

    nav.addEventListener('click', closer);
    close.addEventListener('click', closer);
  };

  module.exports = nav;

})();
