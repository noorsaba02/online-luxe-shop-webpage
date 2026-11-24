import { useState } from "react";

// Images live in the "public/images" folder, e.g. public/images/obsidian-watch.jpg
// BASE_URL makes the path work on GitHub Pages too.
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

const PRODUCTS = [
  // ---------- Accessories ----------
  { id: 1, name: "Obsidian Watch", category: "Accessories", price: 299, originalPrice: 420, rating: 4.8, reviews: 312, tag: "Bestseller", emoji: "⌚", image: img("obsidian-watch"), desc: "Swiss movement, sapphire glass crystal, water resistant to 100m." },
  { id: 2, name: "Onyx Sunglasses", category: "Accessories", price: 165, originalPrice: null, rating: 4.7, reviews: 276, tag: null, emoji: "🕶️", image: img("onyx-sunglasses"), desc: "Polarized lenses, hand-finished acetate frame, UV400 protection." },
  { id: 3, name: "Leather Wallet", category: "Accessories", price: 79, originalPrice: 99, rating: 4.6, reviews: 205, tag: "Sale", emoji: "👛", image: img("leather-wallet"), desc: "Full-grain Italian leather, RFID protection, six card slots." },
  { id: 4, name: "Silk Scarf", category: "Accessories", price: 95, originalPrice: null, rating: 4.5, reviews: 88, tag: "New", emoji: "🧣", image: img("silk-scarf"), desc: "Hand-rolled edges, 100% mulberry silk, signature print." },

  // ---------- Clothing ----------
  { id: 5, name: "Velvet Noir Jacket", category: "Clothing", price: 189, originalPrice: 260, rating: 4.7, reviews: 214, tag: "New", emoji: "🧥", image: img("velvet-noir-jacket"), desc: "Structured silhouette with subtle sheen. Dry clean only." },
  { id: 6, name: "Cashmere Sweater", category: "Clothing", price: 210, originalPrice: 280, rating: 4.9, reviews: 342, tag: "Top Rated", emoji: "🧶", image: img("cashmere-sweater"), desc: "Ultra-soft 100% Grade-A cashmere with a relaxed fit." },
  { id: 7, name: "Tailored Trousers", category: "Clothing", price: 120, originalPrice: null, rating: 4.5, reviews: 131, tag: null, emoji: "👖", image: img("tailored-trousers"), desc: "Wool-blend fabric, pleated front, tapered leg." },
  { id: 8, name: "Linen Shirt", category: "Clothing", price: 68, originalPrice: 85, rating: 4.4, reviews: 176, tag: "Sale", emoji: "👔", image: img("linen-shirt"), desc: "Breathable European linen, mother-of-pearl buttons." },

  // ---------- Beauty ----------
  { id: 9, name: "Ember Fragrance", category: "Beauty", price: 85, originalPrice: null, rating: 4.9, reviews: 528, tag: "Top Rated", emoji: "🕯️", image: img("ember-fragrance"), desc: "Notes of oud, amber, sandalwood. 50ml Eau de Parfum." },
  { id: 10, name: "Rose Face Serum", category: "Beauty", price: 58, originalPrice: 72, rating: 4.7, reviews: 389, tag: "Trending", emoji: "🌹", image: img("rose-face-serum"), desc: "Hyaluronic acid and rose extract for deep daily hydration." },
  { id: 11, name: "Matte Lipstick Set", category: "Beauty", price: 44, originalPrice: null, rating: 4.6, reviews: 254, tag: null, emoji: "💄", image: img("matte-lipstick-set"), desc: "Set of three long-wear matte shades in a gold-finish case." },
  { id: 12, name: "Argan Hair Oil", category: "Beauty", price: 36, originalPrice: 45, rating: 4.5, reviews: 167, tag: "Sale", emoji: "🧴", image: img("argan-hair-oil"), desc: "Cold-pressed Moroccan argan oil for shine and frizz control." },

  // ---------- Footwear ----------
  { id: 13, name: "Carbon Sneakers", category: "Footwear", price: 145, originalPrice: 190, rating: 4.6, reviews: 189, tag: "Sale", emoji: "👟", image: img("carbon-sneakers"), desc: "Lightweight carbon-weave upper, memory foam insole." },
  { id: 14, name: "Leather Loafers", category: "Footwear", price: 175, originalPrice: null, rating: 4.7, reviews: 143, tag: "Bestseller", emoji: "👞", image: img("leather-loafers"), desc: "Hand-stitched calfskin leather with a cushioned leather sole." },
  { id: 15, name: "Suede Chelsea Boots", category: "Footwear", price: 215, originalPrice: 260, rating: 4.8, reviews: 201, tag: "New", emoji: "🥾", image: img("suede-chelsea-boots"), desc: "Water-resistant suede, elastic side panels, durable rubber sole." },
  { id: 16, name: "Classic Heels", category: "Footwear", price: 130, originalPrice: null, rating: 4.4, reviews: 118, tag: null, emoji: "👠", image: img("classic-heels"), desc: "Pointed toe, padded insole, 7cm stable block heel." },

  // ---------- Tech ----------
  { id: 17, name: "Marble Laptop Stand", category: "Tech", price: 59, originalPrice: null, rating: 4.5, reviews: 97, tag: null, emoji: "💻", image: img("marble-laptop-stand"), desc: "Italian Carrara marble base with adjustable aluminum arm." },
  { id: 18, name: "Wireless Earbuds", category: "Tech", price: 129, originalPrice: 169, rating: 4.6, reviews: 463, tag: "Trending", emoji: "🎧", image: img("wireless-earbuds"), desc: "Active noise cancellation, 30-hour battery with charging case." },
  { id: 19, name: "Mechanical Keyboard", category: "Tech", price: 99, originalPrice: null, rating: 4.7, reviews: 238, tag: "Bestseller", emoji: "⌨️", image: img("mechanical-keyboard"), desc: "Hot-swappable switches, aluminum frame, warm white backlight." },
  { id: 20, name: "Smart Speaker", category: "Tech", price: 89, originalPrice: 110, rating: 4.4, reviews: 152, tag: "Sale", emoji: "🔊", image: img("smart-speaker"), desc: "360-degree sound, voice assistant, fabric finish." },

  // ---------- Home ----------
  { id: 21, name: "Silk Pillowcase Set", category: "Home", price: 72, originalPrice: 95, rating: 4.8, reviews: 441, tag: "Trending", emoji: "🛏️", image: img("silk-pillowcase-set"), desc: "22 momme mulberry silk. Reduces friction, regulates temperature." },
  { id: 22, name: "Thermal Carafe", category: "Home", price: 48, originalPrice: 64, rating: 4.6, reviews: 153, tag: "Sale", emoji: "☕", image: img("thermal-carafe"), desc: "Double-wall vacuum insulation. Keeps hot 12h, cold 24h." },
  { id: 23, name: "Scented Candle Set", category: "Home", price: 54, originalPrice: null, rating: 4.7, reviews: 297, tag: "New", emoji: "🕯️", image: img("scented-candle-set"), desc: "Three soy-wax candles in amber glass jars, 40-hour burn each." },
  { id: 24, name: "Ceramic Vase", category: "Home", price: 62, originalPrice: null, rating: 4.5, reviews: 74, tag: null, emoji: "🏺", image: img("ceramic-vase"), desc: "Handmade matte ceramic vase with a speckled glaze." },
];

