// ─────────────────────────────────────────────────────────────────────────────
//  VAUX — Adobe Analytics / ACDL / Target Helper
//
//  HOW TO USE:
//  1. Add your Adobe Launch embed code to each page's <head>
//  2. Call the relevant function from each page's inline script
//  3. Wire up Target mbox calls or AT.js loads as needed
//
//  All functions push to window.adobeDataLayer (ACDL standard)
//  and also set legacy s object vars for AppMeasurement if needed.
// ─────────────────────────────────────────────────────────────────────────────

window.adobeDataLayer = window.adobeDataLayer || [];
window.VAUX = window.VAUX || {};
window.VAUX.analytics = {};

// ── Page View ────────────────────────────────────────────────────────────────

window.VAUX.analytics.pageView = function (payload) {
  /*
    payload shape:
    {
      pageName        : "vaux:home",
      pageType        : "home | plp | pdp | cart | checkout | confirmation",
      siteSectionL1   : "home",
      siteSectionL2   : "",
      channel         : "ecommerce",
      currencyCode    : "INR",
      language        : "en-IN"
    }
  */
  window.adobeDataLayer.push({
    event: "pageview",
    page: {
      pageName     : payload.pageName      || "",
      pageType     : payload.pageType      || "",
      siteSection  : payload.siteSectionL1 || "",
      subSection   : payload.siteSectionL2 || "",
      channel      : payload.channel       || "ecommerce",
      currency     : payload.currencyCode  || "INR",
      language     : payload.language      || "en-IN"
    }
  });
  console.log("[VAUX Analytics] pageView pushed", payload);
};

// ── Product Impression (PLP) ─────────────────────────────────────────────────

window.VAUX.analytics.productListView = function (products, listName) {
  /*
    products: array of product objects from VAUX.PRODUCTS
    listName: e.g. "Women PLP", "Search Results", "Homepage Trending"
  */
  window.adobeDataLayer.push({
    event: "ecommerce:productListView",
    ecommerce: {
      impressions: products.map(function (p, idx) {
        return {
          id       : String(p.id),
          name     : p.name,
          brand    : p.brand,
          category : p.category + "/" + (p.subCategory || ""),
          price    : p.price,
          position : idx + 1,
          list     : listName || "Product List"
        };
      })
    }
  });
  console.log("[VAUX Analytics] productListView pushed", products.length, "products");
};

// ── Product Detail View (PDP) ────────────────────────────────────────────────

window.VAUX.analytics.productDetailView = function (product) {
  window.adobeDataLayer.push({
    event: "ecommerce:productDetailView",
    ecommerce: {
      detail: {
        products: [{
          id       : String(product.id),
          name     : product.name,
          brand    : product.brand,
          category : product.category + "/" + (product.subCategory || ""),
          price    : product.price,
          variant  : ""
        }]
      }
    }
  });
  console.log("[VAUX Analytics] productDetailView pushed", product.name);
};

// ── Add to Cart ──────────────────────────────────────────────────────────────

window.VAUX.analytics.addToCart = function (product, size, color, qty) {
  window.adobeDataLayer.push({
    event: "ecommerce:addToCart",
    ecommerce: {
      add: {
        products: [{
          id       : String(product.id),
          name     : product.name,
          brand    : product.brand,
          category : product.category + "/" + (product.subCategory || ""),
          price    : product.price,
          quantity : qty || 1,
          variant  : size + " / " + color
        }]
      }
    }
  });
  console.log("[VAUX Analytics] addToCart pushed", product.name, size, color);
};

// ── Remove from Cart ─────────────────────────────────────────────────────────

window.VAUX.analytics.removeFromCart = function (product, size, qty) {
  window.adobeDataLayer.push({
    event: "ecommerce:removeFromCart",
    ecommerce: {
      remove: {
        products: [{
          id       : String(product.id),
          name     : product.name,
          brand    : product.brand,
          category : product.category + "/" + (product.subCategory || ""),
          price    : product.price,
          quantity : qty || 1,
          variant  : size
        }]
      }
    }
  });
  console.log("[VAUX Analytics] removeFromCart pushed", product.name);
};

// ── Checkout Step ─────────────────────────────────────────────────────────────

