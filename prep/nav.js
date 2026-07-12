// Shared right-side navigation for the /prep/ guides.
// Injected into each guide page; builds a fixed sidebar with a guide
// switcher and an "on this page" list cloned from the page's own TOC.
(function () {
    var GUIDES = [
        ['cpp-fundamentals.html', 'Fundamentals'],
        ['cpp-virtual-functions.html', 'Virtual Functions & Polymorphism'],
        ['cpp-iterators-moves-concurrency.html', 'Iterators, Moves, Smart Pointers, Concurrency'],
        ['cpp-move-semantics.html', 'Move Semantics'],
        ['cpp-performance.html', 'Performance & Optimization'],
    ];
    var here = location.pathname.split('/').pop();

    var style = document.createElement('style');
    style.textContent = [
        '.sidenav {',
        '  position: fixed;',
        '  top: 72px;',
        '  left: calc(50% + 410px);',
        '  width: 250px;',
        '  max-height: calc(100vh - 96px);',
        '  overflow-y: auto;',
        '  font-size: 13px;',
        '  line-height: 1.45;',
        '}',
        '@media (max-width: 1339px) { .sidenav { display: none; } }',
        '@media print { .sidenav { display: none; } }',
        '.sidenav .sn-tag {',
        '  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;',
        '  font-size: 11px;',
        '  font-weight: 700;',
        '  letter-spacing: 0.12em;',
        '  text-transform: uppercase;',
        '  color: var(--ink-soft);',
        '  margin: 0 0 6px;',
        '  padding-left: 12px;',
        '}',
        '.sidenav ul { list-style: none; margin: 0 0 22px; padding: 0; }',
        '.sidenav li { margin: 0; }',
        '.sidenav a {',
        '  display: block;',
        '  padding: 3px 10px;',
        '  color: var(--ink-soft);',
        '  text-decoration: none;',
        '  border-left: 2px solid var(--rule);',
        '}',
        '.sidenav a:hover { color: var(--accent); }',
        '.sidenav a.current, .sidenav a.active {',
        '  color: var(--accent);',
        '  border-left-color: var(--accent);',
        '  font-weight: 600;',
        '}',
    ].join('\n');
    document.head.appendChild(style);

    var aside = document.createElement('aside');
    aside.className = 'sidenav';

    function tag(text) {
        var p = document.createElement('p');
        p.className = 'sn-tag';
        p.textContent = text;
        return p;
    }

    aside.appendChild(tag('Guides'));
    var gl = document.createElement('ul');
    GUIDES.forEach(function (g) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = g[0];
        a.textContent = g[1];
        if (g[0] === here) { a.className = 'current'; }
        li.appendChild(a);
        gl.appendChild(li);
    });
    aside.appendChild(gl);

    var tocLinks = document.querySelectorAll('nav.toc ol a');
    var secLinks = [];
    if (tocLinks.length) {
        aside.appendChild(tag('On this page'));
        var sl = document.createElement('ul');
        tocLinks.forEach(function (t) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = t.getAttribute('href');
            a.textContent = t.textContent;
            li.appendChild(a);
            sl.appendChild(li);
            secLinks.push(a);
        });
        aside.appendChild(sl);
    }
    document.body.appendChild(aside);

    // Scrollspy: highlight the section whose heading was scrolled past last.
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
    var byId = {};
    secLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var ticking = false;
    function update() {
        ticking = false;
        var cur = null;
        var cutoff = window.scrollY + 120;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= cutoff) { cur = sections[i].id; }
        }
        secLinks.forEach(function (a) { a.classList.remove('active'); });
        if (cur && byId[cur]) { byId[cur].classList.add('active'); }
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
})();
