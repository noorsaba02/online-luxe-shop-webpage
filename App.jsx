import { useState } from 'react'
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import { PRODUCTS, CATEGORIES } from './data'
import styles from './App.module.css'

function Toast({ message }) {
  return message ? <div className={styles.toast}>{message}</div> : null
}

export default function App() {
  const [view, setView] = useState('shop')       // 'shop' | 'product' | 'cart'
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toast, setToast] = useState(null)
  const [animateCart, setAnimateCart] = useState(false)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id)
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
    setAnimateCart(true)
    setTimeout(() => setAnimateCart(false), 500)
    showToast(`✓ ${product.name} added to bag`)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const openProduct = (p) => { setSelected(p); setView('product') }

  let filtered = PRODUCTS.filter(p => {
    const catOk = category === 'All' || p.category === category
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    return catOk && searchOk
  })
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div className={styles.app}>
      <Navbar
        cartCount={cartCount}
        wishCount={wishlist.length}
        onCartClick={() => setView('cart')}
        onLogoClick={() => setView('shop')}
        animate={animateCart}
      />

      {view === 'product' && selected && (
        <ProductDetail
          product={selected}
          onBack={() => setView('shop')}
          onAdd={(p, qty) => { addToCart(p, qty); setView('shop') }}
          onWish={toggleWishlist}
          wishlisted={wishlist.includes(selected.id)}
        />
      )}

      {view === 'cart' && (
        <Cart
          cart={cart}
          onBack={() => setView('shop')}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onCheckout={() => { showToast('✓ Order placed! Thank you.'); setCart([]) }}
        />
      )}

      {view === 'shop' && (
        <>
          {/* Hero */}
          <section className={styles.hero}>
            <p className={styles.heroTag}>✦ New Season Collection 2025 ✦</p>
            <h1 className={styles.heroTitle}>
              Curated for the<br />
              <em className={styles.heroAccent}>Discerning Few</em>
            </h1>
            <p className={styles.heroSub}>
              Premium goods selected for quality, craft, and enduring style.
            </p>
            <button className={styles.heroBtn}>Explore Collection ↓</button>
          </section>

          {/* Stats bar */}
          <div className={styles.statsBar}>
            {[['8', 'Products'], ['4.7★', 'Avg Rating'], ['Free', 'Shipping'], ['30d', 'Returns']].map(([val, lbl]) => (
              <div key={lbl} className={styles.stat}>
                <span className={styles.statVal}>{val}</span>
                <span className={styles.statLbl}>{lbl}</span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <input
              className={styles.search}
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className={styles.cats}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${category === cat ? styles.catActive : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              className={styles.sort}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <p className={styles.resultCount}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <span>🔍</span>
              <p>No products found for "{search}"</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={addToCart}
                  onWish={toggleWishlist}
                  onView={openProduct}
                  wishlisted={wishlist.includes(p.id)}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerInner}>
              <div>
                <span className={styles.footerLogo}>Luxe</span>
                <p className={styles.footerTagline}>Premium goods for the discerning.<br />Quality over quantity, always.</p>
              </div>
              <div>
                <p className={styles.footerHeading}>Shop</p>
                {['New Arrivals', 'Bestsellers', 'Sale', 'All Products'].map(l => (
                  <p key={l} className={styles.footerLink}>{l}</p>
                ))}
              </div>
              <div>
                <p className={styles.footerHeading}>Help</p>
                {['Shipping', 'Returns', 'FAQ', 'Contact'].map(l => (
                  <p key={l} className={styles.footerLink}>{l}</p>
                ))}
              </div>
            </div>
            <p className={styles.footerCopy}>© 2025 Luxe — All rights reserved</p>
          </footer>
        </>
      )}

      <Toast message={toast} />
    </div>
  )
}
