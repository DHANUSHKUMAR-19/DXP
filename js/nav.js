window.VAUX = window.VAUX || {};
window.VAUX.nav = {};

window.VAUX.nav.init = function(activePage) {
  var nav = document.getElementById('vaux-nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-logo" href="index.html">DXP</a>
      <nav class="nav-links" role="navigation">
        <a href="plp.html?cat=Women"        class="${activePage==='plp-women'  ?'active':''}">Women</a>
        <a href="plp.html?cat=Men"          class="${activePage==='plp-men'    ?'active':''}">Men</a>
        <a href="plp.html?cat=New Arrivals" class="${activePage==='plp-new'    ?'active':''}">New Arrivals</a>
        <a href="plp.html?cat=Sale"         class="${activePage==='plp-sale'   ?'active':''}">Sale</a>
      </nav>
      <div class="nav-right">
        <button class="nav-icon-btn" id="search-toggle" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <a class="nav-icon-btn" href="account.html" aria-label="My Account" style="text-decoration:none;color:inherit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
        <a class="nav-icon-btn" href="cart.html" aria-label="Cart" style="text-decoration:none;color:inherit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="cart-badge" id="cart-badge" style="display:none">0</span>
        </a>
      </div>
    </div>
    <div class="search-drawer" id="search-drawer">
      <div class="search-inner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="search" id="search-input" placeholder="Search styles, brands, categories...">
        <button id="search-close" style="color:var(--ink-mute);cursor:pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>`;

  document.getElementById('search-toggle').addEventListener('click', function() {
    var d = document.getElementById('search-drawer');
    d.classList.toggle('open');
    if (d.classList.contains('open')) document.getElementById('search-input').focus();
  });
  document.getElementById('search-close').addEventListener('click', function() {
    document.getElementById('search-drawer').classList.remove('open');
  });
  document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.key==='Enter' && this.value.trim()) window.location.href = 'plp.html?cat=All&q='+encodeURIComponent(this.value.trim());
  });
  window.VAUX.updateCartBadge();
};
