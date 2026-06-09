window.VAUX = window.VAUX || {};
window.VAUX.footer = {};
window.VAUX.footer.init = function() {
  var el = document.getElementById('vaux-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-top">
      <div>
        <p class="footer-logo">DXP</p>
        <p class="footer-tagline">Curated fashion. Considered design. Clothes worth keeping.</p>
      </div>
      <div>
        <p class="footer-col-title">Shop</p>
        <ul class="footer-links">
          <li><a href="plp.html?cat=Women">Women</a></li>
          <li><a href="plp.html?cat=Men">Men</a></li>
          <li><a href="plp.html?cat=New Arrivals">New Arrivals</a></li>
          <li><a href="plp.html?cat=Sale">Sale</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-col-title">Help</p>
        <ul class="footer-links">
          <li><a href="#">Sizing Guide</a></li>
          <li><a href="#">Shipping Info</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-col-title">Company</p>
        <ul class="footer-links">
          <li><a href="#">About DXP</a></li>
          <li><a href="#">Sustainability</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">&copy; 2025 DXP. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Cookie Settings</a>
      </div>
    </div>`;
};