const CATEGORIES = ["All", "Accessories", "Clothing", "Beauty", "Footwear", "Tech", "Home"];

const TAG_COLORS = {
  Bestseller: "#C9933A",
  New: "#5B8FD4",
  "Top Rated": "#7B68C8",
  Sale: "#C94A4A",
  Trending: "#4BAF85",
};

// Shows the product photo. If the image file is missing, it falls back to the emoji.
function ProductImage({ product, emojiSize }) {
  const [failed, setFailed] = useState(false);
  if (product.image && !failed) {
    return (
      <img
        src={product.image}
        alt={product.name}
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return <span style={{ fontSize: emojiSize }}>{product.emoji}</span>;
}

export default function LuxeShop() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState("shop"); // shop | cart | product
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [qty, setQty] = useState(1);
  const [animateCart, setAnimateCart] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const avgRating = (PRODUCTS.reduce((s, p) => s + p.rating, 0) / PRODUCTS.length).toFixed(1);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, qty: quantity }];
    });
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 500);
    showNotif(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openProduct = (p) => {
    setSelectedProduct(p);
    setQty(1);
    setView("product");
  };

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  let filtered = PRODUCTS.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const styles = {
    root: { fontFamily: "'Georgia', serif", background: "#0A0A0A", minHeight: "100vh", color: "#E8E2D9" },
    nav: { background: "#0A0A0A", borderBottom: "1px solid #1E1E1E", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "sticky", top: 0, zIndex: 100 },
    logo: { fontFamily: "'Georgia', serif", fontSize: "22px", letterSpacing: "0.15em", color: "#C9933A", fontStyle: "italic", textTransform: "uppercase" },
    navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
    navLink: { fontSize: "13px", letterSpacing: "0.1em", color: "#A09890", cursor: "pointer", textTransform: "uppercase", transition: "color 0.2s", border: "none", background: "none", fontFamily: "inherit" },
    navLinkActive: { color: "#E8E2D9" },
    cartBtn: { background: "none", border: "1px solid #C9933A", borderRadius: "2px", color: "#C9933A", padding: "8px 18px", fontSize: "12px", letterSpacing: "0.1em", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s", fontFamily: "inherit" },
    hero: { padding: "5rem 2rem 4rem", textAlign: "center", borderBottom: "1px solid #1E1E1E", background: "radial-gradient(ellipse at 50% 0%, #1A1208 0%, #0A0A0A 70%)" },
    heroTag: { fontSize: "11px", letterSpacing: "0.25em", color: "#C9933A", textTransform: "uppercase", marginBottom: "1.5rem" },
    heroTitle: { fontSize: "clamp(36px, 6vw, 72px)", fontWeight: "400", lineHeight: "1.1", color: "#E8E2D9", marginBottom: "1.5rem", letterSpacing: "-0.02em" },
    heroSub: { fontSize: "16px", color: "#7A7060", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: "1.7" },
    shopBtn: { background: "#C9933A", color: "#0A0A0A", border: "none", padding: "14px 36px", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "inherit", fontWeight: "600", transition: "all 0.2s" },
    controls: { padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", borderBottom: "1px solid #1E1E1E" },
    searchBox: { flex: 1, minWidth: "200px", background: "#111", border: "1px solid #2A2A2A", borderRadius: "2px", color: "#E8E2D9", padding: "10px 14px", fontSize: "14px", fontFamily: "inherit", outline: "none" },
    catPill: { padding: "7px 16px", borderRadius: "2px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", border: "1px solid #2A2A2A", background: "none", color: "#7A7060", transition: "all 0.15s", fontFamily: "inherit" },
    catPillActive: { background: "#C9933A", borderColor: "#C9933A", color: "#0A0A0A" },
    select: { background: "#111", border: "1px solid #2A2A2A", color: "#A09890", padding: "9px 12px", fontSize: "12px", borderRadius: "2px", fontFamily: "inherit", cursor: "pointer", outline: "none" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#1E1E1E", padding: "0" },
    card: { background: "#0D0D0D", padding: "0", cursor: "pointer", transition: "background 0.2s", position: "relative", overflow: "hidden" },
    cardEmoji: { fontSize: "80px", display: "flex", alignItems: "center", justifyContent: "center", height: "200px", background: "#111", position: "relative", overflow: "hidden" },
    cardBody: { padding: "1.25rem" },
    cardCat: { fontSize: "10px", letterSpacing: "0.2em", color: "#5A5045", textTransform: "uppercase", marginBottom: "6px" },
    cardName: { fontSize: "17px", fontWeight: "400", color: "#E8E2D9", marginBottom: "8px", letterSpacing: "-0.01em" },
    cardRating: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" },
    stars: { color: "#C9933A", fontSize: "13px" },
    ratingNum: { fontSize: "12px", color: "#5A5045" },
    cardPrice: { display: "flex", alignItems: "baseline", gap: "10px" },
    price: { fontSize: "20px", color: "#C9933A", fontStyle: "italic" },
    origPrice: { fontSize: "13px", color: "#3A3530", textDecoration: "line-through" },
    cardFooter: { padding: "0 1.25rem 1.25rem", display: "flex", gap: "8px" },
    addBtn: { flex: 1, background: "#C9933A", color: "#0A0A0A", border: "none", padding: "10px", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "inherit", fontWeight: "600", transition: "all 0.15s" },
    wishBtn: { width: "38px", height: "38px", background: "none", border: "1px solid #2A2A2A", borderRadius: "2px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" },
    tag: { position: "absolute", top: "12px", left: "12px", padding: "3px 10px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "1px", fontWeight: "600", fontFamily: "sans-serif" },
    notif: { position: "fixed", bottom: "2rem", right: "2rem", background: "#1A1A1A", border: "1px solid #2E2E2E", borderLeft: "3px solid #C9933A", color: "#E8E2D9", padding: "12px 20px", fontSize: "13px", borderRadius: "2px", zIndex: 999, animation: "slideIn 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" },
    // Cart styles
    cartPage: { maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" },
    cartTitle: { fontSize: "32px", fontWeight: "400", marginBottom: "2rem", letterSpacing: "-0.02em" },
    cartItem: { display: "flex", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid #1A1A1A", alignItems: "center" },
    cartEmoji: { fontSize: "44px", background: "#111", borderRadius: "2px", width: "70px", height: "70px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" },
    cartItemName: { fontSize: "17px", color: "#E8E2D9", marginBottom: "4px" },
    cartItemCat: { fontSize: "11px", color: "#5A5045", letterSpacing: "0.12em", textTransform: "uppercase" },
    qtyControls: { display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" },
    qtyBtn: { width: "28px", height: "28px", background: "none", border: "1px solid #2A2A2A", color: "#A09890", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" },
    qtyNum: { fontSize: "15px", color: "#E8E2D9", minWidth: "20px", textAlign: "center" },
    cartItemPrice: { marginLeft: "auto", textAlign: "right" },
    removeBtn: { background: "none", border: "none", color: "#3A3530", cursor: "pointer", fontSize: "18px", marginTop: "8px" },
    summary: { background: "#111", border: "1px solid #1E1E1E", padding: "1.5rem", borderRadius: "2px", marginTop: "2rem" },
    summaryRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "14px", color: "#7A7060" },
    summaryTotal: { display: "flex", justifyContent: "space-between", padding: "14px 0 0", borderTop: "1px solid #2A2A2A", marginTop: "8px", fontSize: "20px", color: "#E8E2D9" },
    checkoutBtn: { width: "100%", background: "#C9933A", color: "#0A0A0A", border: "none", padding: "15px", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", marginTop: "1rem", fontFamily: "inherit", fontWeight: "600" },
    // Product detail
    productPage: { maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" },
    productEmoji: { background: "#111", border: "1px solid #1E1E1E", borderRadius: "2px", height: "420px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "120px", overflow: "hidden" },
    backBtn: { background: "none", border: "none", color: "#C9933A", cursor: "pointer", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem 0", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" },
  };

  const renderStars = (r) => "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(r));

  if (view === "cart") {
    return (
      <div style={styles.root}>
        <style>{`@keyframes slideIn{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}} button:hover{opacity:0.85}`}</style>
        <nav style={styles.nav}>
          <span style={styles.logo}>Luxe</span>
          <div style={styles.navLinks}>
            <button style={styles.navLink} onClick={() => setView("shop")}>Shop</button>
            <button style={{ ...styles.cartBtn, transform: animateCart ? "scale(1.1)" : "scale(1)" }} onClick={() => setView("cart")}>
              🛒 Bag ({cartCount})
            </button>
          </div>
        </nav>
        <button style={styles.backBtn} onClick={() => setView("shop")}>← Back to shop</button>
        <div style={styles.cartPage}>
          <h1 style={styles.cartTitle}>Your Bag</h1>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#5A5045" }}>
              <div style={{ fontSize: "64px", marginBottom: "1rem" }}>🛍️</div>
              <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>Your bag is empty.</p>
              <button style={styles.shopBtn} onClick={() => setView("shop")}>Start Shopping</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartEmoji}><ProductImage product={item} emojiSize="44px" /></div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.cartItemName}>{item.name}</div>
                    <div style={styles.cartItemCat}>{item.category}</div>
                    <div style={styles.qtyControls}>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                      <span style={styles.qtyNum}>{item.qty}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <div style={styles.cartItemPrice}>
                    <div style={{ ...styles.price, fontSize: "18px" }}>${(item.price * item.qty).toFixed(2)}</div>
                    <div>
                      <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={styles.summary}>
                <div style={styles.summaryRow}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div style={styles.summaryRow}><span>Shipping</span><span>Free</span></div>
                <div style={styles.summaryRow}><span>Tax (8%)</span><span>${(cartTotal * 0.08).toFixed(2)}</span></div>
                <div style={styles.summaryTotal}>
                  <span>Total</span>
                  <span style={{ color: "#C9933A", fontStyle: "italic" }}>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
                <button style={styles.checkoutBtn} onClick={() => showNotif("✓ Order placed! Thank you.")}>
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </div>
        {notification && <div style={styles.notif}>{notification}</div>}
      </div>
    );
  }

  if (view === "product" && selectedProduct) {
    const p = selectedProduct;
    const inWish = wishlist.includes(p.id);
    const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
    return (
      <div style={styles.root}>
        <style>{`@keyframes slideIn{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}} button:hover{opacity:0.85}`}</style>
        <nav style={styles.nav}>
          <span style={styles.logo}>Luxe</span>
          <div style={styles.navLinks}>
            <button style={styles.navLink} onClick={() => setView("shop")}>Shop</button>
            <button style={{ ...styles.cartBtn, transform: animateCart ? "scale(1.1)" : "scale(1)" }} onClick={() => setView("cart")}>
              🛒 Bag ({cartCount})
            </button>
          </div>
        </nav>
        <button style={styles.backBtn} onClick={() => setView("shop")}>← Back to shop</button>
        <div style={styles.productPage}>
          <div>
            <div style={styles.productEmoji}><ProductImage product={p} emojiSize="120px" /></div>
          </div>
          <div>
            {p.tag && (
              <div style={{ ...styles.tag, position: "static", display: "inline-block", marginBottom: "1rem", background: TAG_COLORS[p.tag] + "22", color: TAG_COLORS[p.tag], border: `1px solid ${TAG_COLORS[p.tag]}44` }}>
                {p.tag}
              </div>
            )}
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#5A5045", textTransform: "uppercase", marginBottom: "8px" }}>{p.category}</p>
            <h1 style={{ fontSize: "36px", fontWeight: "400", letterSpacing: "-0.02em", color: "#E8E2D9", marginBottom: "1rem" }}>{p.name}</h1>
            <div style={{ ...styles.cardRating, marginBottom: "1rem" }}>
              <span style={styles.stars}>{renderStars(p.rating)}</span>
              <span style={{ fontSize: "14px", color: "#7A7060" }}>{p.rating} ({p.reviews} reviews)</span>
            </div>
            <p style={{ fontSize: "15px", color: "#7A7060", lineHeight: "1.7", marginBottom: "1.5rem", borderLeft: "2px solid #2A2A2A", paddingLeft: "1rem" }}>{p.desc}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "2rem" }}>
              <span style={{ ...styles.price, fontSize: "28px" }}>${p.price}</span>
              {p.originalPrice && <span style={{ ...styles.origPrice, fontSize: "16px" }}>${p.originalPrice}</span>}
              {discount && <span style={{ background: "#C94A4A22", color: "#C94A4A", fontSize: "12px", padding: "3px 8px", borderRadius: "2px" }}>-{discount}% OFF</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "13px", color: "#7A7060" }}>Quantity:</span>
              <button style={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={{ ...styles.qtyNum, fontSize: "18px" }}>{qty}</span>
              <button style={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ ...styles.addBtn, fontSize: "13px", padding: "14px 0", letterSpacing: "0.12em" }}
                onClick={() => { addToCart(p, qty); setView("shop"); }}>
                Add to Bag
              </button>
              <button style={{ ...styles.wishBtn, width: "50px", height: "50px", fontSize: "22px", borderColor: inWish ? "#C9933A" : "#2A2A2A" }}
                onClick={() => toggleWishlist(p.id)}>
                {inWish ? "♥" : "♡"}
              </button>
            </div>
            <div style={{ marginTop: "2rem", padding: "1rem", background: "#111", borderRadius: "2px", border: "1px solid #1E1E1E" }}>
              <div style={{ fontSize: "12px", color: "#5A5045", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Details</div>
              <div style={{ fontSize: "13px", color: "#7A7060", lineHeight: "1.8" }}>
                ✦ Free worldwide shipping over $150<br />
                ✦ 30-day hassle-free returns<br />
                ✦ Authenticity guaranteed
              </div>
            </div>
          </div>
        </div>
        {notification && <div style={styles.notif}>{notification}</div>}
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
        @keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.12) } }
        .card-hover:hover { background: #121212 !important; }
        .card-hover:hover .card-cta { background: #D9A84A !important; }
        button:hover { opacity: 0.9; }
        .wish-hover:hover { border-color: #C9933A !important; color: #C9933A !important; }
      `}</style>

      <nav style={styles.nav}>
        <span style={styles.logo}>Luxe</span>
        <div style={styles.navLinks}>
          <button style={{ ...styles.navLink, ...(view === "shop" ? styles.navLinkActive : {}) }} onClick={() => setView("shop")}>Shop</button>
          <span style={{ fontSize: "13px", color: "#5A5045" }}>Wishlist ({wishlist.length})</span>
          <button
            style={{ ...styles.cartBtn, animation: animateCart ? "pulse 0.4s ease" : "none" }}
            onClick={() => setView("cart")}
          >
            🛒 Bag ({cartCount})
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <p style={styles.heroTag}>✦ New Season Collection 2026 ✦</p>
        <h1 style={styles.heroTitle}>
          Curated for the<br />
          <em style={{ color: "#C9933A" }}>Discerning Few</em>
        </h1>
        <p style={styles.heroSub}>Premium goods selected for quality, craft, and enduring style. Nothing ordinary, ever.</p>
        <button style={styles.shopBtn} onClick={scrollToProducts}>Explore Collection ↓</button>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "3rem", padding: "1.5rem 2rem", borderBottom: "1px solid #1E1E1E", background: "#0D0D0D", flexWrap: "wrap" }}>
        {[[String(PRODUCTS.length), "Products"], [`${avgRating}★`, "Avg Rating"], ["Free", "Shipping"], ["30d", "Returns"]].map(([val, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", color: "#C9933A", fontStyle: "italic", fontWeight: "400" }}>{val}</div>
            <div style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#5A5045", textTransform: "uppercase" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          style={styles.searchBox}
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              style={{ ...styles.catPill, ...(activeCategory === cat ? styles.catPillActive : {}) }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select style={styles.select} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Results count */}
      <div id="products" style={{ padding: "1rem 2rem 0.5rem", fontSize: "12px", color: "#5A5045", letterSpacing: "0.1em" }}>
        {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""} FOUND
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {filtered.map(p => {
          const inWish = wishlist.includes(p.id);
          const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
          return (
            <div key={p.id} className="card-hover" style={styles.card}>
              <div style={styles.cardEmoji} onClick={() => openProduct(p)}>
                <ProductImage product={p} emojiSize="72px" />
                {p.tag && (
                  <div style={{ ...styles.tag, background: TAG_COLORS[p.tag] + "22", color: TAG_COLORS[p.tag], border: `1px solid ${TAG_COLORS[p.tag]}44` }}>
                    {p.tag}
                  </div>
                )}
                {discount && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: "#C94A4A22", color: "#C94A4A", fontSize: "10px", padding: "3px 8px", letterSpacing: "0.08em", borderRadius: "1px", border: "1px solid #C94A4A44" }}>
                    -{discount}%
                  </div>
                )}
              </div>
              <div style={styles.cardBody} onClick={() => openProduct(p)}>
                <div style={styles.cardCat}>{p.category}</div>
                <div style={styles.cardName}>{p.name}</div>
                <div style={styles.cardRating}>
                  <span style={styles.stars}>{renderStars(p.rating)}</span>
                  <span style={styles.ratingNum}>{p.rating} ({p.reviews})</span>
                </div>
                <div style={styles.cardPrice}>
                  <span style={styles.price}>${p.price}</span>
                  {p.originalPrice && <span style={styles.origPrice}>${p.originalPrice}</span>}
                </div>
              </div>
              <div style={styles.cardFooter}>
                <button className="card-cta" style={styles.addBtn} onClick={() => addToCart(p)}>
                  Add to Bag
                </button>
                <button
                  className="wish-hover"
                  style={{ ...styles.wishBtn, color: inWish ? "#C9933A" : "#5A5045", borderColor: inWish ? "#C9933A44" : "#2A2A2A" }}
                  onClick={() => toggleWishlist(p.id)}
                >
                  {inWish ? "♥" : "♡"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#5A5045" }}>
          <div style={{ fontSize: "48px", marginBottom: "1rem" }}>🔍</div>
          <p style={{ fontSize: "18px" }}>No products found.</p>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1E1E1E", padding: "3rem 2rem", marginTop: "2rem", background: "#0D0D0D" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ ...styles.logo, display: "block", marginBottom: "8px" }}>Luxe</div>
            <p style={{ fontSize: "13px", color: "#5A5045", maxWidth: "260px", lineHeight: "1.7" }}>Premium goods for the discerning. Quality over quantity, always.</p>
          </div>
          {[["Shop", ["New Arrivals", "Bestsellers", "Sale"]], ["Help", ["Shipping", "Returns", "FAQ"]]].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#C9933A", textTransform: "uppercase", marginBottom: "14px" }}>{title}</div>
              {links.map(l => <div key={l} style={{ fontSize: "13px", color: "#5A5045", marginBottom: "8px", cursor: "pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1A1A1A", marginTop: "2rem", paddingTop: "1.5rem", fontSize: "11px", color: "#3A3530", letterSpacing: "0.1em", textAlign: "center" }}>
          © 2026 LUXE — ALL RIGHTS RESERVED
        </div>
      </footer>

      {notification && <div style={styles.notif}>{notification}</div>}
    </div>
  );
}