window.VAUX.analytics.checkoutStep = function (step, option, cartItems) {
  /*
    step   : 1 = delivery, 2 = payment, 3 = review
    option : e.g. "credit card", "UPI"
  */
  window.adobeDataLayer.push({
    event: "ecommerce:checkout",
    ecommerce: {
      checkout: {
        actionField: { step: step, option: option || "" },
        products: (cartItems || []).map(function (i) {
          return {
            id       : String(i.productId),
            name     : i.name,
            brand    : i.brand,
            price    : i.price,
            quantity : i.qty,
            variant  : i.size
          };
        })
      }
    }
  });
  console.log("[VAUX Analytics] checkoutStep pushed", step, option);
};

// ── Purchase / Order Confirmation ────────────────────────────────────────────

window.VAUX.analytics.purchase = function (orderId, cartItems, revenue, tax, shipping) {
  window.adobeDataLayer.push({
    event: "ecommerce:purchase",
    ecommerce: {
      purchase: {
        actionField: {
          id       : orderId,
          revenue  : revenue,
          tax      : tax      || 0,
          shipping : shipping || 0,
          coupon   : ""
        },
        products: (cartItems || []).map(function (i) {
          return {
            id       : String(i.productId),
            name     : i.name,
            brand    : i.brand,
            price    : i.price,
            quantity : i.qty,
            variant  : i.size
          };
        })
      }
    }
  });
  console.log("[VAUX Analytics] purchase pushed", orderId, revenue);
};

// ── Adobe Target — Get Offer ──────────────────────────────────────────────────

window.VAUX.analytics.getTargetOffer = function (mboxName, params, successCallback) {
  /*
    Use this when AT.js is loaded.
    mboxName       : e.g. "vaux-hero-banner", "vaux-pdp-cta"
    params         : key/value mbox params
    successCallback: function(offer) { applyOffer(offer); }
  */
  if (typeof adobe !== 'undefined' && adobe.target) {
    adobe.target.getOffer({
      mbox   : mboxName,
      params : params || {},
      success: successCallback,
      error  : function (status, error) {
        console.warn("[VAUX Target] getOffer failed", mboxName, status, error);
      }
    });
  } else {
    console.warn("[VAUX Target] AT.js not loaded. Skipping getOffer for", mboxName);
  }
};

// ── Link Click ────────────────────────────────────────────────────────────────

window.VAUX.analytics.linkClick = function (name, region, type, linkUrl) {
  var xdmData = {
    event: "linkClick",
    web: {
      webPageDetails: {
        URL         : window.location.href,
        name        : document.title,
        siteSection : window.location.pathname
      },
      webReferrer: {
        URL: document.referrer || ""
      },
      webInteraction: {
        name       : name    || "",
        region     : region  || "page",
        type       : type    || "other",
        URL        : linkUrl || "",
        linkClicks : { value: 1 }
      }
    }
  };

  window.adobeDataLayer.push(xdmData);

  console.log("[VAUX Analytics] linkClick pushed", name, region, type, linkUrl);
};

// ── Auto Link-Click Listener ──────────────────────────────────────────────────
// Captures every <a href> click site-wide via event delegation.
// Add data-link-region to a container element to tag its links with a region.
// Add data-link-name directly on an <a> to override the auto-extracted label.

(function () {
  function resolveAbsoluteUrl(href) {
    try { return new URL(href, window.location.href).href; }
    catch (_) { return href; }
  }

  function getLinkRegion(el) {
    var node = el;
    while (node && node !== document.body) {
      if (node.dataset && node.dataset.linkRegion) return node.dataset.linkRegion;
      node = node.parentElement;
    }
    return "page";
  }

  function getLinkType(absUrl) {
    if (!absUrl) return "other";
    try {
      var target = new URL(absUrl);
      if (target.hostname !== window.location.hostname) return "external";
      var ext = target.pathname.split('.').pop().toLowerCase();
      if (['pdf','zip','doc','docx','xls','xlsx'].includes(ext)) return "download";
    } catch (_) {}
    return "internal";
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href   = link.getAttribute('href') || '';
    var absUrl = resolveAbsoluteUrl(href);
    var name   = link.dataset.linkName
                 || link.textContent.trim().replace(/\s+/g, ' ').substring(0, 80)
                 || link.getAttribute('aria-label')
                 || '';
    var region = getLinkRegion(link);
    var type   = getLinkType(absUrl);

    window.VAUX.analytics.linkClick(name, region, type, absUrl);
  }, true); // capture phase — fires before navigation
}());

// ── Utility: read query param ─────────────────────────────────────────────────

window.VAUX.analytics.getQueryParam = function (name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
};
