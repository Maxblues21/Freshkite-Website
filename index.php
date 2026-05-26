<?php
/**
 * Freshkite — Main / Homepage Template
 *
 * Serves as the fallback template for all pages.
 * Set "Settings > Reading > A static page" and assign this theme's
 * front-page.php for a dedicated static homepage.
 *
 * @package Freshkite
 */

get_header();
?>

<div class="ambient" aria-hidden="true">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
</div>
<div id="root" style="position:relative; z-index:1;"></div>

<!-- React component files (transpiled in-browser via Babel) -->
<script type="text/babel" data-presets="react"
  src="<?php echo esc_url( get_template_directory_uri() ); ?>/components/core.jsx?v=16"></script>

<script type="text/babel" data-presets="react"
  src="<?php echo esc_url( get_template_directory_uri() ); ?>/components/hero_caps.jsx?v=16"></script>

<script type="text/babel" data-presets="react"
  src="<?php echo esc_url( get_template_directory_uri() ); ?>/components/language_partners.jsx?v=16"></script>

<!-- App bootstrap -->
<script type="text/babel" data-presets="react">
  const App = () => (
    <>
      <Nav/>
      <div className="stacker">
        <section className="stack-layer" data-layer="0"><Hero/></section>
        <section className="stack-layer" data-layer="1"><Capabilities/></section>
        <section className="stack-layer" data-layer="2"><Language/></section>
        <section className="stack-layer" data-layer="3"><Partners/></section>
        <section className="stack-layer" data-layer="4"><WhyUs/></section>
        <section className="stack-layer" data-layer="5"><CTAFooter/></section>
      </div>
    </>
  );
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>);
</script>

<!-- Section scroll-reveal transitions (IntersectionObserver, no dependencies) -->
<script>
(function(){
  var CSS = [
    '.stack-layer { transform-origin: bottom center; }',
    '.stack-layer.sect-hidden {',
    '  opacity: 0;',
    '  transform: translateY(32px) scale(0.985);',
    '  transition: none;',
    '}',
    '.stack-layer.sect-visible {',
    '  opacity: 1;',
    '  transform: translateY(0) scale(1);',
    '  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),',
    '              transform 0.65s cubic-bezier(0.22,1,0.36,1);',
    '}',
  ].join('\n');

  var s = document.createElement('style');
  s.textContent = CSS;
  document.head.appendChild(s);

  function init() {
    var layers = document.querySelectorAll('.stack-layer');
    if (layers.length < 2) { setTimeout(init, 100); return; }

    layers.forEach(function(el, i) {
      if (i === 0) return; /* hero is always visible */

      el.classList.add('sect-hidden');
      var done = false;

      var show = function() {
        if (done) return;
        done = true;
        setTimeout(function() {
          el.classList.remove('sect-hidden');
          el.classList.add('sect-visible');
        }, i * 30);
      };

      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { show(); io.disconnect(); }
        });
      }, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });

      io.observe(el);
      setTimeout(show, 1400 + i * 60); /* hard fallback */
    });
  }

  setTimeout(init, 300);
})();
</script>

<?php get_footer(); ?>
