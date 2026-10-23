import { useState } from 'react'
import './App.css'

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
}

const startingProducts = [
  { id: 1, name: 'Everyday Ceramic Mug', category: 'Home & Living', price: 24, stock: 38, description: 'Hand-finished stoneware, made for your daily ritual.', color: 'clay', icon: '☕' },
  { id: 2, name: 'Linen Market Tote', category: 'Accessories', price: 42, stock: 16, description: 'A roomy, reusable tote in natural washed linen.', color: 'sage', icon: '◒' },
  { id: 3, name: 'Botanical Desk Set', category: 'Stationery', price: 18, stock: 52, description: 'A little green for your everyday notes and plans.', color: 'butter', icon: '✿' },
]

function App() {
  const [form, setForm] = useState(emptyProduct)
  const [products, setProducts] = useState(startingProducts)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newProduct = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      stock: Number(form.stock),
      color: 'lavender',
      icon: '✧',
    }
    setProducts((current) => [newProduct, ...current])
    setForm(emptyProduct)
    setMessage(`${newProduct.name} was added to your products.`)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#main"><span className="brand-icon">M</span> moss<span>.</span></a>
        <div className="store-card">
          <div className="store-avatar">M</div>
          <div><span>YOUR STORE</span><strong>Moss &amp; Found</strong></div>
          <span className="store-caret">⌄</span>
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          <span className="nav-caption">WORKSPACE</span>
          <a href="#overview" className="nav-link"><span>◫</span> Overview</a>
          <a href="#products" className="nav-link active"><span>▦</span> Products <b>{products.length}</b></a>
          <a href="#orders" className="nav-link"><span>▤</span> Orders</a>
          <a href="#customers" className="nav-link"><span>♧</span> Customers</a>
          <span className="nav-caption insights-caption">INSIGHTS</span>
          <a href="#analytics" className="nav-link"><span>⌁</span> Analytics</a>
        </nav>
        <div className="sidebar-footer">
          <div className="help-card"><span className="help-icon">?</span><strong>Need a hand?</strong><small>Visit the help center</small></div>
          <div className="user-card"><span className="user-avatar">OR</span><span><strong>Olivia Rhye</strong><small>Store owner</small></span><b>···</b></div>
        </div>
      </aside>

      <main className="main-content" id="main">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>Products</strong></div>
          <div className="topbar-right"><button type="button" aria-label="Notifications" className="notification-button">♧<i /></button><span className="topbar-divider" /><span className="user-avatar">OR</span></div>
        </header>

        <div className="content-wrap">
          <div className="page-intro">
            <div><span className="eyebrow">YOUR CATALOG</span><h1>Products <span>{products.length}</span></h1><p>Keep your collection fresh and your shelves in order.</p></div>
            <button className="new-product-button" type="button" onClick={() => document.getElementById('product-name')?.focus()}><span>＋</span> Add product</button>
          </div>

          <section className="summary-grid" aria-label="Catalog summary">
            <article className="summary-card"><div><span>Products listed</span><span className="summary-icon green">▦</span></div><strong>{products.length}</strong><small><b>↑ 3</b> added this month</small></article>
            <article className="summary-card"><div><span>Total inventory</span><span className="summary-icon lavender">▤</span></div><strong>{products.reduce((sum, product) => sum + product.stock, 0)}</strong><small>Items across all products</small></article>
            <article className="summary-card"><div><span>Low stock</span><span className="summary-icon amber">◷</span></div><strong>{products.filter((product) => product.stock < 10).length}</strong><small>Products with fewer than 10</small></article>
          </section>

          <section className="catalog-panel" id="products">
            <div className="catalog-heading"><div><h2>All products</h2><p>A little inventory, a lot of possibility.</p></div><button className="sort-button" type="button">Recently added <span>⌄</span></button></div>
            {message && <p className="success-message" role="status"><span>✓</span>{message}</p>}
            <div className="product-list">
              {products.map((product) => (
                <article className="product-row" key={product.id}>
                  <div className={`product-thumb ${product.color}`} aria-hidden="true">{product.icon}</div>
                  <div className="product-info"><strong>{product.name}</strong><span>{product.description || product.category}</span></div>
                  <span className="product-category">{product.category}</span>
                  <strong className="product-price">${product.price.toFixed(2)}</strong>
                  <span className={`stock-pill ${product.stock < 10 ? 'low-stock' : ''}`}><i />{product.stock} in stock</span>
                  <button className="more-button" type="button" aria-label={`More options for ${product.name}`}>···</button>
                </article>
              ))}
            </div>
            <div className="list-footer">Showing <strong>{products.length}</strong> products <span>All caught up <b>✳</b></span></div>
          </section>

          <section className="create-panel" id="add-product">
            <div className="create-heading"><div className="create-icon">＋</div><div><span className="eyebrow">GROW YOUR COLLECTION</span><h2>Add a new product</h2><p>Give your next great find a place in your store.</p></div></div>
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field"><label htmlFor="product-name">Product name <span>*</span></label><input id="product-name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sunday Morning Candle" required /></div>
                <div className="form-field"><label htmlFor="product-category">Category <span>*</span></label><select id="product-category" name="category" value={form.category} onChange={handleChange} required><option value="" disabled>Select a category</option><option>Home &amp; Living</option><option>Accessories</option><option>Stationery</option><option>Wellness</option><option>Other</option></select></div>
              </div>
              <div className="form-row compact-row">
                <div className="form-field"><label htmlFor="product-price">Price <span>*</span></label><div className="input-prefix"><span>$</span><input id="product-price" name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required /></div></div>
                <div className="form-field"><label htmlFor="product-stock">Initial stock <span>*</span></label><input id="product-stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} placeholder="0" required /></div>
              </div>
              <div className="form-field description-field"><label htmlFor="product-description">Description <small>Optional</small></label><textarea id="product-description" name="description" rows="3" value={form.description} onChange={handleChange} placeholder="What makes this one special?" /></div>
              <div className="form-footer"><span><b>*</b> Required fields</span><button className="submit-button" type="submit">Add product <span>→</span></button></div>
            </form>
          </section>

          <footer className="page-footer"><span>© 2025 MOSS &amp; FOUND</span><span>GOOD THINGS, THOUGHTFULLY FOUND <b>✳</b></span></footer>
        </div>
      </main>
    </div>
  )
}

export default App
