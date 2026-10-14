
(function () {
  "use strict";

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

  const params = new URLSearchParams(location.search);
  const SKIP_PRELOAD = params.has("nopreload");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IMAGES = [
    "event-01","event-02","event-03","event-04",
    "event-05","event-06","event-07","event-08"
  ].map(n => `assets/img/${n}.jpg`);

  document.getElementById("yr").textContent = new Date().getFullYear();

  const root = document.documentElement;
  const saved = localStorage.getItem("csk-theme");
  if (saved) root.setAttribute("data-theme", saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("csk-theme", next);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  const tags = ["Workshop","Community","Hands-on","Lab","Meetup","Retreat","Panel","On stage"];
  const track = document.getElementById("heroTrack");
  const buildSlides = () => IMAGES.map((src,i)=>(
    `<figure class="hero-slide"><img src="${src}" alt="" loading="eager"><span class="tag">${tags[i%tags.length]}</span></figure>`
  )).join("");
  track.innerHTML = buildSlides() + buildSlides(); 

  const TEAM = [
    { title: "Professional Execom", people: [
      ["Prof. Sarju S", "Chairperson", "SJCET"],
      ["Dr. Mahalingam P R", "Vice Chairperson", "INAPP"],
      ["Dr. Vishnu Rajan", "Secretary", "Intershala"],
      ["Ms. Nayana S", "Treasurer", "SADA"],
      ["Dr. Deepthi Sasidharan", "Chapter Advisor", "GECBH"],
      ["Dr. Vishnukumar S", "Chapter Advisor", "CUSAT"],
      ["Mr. Vaishakh Suresh", "Jnt. Secretary Industry Relations", "MyGate"],
      ["Dr. Satheesh Kumar", "Jnt Secretary Academia", "JCET Palakkad"],
      ["Mr. Devanarayanan S V", "Jnt. Secretary YP", "GADS LLP"],
      ["Ms. Maria Tresa Binu", "Chairperson, GSAC", "EY"]
    ]},
    { title: "Student Leadership Team", people: [
      ["Sreehari S", "Student Representative", "GECK"],
      ["Aravind R Krishnan", "Technical Coordinator", "CCET"],
      ["Abhiram Chandrasenan", "ECC", "CEKGR"],
      ["Parvathy V Nair", "WIC", "SJCET"],
      ["Asiya Shaji", "Travancore HSR", "CEP"],
      ["Abhinav S Menon", "Kochi HSR", "CCET"],
      ["Alwin Reji", "Malabar HSR", "GECK"],
      ["Gauiri Shankar G Nair", "Webmaster", "GECPKD"],
      ["Arjun K", "Webmaster", "NSSCE"],
      ["Anantha Padmanabhan P", "EIC", "MCET"],
      ["Adinath M C", "SIG AI Lead", "CUSAT"],
      ["Saniya Joby", "MDC", "RSET"]
    ]},
    { title: "Graduate Student Activities Committee", people: [
      ["Dr. Vishnu Rajan", "Advisor", ""],
      ["Ms. Maria Tresa Binu", "Chairperson", ""],
      ["Mr. Nathan Jose V", "Vice Chairperson", ""],
      ["Mr. Sameen Sardar S", "Secretary", ""],
      ["Mr. Viswanatha Kartha", "Initiative Lead", ""],
      ["Ms. Neha Sunny", "Community Engagement Lead", ""],
      ["Mr. Gregory Kurien", "Program Coordinator", ""],
      ["Ms. Akshaya Krishna R", "Outreach Coordinator", ""]
    ]}
  ];
  const stripHon = (name) => name.replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, "").trim();
  const initials = (name) => {
    const w = stripHon(name).split(/\s+/);
    return ((w[0]?.[0] || "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
  };
  const slugify = (name) => stripHon(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const teamWrap = document.getElementById("teamWrap");
  if (teamWrap) {
    teamWrap.innerHTML = TEAM.map((g, gi) => `
      <div class="team-group reveal">
        <button class="team-grouphead" type="button" aria-expanded="false" aria-controls="tg-${gi}">
          <h3>${g.title}</h3>
          <span class="count">${g.people.length}</span>
          <span class="rule"></span>
          <span class="chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
        </button>
        <div class="team-gridwrap" id="tg-${gi}">
          <div class="team-grid">
            ${g.people.map(([n, r, o]) => `
              <article class="person">
                <div class="avatar">
                  <span class="ini">${initials(n)}</span>
                  <img src="assets/img/team/${slugify(n)}.png" alt="${n}" loading="lazy"
                       onerror="this.style.display='none'">
                </div>
                <div class="who">
                  <span class="p-name">${n}</span>
                  <span class="p-role">${r}</span>
                  ${o ? `<span class="p-org">${o}</span>` : ""}
                </div>
              </article>`).join("")}
          </div>
        </div>
      </div>`).join("");

    teamWrap.querySelectorAll(".team-grouphead").forEach(btn => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".team-group");
        const open = group.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  function runPreloader(done) {
    const pl   = document.getElementById("preloader");
    const bar  = pl.querySelector(".pl-bar i");
    const count= pl.querySelector(".pl-count");
    const words= pl.querySelectorAll(".pl-word .ln span");
    const curtain = pl.querySelector(".pl-curtain");

    if (reduceMotion || SKIP_PRELOAD) {
      pl.style.display = "none";
      document.body.classList.remove("no-scroll");
      done();
      return;
    }

    const tl = gsap.timeline();
    tl.to(words, { y: 0, duration: 0.9, stagger: 0.12, ease: "expo.out" }, 0.1)
      .to(bar, { right: "0%", duration: 1.5, ease: "power2.inOut" }, 0.2)
      .to(count, {
        duration: 1.5, ease: "power2.inOut",
        textContent: 100, snap: { textContent: 1 },
        onUpdate: function () { count.textContent = Math.round(this.targets()[0].textContent); }
      }, 0.2)
      .to(pl.querySelector(".pl-inner"), { y: -20, opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.25")
      .set(curtain, { y: "0%" }, "<0.1")
      .to(curtain, { y: "-100%", duration: 0.9, ease: "expo.inOut",
        onStart: () => document.body.classList.remove("no-scroll") })
      .set(pl, { display: "none" })
      .add(done, "-=0.5");
  }

  function heroIntro() {
    const spans = document.querySelectorAll(".hero h1 .line > span");
    gsap.set(spans, { yPercent: 115 });
    gsap.to(spans, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", delay: 0.05 });
    gsap.from(".hero-badge, .hero-sub, .hero-actions", {
      y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.35
    });
    gsap.from(".hero-slide", {
      opacity: 0, scale: 0.85, filter: "blur(8px)", duration: 1.1,
      stagger: 0.05, ease: "power3.out", delay: 0.1
    });
  }

  function init() {
    gsap.registerPlugin(ScrollTrigger);

    let lenis;
    if (window.Lenis && !reduceMotion && !params.has("y") && !params.has("test")) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true,
        easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10*t)) });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t)=>lenis.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
      lenis.scrollTo(0, { immediate: true });   
      
      document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener("click", e=>{
          const id = a.getAttribute("href");
          if (id.length>1 && document.querySelector(id)) {
            e.preventDefault(); lenis.scrollTo(id, { offset:-40, duration:1.3 });
          }
        });
      });
    }

    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (burger && mobileMenu) {
      const setMenu = (open) => {
        document.body.classList.toggle("menu-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
      };
      burger.addEventListener("click", () =>
        setMenu(!document.body.classList.contains("menu-open")));
      
      mobileMenu.querySelectorAll("a").forEach(a =>
        a.addEventListener("click", () => setMenu(false)));
      
      window.addEventListener("resize", () => {
        if (window.innerWidth > 820) setMenu(false);
      });
    }

    if (!reduceMotion) {
      
      gsap.to(track, { xPercent: -50, duration: 46, ease: "none", repeat: -1 });

      gsap.to(".hero-track-wrap", {
        xPercent: -4, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
      });
      
      gsap.to(".hero-overlay", {
        yPercent: -18, opacity: 0, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "30% top", end: "bottom top", scrub: true }
      });
    }

    const steps   = gsap.utils.toArray(".story-step");
    const layers  = gsap.utils.toArray("#storyFrame .layer");
    const idxEl   = document.getElementById("storyIndex");
    const N = steps.length;

    function swapImage(i) {
      i = Math.max(0, Math.min(N - 1, i));
      layers.forEach((l, k) => {
        if (k === i) {
          l.style.zIndex = 2;
          gsap.fromTo(l, { yPercent: 10, opacity: 0, scale: 1.08 },
            { yPercent: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", overwrite: "auto" });
        } else {
          l.style.zIndex = 1;
          gsap.to(l, { opacity: 0, duration: 0.6, overwrite: "auto" });
        }
      });
      idxEl.textContent = String(i + 1).padStart(2, "0");
    }

    if (!reduceMotion && window.innerWidth > 820) {
      
      steps.forEach((s, i) => gsap.set(s, { zIndex: i }));

      const smoother = t => t * t * t * (t * (t * 6 - 15) + 10); 
      const RISE = 0.92, EXIT = 1.0;

      const place = (card, d) => {
        
        let y, scale = 1, opacity = 1, blur = 0;
        if (d >= RISE) {                       
          y = 120; opacity = 0;
        } else if (d > 0) {                    
          const u = d / RISE;                  
          y = 120 * smoother(u);
          opacity = Math.min(1, (1 - u) * 2.6);
        } else if (d > -EXIT) {                
          const v = -d / EXIT;                 
          y = -122 * smoother(v);
          scale = 1 - 0.16 * v;                
          opacity = v < 0.6 ? 1 : Math.max(0, 1 - (v - 0.6) / 0.4);
          blur = v > 0.5 ? (v - 0.5) * 3.2 : 0;
        } else {                               
          y = -122; opacity = 0; scale = 0.84;
        }
        gsap.set(card, { yPercent: y, scale, opacity, filter: "blur(" + blur + "px)" });
      };

      steps.forEach((c, i) => place(c, i));

      let last = -1;
      ScrollTrigger.create({
        trigger: ".story",
        start: "top top",
        end: () => "+=" + (window.innerHeight * (N + 1)),
        pin: ".story-pin",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const ptr = self.progress * (N - 1);        
          steps.forEach((c, i) => place(c, i - ptr));
          const idx = Math.max(0, Math.min(N - 1, Math.round(ptr)));
          if (idx !== last) { swapImage(idx); last = idx; }
        }
      });

      gsap.fromTo("#storyFrame", { yPercent: 5, scale: 1.03 },
        { yPercent: -9, scale: 1, ease: "none",
          scrollTrigger: {
            trigger: ".story", start: "top top",
            end: () => "+=" + (window.innerHeight * (N + 1)), scrub: true
          } });
    } else {
      
      steps.forEach((s, i) => {
        gsap.set(s, { position: "relative", opacity: 1, yPercent: 0,
          scale: 1, filter: "none", marginBottom: i < N - 1 ? "1.3rem" : 0 });
        const src = layers[i] && layers[i].querySelector("img")
          ? layers[i].querySelector("img").getAttribute("src") : null;
        if (src && !s.querySelector(".step-img")) {
          const fig = document.createElement("div");
          fig.className = "step-img";
          fig.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
          s.insertBefore(fig, s.firstChild);
        }
      });
      const sc = document.getElementById("storySteps");
      if (sc) sc.style.height = "auto";
      const vis = document.querySelector(".story-visual");
      if (vis) vis.style.display = "none";
      const lbl = document.querySelector(".story-label");
      if (lbl) lbl.textContent = "Our story · six chapters";
    }

    const stage   = document.getElementById("bubbleStage");
    const bubbles = gsap.utils.toArray(".bubble");
    const gridcar = document.getElementById("gridcar");
    const copy    = document.getElementById("convergeCopy");

    const scatter = bubbles.map((b, i) => {
      const ang = (i / bubbles.length) * Math.PI * 2 + 0.4;
      const rx = (window.innerWidth  * 0.30);
      const ry = (window.innerHeight * 0.32);
      return {
        x: Math.cos(ang) * rx * (0.7 + Math.random()*0.5),
        y: Math.sin(ang) * ry * (0.7 + Math.random()*0.5),
        r: (Math.random()*40 - 20),
        s: 0.75 + Math.random()*0.6
      };
    });

    if (!reduceMotion && window.innerWidth > 820) {
      
      ["#gcRowA", "#gcRowB"].forEach(sel => {
        const row = document.querySelector(sel);
        if (row && !row.dataset.dup) { row.innerHTML += row.innerHTML; row.dataset.dup = "1"; }
      });

      bubbles.forEach((b, i) => {
        gsap.set(b, { x: scatter[i].x, y: scatter[i].y, rotation: scatter[i].r,
          scale: scatter[i].s, opacity: 0 });
      });
      gsap.set(gridcar, { opacity: 0 });
      gsap.set(".gc-card", { opacity: 0, scale: 0.6, filter: "blur(10px)" });

      const cv = gsap.timeline({
        scrollTrigger: {
          trigger: ".converge",
          start: "top top",
          end: () => "+=" + (window.innerHeight * 3.4),
          pin: ".converge-pin",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      cv.to(bubbles, { opacity: 1, duration: 0.4, stagger: 0.03 }, 0)
        
        .to(bubbles, {
          x: 0, y: 0, rotation: 0, scale: 1,
          duration: 1.2, ease: "power3.inOut", stagger: { each: 0.02, from: "edges" }
        }, 0.5)
        .to(stage, { scale: 0.62, duration: 0.6, ease: "power2.inOut" }, 1.2)
        .to(copy, { opacity: 0, scale: 0.9, duration: 0.4 }, 1.3)
        
        .to(bubbles, {
          scale: 2.4, opacity: 0, filter: "blur(14px)",
          duration: 0.6, ease: "power2.in", stagger: { each: 0.015, from: "center" }
        }, 1.7)
        
        .set(gridcar, { pointerEvents: "auto" }, 1.85)
        .to(gridcar, { opacity: 1, duration: 0.45 }, 1.85)
        .to(".gc-card", {
          opacity: 1, scale: 1, filter: "blur(0px)",
          duration: 0.7, ease: "back.out(1.5)", stagger: 0.03
        }, 1.9)
        .to({}, { duration: 0.9 });   

      gsap.to("#gcRowA", { xPercent: -50, duration: 44, ease: "none", repeat: -1 });
      gsap.fromTo("#gcRowB", { xPercent: -50 }, { xPercent: 0, duration: 52, ease: "none", repeat: -1 });

    } else {
      
      stage.style.display = "none";
      gridcar.style.opacity = 1;
      gridcar.style.position = "relative";
      gridcar.style.pointerEvents = "auto";
      copy.style.position = "relative";
    }

    gsap.utils.toArray(".reveal").forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: "top 86%",
        onEnter: () => el.classList.add("in")
      });
    });

    gsap.utils.toArray(".stat .num").forEach(el => {
      const target = +el.getAttribute("data-count");
      const suffix = el.getAttribute("data-suffix") || "";
      const unit = el.querySelector(".u");
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out",
          onUpdate: () => {
            el.firstChild.textContent = Math.round(obj.v) + suffix;
          },
          onComplete: () => { if (unit) el.appendChild(unit); }
        })
      });
      
      el.insertBefore(document.createTextNode("0"), el.firstChild);
    });

    ScrollTrigger.create({
      start: 80,
      onToggle: (self) => document.querySelector(".nav-pill")
        .classList.toggle("scrolled", self.isActive)
    });

    ScrollTrigger.refresh();
    window.addEventListener("load", () => ScrollTrigger.refresh());

    if (params.has("y")) {
      const y = +params.get("y");
      const jump = () => {
        if (lenis) lenis.scrollTo(y, { immediate: true });
        window.scrollTo(0, y);
        ScrollTrigger.update();
      };
      setTimeout(jump, 300);
      setTimeout(jump, 900);
      setTimeout(jump, 1600);
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    runPreloader(() => heroIntro());
    init();
  });
})();
