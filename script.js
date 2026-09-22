const CONFIG = {
  whatsapp: "6288296606854",
  instagram: "https://instagram.com/estehporjo",
  tiktok: "https://tiktok.com/@esteh.porjo",
  maps: "https://www.google.com/maps/search/?api=1&query=Es+Teh+Porjo",
};

const header = document.getElementById("header"),
  nav = document.getElementById("nav"),
  wipe = document.querySelector(".wipe");
window.addEventListener("scroll", () =>
  header.classList.toggle("scrolled", scrollY > 30),
);
document.querySelector(".hamburger").addEventListener("click", (e) => {
  const open = nav.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});

function go(target) {
  const el = document.querySelector(target);
  if (!el) return;
  wipe.classList.remove("play");
  void wipe.offsetWidth;
  wipe.classList.add("play");
  setTimeout(
    () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
    250,
  );
  setTimeout(() => nav.classList.remove("open"), 450);
}
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const t = a.getAttribute("href");
    if (!t || t === "#") return;
    e.preventDefault();
    go(t);
  }),
);

const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("visible");
        reveal.unobserve(x.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
document
  .querySelectorAll(".reveal-left,.reveal-right,.reveal-up")
  .forEach((x) => reveal.observe(x));

const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((x) => {
      if (!x.isIntersecting) return;
      document
        .querySelectorAll("#nav a")
        .forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + x.target.id,
          ),
        );
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
);
document
  .querySelectorAll("main section[id]")
  .forEach((s) => sectionObs.observe(s));

document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  if (innerWidth > 900) {
    const v = document.querySelector(".hero-visual");
    v.style.transform = `translate(${(e.clientX / innerWidth - 0.5) * 8}px,${(e.clientY / innerHeight - 0.5) * 6}px)`;
  }
});

document.querySelectorAll(".size").forEach((btn) => {
  btn.addEventListener("click", () => {
    const size = btn.dataset.size;

    // =========================
    // AKTIFKAN TOMBOL SIZE
    // =========================

    document.querySelectorAll(".size").forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    // =========================
    // GANTI HARGA + GAMBAR
    // =========================

    document.querySelectorAll(".menu-card-v8").forEach((card) => {
      // ----- HARGA -----

      const price = card.dataset[size];

      const priceElement = card.querySelector(".price");

      if (priceElement && price) {
        priceElement.textContent = price;
      }

      // ----- GAMBAR -----

      const image = card.querySelector(".menu-product-img");

      if (image) {
        const imagePath = card.dataset[`img${size}`];

        if (imagePath) {
          image.src = imagePath;
        }
      }
    });
  });
});

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}
document.getElementById("voucherBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("PORJO2000");
    toast("Kode PORJO2000 berhasil disalin ✨");
  } catch {
    toast("Kode voucher: PORJO2000");
  }
});

document.getElementById("wa").href =
  `https://wa.me/${CONFIG.whatsapp}?text=Halo%20Es%20Teh%20Porjo%2C%20saya%20mau%20pesan.`;
document.getElementById("ig").href = CONFIG.instagram;
document.getElementById("tt").href = CONFIG.tiktok;
document.getElementById("allMaps").href = CONFIG.maps;
["wa", "ig", "tt", "allMaps"].forEach(
  (id) => (document.getElementById(id).target = "_blank"),
);

document.querySelectorAll(".map-link").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const q = encodeURIComponent(a.dataset.map);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${q}`,
      "_blank",
      "noopener,noreferrer",
    );
  }),
);

document.getElementById("top").addEventListener("click", () => go("#beranda"));
document.getElementById("year").textContent = new Date().getFullYear();
