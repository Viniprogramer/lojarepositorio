import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  bikes,
  brands,
  categories,
  localizeCategory,
  localizeProduct,
  money,
  products,
} from "./data";

const LocaleContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: {},
});

const copy = {
  en: {
    freeShipping: "Free shipping over R$ 299",
    pixOff: "5% OFF with PIX",
    securePurchase: "Secure checkout",
    installment: "Up to 10 installments",
    searchPlaceholder: "Search by part, SKU, or bike model...",
    search: "Search",
    helloRider: "Hello, rider",
    myAccount: "My account",
    loginRegister: "Login / register",
    cart: "Cart",
    navParts: "Parts for your bike",
    navCategories: "Categories",
    navNew: "New arrivals",
    navDeals: "Deals",
    navAbout: "About MotoForge",
    navContact: "Contact",
    navWeekDeals: "Deals of the week",
    home: "Home",
    products: "Products",
    filters: "Filters",
    clearFilters: "Clear filters",
    category: "Category",
    brand: "Brand",
    compatibility: "Compatibility",
    all: "All",
    noResults: "No products found",
    clearSearch: "Clear search",
    remove: "Remove",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue shopping",
    checkout: "Checkout",
    orderSummary: "Order summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    finishPurchase: "Complete purchase",
    addToCart: "Add to cart",
    added: "Added",
    specs: "Technical specifications",
    relatedProducts: "Related products",
    sendMessage: "Send message",
    messageSent: "Message sent",
    english: "EN",
    portuguese: "PT-BR",
  },
  "pt-BR": {
    freeShipping: "Frete grátis acima de R$ 299",
    pixOff: "5% OFF no PIX",
    securePurchase: "Compra segura",
    installment: "Parcelamento em até 10x",
    searchPlaceholder: "Busque por peça, código ou modelo...",
    search: "Buscar",
    helloRider: "Olá, piloto",
    myAccount: "Minha conta",
    loginRegister: "Entrar / cadastrar",
    cart: "Carrinho",
    navParts: "Peças para sua moto",
    navCategories: "Categorias",
    navNew: "Lançamentos",
    navDeals: "Ofertas",
    navAbout: "A MotoForge",
    navContact: "Contato",
    navWeekDeals: "Ofertas da semana",
    home: "Início",
    products: "Produtos",
    filters: "Filtros",
    clearFilters: "Limpar filtros",
    category: "Categoria",
    brand: "Marca",
    compatibility: "Compatibilidade",
    all: "Todas",
    noResults: "Nenhum produto encontrado",
    clearSearch: "Limpar busca",
    remove: "Remover",
    emptyCart: "Seu carrinho está vazio",
    continueShopping: "Continuar comprando",
    checkout: "Checkout",
    orderSummary: "Resumo do pedido",
    subtotal: "Subtotal",
    shipping: "Frete",
    free: "Grátis",
    total: "Total",
    finishPurchase: "Finalizar compra",
    addToCart: "Adicionar ao carrinho",
    added: "Adicionado",
    specs: "Especificações técnicas",
    relatedProducts: "Produtos relacionados",
    sendMessage: "Enviar mensagem",
    messageSent: "Mensagem enviada",
    english: "EN",
    portuguese: "PT-BR",
  },
};

function useLocale() {
  return useContext(LocaleContext);
}

const Icon = ({ name, size = 19 }) => {
  const p = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.5 11h9l2-8H6" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    truck: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {p[name]}
    </svg>
  );
};

function useStore() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("mf-cart") || "[]"),
  );
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("mf-wishlist") || "[]"),
  );
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("mf-user") || "null"),
  );
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("mf-orders") || "[]"),
  );
  useEffect(
    () => localStorage.setItem("mf-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("mf-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  useEffect(
    () =>
      user
        ? localStorage.setItem("mf-user", JSON.stringify(user))
        : localStorage.removeItem("mf-user"),
    [user],
  );
  useEffect(
    () => localStorage.setItem("mf-orders", JSON.stringify(orders)),
    [orders],
  );
  const add = (product, qty = 1) =>
    setCart((c) => {
      const f = c.find((x) => x.id === product.id);
      return f
        ? c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + qty } : x))
        : [...c, { ...product, qty }];
    });
  const remove = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const change = (id, d) =>
    setCart((c) =>
      c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)),
    );
  const toggleWish = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  return {
    cart,
    setCart,
    wishlist,
    toggleWish,
    user,
    setUser,
    orders,
    setOrders,
    add,
    remove,
    change,
    cartCount,
    cartTotal,
  };
}

