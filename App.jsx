import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "919582191011";
const WHATSAPP_MSG = encodeURIComponent("Hello, I found your website and I am interested in properties in Sector 25 Rohini. Please share available listings.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const PHONE = "+91 95821 91011";
const PHONE_RAW = "+919582191011";
const ADDRESS = "Plot 25, Pocket 9, Sector 25, Rohini, Delhi 110042";
const MAPS_URL = "https://www.google.com/maps/search/Vanya+Real+Estate+Sector+25+Rohini+Delhi";

const reviews = [
  { name: "Sonu M.", initial: "S", time: "6 months ago", text: "Sold our 120 sqmt plot in Sector 25 Rohini. Top price we got. Very happy with the service." },
  { name: "Sunil", initial: "SU", time: "1 year ago", text: "One of the best property dealers in Sector 25 Rohini. They have the best premium luxury builder floors available." },
  { name: "Bunty Singh", initial: "B", time: "1 year ago", text: "Best service. We sold our floor through them. Best property dealer in Sector 25 Rohini without doubt." },
];

const listings = [
  { type: "Residential Plot", size: "120 sqmt and above", location: "Sector 25, Rohini, Delhi", tag: "Top Prices Guaranteed", icon: "🏗️", desc: "Prime residential plots in Sector 25. Freehold, clear titles, best rates in the area." },
  { type: "Builder Floor", size: "Premium Luxury", location: "Sector 25, Rohini, Delhi", tag: "Premium", icon: "🏢", desc: "Spacious, well-finished builder floors available for sale. Ready to move in options available." },
  { type: "Property Sale", size: "All Sizes", location: "Sector 25, Rohini, Delhi", tag: "Buy or Sell", icon: "🏘️", desc: "Looking to buy or sell any property in Rohini? We handle the full process for you, end to end." },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Card3D({ children, style = {}, className = "" }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({});
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setTilt({ transform: `perspective(600px) rotateX(${-(y / r.height) * 10}deg) rotateY(${(x / r.width) * 10}deg) scale(1.03)`, transition: "transform 0.08s ease" });
  }
  function onLeave() {
    setTilt({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)", transition: "transform 0.4s ease" });
  }
  return (
    <div ref={ref} className={className} style={{ ...style, ...tilt, willChange: "transform" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function Particles() {
  const pts = Array.from({ length: 14 }, (_, i) => ({
    id: i, left: `${(i * 41 + 9) % 100}%`, top: `${(i * 57 + 13) % 100}%`,
    s: 2 + (i % 3), delay: `${(i * 0.5) % 4}s`, dur: `${5 + (i % 4)}s`,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {pts.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, top: p.top,
          width: p.s, height: p.s, borderRadius: "50%",
          background: "rgba(212,175,55,0.3)",
          animation: `vfloat ${p.dur} ${p.delay} ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

export default function VanyaRealEstate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [navBg, setNavBg] = useState(false);

  const [heroRef, heroIn] = useInView(0.05);
  const [propRef, propIn] = useInView(0.08);
  const [aboutRef, aboutIn] = useInView(0.08);
  const [revRef, revIn] = useInView(0.08);
  const [contRef, contIn] = useInView(0.08);

  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    setMenuOpen(false);
  }

  const waFormUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, my name is ${form.name || "..."}, my number is ${form.phone || "..."}, and I am looking for: ${form.message || "..."}.`
  )}`;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:#0a0906;color:#e8e0d0;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
    :root{
      --gold:#D4AF37;--gold-light:#F0D060;--gold-dim:rgba(212,175,55,0.15);
      --dark:#0a0906;--dark2:#111009;--dark3:#1a1710;
      --text:#e8e0d0;--muted:#8a8070;
    }
    @keyframes vfloat{0%{transform:translateY(0) scale(1);}100%{transform:translateY(-20px) scale(1.25);}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,122,60,0.5);}50%{box-shadow:0 0 0 10px rgba(26,122,60,0);}}
    @keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.4);}50%{box-shadow:0 0 0 10px rgba(212,175,55,0);}}
    @keyframes spin3d{from{transform:rotateY(0deg);}to{transform:rotateY(360deg);}}
    .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease;}
    .reveal.in{opacity:1;transform:none;}
    .d1{transition-delay:.08s;}.d2{transition-delay:.18s;}.d3{transition-delay:.3s;}.d4{transition-delay:.44s;}
    a{color:inherit;text-decoration:none;}
    input,textarea{
      background:rgba(255,255,255,0.04);border:1px solid rgba(212,175,55,0.2);
      border-radius:10px;color:#e8e0d0;font-family:'DM Sans',sans-serif;
      font-size:15px;padding:12px 16px;width:100%;outline:none;
      transition:border-color .2s,background .2s;
    }
    input:focus,textarea:focus{border-color:var(--gold);background:rgba(212,175,55,0.04);}
    textarea{resize:none;height:100px;line-height:1.6;}
    .btn-gold{
      background:var(--gold);color:#0a0906;font-weight:500;border:none;
      border-radius:10px;padding:13px 28px;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:15px;
      transition:all .2s;letter-spacing:.02em;display:inline-flex;align-items:center;gap:8px;
    }
    .btn-gold:hover{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 8px 28px rgba(212,175,55,0.3);}
    .btn-wa{
      background:#1a7a3c;color:#fff;font-weight:500;border:none;
      border-radius:10px;padding:13px 28px;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:15px;
      display:inline-flex;align-items:center;gap:8px;transition:all .2s;
    }
    .btn-wa:hover{background:#20934a;transform:translateY(-2px);box-shadow:0 8px 28px rgba(26,122,60,0.35);}
    .btn-outline{
      background:transparent;color:var(--gold);font-weight:400;
      border:1px solid rgba(212,175,55,0.4);border-radius:10px;
      padding:12px 24px;cursor:pointer;font-family:'DM Sans',sans-serif;
      font-size:15px;transition:all .2s;display:inline-flex;align-items:center;gap:8px;
    }
    .btn-outline:hover{border-color:var(--gold);background:var(--gold-dim);transform:translateY(-1px);}
    .nav-btn{
      background:none;border:none;color:var(--muted);cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:14px;padding:6px 4px;
      transition:color .2s;letter-spacing:.04em;
    }
    .nav-btn:hover{color:var(--gold);}
    .card-base{
      background:var(--dark3);border:1px solid rgba(212,175,55,0.12);
      border-radius:16px;padding:24px;
      transition:border-color .25s,box-shadow .25s;
    }
    .card-base:hover{border-color:rgba(212,175,55,0.38);box-shadow:0 8px 32px rgba(0,0,0,0.4);}
    .mobile-menu{
      position:fixed;top:64px;left:0;right:0;z-index:99;
      background:#0f0e0a;border-bottom:1px solid rgba(212,175,55,0.15);
      padding:16px 5%;display:flex;flex-direction:column;gap:4px;
    }
    .mob-link{
      background:none;border:none;color:#e8e0d0;cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:16px;
      padding:12px 0;border-bottom:1px solid rgba(212,175,55,0.08);
      text-align:left;transition:color .2s;
    }
    .mob-link:hover{color:var(--gold);}
    @media(max-width:900px){
      .desktop-nav{display:none!important;}
      .hamburger{display:flex!important;}
    }
    @media(min-width:901px){
      .hamburger{display:none!important;}
      .mobile-menu{display:none!important;}
    }
    @media(max-width:700px){
      .listings-grid{grid-template-columns:1fr!important;}
      .about-grid{grid-template-columns:1fr!important;}
      .reviews-grid{grid-template-columns:1fr!important;}
      .contact-grid{grid-template-columns:1fr!important;}
      .stats-grid{grid-template-columns:1fr 1fr!important;}
      .hero-btns{flex-direction:column!important;align-items:stretch!important;}
      .hero-btns button,.hero-btns a{width:100%!important;}
      .hero-btns a button{width:100%!important;}
      .hero-stats{gap:20px!important;flex-wrap:wrap!important;}
      .footer-inner{flex-direction:column!important;gap:18px!important;text-align:center!important;}
    }
  `;

  const WaIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.557 4.133 1.528 5.876L0 24l6.306-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.99-1.363l-.358-.213-3.743.896.937-3.638-.233-.373A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );

  return (
    <>
      <style>{css}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navBg ? "rgba(10,9,6,0.96)" : "rgba(10,9,6,0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${navBg ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0.08)"}`,
        transition: "all .3s",
      }}>
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "var(--gold)", letterSpacing: ".04em" }}>
            Vanya Real Estate
          </span>
        </button>

        <div className="desktop-nav" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[["Properties","properties"],["About","about"],["Reviews","reviews"],["Contact","contact"]].map(([l, id]) => (
            <button key={id} className="nav-btn" onClick={() => scrollTo(id)}>{l}</button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(212,175,55,0.2)", margin: "0 8px" }} />
          <a href={`tel:${PHONE_RAW}`}>
            <button className="btn-outline" style={{ padding: "7px 16px", fontSize: 13 }}>📞 {PHONE}</button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn-wa" style={{ padding: "7px 16px", fontSize: 13 }}>
              <WaIcon size={15} /> WhatsApp
            </button>
          </a>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} style={{
          background: "none", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 8,
          color: "var(--gold)", cursor: "pointer", padding: "6px 10px", fontSize: 20, lineHeight: 1,
        }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {[["🏠 Properties","properties"],["ℹ️ About","about"],["⭐ Reviews","reviews"],["📞 Contact","contact"]].map(([l, id]) => (
            <button key={id} className="mob-link" onClick={() => scrollTo(id)}>{l}</button>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <a href={`tel:${PHONE_RAW}`} style={{ flex: 1 }}>
              <button className="btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>📞 Call Now</button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button className="btn-wa" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}><WaIcon size={15} /> WhatsApp</button>
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 80px", overflow: "hidden" }}>
        <Particles />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 55% 40%, rgba(212,175,55,0.055) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(transparent,var(--dark))", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ position: "relative", zIndex: 2, maxWidth: 700, width: "100%" }}>
          <div className={`reveal ${heroIn?"in":""}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.28)", borderRadius: 20, padding: "5px 14px", marginBottom: 22, fontSize: 12, color: "var(--gold)", letterSpacing: ".1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
            SECTOR 25, ROHINI, DELHI
          </div>

          <h1 className={`reveal d1 ${heroIn?"in":""}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,7vw,76px)", fontWeight: 700, lineHeight: 1.07, color: "#f4ecdc", marginBottom: 20 }}>
            Property Experts<br />
            <span style={{ color: "var(--gold)" }}>You Can Trust</span>
          </h1>

          <p className={`reveal d2 ${heroIn?"in":""}`} style={{ fontSize: "clamp(15px,2vw,17px)", color: "var(--muted)", lineHeight: 1.8, maxWidth: 500, marginBottom: 34 }}>
            Rohini's most trusted property consultants. Plots, builder floors, and residential properties in Sector 25, Delhi. Call or message us any time, day or night.
          </p>

          <div className={`reveal d3 hero-btns ${heroIn?"in":""}`} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 42 }}>
            <button className="btn-gold" onClick={() => scrollTo("properties")} style={{ animation: "goldPulse 2.5s infinite" }}>
              View Properties
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button className="btn-wa" style={{ animation: "pulse 2.5s infinite" }}>
                <WaIcon /> Message on WhatsApp
              </button>
            </a>
            <a href={`tel:${PHONE_RAW}`}>
              <button className="btn-outline">📞 {PHONE}</button>
            </a>
          </div>

          <div className={`reveal d4 hero-stats ${heroIn?"in":""}`} style={{ display: "flex", gap: 32 }}>
            {[["5.0 ★","Google Rating"],["12","Happy Clients"],["24 hrs","Always Open"],["Sec 25","Rohini Expert"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 700, color: "var(--gold)" }}>{v}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D cube desktop */}
        <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", width: 280, height: 280, perspective: 700, display: "none" }} className="desktop-only">
          <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", animation: "spin3d 22s linear infinite" }}>
            {[0,60,120,180,240,300].map((deg, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotateY(${deg}deg) translateZ(130px)`, background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.07)", borderRadius: 14, fontSize: 44, opacity: 0.6 }}>
                {["🏢","🏗️","🏘️","🏠","🏬","🏛️"][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" style={{ padding: "90px 5%", background: "var(--dark2)" }}>
        <div ref={propRef} style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className={`reveal ${propIn?"in":""}`} style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: ".14em", marginBottom: 10 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#f4ecdc" }}>
              Properties in Sector 25
            </h2>
            <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 15, maxWidth: 480, margin: "12px auto 0" }}>
              We handle plots, builder floors, and all types of residential property in Rohini. Tap any card to enquire on WhatsApp.
            </p>
          </div>

          <div className="listings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {listings.map((l, i) => (
              <Card3D key={i} className={`card-base reveal d${i+1} ${propIn?"in":""}`}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{l.icon}</div>
                <div style={{ display: "inline-block", background: "rgba(212,175,55,0.12)", color: "var(--gold)", fontSize: 11, padding: "3px 10px", borderRadius: 20, marginBottom: 12, letterSpacing: ".06em" }}>{l.tag}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, color: "#f4ecdc", marginBottom: 6 }}>{l.type}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>{l.size}</p>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>{l.desc}</p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I am interested in ${l.type} in ${l.location}. Please share details.`)}`} target="_blank" rel="noopener noreferrer">
                  <button className="btn-wa" style={{ width: "100%", justifyContent: "center", padding: "11px 0", fontSize: 14 }}>
                    <WaIcon size={15} /> Enquire on WhatsApp
                  </button>
                </a>
              </Card3D>
            ))}
          </div>

          <div className={`reveal ${propIn?"in":""}`} style={{ textAlign: "center", marginTop: 36 }}>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>
              Have a different requirement? Contact us
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 5%" }}>
        <div ref={aboutRef} style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div className={`reveal ${aboutIn?"in":""}`} style={{ fontSize: 11, color: "var(--gold)", letterSpacing: ".14em", marginBottom: 10 }}>ABOUT US</div>
              <h2 className={`reveal d1 ${aboutIn?"in":""}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#f4ecdc", lineHeight: 1.2, marginBottom: 20 }}>
                Rohini's Most<br />Trusted Dealer
              </h2>
              <p className={`reveal d2 ${aboutIn?"in":""}`} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 14 }}>
                Vanya Real Estate is a full-service property consultancy based at Plot 25, Pocket 9, Sector 25, Rohini. We specialise in residential plots, premium builder floors, and all types of property in the Rohini belt of Delhi.
              </p>
              <p className={`reveal d2 ${aboutIn?"in":""}`} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 28 }}>
                We are available 24 hours a day, 7 days a week. Every client gets personal attention from the first call to the final handover. Our clients have consistently rated us 5 stars on Google.
              </p>
              <div className={`reveal d3 ${aboutIn?"in":""}`} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <button className="btn-wa"><WaIcon /> Chat with us</button>
                </a>
                <a href={`tel:${PHONE_RAW}`}>
                  <button className="btn-outline">📞 Call Now</button>
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <button className="btn-outline">📍 Get Directions</button>
                </a>
              </div>
            </div>

            <div className={`reveal d2 ${aboutIn?"in":""}`}>
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["5.0 ★","Google Rating"],["12","Happy Clients"],["24 hrs","Always Open"],["Sec 25","Rohini Expert"]].map(([v,l]) => (
                  <Card3D key={l} style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 14, padding: "22px 18px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "var(--gold)", marginBottom: 6 }}>{v}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{l}</div>
                  </Card3D>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "90px 5%", background: "var(--dark2)" }}>
        <div ref={revRef} style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className={`reveal ${revIn?"in":""}`} style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: ".14em", marginBottom: 10 }}>CLIENT REVIEWS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "#f4ecdc", marginBottom: 14 }}>
              What Our Clients Say
            </h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26, letterSpacing: 2, color: "var(--gold)" }}>★★★★★</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 700, color: "var(--gold)" }}>5.0</span>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>on Google, 12 reviews</span>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 36 }}>
            {reviews.map((r, i) => (
              <Card3D key={i} className={`card-base reveal d${i+1} ${revIn?"in":""}`} style={{ borderLeft: "2px solid rgba(212,175,55,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>{r.initial}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#f4ecdc" }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{r.time}</div>
                  </div>
                </div>
                <div style={{ color: "var(--gold)", fontSize: 13, marginBottom: 10, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{r.text}</p>
              </Card3D>
            ))}
          </div>

          <div className={`reveal ${revIn?"in":""}`} style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.google.com/search?q=Vanya+Real+Estate+Sector+25+Rohini+Delhi+reviews" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline">Read all 12 reviews on Google</button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button className="btn-wa"><WaIcon /> Talk to us on WhatsApp</button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 5%" }}>
        <div ref={contRef} style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className={`reveal ${contIn?"in":""}`} style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: ".14em", marginBottom: 10 }}>GET IN TOUCH</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: "#f4ecdc" }}>
              Talk to Us Today
            </h2>
            <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 15 }}>We are available 24 hours. Call, WhatsApp, or send us a message below.</p>
          </div>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div className={`reveal d1 ${contIn?"in":""}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon:"📞", label:"Phone", val: PHONE, href: `tel:${PHONE_RAW}`, external: false },
                { icon:"💬", label:"WhatsApp", val:"Tap to message us now", href: WHATSAPP_URL, external: true },
                { icon:"📍", label:"Address", val: ADDRESS, href: MAPS_URL, external: true },
                { icon:"🕐", label:"Hours", val:"Open 24 hours, 7 days a week", href: null },
              ].map(({ icon, label, val, href, external }) => (
                <Card3D key={label} style={{ background: "var(--dark3)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 14, padding: "16px 20px", cursor: href ? "pointer" : "default" }}>
                  {href ? (
                    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".08em", marginBottom: 3 }}>{label.toUpperCase()}</div>
                          <div style={{ fontSize: 14, color: "#f4ecdc", fontWeight: 500, lineHeight: 1.5 }}>{val}</div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".08em", marginBottom: 3 }}>{label.toUpperCase()}</div>
                        <div style={{ fontSize: 14, color: "#f4ecdc", fontWeight: 500, lineHeight: 1.5 }}>{val}</div>
                      </div>
                    </div>
                  )}
                </Card3D>
              ))}
            </div>

            <div className={`reveal d2 ${contIn?"in":""}`} style={{ background: "var(--dark3)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 16, padding: "30px 26px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 600, color: "#f4ecdc", marginBottom: 22 }}>
                Send an Enquiry
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  placeholder="+91 phone number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
                <textarea
                  placeholder="What are you looking for? (plot, floor, size, budget)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
                <a href={waFormUrl} target="_blank" rel="noopener noreferrer">
                  <button className="btn-wa" style={{ width: "100%", justifyContent: "center", padding: "14px 0", fontSize: 16 }}>
                    <WaIcon size={18} /> Send via WhatsApp
                  </button>
                </a>
                <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", lineHeight: 1.5 }}>
                  This opens WhatsApp with your message pre-filled. No forms, no waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(212,175,55,0.1)", padding: "32px 5%", background: "#080705" }}>
        <div className="footer-inner" style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>Vanya Real Estate</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Real estate consultant, Sector 25 Rohini, Delhi</div>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
            {[["Properties","properties"],["About","about"],["Reviews","reviews"],["Contact","contact"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", fontSize: 13, color: "var(--muted)", cursor: "pointer", transition: "color .2s", padding: 0 }}
                onMouseEnter={e => e.target.style.color="var(--gold)"} onMouseLeave={e => e.target.style.color="var(--muted)"}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={`tel:${PHONE_RAW}`}><button className="btn-outline" style={{ padding: "7px 14px", fontSize: 13 }}>📞 Call</button></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><button className="btn-wa" style={{ padding: "7px 14px", fontSize: 13 }}><WaIcon size={14} /> WhatsApp</button></a>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "var(--muted)" }}>
          © 2025 Vanya Real Estate, Sector 25 Rohini, Delhi. All rights reserved.
        </div>
      </footer>

    </>
  );
}