function Layout({ store }) {
  const { locale, setLocale, t } = useLocale();
  const nav = useNavigate(),
    loc = useLocation();
  const [q, setQ] = useState(new URLSearchParams(loc.search).get("q") || "");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => setMobile(false), [loc.pathname]);
  const submit = (e) => {
    e.preventDefault();
    nav(`/produtos?q=${encodeURIComponent(q)}`);
  };
  return (
    <>
      <div className="top-strip">
        <div className="container strip-inner">
          <span>{t.freeShipping}</span>
          <i>•</i>
          <span>{t.pixOff}</span>
          <i>•</i>
          <span>{t.securePurchase}</span>
          <i>•</i>
          <span>{t.installment}</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-main">
          <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
            <Icon name={mobile ? "close" : "menu"} />
          </button>
          <Link className="logo" to="/">
            <span className="logo-mark">MF</span>
            <span>
              MOTOFORGE<span>PARTS</span>
            </span>
          </Link>
          <form className="header-search" onSubmit={submit}>
            <Icon name="search" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
            />
            <button>{t.search}</button>
          </form>
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => setLocale(locale === "pt-BR" ? "en" : "pt-BR")}
            >
              {locale === "pt-BR" ? t.english : t.portuguese}
            </button>
            <Link
              className="action-btn account-btn"
              to={store.user ? "/conta" : "/login"}
            >
              <Icon name="user" />
              <span>
                <small>
                  {store.user
                    ? (locale === "pt-BR" ? "Olá, " : "Hello, ") +
                      store.user.name.split(" ")[0]
                    : t.helloRider}
                </small>
                {store.user ? t.myAccount : t.loginRegister}
              </span>
            </Link>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <Icon name="cart" size={22} />
              <b>{store.cartCount}</b>
              <span>{t.cart}</span>
            </button>
          </div>
        </div>
        <nav className={"nav " + (mobile ? "open" : "")}>
          <div className="container nav-inner">
            <NavLink to="/produtos">{t.navParts}</NavLink>
            <NavLink to="/categorias">{t.navCategories}</NavLink>
            <NavLink to="/produtos?sort=new">{t.navNew}</NavLink>
            <NavLink to="/produtos?offer=true">{t.navDeals}</NavLink>
            <NavLink to="/sobre">{t.navAbout}</NavLink>
            <NavLink to="/contato">{t.navContact}</NavLink>
            <NavLink className="nav-highlight" to="/produtos?offer=true">
              ⚡ {t.navWeekDeals}
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home store={store} />} />
          <Route path="/produtos" element={<ProductsPage store={store} />} />
          <Route path="/produto/:id" element={<ProductPage store={store} />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route
            path="/categoria/:category"
            element={<ProductsPage store={store} />}
          />
          <Route
            path="/carrinho"
            element={
              <CartPage store={store} onCheckout={() => nav("/checkout")} />
            }
          />
          <Route path="/checkout" element={<CheckoutPage store={store} />} />
          <Route path="/login" element={<LoginPage store={store} />} />
          <Route path="/conta" element={<AccountPage store={store} />} />
          <Route path="/pedidos" element={<OrdersPage store={store} />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {cartOpen && (
        <CartDrawer store={store} onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}

function Home({ store }) {
  const { locale } = useLocale();
  const nav = useNavigate();
  const [bike, setBike] = useState("");
  const [toast, setToast] = useState("");
  const featured = products.slice(0, 4);
  const add = (p) => {
    const lp = localizeProduct(p, locale);
    store.add(p);
    setToast(
      locale === "pt-BR"
        ? `${lp.name} adicionado ao carrinho`
        : `${lp.name} added to cart`,
    );
    setTimeout(() => setToast(""), 1800);
  };
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">
              <i />
              {locale === "pt-BR"
                ? "PEÇAS PARA QUEM VIVE DUAS RODAS"
                : "PARTS FOR PEOPLE WHO LIVE ON TWO WHEELS"}
            </span>
            <h1>
              {locale === "pt-BR" ? "Encontre a peça certa." : "Find the right part."}
              <br />
              <em>{locale === "pt-BR" ? "Sem perder tempo." : "Without wasting time."}</em>
            </h1>
            <p>
              {locale === "pt-BR"
                ? "Peças, acessórios e componentes para sua moto, com catálogo organizado, compatibilidade por modelo e uma experiência de compra feita para quem entende de duas rodas."
                : "Parts, accessories and components for your bike, with an organized catalog, model compatibility, and a shopping experience built for riders."}
            </p>
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => nav("/produtos")}>
                {locale === "pt-BR" ? "Comprar peças" : "Shop parts"} <Icon name="arrow" size={16} />
              </button>
              <button
                className="btn ghost"
                onClick={() =>
                  document
                    .getElementById("fit")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {locale === "pt-BR" ? "Encontrar pela minha moto" : "Find by my bike"}
              </button>
            </div>
            <div className="hero-trust">
              <span>
                <Icon name="check" size={14} /> {locale === "pt-BR" ? "Compatibilidade" : "Compatibility"}
              </span>
              <span>
                <Icon name="check" size={14} /> {locale === "pt-BR" ? "Invoice" : "Invoice"}
              </span>
              <span>
                <Icon name="check" size={14} /> {locale === "pt-BR" ? "Garantia" : "Warranty"}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="container stats-inner">
            <div>
              <strong>2.000+</strong>
              <span>{locale === "pt-BR" ? "itens no catálogo" : "items in catalog"}</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>{locale === "pt-BR" ? "clientes satisfeitos" : "happy customers"}</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>{locale === "pt-BR" ? "despacho rápido" : "fast dispatch"}</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>{locale === "pt-BR" ? "avaliação média" : "average rating"}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="fit-bar" id="fit">
        <div className="container fit-inner">
          <div>
            <span className="eyebrow">
              {locale === "pt-BR" ? "COMPATIBILIDADE INTELIGENTE" : "SMART COMPATIBILITY"}
            </span>
            <h2>
              {locale === "pt-BR"
                ? "Escolha sua moto e veja o que serve."
                : "Choose your bike and see what fits."}
            </h2>
          </div>
          <div className="bike-control">
            <select value={bike} onChange={(e) => setBike(e.target.value)}>
              <option value="">{locale === "pt-BR" ? "Selecione o modelo" : "Select model"}</option>
              {bikes.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <button
              disabled={!bike}
              onClick={() => nav(`/produtos?bike=${encodeURIComponent(bike)}`)}
            >
              {locale === "pt-BR" ? "Ver peças" : "View parts"} <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </section>
      <section className="section gray">
        <div className="container">
          <SectionHead
            eyebrow={locale === "pt-BR" ? "NAVEGUE POR CATEGORIA" : "BROWSE BY CATEGORY"}
            title={locale === "pt-BR" ? "Tudo para sua moto" : "Everything for your bike"}
            link="/categorias"
            linkText={locale === "pt-BR" ? "Ver todas" : "View all"}
          />
          <div className="category-grid">
            {categories.slice(0, 6).map((c, i) => (
              <Link
                className="category-card"
                to={`/categoria/${encodeURIComponent(c)}`}
                key={c}
              >
                <span className="cat-number">0{i + 1}</span>
                <div>
                  <strong>{localizeCategory(c, locale)}</strong>
                  <small>
                    {products.filter((p) => p.category === c).length * 18 + 20}+ {locale === "pt-BR" ? "produtos" : "products"}
                  </small>
                </div>
                <Icon name="arrow" size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={locale === "pt-BR" ? "SELEÇÃO MOTOFORGE" : "MOTOFORGE PICKS"}
            title={locale === "pt-BR" ? "Destaques da semana" : "Weekly highlights"}
            link="/produtos"
            linkText={locale === "pt-BR" ? "Ver catálogo" : "View catalog"}
          />
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} store={store} onAdd={add} />
            ))}
          </div>
        </div>
      </section>
      <section className="dark-promo">
        <div className="container promo-grid">
          <div>
            <span className="eyebrow">{locale === "pt-BR" ? "OFERTA ESPECIAL" : "SPECIAL OFFER"}</span>
            <h2>{locale === "pt-BR" ? "5% OFF no PIX." : "5% OFF with PIX."}</h2>
            <p>
              {locale === "pt-BR"
                ? "Desconto demonstrativo aplicado no checkout para compras via PIX."
                : "Demo discount applied at checkout for PIX payments."}
            </p>
            <button
              className="btn light"
              onClick={() => nav("/produtos?offer=true")}
            >
              {locale === "pt-BR" ? "Ver ofertas" : "View deals"} <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="promo-photo">
            <img
              src="https://images.unsplash.com/photo-1558980664-10ea6e1f9b35?auto=format&fit=crop&w=1000&q=85"
              alt={locale === "pt-BR" ? "Moto" : "Motorcycle"}
            />
          </div>
        </div>
      </section>
      <Benefits />
      <AboutPage compact />
      <Reviews />
      <Newsletter />
      {toast && (
        <div className="toast">
          <Icon name="check" size={15} />
          {toast}
        </div>
      )}
    </>
  );
}

function SectionHead({ eyebrow, title, link, linkText }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow dark">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" to={link}>
          {linkText}
          <Icon name="arrow" size={15} />
        </Link>
      )}
    </div>
  );
}

function ProductCard({ p, store, onAdd }) {
  const { locale, t } = useLocale();
  const liked = store.wishlist.includes(p.id);
  const lp = localizeProduct(p, locale);
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/produto/${p.id}`}>
          <img src={p.image} alt={lp.name} />
        </Link>
        {p.badge && <span className="badge">{lp.badgeLabel}</span>}
        <button
          className={"heart " + (liked ? "liked" : "")}
          onClick={() => store.toggleWish(p.id)}
        >
          <Icon name="heart" size={17} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">
          {lp.categoryLabel} · {p.brand}
        </span>
        <Link to={`/produto/${p.id}`}>
          <h3>{lp.name}</h3>
        </Link>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span>
            {p.rating} ({p.reviews})
          </span>
        </div>
        <div className="fit-tags">
          {p.fit.slice(0, 2).map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="price-row">
          <div>
            {p.oldPrice && <del>{money(p.oldPrice)}</del>}
            <strong>{money(p.price, locale)}</strong>
            <small>
              {locale === "pt-BR" ? "ou" : "or"} 10x {locale === "pt-BR" ? "de" : "of"}{" "}
              {money(p.price / 10, locale)} {locale === "pt-BR" ? "sem juros" : "interest-free"}
            </small>
          </div>
          <button className="add-btn" onClick={() => onAdd(p)}>
            <Icon name="cart" size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductsPage({ store }) {
  const { locale, t } = useLocale();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "",
    bike = params.get("bike") || "",
    offer = params.get("offer") === "true",
    sort = params.get("sort") || "relevance";
  const [brand, setBrand] = useState(""),
    [cat, setCat] = useState(""),
    [max, setMax] = useState(600),
    [mobileFilter, setMobileFilter] = useState(false);
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (!q ||
              [p.name, p.brand, p.category, p.sku, ...p.fit]
                .join(" ")
                .toLowerCase()
                .includes(q.toLowerCase())) &&
            (!bike || p.fit.includes(bike)) &&
            (!brand || p.brand === brand) &&
            (!cat || p.category === cat) &&
            (!offer || p.oldPrice) &&
            p.price <= max,
        )
        .sort((a, b) =>
          sort === "priceAsc"
            ? a.price - b.price
            : sort === "priceDesc"
              ? b.price - a.price
              : sort === "rating"
                ? b.rating - a.rating
                : sort === "new"
                  ? (b.badge === "Novo" ? 1 : 0) - (a.badge === "Novo" ? 1 : 0)
                  : 0,
        ),
    [q, bike, brand, cat, max, offer, sort],
  );
  const set = (k, v) => {
    const n = new URLSearchParams(params);
    v ? n.set(k, v) : n.delete(k);
    setParams(n);
  };
  return (
    <div className="catalog-page">
      <div className="container breadcrumbs">
        <Link to="/">{t.home}</Link>
        <span>/</span>
        <b>{t.products}</b>
      </div>
      <div className="container catalog-layout">
        <aside className={"filters " + (mobileFilter ? "show" : "")}>
          <div className="filter-head">
            <strong>Filtros</strong>
            <button onClick={() => setMobileFilter(false)}>
              <Icon name="close" size={17} />
            </button>
          </div>
          <Filter title={t.category}>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">{t.all}</option>
              {categories.map((c) => (
                <option key={c}>{localizeCategory(c, locale)}</option>
              ))}
            </select>
          </Filter>
          <Filter title={t.brand}>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">{t.all}</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Filter>
          <Filter title={t.compatibility}>
            <select value={bike} onChange={(e) => set("bike", e.target.value)}>
              <option value="">{t.all}</option>
              {bikes.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Filter>
          <Filter title={`${locale === "pt-BR" ? "Preço até" : "Price up to"} ${money(max, locale)}`}>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={max}
              onChange={(e) => setMax(+e.target.value)}
            />
            <div className="range-label">
              <span>{money(50, locale)}</span>
              <span>{money(600, locale)}</span>
            </div>
          </Filter>
          <button
            className="clear-filters"
            onClick={() => {
              setBrand("");
              setCat("");
              setMax(600);
              set("bike", "");
              set("offer", "");
            }}
          >
            {t.clearFilters}
          </button>
        </aside>
        <section className="catalog-results">
          <div className="catalog-top">
            <div>
              <span className="eyebrow dark">CATÁLOGO</span>
              <h1>
                {offer
                  ? "Ofertas"
                  : bike
                    ? `Peças para ${bike}`
                    : locale === "pt-BR"
                      ? "Peças para sua moto"
                      : "Parts for your bike"}
              </h1>
              <p>
                {filtered.length} {locale === "pt-BR" ? "produtos encontrados" : "products found"}
                {q && ` ${locale === "pt-BR" ? "para" : "for"} "${q}"`}
              </p>
            </div>
            <div className="sorts">
              <button
                className="mobile-filter"
                onClick={() => setMobileFilter(true)}
              >
                {t.filters}
              </button>
              <select
                value={sort}
                onChange={(e) => set("sort", e.target.value)}
              >
                <option value="relevance">
                  {locale === "pt-BR" ? "Mais relevantes" : "Most relevant"}
                </option>
                <option value="new">{locale === "pt-BR" ? "Lançamentos" : "New arrivals"}</option>
                <option value="rating">
                  {locale === "pt-BR" ? "Melhor avaliados" : "Top rated"}
                </option>
                <option value="priceAsc">
                  {locale === "pt-BR" ? "Menor preço" : "Lowest price"}
                </option>
                <option value="priceDesc">
                  {locale === "pt-BR" ? "Maior preço" : "Highest price"}
                </option>
              </select>
            </div>
          </div>
          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} store={store} onAdd={store.add} />
              ))}
            </div>
          ) : (
            <EmptySearch q={q} />
          )}
        </section>
      </div>
    </div>
  );
}

function Filter({ title, children }) {
  return (
    <div className="filter-group">
      <label>{title}</label>
      {children}
    </div>
  );
}
function EmptySearch({ q }) {
  const { locale, t } = useLocale();
  return (
    <div className="empty-search">
      <div>⌕</div>
      <h2>{t.noResults}</h2>
      <p>
        {locale === "pt-BR"
          ? "Não encontramos resultados para"
          : "We could not find results for"}{" "}
        {q ? `"${q}"` : locale === "pt-BR" ? "os filtros selecionados" : "the selected filters"}.
      </p>
      <Link className="btn primary" to="/produtos">
        {t.clearSearch}
      </Link>
    </div>
  );
}

function ProductPage({ store }) {
  const { locale, t } = useLocale();
  const { id } = useParams(),
    p = products.find((x) => x.id === id),
    [qty, setQty] = useState(1),
    [image, setImage] = useState(0),
    [added, setAdded] = useState(false);
  if (!p) return <NotFound />;
  const lp = localizeProduct(p, locale);
  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4);
  const add = () => {
    store.add(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div className="product-page">
      <div className="container breadcrumbs">
        <Link to="/">{t.home}</Link>
        <span>/</span>
        <Link to="/produtos">{t.products}</Link>
        <span>/</span>
        <b>{lp.name}</b>
      </div>
      <div className="container product-detail">
        <div className="gallery">
          <div className="thumbs">
            {p.gallery.map((g, i) => (
              <button
                className={image === i ? "active" : ""}
                key={g}
                onClick={() => setImage(i)}
              >
                <img src={g} alt="" />
              </button>
            ))}
          </div>
          <div className="main-image">
            <img src={p.gallery[image]} alt={lp.name} />
            <span className="badge">{lp.badgeLabel}</span>
          </div>
        </div>
        <div className="detail-copy">
          <span className="product-category">
            {lp.categoryLabel} · {p.brand}
          </span>
          <h1>{lp.name}</h1>
          <div className="rating large">
            <span className="stars">★★★★★</span>
            <b>{p.rating}</b>
            <span>{p.reviews} {locale === "pt-BR" ? "avaliações" : "reviews"}</span>
          </div>
          <div className="sku">SKU: {p.sku}</div>
          <p className="detail-description">{lp.description}</p>
          <div className="compat-box">
            <strong>{t.compatibility}</strong>
            <span>✓ {p.fit.join("  ·  ")}</span>
            <small>
              {locale === "pt-BR"
                ? "Confira sempre a aplicação da peça antes da instalação."
                : "Always verify compatibility before installation."}
            </small>
          </div>
          <div className="detail-price">
            {p.oldPrice && <del>{money(p.oldPrice, locale)}</del>}
            <strong>{money(p.price, locale)}</strong>
            <span>
              {locale === "pt-BR" ? "ou 10x de" : "or 10x of"} {money(p.price / 10, locale)} {locale === "pt-BR" ? "sem juros" : "interest-free"}
            </span>
          </div>
          <div className="buy-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Icon name="minus" size={14} />
              </button>
              <b>{qty}</b>
              <button onClick={() => setQty(qty + 1)}>
                <Icon name="plus" size={14} />
              </button>
            </div>
            <button className="btn primary buy" onClick={add}>
              {added ? (
                <>
                  <Icon name="check" /> {t.added}
                </>
              ) : (
                <>
                  {t.addToCart} <Icon name="cart" size={17} />
                </>
              )}
            </button>
          </div>
          <div className="detail-trust">
            <span>
              <Icon name="truck" size={18} />
              <b>{locale === "pt-BR" ? "Envio rápido" : "Fast shipping"}</b>
              <small>{locale === "pt-BR" ? "Despacho em até 24h" : "Dispatch in up to 24h"}</small>
            </span>
            <span>
              <Icon name="shield" size={18} />
              <b>{locale === "pt-BR" ? "Compra segura" : "Secure checkout"}</b>
              <small>{locale === "pt-BR" ? "Ambiente protegido" : "Protected environment"}</small>
            </span>
            <span>
              <Icon name="check" size={18} />
              <b>Garantia</b>
              <small>12 meses</small>
            </span>
          </div>
        </div>
      </div>
      <div className="container product-tabs">
        <div className="tab-panel">
          <h2>{t.specs}</h2>
          <div className="spec-table">
            {lp.specs.map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <strong>{b}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="tab-panel">
          <h2>{locale === "pt-BR" ? "Sobre este produto" : "About this product"}</h2>
          <p>
            {lp.description}{" "}
            {locale === "pt-BR"
              ? "A MotoForge seleciona produtos pensando em durabilidade, compatibilidade e facilidade de manutenção."
              : "MotoForge selects products focused on durability, compatibility, and easy maintenance."}
          </p>
          <div className="check-list">
            <span>
              <Icon name="check" /> Produto selecionado
            </span>
            <span>
              <Icon name="check" /> Nota fiscal
            </span>
            <span>
              <Icon name="check" /> Garantia de fábrica
            </span>
            <span>
              <Icon name="check" /> Embalagem segura
            </span>
          </div>
        </div>
      </div>
      <section className="section related">
        <div className="container">
          <SectionHead
            eyebrow={locale === "pt-BR" ? "VOCÊ TAMBÉM PODE GOSTAR" : "YOU MAY ALSO LIKE"}
            title={t.relatedProducts}
          />
          <div className="product-grid">
            {related.map((x) => (
              <ProductCard key={x.id} p={x} store={store} onAdd={store.add} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoriesPage() {
  const { locale } = useLocale();
  return (
    <div className="page">
      <div className="container breadcrumbs">
        <Link to="/">{locale === "pt-BR" ? "Início" : "Home"}</Link>
        <span>/</span>
        <b>{locale === "pt-BR" ? "Categorias" : "Categories"}</b>
      </div>
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow dark">{locale === "pt-BR" ? "CATÁLOGO COMPLETO" : "FULL CATALOG"}</span>
          <h1>{locale === "pt-BR" ? "Encontre por categoria" : "Find by category"}</h1>
          <p>
            {locale === "pt-BR"
              ? "Organizamos as principais peças e acessórios para facilitar sua busca."
              : "We organized key parts and accessories to make your search easier."}
          </p>
        </div>
        <div className="category-large-grid">
          {categories.map((c, i) => (
            <Link
              key={c}
              to={`/categoria/${encodeURIComponent(c)}`}
              className="category-large"
            >
              <span>0{i + 1}</span>
              <h2>{localizeCategory(c, locale)}</h2>
              <p>
                {products.filter((p) => p.category === c).length * 18 + 20}+ {locale === "pt-BR" ? "produtos" : "products"}
              </p>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartPage({ store, onCheckout }) {
  const { locale, t } = useLocale();
  const subtotal = store.cartTotal,
    shipping = subtotal === 0 ? 0 : subtotal >= 299 ? 0 : 24.9;
  return (
    <div className="page">
      <div className="container breadcrumbs">
        <Link to="/">{t.home}</Link>
        <span>/</span>
        <b>{t.cart}</b>
      </div>
      <div className="container cart-page">
        <div>
          <span className="eyebrow dark">{locale === "pt-BR" ? "SEU PEDIDO" : "YOUR ORDER"}</span>
          <h1>{t.cart}</h1>
          {store.cart.length ? (
            <div className="cart-list">
              {store.cart.map((x) => (
                <div className="cart-page-item" key={x.id}>
                  <img src={x.image} alt={localizeProduct(x, locale).name} />
                  <div>
                    <Link to={`/produto/${x.id}`}>
                      <h3>{localizeProduct(x, locale).name}</h3>
                    </Link>
                    <span>{x.brand} · {localizeCategory(x.category, locale)}</span>
                    <div className="qty">
                      <button onClick={() => store.change(x.id, -1)}>
                        <Icon name="minus" size={13} />
                      </button>
                      <b>{x.qty}</b>
                      <button onClick={() => store.change(x.id, 1)}>
                        <Icon name="plus" size={13} />
                      </button>
                    </div>
                  </div>
                  <strong>{money(x.price * x.qty, locale)}</strong>
                  <button className="remove" onClick={() => store.remove(x.id)}>
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-search">
              <div>🛒</div>
              <h2>{t.emptyCart}</h2>
              <p>
                {locale === "pt-BR"
                  ? "Encontre peças para sua moto e adicione ao pedido."
                  : "Find parts for your bike and add them to your order."}
              </p>
              <Link className="btn primary" to="/produtos">
                {locale === "pt-BR" ? "Ver produtos" : "View products"}
              </Link>
            </div>
          )}
        </div>
        {!!store.cart.length && (
          <aside className="order-summary">
            <h2>{t.orderSummary}</h2>
            <div>
              <span>{t.subtotal}</span>
              <b>{money(subtotal, locale)}</b>
            </div>
            <div>
              <span>{t.shipping}</span>
              <b>{shipping ? money(24.9, locale) : t.free}</b>
            </div>
            <hr />
            <div className="total">
              <span>{t.total}</span>
              <b>{money(subtotal + shipping, locale)}</b>
            </div>
            <small>{t.freeShipping}</small>
            <button className="btn primary full" onClick={onCheckout}>
              {t.finishPurchase} <Icon name="arrow" />
            </button>
            <Link className="continue" to="/produtos">
              ← {t.continueShopping}
            </Link>
          </aside>
        )}
      </div>
    </div>
  );
}

function CheckoutPage({ store }) {
  const { locale } = useLocale();
  const nav = useNavigate(),
    [step, setStep] = useState(1),
    [done, setDone] = useState(false),
    [form, setForm] = useState({
      name: "",
      email: "",
      cep: "",
      address: "",
      city: "",
      state: "RJ",
      payment: "PIX",
    });
  const total = store.cartTotal + (store.cartTotal >= 299 ? 0 : 24.9);
  useEffect(() => {
    if (!store.cart.length && !done) nav("/carrinho");
  }, [store.cart.length, done]);
  if (done)
    return (
      <div className="checkout-success page">
        <div className="success-card">
          <div className="success-icon">
            <Icon name="check" size={30} />
          </div>
          <span className="eyebrow dark">{locale === "pt-BR" ? "PEDIDO RECEBIDO" : "ORDER RECEIVED"}</span>
          <h1>{locale === "pt-BR" ? "Compra simulada concluída!" : "Demo purchase completed!"}</h1>
          <p>
            {locale === "pt-BR"
              ? "O pedido foi criado para demonstração do projeto de portfólio."
              : "The order was created for portfolio demonstration."}
          </p>
          <strong>#MF{Math.floor(Math.random() * 90000 + 10000)}</strong>
          <Link className="btn primary" to="/pedidos">
            {locale === "pt-BR" ? "Ver meus pedidos" : "View my orders"}
          </Link>
        </div>
      </div>
    );
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const finish = () => {
    const order = {
      id: `MF${Math.floor(Math.random() * 90000 + 10000)}`,
      date: new Date().toLocaleDateString(locale === "pt-BR" ? "pt-BR" : "en-US"),
      items: store.cart,
      total,
      status: locale === "pt-BR" ? "Pedido recebido" : "Order received",
    };
    store.setOrders([order, ...store.orders]);
    setDone(true);
    store.setCart([]);
  };
  return (
    <div className="checkout-page page">
      <div className="container breadcrumbs">
        <Link to="/carrinho">{locale === "pt-BR" ? "Carrinho" : "Cart"}</Link>
        <span>/</span>
        <b>Checkout</b>
      </div>
      <div className="container checkout-layout">
        <section className="checkout-main">
          <div className="checkout-steps">
            <span className={step >= 1 ? "active" : ""}>
              1 <b>{locale === "pt-BR" ? "Entrega" : "Delivery"}</b>
            </span>
            <i />
            <span className={step >= 2 ? "active" : ""}>
              2 <b>{locale === "pt-BR" ? "Pagamento" : "Payment"}</b>
            </span>
          </div>
          {step === 1 ? (
            <div className="checkout-box">
              <span className="eyebrow dark">{locale === "pt-BR" ? "ENDEREÇO DE ENTREGA" : "SHIPPING ADDRESS"}</span>
              <h1>{locale === "pt-BR" ? "Para onde enviamos?" : "Where should we ship to?"}</h1>
              <div className="form-grid">
                <label>
                  {locale === "pt-BR" ? "Nome completo" : "Full name"}
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder={locale === "pt-BR" ? "Seu nome" : "Your name"}
                  />
                </label>
                <label>
                  E-mail
                  <input
                    value={form.email}
                    onChange={update("email")}
                    placeholder="voce@email.com"
                  />
                </label>
                <label>
                  CEP
                  <input
                    value={form.cep}
                    onChange={update("cep")}
                    placeholder="00000-000"
                  />
                </label>
                <label>
                  {locale === "pt-BR" ? "Estado" : "State"}
                  <select value={form.state} onChange={update("state")}>
                    <option>RJ</option>
                    <option>SP</option>
                    <option>MG</option>
                    <option>PR</option>
                  </select>
                </label>
                <label className="wide">
                  {locale === "pt-BR" ? "Endereço" : "Address"}
                  <input
                    value={form.address}
                    onChange={update("address")}
                    placeholder={locale === "pt-BR" ? "Rua, número e complemento" : "Street, number and complement"}
                  />
                </label>
                <label>
                  {locale === "pt-BR" ? "Cidade" : "City"}
                  <input
                    value={form.city}
                    onChange={update("city")}
                    placeholder={locale === "pt-BR" ? "Cidade" : "City"}
                  />
                </label>
              </div>
              <button className="btn primary full" onClick={() => setStep(2)}>
                {locale === "pt-BR" ? "Continuar" : "Continue"} <Icon name="arrow" />
              </button>
            </div>
          ) : (
            <div className="checkout-box">
              <span className="eyebrow dark">{locale === "pt-BR" ? "PAGAMENTO" : "PAYMENT"}</span>
              <h1>{locale === "pt-BR" ? "Como você prefere pagar?" : "How do you prefer to pay?"}</h1>
              <div className="payment-grid">
                <button
                  className={form.payment === "PIX" ? "selected" : ""}
                  onClick={() => setForm({ ...form, payment: "PIX" })}
                >
                  <b>PIX</b>
                  <span>{locale === "pt-BR" ? "5% OFF demonstrativo" : "5% OFF demo"}</span>
                </button>
                <button
                  className={form.payment === "Card" ? "selected" : ""}
                  onClick={() => setForm({ ...form, payment: "Card" })}
                >
                  <b>{locale === "pt-BR" ? "Cartão de crédito" : "Credit card"}</b>
                  <span>{locale === "pt-BR" ? "Até 10x sem juros" : "Up to 10x interest-free"}</span>
                </button>
              </div>
              <div className="demo-warning">
                <Icon name="shield" size={17} />
                <span>
                  {locale === "pt-BR"
                    ? "Este checkout é uma simulação de portfólio. Nenhum pagamento real será processado."
                    : "This checkout is a portfolio simulation. No real payment will be processed."}
                </span>
              </div>
              <button className="btn primary full" onClick={finish}>
                {locale === "pt-BR" ? "Confirmar pedido" : "Confirm order"} <Icon name="check" />
              </button>
              <button className="back-link" onClick={() => setStep(1)}>
                ← {locale === "pt-BR" ? "Voltar" : "Back"}
              </button>
            </div>
          )}
        </section>
        <aside className="checkout-summary">
          <h2>{locale === "pt-BR" ? "Resumo" : "Summary"}</h2>
          {store.cart.map((x) => (
            <div className="mini-item" key={x.id}>
              <img src={x.image} alt="" />
              <span>
                {localizeProduct(x, locale).name}
                <small>
                  {x.qty}x · {money(x.price, locale)}
                </small>
              </span>
            </div>
          ))}
          <hr />
          <div>
            <span>{locale === "pt-BR" ? "Subtotal" : "Subtotal"}</span>
            <b>{money(store.cartTotal, locale)}</b>
          </div>
          <div>
            <span>{locale === "pt-BR" ? "Frete" : "Shipping"}</span>
            <b>{store.cartTotal >= 299 ? (locale === "pt-BR" ? "Grátis" : "Free") : money(24.9, locale)}</b>
          </div>
          <div className="total">
            <span>{locale === "pt-BR" ? "Total" : "Total"}</span>
            <b>{money(total, locale)}</b>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LoginPage({ store }) {
  const { locale } = useLocale();
  const nav = useNavigate(),
    [register, setRegister] = useState(false),
    [name, setName] = useState(""),
    [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    store.setUser({
      name: name || (locale === "pt-BR" ? "Piloto MotoForge" : "MotoForge Rider"),
      email: email || "piloto@email.com",
    });
    nav("/conta");
  };
  return (
    <div className="auth-page page">
      <div className="auth-card">
        <Link className="logo dark-logo" to="/">
          <span className="logo-mark">MF</span>
          <span>
            MOTOFORGE<span>PARTS</span>
          </span>
        </Link>
        <span className="eyebrow dark">
          {register
            ? locale === "pt-BR"
              ? "CRIAR CONTA"
              : "CREATE ACCOUNT"
            : locale === "pt-BR"
              ? "BEM-VINDO DE VOLTA"
              : "WELCOME BACK"}
        </span>
        <h1>
          {register
            ? locale === "pt-BR"
              ? "Crie sua conta"
              : "Create your account"
            : locale === "pt-BR"
              ? "Entre na sua conta"
              : "Sign in to your account"}
        </h1>
        <p>
          {register
            ? locale === "pt-BR"
              ? "Salve seus pedidos e acompanhe suas compras."
              : "Save your orders and track your purchases."
            : locale === "pt-BR"
              ? "Acesse seus pedidos, favoritos e dados de cliente."
              : "Access your orders, favorites, and customer data."}
        </p>
        {register && (
          <label>
            {locale === "pt-BR" ? "Nome" : "Name"}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={locale === "pt-BR" ? "Seu nome" : "Your name"}
            />
          </label>
        )}
        <label>
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
          />
        </label>
        <label>
          {locale === "pt-BR" ? "Senha" : "Password"}
          <input type="password" required placeholder="••••••••" />
        </label>
        <button className="btn primary full" onClick={submit}>
          {register
            ? locale === "pt-BR"
              ? "Criar conta"
              : "Create account"
            : locale === "pt-BR"
              ? "Entrar"
              : "Sign in"}{" "}
          <Icon name="arrow" />
        </button>
        <button className="auth-switch" onClick={() => setRegister(!register)}>
          {register
            ? locale === "pt-BR"
              ? "Já tenho uma conta"
              : "I already have an account"
            : locale === "pt-BR"
              ? "Ainda não tenho uma conta"
              : "I don't have an account yet"}
        </button>
      </div>
    </div>
  );
}

function AccountPage({ store }) {
  const { locale } = useLocale();
  const nav = useNavigate();
  if (!store.user) return <LoginPage store={store} />;
  return (
    <div className="page account-page">
      <div className="container breadcrumbs">
        <Link to="/">{locale === "pt-BR" ? "Início" : "Home"}</Link>
        <span>/</span>
        <b>{locale === "pt-BR" ? "Minha conta" : "My account"}</b>
      </div>
      <div className="container account-layout">
        <aside className="account-menu">
          <div className="avatar">{store.user.name[0]}</div>
          <strong>{store.user.name}</strong>
          <small>{store.user.email}</small>
          <Link className="active" to="/conta">
            {locale === "pt-BR" ? "Visão geral" : "Overview"}
          </Link>
          <Link to="/pedidos">{locale === "pt-BR" ? "Meus pedidos" : "My orders"}</Link>
          <Link to="/produtos">{locale === "pt-BR" ? "Continuar comprando" : "Continue shopping"}</Link>
          <button
            onClick={() => {
              store.setUser(null);
              nav("/");
            }}
          >
            <Icon name="logout" size={16} /> {locale === "pt-BR" ? "Sair" : "Sign out"}
          </button>
        </aside>
        <section>
          <span className="eyebrow dark">{locale === "pt-BR" ? "ÁREA DO CLIENTE" : "CUSTOMER AREA"}</span>
          <h1>{locale === "pt-BR" ? "Olá" : "Hello"}, {store.user.name.split(" ")[0]}.</h1>
          <div className="account-cards">
            <Link to="/pedidos">
              <span>{locale === "pt-BR" ? "Pedidos" : "Orders"}</span>
              <strong>{store.orders.length}</strong>
              <small>{locale === "pt-BR" ? "Acompanhe suas compras" : "Track your purchases"}</small>
            </Link>
            <Link to="/produtos">
              <span>{locale === "pt-BR" ? "Favoritos" : "Favorites"}</span>
              <strong>{store.wishlist.length}</strong>
              <small>{locale === "pt-BR" ? "Itens salvos" : "Saved items"}</small>
            </Link>
            <Link to="/produtos">
              <span>{locale === "pt-BR" ? "Carrinho" : "Cart"}</span>
              <strong>{store.cartCount}</strong>
              <small>{locale === "pt-BR" ? "Itens aguardando" : "Pending items"}</small>
            </Link>
          </div>
          <div className="account-info">
            <h2>{locale === "pt-BR" ? "Seus dados" : "Your details"}</h2>
            <p>
              <b>{locale === "pt-BR" ? "Nome:" : "Name:"}</b> {store.user.name}
            </p>
            <p>
              <b>E-mail:</b> {store.user.email}
            </p>
            <p>
              <b>{locale === "pt-BR" ? "Cliente desde:" : "Customer since:"}</b> 2026
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function OrdersPage({ store }) {
  const { locale } = useLocale();
  if (!store.user) return <LoginPage store={store} />;
  return (
    <div className="page">
      <div className="container breadcrumbs">
        <Link to="/">{locale === "pt-BR" ? "Início" : "Home"}</Link>
        <span>/</span>
        <Link to="/conta">{locale === "pt-BR" ? "Minha conta" : "My account"}</Link>
        <span>/</span>
        <b>{locale === "pt-BR" ? "Pedidos" : "Orders"}</b>
      </div>
      <div className="container orders-page">
        <span className="eyebrow dark">{locale === "pt-BR" ? "HISTÓRICO" : "HISTORY"}</span>
        <h1>{locale === "pt-BR" ? "Meus pedidos" : "My orders"}</h1>
        {store.orders.length ? (
          <div className="orders-list">
            {store.orders.map((o) => (
              <div className="order-card" key={o.id}>
                <div>
                  <span>{o.id}</span>
                  <small>{o.date}</small>
                </div>
                <strong>{money(o.total, locale)}</strong>
                <b className="order-status">{o.status}</b>
                <Link to="/produtos">
                  {locale === "pt-BR" ? "Comprar novamente" : "Buy again"} <Icon name="arrow" size={14} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <div>▱</div>
            <h2>{locale === "pt-BR" ? "Nenhum pedido ainda" : "No orders yet"}</h2>
            <p>
              {locale === "pt-BR"
                ? "Quando você finalizar uma compra, ela aparecerá aqui."
                : "When you complete a purchase, it will appear here."}
            </p>
            <Link className="btn primary" to="/produtos">
              {locale === "pt-BR" ? "Explorar produtos" : "Explore products"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPage({ compact = false }) {
  const { locale } = useLocale();
  return (
    <section
      className={compact ? "about compact" : "page about-page"}
      id="sobre"
    >
      <div className="container about-grid">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1558980664-10ea6e1f9b35?auto=format&fit=crop&w=1200&q=85"
            alt={locale === "pt-BR" ? "Motocicleta" : "Motorcycle"}
          />
          <div className="about-stamp">
            <strong>10+</strong>
            <span>
              {locale === "pt-BR" ? "anos de" : "years of"}
              <br />
              {locale === "pt-BR" ? "experiência" : "experience"}
            </span>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow dark">{locale === "pt-BR" ? "SOBRE A MOTOFORGE" : "ABOUT MOTOFORGE"}</span>
          <h1>
            {locale === "pt-BR" ? "Peças certas para quem não abre mão de " : "The right parts for those who never stop "}
            <em>{locale === "pt-BR" ? "rodar." : "riding."}</em>
          </h1>
          <p>
            {locale === "pt-BR"
              ? "Somos uma marca fictícia criada para este projeto de portfólio. A experiência foi pensada como um e-commerce real de peças e acessórios para motocicletas, priorizando descoberta de produtos, compatibilidade e confiança na compra."
              : "We are a fictional brand created for this portfolio project. The experience was designed as a real motorcycle parts e-commerce, focused on product discovery, compatibility, and buying confidence."}
          </p>
          <div className="about-points">
            <span>
              <Icon name="check" size={15} /> {locale === "pt-BR" ? "Curadoria de produtos" : "Curated products"}
            </span>
            <span>
              <Icon name="check" size={15} /> {locale === "pt-BR" ? "Compatibilidade por modelo" : "Model compatibility"}
            </span>
            <span>
              <Icon name="check" size={15} /> {locale === "pt-BR" ? "Atendimento especializado" : "Specialized support"}
            </span>
            <span>
              <Icon name="check" size={15} /> {locale === "pt-BR" ? "Nota fiscal e garantia" : "Invoice and warranty"}
            </span>
          </div>
          {!compact && (
            <div className="story-cards">
              <div>
                <b>01</b>
                <strong>{locale === "pt-BR" ? "Catálogo organizado" : "Organized catalog"}</strong>
                <p>
                  {locale === "pt-BR"
                    ? "Busca e filtros pensados para encontrar a peça certa."
                    : "Search and filters designed to find the right part quickly."}
                </p>
              </div>
              <div>
                <b>02</b>
                <strong>{locale === "pt-BR" ? "Compra simples" : "Simple checkout"}</strong>
                <p>{locale === "pt-BR" ? "Do produto ao checkout em poucos passos." : "From product to checkout in just a few steps."}</p>
              </div>
              <div>
                <b>03</b>
                <strong>{locale === "pt-BR" ? "Confiança" : "Trust"}</strong>
                <p>{locale === "pt-BR" ? "Informações claras de aplicação e garantia." : "Clear fitment and warranty information."}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const { locale, t } = useLocale();
  const [sent, setSent] = useState(false);
  return (
    <div className="page contact-page">
      <div className="container breadcrumbs">
        <Link to="/">{locale === "pt-BR" ? "Início" : "Home"}</Link>
        <span>/</span>
        <b>{locale === "pt-BR" ? "Contato" : "Contact"}</b>
      </div>
      <div className="container contact-grid">
        <div>
          <span className="eyebrow dark">{locale === "pt-BR" ? "FALE COM A MOTOFORGE" : "TALK TO MOTOFORGE"}</span>
          <h1>{locale === "pt-BR" ? "Vamos falar sobre sua moto." : "Let's talk about your bike."}</h1>
          <p>
            {locale === "pt-BR"
              ? "Atendimento demonstrativo para o projeto. Em uma operação real, este formulário poderia ser integrado ao CRM, WhatsApp ou e-mail."
              : "Demo support for the project. In a real operation, this form could be integrated with CRM, WhatsApp, or email."}
          </p>
          <div className="contact-items">
            <div>
              <Icon name="phone" />
              <span>
                <b>(24) 2222-9090</b>
                <small>{locale === "pt-BR" ? "Seg a sex, 8h às 18h" : "Mon to Fri, 8am to 6pm"}</small>
              </span>
            </div>
            <div>
              <Icon name="mail" />
              <span>
                <b>contato@motoforgeparts.com.br</b>
                <small>{locale === "pt-BR" ? "Respondemos em até 1 dia útil" : "We reply within 1 business day"}</small>
              </span>
            </div>
            <div>
              <Icon name="pin" />
              <span>
                <b>Rua das Oficinas, 280</b>
                <small>{locale === "pt-BR" ? "Petrópolis — RJ" : "Petropolis — RJ"}</small>
              </span>
            </div>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2>{locale === "pt-BR" ? "Envie uma mensagem" : "Send a message"}</h2>
          <label>
            {locale === "pt-BR" ? "Nome" : "Name"}
            <input required placeholder={locale === "pt-BR" ? "Seu nome" : "Your name"} />
          </label>
          <label>
            E-mail
            <input required type="email" placeholder="voce@email.com" />
          </label>
          <label>
            {locale === "pt-BR" ? "Assunto" : "Subject"}
            <select>
              <option>{locale === "pt-BR" ? "Dúvida sobre produto" : "Product question"}</option>
              <option>{locale === "pt-BR" ? "Compatibilidade" : "Compatibility"}</option>
              <option>{locale === "pt-BR" ? "Pedido" : "Order"}</option>
              <option>{locale === "pt-BR" ? "Outro assunto" : "Other"}</option>
            </select>
          </label>
          <label>
            {locale === "pt-BR" ? "Mensagem" : "Message"}
            <textarea required rows="5" placeholder={locale === "pt-BR" ? "Como podemos ajudar?" : "How can we help?"} />
          </label>
          <button className="btn primary full">
            {sent ? `${t.messageSent} ✓` : t.sendMessage}
            {!sent && <Icon name="arrow" size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}

function Reviews() {
  const { locale } = useLocale();
  return (
    <section className="reviews section gray">
      <div className="container">
        <SectionHead
          eyebrow={locale === "pt-BR" ? "QUEM COMPRA, RECOMENDA" : "RIDERS RECOMMEND"}
          title={locale === "pt-BR" ? "Experiências de pilotos" : "Rider experiences"}
        />
        <div className="review-grid">
          {[
            [
              "Lucas M.",
              locale === "pt-BR"
                ? "“Encontrei o kit certo para minha moto em poucos minutos. A navegação ficou muito clara.”"
                : '"I found the right kit for my bike in minutes. Navigation is very clear."',
            ],
            [
              "Marina R.",
              locale === "pt-BR"
                ? "“Gostei da ideia de filtrar pela moto. Para uma loja de peças isso faz muito sentido.”"
                : '"Filtering by bike model is a great idea. It makes perfect sense for a parts store."',
            ],
            [
              "André P.",
              locale === "pt-BR"
                ? "“Visual profissional e informações objetivas. Eu compraria por uma loja assim.”"
                : '"Professional look and clear information. I would definitely shop at a store like this."',
            ],
          ].map(([n, t]) => (
            <article key={n}>
              <div className="stars">★★★★★</div>
              <p>{t}</p>
              <strong>{n}</strong>
              <small>{locale === "pt-BR" ? "Cliente verificado" : "Verified customer"}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Benefits() {
  const { locale } = useLocale();
  return (
    <section className="benefits">
      <div className="container benefit-grid">
        <div>
          <Icon name="truck" />
          <span>
            <b>{locale === "pt-BR" ? "Envio rápido" : "Fast shipping"}</b>
            <small>{locale === "pt-BR" ? "Despacho em até 24h" : "Dispatch in up to 24h"}</small>
          </span>
        </div>
        <div>
          <Icon name="shield" />
          <span>
            <b>{locale === "pt-BR" ? "Compra segura" : "Secure checkout"}</b>
            <small>{locale === "pt-BR" ? "Dados protegidos" : "Protected data"}</small>
          </span>
        </div>
        <div>
          <strong className="pix">PIX</strong>
          <span>
            <b>{locale === "pt-BR" ? "5% OFF no PIX" : "5% OFF with PIX"}</b>
            <small>{locale === "pt-BR" ? "Desconto demonstrativo" : "Demo discount"}</small>
          </span>
        </div>
        <div>
          <span className="big-star">★</span>
          <span>
            <b>{locale === "pt-BR" ? "Garantia" : "Warranty"}</b>
            <small>{locale === "pt-BR" ? "Peças selecionadas" : "Curated parts"}</small>
          </span>
        </div>
      </div>
    </section>
  );
}
function Newsletter() {
  const { locale } = useLocale();
  const [ok, setOk] = useState(false);
  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span className="eyebrow">{locale === "pt-BR" ? "FIQUE POR DENTRO" : "STAY UPDATED"}</span>
          <h2>{locale === "pt-BR" ? "Ofertas, lançamentos e novidades." : "Deals, new arrivals, and updates."}</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
          }}
        >
          <input required type="email" placeholder={locale === "pt-BR" ? "Seu melhor e-mail" : "Your best email"} />
          <button className="btn primary">
            {ok ? (locale === "pt-BR" ? "Cadastrado ✓" : "Subscribed ✓") : locale === "pt-BR" ? "Cadastrar" : "Subscribe"}
            {!ok && <Icon name="arrow" size={15} />}
          </button>
        </form>
      </div>
    </section>
  );
}

function CartDrawer({ store, onClose }) {
  const { locale, t } = useLocale();
  const total = store.cartTotal,
    shipping = total === 0 ? 0 : total >= 299 ? 0 : 24.9;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow dark">{locale === "pt-BR" ? "SEU PEDIDO" : "YOUR ORDER"}</span>
            <h2>{t.cart}</h2>
          </div>
          <button onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-body">
          {store.cart.length ? (
            store.cart.map((x) => (
              <div className="drawer-item" key={x.id}>
                <img src={x.image} alt="" />
                <div>
                  <Link to={`/produto/${x.id}`} onClick={onClose}>
                    <b>{localizeProduct(x, locale).name}</b>
                  </Link>
                  <strong>{money(x.price, locale)}</strong>
                  <div className="qty">
                    <button onClick={() => store.change(x.id, -1)}>
                      <Icon name="minus" size={12} />
                    </button>
                    <b>{x.qty}</b>
                    <button onClick={() => store.change(x.id, 1)}>
                      <Icon name="plus" size={12} />
                    </button>
                  </div>
                  <button className="remove" onClick={() => store.remove(x.id)}>
                    {t.remove}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="drawer-empty">
              <div>🛒</div>
              <h3>{t.emptyCart}</h3>
              <p>{locale === "pt-BR" ? "Adicione produtos para começar." : "Add products to get started."}</p>
              <button className="btn primary" onClick={onClose}>
                {t.continueShopping}
              </button>
            </div>
          )}
        </div>
        {store.cart.length > 0 && (
          <div className="drawer-footer">
            <div>
              <span>{t.subtotal}</span>
              <b>{money(total, locale)}</b>
            </div>
            <div>
              <span>{t.shipping}</span>
              <b>{shipping ? money(24.9, locale) : t.free}</b>
            </div>
            <div className="total">
              <span>{t.total}</span>
              <b>{money(total + shipping, locale)}</b>
            </div>
            <Link className="btn primary full" to="/carrinho" onClick={onClose}>
              {locale === "pt-BR" ? "Ver carrinho" : "View cart"} <Icon name="arrow" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

function Footer() {
  const { locale } = useLocale();
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Link className="logo" to="/">
            <span className="logo-mark">MF</span>
            <span>
              MOTOFORGE<span>PARTS</span>
            </span>
          </Link>
          <p>
            {locale === "pt-BR"
              ? "Projeto demonstrativo de e-commerce para portfólio. Peças e acessórios para quem vive duas rodas."
              : "Portfolio e-commerce demo project. Parts and accessories for people who live on two wheels."}
          </p>
        </div>
        <div>
          <h4>{locale === "pt-BR" ? "Comprar" : "Shop"}</h4>
          <Link to="/produtos">{locale === "pt-BR" ? "Todos os produtos" : "All products"}</Link>
          <Link to="/categorias">{locale === "pt-BR" ? "Categorias" : "Categories"}</Link>
          <Link to="/produtos?offer=true">{locale === "pt-BR" ? "Ofertas" : "Deals"}</Link>
          <Link to="/produtos?sort=new">{locale === "pt-BR" ? "Lançamentos" : "New arrivals"}</Link>
        </div>
        <div>
          <h4>{locale === "pt-BR" ? "Atendimento" : "Support"}</h4>
          <Link to="/contato">{locale === "pt-BR" ? "Fale conosco" : "Talk to us"}</Link>
          <Link to="/contato">{locale === "pt-BR" ? "Trocas e devoluções" : "Returns and exchanges"}</Link>
          <Link to="/sobre">{locale === "pt-BR" ? "Sobre a MotoForge" : "About MotoForge"}</Link>
          <Link to="/contato">{locale === "pt-BR" ? "Garantia" : "Warranty"}</Link>
        </div>
        <div>
          <h4>{locale === "pt-BR" ? "Contato" : "Contact"}</h4>
          <p>
            <Icon name="phone" size={14} /> (24) 2222-9090
          </p>
          <p>
            <Icon name="mail" size={14} /> contato@motoforgeparts.com.br
          </p>
          <p>
            <Icon name="pin" size={14} /> Rua das Oficinas, 280
            <br />
            Petrópolis — RJ
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>
            © 2026 MotoForge Parts · {locale === "pt-BR" ? "Projeto demonstrativo" : "Demo project"}
          </span>
          <span>{locale === "pt-BR" ? "Privacidade · Termos · Cookies" : "Privacy · Terms · Cookies"}</span>
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  const { locale } = useLocale();
  return (
    <div className="page notfound">
      <span>404</span>
      <h1>{locale === "pt-BR" ? "Página não encontrada" : "Page not found"}</h1>
      <p>
        {locale === "pt-BR"
          ? "O endereço que você tentou acessar não existe."
          : "The address you tried to access does not exist."}
      </p>
      <Link className="btn primary" to="/">
        {locale === "pt-BR" ? "Voltar para a loja" : "Back to store"}
      </Link>
    </div>
  );
}

export default function App() {
  const store = useStore();
  const [locale, setLocale] = useState(
    () => localStorage.getItem("mf-locale") || "en",
  );

  useEffect(() => {
    localStorage.setItem("mf-locale", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: copy[locale] || copy.en }}>
      <Layout store={store} />
    </LocaleContext.Provider>
  );
}

function noop() {}
