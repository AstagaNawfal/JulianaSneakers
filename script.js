/* =========================================================
   JULIANA SNEAKERS — script.js
   Vanilla JS: catalog, filter/search/sort, product modal,
   cart + wishlist (localStorage), checkout, toasts.
   ========================================================= */
"use strict";

/* ---------------- Catalog data ---------------- */
const FALLBACK_IMG = "assets/img/placeholder.svg";

const BRANDS = [
  "Nike", "Jordan", "New Balance", "PUMA",
  "Salomon", "adidas", "ASICS", "Converse", "Vans"
];

const SIZES = ["39", "40", "41", "42", "43", "44", "45"];

/* 45 produk — 5 untuk tiap brand.
   img: URL Wikimedia Commons (sudah diverifikasi 200).
   featured: 1–45, dipakai sort "Featured" (urutan default menyilang antar brand). */
const PRODUCTS = [
  /* ---------------- NIKE (5) ---------------- */
  {
    id: "nike-air-max-90",
    brand: "Nike",
    name: "Air Max 90 Cool Grey",
    category: "Lifestyle",
    price: 2299000, oldPrice: null,
    rating: 4.8, reviews: 187,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Nike_Air_Max_90.jpg/960px-Nike_Air_Max_90.jpg",
    desc: "Siluet Air Max 90 dengan panel abu cool grey dan bubble Air klasik di heel. Tinggi yang pas untuk daily wear, dari kantor sampai nongkrong.",
    colors: [{ name: "Cool Grey", hex: "#9a9ba1" }, { name: "White", hex: "#f4f4f1" }],
    material: "Leather & mesh upper + Air unit",
    stock: 16, out: ["45"], added: "2026-10-02", featured: 1,
  },
  {
    id: "nike-vaporfly-next3",
    brand: "Nike",
    name: "Vaporfly Next% 3 White Silver",
    category: "Running",
    price: 3499000, oldPrice: 3999000,
    rating: 4.9, reviews: 92,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/HK_clothing_NIKE_brand_Vaporfly_Next_sneakers_white_n_silver_shoes_October_2022_Px3_05.jpg/960px-HK_clothing_NIKE_brand_Vaporfly_Next_sneakers_white_n_silver_shoes_October_2022_Px3_05.jpg",
    desc: "Sepatu lomba dengan plate karbon dan busa ZoomX paling responsif. Dibuat untuk PB — cocok untuk race day 5K sampai marathon.",
    colors: [{ name: "White", hex: "#f5f5f2" }, { name: "Silver", hex: "#c9ccd1" }],
    material: "Flyknit upper + ZoomX foam",
    stock: 7, out: ["39", "44"], added: "2026-08-14", featured: 10,
  },
  {
    id: "nike-af1-low-white",
    brand: "Nike",
    name: "Air Force 1 '07 Low White",
    category: "Lifestyle",
    price: 1999000, oldPrice: null,
    rating: 4.9, reviews: 412,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Nike_Air_Force_1.jpg/960px-Nike_Air_Force_1.jpg",
    desc: "Siluet 1982 yang tak pernah salah: upper kulit putih bersih, Swoosh tebal, dan cushioning Air tersembunyi untuk kenyamanan seharian.",
    colors: [{ name: "Triple White", hex: "#f6f6f3" }, { name: "Sail", hex: "#eae5d9" }],
    material: "Kulit premium + midsole Air",
    stock: 34, out: [], added: "2026-06-20", featured: 19,
  },
  {
    id: "nike-court-zoom-lite3",
    brand: "Nike",
    name: "Court Zoom Lite 3 Hard Court",
    category: "Court",
    price: 1399000, oldPrice: null,
    rating: 4.5, reviews: 64,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/NIKE_Court_Zoom_Lite_3_Hard_Court_Sneakers_For_Men.jpg/960px-NIKE_Court_Zoom_Lite_3_Hard_Court_Sneakers_For_Men.jpg",
    desc: "Sepatu lapangan keras dengan Zoom Air di forefoot dan outsole tahan gesek. Ringan untuk gerak cepat, kuat untuk pertandingan panjang.",
    colors: [{ name: "White", hex: "#f3f3f0" }, { name: "Black", hex: "#17171a" }],
    material: "Synthetic leather + rubber outsole",
    stock: 21, out: ["39"], added: "2026-07-08", featured: 28,
  },
  {
    id: "nike-airmax95-vapormax",
    brand: "Nike",
    name: "Air Max 95 × Vapormax Hybrid",
    category: "Lifestyle",
    price: 3199000, oldPrice: null,
    rating: 4.7, reviews: 118,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Nike_Air_Max_95_and_Vapormax_95.jpg/960px-Nike_Air_Max_95_and_Vapormax_95.jpg",
    desc: "Gabungan panel bertingkat khas Air Max 95 dengan unit Vapormax full-length. Statement piece untuk kolektor yang suka siluet tebal.",
    colors: [{ name: "Wolf Grey", hex: "#8e9096" }, { name: "Black", hex: "#17171a" }],
    material: "Mesh & synthetic upper + Vapormax",
    stock: 6, out: ["40", "45"], added: "2026-09-05", featured: 37,
  },

  /* ---------------- JORDAN (5) ---------------- */
  {
    id: "jordan-aj1-banned",
    brand: "Jordan",
    name: "Air Jordan 1 Mid Banned",
    category: "Court",
    price: 2899000, oldPrice: null,
    rating: 4.9, reviews: 512,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Air_Jordan_1_Banned.jpg/960px-Air_Jordan_1_Banned.jpg",
    desc: "Kombinasi hitam-merah legendaris yang pernah dilarang NBA. Kulit halus, panel suede di toe box, dan proporsi Mid yang mudah dipadukan.",
    colors: [{ name: "Bred", hex: "#a5231f" }, { name: "Black", hex: "#16161a" }],
    material: "Kulit full grain + suede",
    stock: 9, out: [], added: "2026-06-11", featured: 2,
  },
  {
    id: "jordan-aj1-low",
    brand: "Jordan",
    name: "Air Jordan 1 Low White Black",
    category: "Court",
    price: 2399000, oldPrice: null,
    rating: 4.8, reviews: 276,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Air_Jordan_1_Low.jpg/960px-Air_Jordan_1_Low.jpg",
    desc: "Versi low-top dari ikon basket: clean, ringan, dan fleksibel dipakai harian. Detail Swoosh kontras yang tetap terlihat premium.",
    colors: [{ name: "White", hex: "#f4f4f1" }, { name: "Black", hex: "#17171a" }],
    material: "Leather upper + foam midsole",
    stock: 18, out: ["45"], added: "2026-09-28", featured: 11,
  },
  {
    id: "jordan-aj1-mid-shadow",
    brand: "Jordan",
    name: "Air Jordan 1 Mid Shadow Grey",
    category: "Court",
    price: 2699000, oldPrice: 3099000,
    rating: 4.7, reviews: 143,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Air_Jordan_1_Mid_01.jpg/960px-Air_Jordan_1_Mid_01.jpg",
    desc: "Colorway netral dengan aksen abu gelap yang gampang dipadukan denim maupun chino. Stok terbatas untuk size populer.",
    colors: [{ name: "Shadow", hex: "#6d6e73" }, { name: "White", hex: "#f4f4f1" }],
    material: "Leather & synthetic upper",
    stock: 8, out: ["39"], added: "2026-07-25", featured: 20,
  },
  {
    id: "jordan-aj15-steel",
    brand: "Jordan",
    name: "Air Jordan 15 Retro Steel",
    category: "Court",
    price: 3599000, oldPrice: null,
    rating: 4.6, reviews: 57,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Air_Jordan_XV.jpg/960px-Air_Jordan_XV.jpg",
    desc: "Retro langka dengan lidah menjorok khas XV yang terinspirasi pesawat tempur. Upper woven dan Wings branding yang discult lovers cari.",
    colors: [{ name: "Steel", hex: "#8a8d93" }, { name: "Black", hex: "#17171a" }],
    material: "Woven textile + leather",
    stock: 5, out: ["40", "44"], added: "2026-05-19", featured: 29,
  },
  {
    id: "jordan-aj16",
    brand: "Jordan",
    name: "Air Jordan XVI Retro",
    category: "Court",
    price: 3299000, oldPrice: null,
    rating: 4.6, reviews: 48,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Air_Jordan_XVI.jpg/960px-Air_Jordan_XVI.jpg",
    desc: "Siluet dengan shroud leather yang bisa dilepas, menggabungkan performa court dan look formal. Ikon era 2001 yang kembali ke rak kolektor.",
    colors: [{ name: "White", hex: "#f4f4f1" }, { name: "Varisty Red", hex: "#9d2b2b" }],
    material: "Leather shroud + textile",
    stock: 4, out: ["39", "40", "45"], added: "2026-05-02", featured: 38,
  },

  /* ---------------- NEW BALANCE (5) ---------------- */
  {
    id: "nb-574-core-grey",
    brand: "New Balance",
    name: "574 Core Grey",
    category: "Lifestyle",
    price: 1599000, oldPrice: null,
    rating: 4.8, reviews: 389,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/New_Balance_574.jpg/960px-New_Balance_574.jpg",
    desc: "Klasik abu-abu yang jadi standar sneaker harian: upper suede, ENCAP midsole, dan siluet yang tak lekang oleh waktu.",
    colors: [{ name: "Grey", hex: "#8f9095" }, { name: "Navy", hex: "#233054" }],
    material: "Suede & mesh + ENCAP midsole",
    stock: 32, out: [], added: "2026-06-05", featured: 3,
  },
  {
    id: "nb-990v6-mia",
    brand: "New Balance",
    name: "990v6 Made in USA",
    category: "Lifestyle",
    price: 3499000, oldPrice: null,
    rating: 4.9, reviews: 164,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/New_Balance_Women%27s_990_Running_Shoes.jpg/960px-New_Balance_Women%27s_990_Running_Shoes.jpg",
    desc: "Bagian dari lini 999 Series yang dibuat di pabrik AS. Busa FuelCell, upper suede premium, dan kenyamanan dad-shoe yang nyata.",
    colors: [{ name: "Grey", hex: "#9b9ca1" }, { name: "White", hex: "#f4f4f1" }],
    material: "Pigskin suede + FuelCell foam",
    stock: 11, out: ["44"], added: "2026-09-30", featured: 12,
  },
  {
    id: "nb-freshfoam-1080",
    brand: "New Balance",
    name: "Fresh Foam X 1080v13",
    category: "Running",
    price: 2499000, oldPrice: 2899000,
    rating: 4.8, reviews: 210,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/New_Balance_Fresh_Foam_shoe_on_display.jpg/960px-New_Balance_Fresh_Foam_shoe_on_display.jpg",
    desc: "Sepatu lari premium dengan busa Fresh Foam X paling lembut di line-up. Cocok dari pemula sampai marathoner jarak jauh.",
    colors: [{ name: "Quartz", hex: "#c7a9a2" }, { name: "Black", hex: "#17171a" }],
    material: "Hypoknit upper + Fresh Foam X",
    stock: 13, out: ["45"], added: "2026-07-17", featured: 21,
  },
  {
    id: "nb-1225-stability",
    brand: "New Balance",
    name: "1225 Stability Trainer",
    category: "Running",
    price: 2799000, oldPrice: null,
    rating: 4.7, reviews: 88,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/New_Balance_1225_Running_Shoes.jpg/960px-New_Balance_1225_Running_Shoes.jpg",
    desc: "Trainer stabilitas untuk overpronator: medial post kuat dan heel counter yang memegang kaki. Nyaman untuk long slow distance.",
    colors: [{ name: "Silver", hex: "#b9bcc2" }, { name: "Blue", hex: "#2f4a7a" }],
    material: "Mesh + ABZORB cushioning",
    stock: 14, out: ["39"], added: "2026-06-30", featured: 30,
  },
  {
    id: "nb-2002r-protection",
    brand: "New Balance",
    name: "2002R Protection Pack",
    category: "Lifestyle",
    price: 2899000, oldPrice: null,
    rating: 4.7, reviews: 132,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/New_Balance_Shoes.JPG/960px-New_Balance_Shoes.JPG",
    desc: "Upper dengan potongan 'sobek' khas Protection Pack yang jadi tren streetwear. Sol N-ergy responsif untuk harian yang padat.",
    colors: [{ name: "Sea Salt", hex: "#e6e0d3" }, { name: "Rain Cloud", hex: "#a7abb1" }],
    material: "Suede & mesh + N-ergy",
    stock: 10, out: ["44", "45"], added: "2026-08-26", featured: 39,
  },

  /* ---------------- PUMA (5) ---------------- */
  {
    id: "puma-suede-classic",
    brand: "PUMA",
    name: "Suede Classic XXI Grey",
    category: "Lifestyle",
    price: 1299000, oldPrice: null,
    rating: 4.6, reviews: 231,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Puma_Suede.jpg/960px-Puma_Suede.jpg",
    desc: "Siluet suede 50 tahun yang selalu relevan. Formstrip kontras, sol kuluze vulkanis, dan grip yang mantap di aspal.",
    colors: [{ name: "Grey", hex: "#8f9095" }, { name: "Black", hex: "#17171a" }],
    material: "Suede leather + rubber outsole",
    stock: 28, out: [], added: "2026-05-28", featured: 4,
  },
  {
    id: "puma-suede-red",
    brand: "PUMA",
    name: "Suede Classic XXI Red",
    category: "Lifestyle",
    price: 1199000, oldPrice: 1499000,
    rating: 4.5, reviews: 156,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Puma_suede_red.jpg/960px-Puma_suede_red.jpg",
    desc: "Merah menyala dengan side stripe putih klasik. Suede lembut yang makin cakep seiring pemakaian.",
    colors: [{ name: "Red", hex: "#b7302c" }, { name: "White", hex: "#f4f4f1" }],
    material: "Suede leather + rubber outsole",
    stock: 17, out: ["45"], added: "2026-07-11", featured: 13,
  },
  {
    id: "puma-jago-zigzag",
    brand: "PUMA",
    name: "Jago Zig Zag Runner",
    category: "Running",
    price: 1499000, oldPrice: null,
    rating: 4.4, reviews: 42,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Puma_Jago_Zig_Zag_Running_Shoe.jpg/960px-Puma_Jago_Zig_Zag_Running_Shoe.jpg",
    desc: "Retro runner dengan pola zig-zag di midsole yang unik. Ringan dan empuk untuk jalan kaki maupun lari pagi santai.",
    colors: [{ name: "Navy", hex: "#25355e" }, { name: "White", hex: "#f4f4f1" }],
    material: "Textile upper + EVA foam",
    stock: 19, out: ["39", "40"], added: "2026-06-16", featured: 22,
  },
  {
    id: "puma-rsx-reinvention",
    brand: "PUMA",
    name: "RS-X Efekt Reinvention",
    category: "Lifestyle",
    price: 1799000, oldPrice: null,
    rating: 4.5, reviews: 96,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Puma_Shoes.JPG/960px-Puma_Shoes.JPG",
    desc: "Chunky runner dengan panel bertekstur dan sol tebal yang tetap ringan. Statement untuk outfit streetwear monokrom.",
    colors: [{ name: "Warm White", hex: "#efeae2" }, { name: "Steel", hex: "#7f8188" }],
    material: "Mesh + synthetic overlay",
    stock: 12, out: [], added: "2026-10-03", featured: 31,
  },
  {
    id: "puma-future-rider",
    brand: "PUMA",
    name: "Future Rider Play On",
    category: "Lifestyle",
    price: 1599000, oldPrice: null,
    rating: 4.5, reviews: 74,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Pumashoes.jpg/960px-Pumashoes.jpg",
    desc: "Inspirasi rider 80-an dengan Federal outsole yang grippy. Upper multi-panel yang ringan untuk pemakaian harian.",
    colors: [{ name: "White", hex: "#f4f4f1" }, { name: "Peacoat", hex: "#2b3a55" }],
    material: "Nubuck & mesh + EVA",
    stock: 22, out: ["45"], added: "2026-08-09", featured: 40,
  },

  /* ---------------- SALOMON (5) ---------------- */
  {
    id: "salomon-speedcross-6",
    brand: "Salomon",
    name: "Speedcross 6 Lunar Rock",
    category: "Trail",
    price: 2799000, oldPrice: null,
    rating: 4.8, reviews: 243,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Salomon_trail_running_shoes_women_Speedcross.jpg/960px-Salomon_trail_running_shoes_women_Speedcross.jpg",
    desc: "Grip agresif khas Speedcross untuk trail berlumpur, kini lebih ringan dan breathable di versi keenam. Quicklace satu tarikan.",
    colors: [{ name: "Lunar Rock", hex: "#6f7076" }, { name: "Fiery Red", hex: "#b23a2b" }],
    material: "Mesh ripstop + synthetic guard",
    stock: 10, out: [], added: "2026-06-24", featured: 5,
  },
  {
    id: "salomon-xa-pro3d-v9",
    brand: "Salomon",
    name: "XA PRO 3D V9 GORE-TEX",
    category: "Trail",
    price: 2499000, oldPrice: null,
    rating: 4.7, reviews: 137,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Salomon_XA_PRO_3D_trail_running_shoe.jpg/960px-Salomon_XA_PRO_3D_trail_running_shoe.jpg",
    desc: "All-rounder trail dengan chassis 3D yang stabil di batu dan akar. Versi GORE-TEX tetap breathable tapi tahan cipratan air.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "Sulphur", hex: "#c8c34a" }],
    material: "GORE-TEX + engineered mesh",
    stock: 15, out: ["45"], added: "2026-09-26", featured: 14,
  },
  {
    id: "salomon-snowtrip-ts",
    brand: "Salomon",
    name: "Snowtrip TS WP",
    category: "Trail",
    price: 2199000, oldPrice: 2599000,
    rating: 4.6, reviews: 61,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Salomon_Snowtrip_TS_WP.jpg/960px-Salomon_Snowtrip_TS_WP.jpg",
    desc: "Boot trail musim dingin dengan lapisan tahan air dan lengan tumit yang memegang kaki. Hangat tanpa terasa berat.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "Snow Grey", hex: "#9ea1a6" }],
    material: "Waterproof membrane + rubber",
    stock: 9, out: ["39"], added: "2026-07-04", featured: 23,
  },
  {
    id: "salomon-91-rs-energyzer",
    brand: "Salomon",
    name: "S/LAB 9.1 RS Energyzer",
    category: "Running",
    price: 2999000, oldPrice: null,
    rating: 4.7, reviews: 45,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Salomon_9.1_RS_Energyzer.jpg/960px-Salomon_9.1_RS_Energyzer.jpg",
    desc: "Sepatu trail racing dengan Energyzer cage yang mengunci midfoot saat turunan cepat. Outsole Contagrip untuk cengkeraman maksimal.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "Flame", hex: "#d1462a" }],
    material: "Endoweb upper + Contagrip",
    stock: 6, out: ["40", "44"], added: "2026-05-22", featured: 32,
  },
  {
    id: "salomon-slab-rs-carbon",
    brand: "Salomon",
    name: "S/LAB RS Carbon",
    category: "Running",
    price: 3999000, oldPrice: null,
    rating: 4.9, reviews: 38,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Salomon_RS_Carbon.jpg/960px-Salomon_RS_Carbon.jpg",
    desc: "Sepatu karbon trail untuk ultra race: midsole energy return tinggi, upper ultralight, dan fit sock-like yang presisi.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "White", hex: "#f4f4f1" }],
    material: "Carbon plate + TPU mesh",
    stock: 4, out: ["39", "44", "45"], added: "2026-08-31", featured: 41,
  },

  /* ---------------- ADIDAS (5) ---------------- */
  {
    id: "adidas-samba-og",
    brand: "adidas",
    name: "Samba OG Cloud White",
    category: "Lifestyle",
    price: 1699000, oldPrice: null,
    rating: 4.9, reviews: 618,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Adidas_Samba_original_sneaker_March-_2024.jpg/960px-Adidas_Samba_original_sneaker_March-_2024.jpg",
    desc: "Ikon sepak bola yang jadi staple streetwear: upper kulit putih, T-toe klasik, dan sol gum yang timeless.",
    colors: [{ name: "Cloud White", hex: "#f4f3ee" }, { name: "Core Black", hex: "#17171a" }],
    material: "Kulit + suede T-toe",
    stock: 40, out: [], added: "2026-06-08", featured: 6,
  },
  {
    id: "adidas-ultraboost-4",
    brand: "adidas",
    name: "Ultraboost 4 Solar Yellow",
    category: "Running",
    price: 2999000, oldPrice: 3499000,
    rating: 4.7, reviews: 176,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Adidas_Ultra_Boost_4_running_shoes.jpeg/960px-Adidas_Ultra_Boost_4_running_shoes.jpeg",
    desc: "Midsole BOOST 30% lebih ringan dengan energi return maksimal. Upper Primeknit adaptif yang mengikuti bentuk kaki.",
    colors: [{ name: "Solar Yellow", hex: "#d8c33f" }, { name: "Black", hex: "#17171a" }],
    material: "Primeknit + BOOST foam",
    stock: 13, out: ["45"], added: "2026-07-19", featured: 15,
  },
  {
    id: "adidas-stan-smith",
    brand: "adidas",
    name: "Stan Smith White Green",
    category: "Lifestyle",
    price: 1799000, oldPrice: null,
    rating: 4.8, reviews: 354,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Adidas_Stan_Smiths_sneaker.jpg/960px-Adidas_Stan_Smiths_sneaker.jpg",
    desc: "Tenis klasik dengan perforated 3-Stripes dan heel tab hijau khas Stan Smith. Bersih, simpel, cocok untuk semua outfit.",
    colors: [{ name: "White", hex: "#f4f4f1" }, { name: "Green", hex: "#2f6f4e" }],
    material: "Leather upper + EVA",
    stock: 24, out: ["39"], added: "2026-10-04", featured: 24,
  },
  {
    id: "adidas-superstar-shell",
    brand: "adidas",
    name: "Superstar Shell Toe Black",
    category: "Lifestyle",
    price: 1899000, oldPrice: null,
    rating: 4.7, reviews: 287,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Adidas_Superstar_shoes_pair.jpg/960px-Adidas_Superstar_shoes_pair.jpg",
    desc: "Shell toe rubber yang legendaris, kini dengan pad edisi hitam. Ikon hip-hop 80-an yang tetap relevan sampai sekarang.",
    colors: [{ name: "Core Black", hex: "#17171a" }, { name: "White", hex: "#f4f4f1" }],
    material: "Leather + rubber shell toe",
    stock: 26, out: [], added: "2026-06-27", featured: 33,
  },
  {
    id: "adidas-runfalcon-5",
    brand: "adidas",
    name: "Runfalcon 5 Trail",
    category: "Running",
    price: 1299000, oldPrice: null,
    rating: 4.5, reviews: 119,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Adidas_Runfalcon_%28LRM_20240430_141700-RR%29.jpg/960px-Adidas_Runfalcon_%28LRM_20240430_141700-RR%29.jpg",
    desc: "Lari harian entry-level dengan bantalan empuk dan outsole multi-arah. Pilihan hemat untuk jogging pagi dan treadmill.",
    colors: [{ name: "Grey", hex: "#8f9095" }, { name: "Navy", hex: "#25355e" }],
    material: "Mesh upper + EVA midsole",
    stock: 30, out: ["44"], added: "2026-05-14", featured: 42,
  },

  /* ---------------- ASICS (5) ---------------- */
  {
    id: "asics-gel-lyte3-koi",
    brand: "ASICS",
    name: "GEL-Lyte III 'Koi' Collab",
    category: "Lifestyle",
    price: 2599000, oldPrice: null,
    rating: 4.8, reviews: 102,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/ASICS_x_Afew_Gel_Lyte_III_%27Koi%27.jpg/960px-ASICS_x_Afew_Gel_Lyte_III_%27Koi%27.jpg",
    desc: "Kolaborasi dengan tema Koi: upper bergaya sisik ikan dan split-tongue khas GLIII. Koleksi terbatas untuk penggemar retro runner.",
    colors: [{ name: "Koi Red", hex: "#c0453a" }, { name: "Cream", hex: "#e9e2d2" }],
    material: "Suede & mesh + GEL cushion",
    stock: 6, out: ["44", "45"], added: "2026-09-29", featured: 7,
  },
  {
    id: "asics-sonoma-6-gtx",
    brand: "ASICS",
    name: "GEL-SONOMA 6 GORE-TEX",
    category: "Trail",
    price: 1999000, oldPrice: 2299000,
    rating: 4.6, reviews: 84,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Asics_GEL-SONOMA_6_GTX_%28men%27s_trail_shoes%29.jpg/960px-Asics_GEL-SONOMA_6_GTX_%28men%27s_trail_shoes%29.jpg",
    desc: "Trail entry dengan lapisan GORE-TEX dan lugs 4mm yang cengkeram tanah lembap. Cocok untuk hiking ringan sampai trail weekend.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "Sheet Rock", hex: "#b6b1a6" }],
    material: "GORE-TEX + AHAR outsole",
    stock: 16, out: ["39"], added: "2026-07-21", featured: 16,
  },
  {
    id: "asics-gt2000-12",
    brand: "ASICS",
    name: "GT-2000 12 Blue Orange",
    category: "Running",
    price: 2799000, oldPrice: null,
    rating: 4.8, reviews: 147,
    badge: "BEST SELLER",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/60/Blue_an_orange_Asics_running_shoes.jpg",
    desc: "Sepatu stabilitas harian dengan FF BLAST PLUS dan LITE TRUSS di midfoot. Pelanggan kami paling sering beli untuk training konsisten.",
    colors: [{ name: "Blue", hex: "#2f5aa8" }, { name: "Orange", hex: "#d9702a" }],
    material: "Engineered mesh + FF BLAST",
    stock: 18, out: [], added: "2026-06-18", featured: 25,
  },
  {
    id: "asics-gel-kayano-31",
    brand: "ASICS",
    name: "GEL-Kayano 31 Cream",
    category: "Running",
    price: 3199000, oldPrice: null,
    rating: 4.8, reviews: 121,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Asics_shoes.JPG/960px-Asics_shoes.JPG",
    desc: "Stability trainer dengan 4D GUIDANCE SYSTEM dan GEL di heel serta forefoot. Dibuat untuk pelari berpronasi yang butuh bantuan sepanjang lari.",
    colors: [{ name: "Cream", hex: "#e9e2d2" }, { name: "Sheet Rock", hex: "#b9b4a8" }],
    material: "Engineered mesh + GEL",
    stock: 7, out: ["45"], added: "2026-08-18", featured: 34,
  },
  {
    id: "asics-quantum360",
    brand: "ASICS",
    name: "GEL-QUANTUM360 Knit",
    category: "Lifestyle",
    price: 2899000, oldPrice: null,
    rating: 4.6, reviews: 69,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/AsicsSneaker.jpg/960px-AsicsSneaker.jpg",
    desc: "Upper knit seamless dengan full-length 360 GEL. Empuk seperti sepatu lari tapi dipakai untuk gaya harian.",
    colors: [{ name: "Black", hex: "#17171a" }, { name: "Blue", hex: "#2f5aa8" }],
    material: "Knit textile + 360 GEL",
    stock: 12, out: ["39", "40"], added: "2026-05-31", featured: 43,
  },

  /* ---------------- CONVERSE (5) ---------------- */
  {
    id: "converse-chuck70-white",
    brand: "Converse",
    name: "Chuck 70 High White",
    category: "Lifestyle",
    price: 1499000, oldPrice: null,
    rating: 4.8, reviews: 331,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Converse_All_Star_High_White_%284649858686%29.jpg/960px-Converse_All_Star_High_White_%284649858686%29.jpg",
    desc: "Versi premium Chuck Taylor: kanvas 12oz lebih tebal, jahitan garis ganda, dan midsole glossy khas era '70-an.",
    colors: [{ name: "White", hex: "#f5f3ec" }, { name: "Parchment", hex: "#e9e0cd" }],
    material: "Canvas 12oz + wingtip toe",
    stock: 26, out: [], added: "2026-06-13", featured: 8,
  },
  {
    id: "converse-chuck-high-blue",
    brand: "Converse",
    name: "Chuck Taylor All Star High Blue",
    category: "Lifestyle",
    price: 1299000, oldPrice: null,
    rating: 4.7, reviews: 198,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Converse_All_Star_Blue_High_%284649851894%29.jpg/960px-Converse_All_Star_Blue_High_%284649851894%29.jpg",
    desc: "High-top biru klasik dengan logo All Star di pergelangan. Ringan dan versatile untuk denim maupun dress kasual.",
    colors: [{ name: "Blue", hex: "#2d4f8f" }, { name: "Natural", hex: "#e6ddc9" }],
    material: "Canvas upper + rubber toe",
    stock: 29, out: ["45"], added: "2026-10-01", featured: 17,
  },
  {
    id: "converse-chuck-high-red",
    brand: "Converse",
    name: "Chuck Taylor All Star High Red",
    category: "Lifestyle",
    price: 1299000, oldPrice: null,
    rating: 4.7, reviews: 176,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Converse_All_Star_Red_High_%284649851394%29.jpg/960px-Converse_All_Star_Red_High_%284649851394%29.jpg",
    desc: "Merah cerah yang bikin outfit langsung hidup. Kanvas breathable dan sol karet vulkanis yang fleksibel.",
    colors: [{ name: "Red", hex: "#b7302c" }, { name: "Black", hex: "#17171a" }],
    material: "Canvas upper + rubber toe",
    stock: 27, out: ["39"], added: "2026-08-12", featured: 26,
  },
  {
    id: "converse-chuck70-parchment",
    brand: "Converse",
    name: "Chuck 70 Low Parchment",
    category: "Lifestyle",
    price: 1349000, oldPrice: 1599000,
    rating: 4.6, reviews: 154,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Converse_shoes.jpg/960px-Converse_shoes.jpg",
    desc: "Low-top dengan warna parchment yang hangat. Ortholite insole membuatnya jauh lebih nyaman dari Chuck standar.",
    colors: [{ name: "Parchment", hex: "#e9e0cd" }, { name: "Black", hex: "#17171a" }],
    material: "Canvas & suede + Ortholite",
    stock: 20, out: ["44"], added: "2026-07-29", featured: 35,
  },
  {
    id: "converse-jack-purcell",
    brand: "Converse",
    name: "Jack Purcell Leather",
    category: "Lifestyle",
    price: 1799000, oldPrice: null,
    rating: 4.5, reviews: 63,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Converse_Jack_Purcell_Boat_Shoes.jpg/960px-Converse_Jack_Purcell_Boat_Shoes.jpg",
    desc: "Siluet boat-shoe dengan smile detailing di toe dan upper kulit lembut. Versi lebih rapi untuk tampilan smart-casual.",
    colors: [{ name: "White", hex: "#f5f3ec" }, { name: "Navy", hex: "#25355e" }],
    material: "Leather upper + cork insole",
    stock: 14, out: ["40"], added: "2026-05-08", featured: 44,
  },

  /* ---------------- VANS (5) ---------------- */
  {
    id: "vans-old-skool-bw",
    brand: "Vans",
    name: "Old Skool Black/White",
    category: "Skate",
    price: 1249000, oldPrice: null,
    rating: 4.8, reviews: 452,
    badge: "BEST SELLER",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/VANS_shoe_01.jpg/960px-VANS_shoe_01.jpg",
    desc: "Skate staple dengan side stripe ikonik. Suede dan canvas yang awet, sol waffle yang dicengkeram aspal.",
    colors: [{ name: "Black/White", hex: "#17171a" }, { name: "Checkerboard", hex: "#8b8b8f" }],
    material: "Suede & canvas upper",
    stock: 35, out: [], added: "2026-06-02", featured: 9,
  },
  {
    id: "vans-authentic-port",
    brand: "Vans",
    name: "Authentic Port Royale",
    category: "Skate",
    price: 899000, oldPrice: null,
    rating: 4.6, reviews: 221,
    badge: "NEW",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/VANS_shoe_03.jpg/960px-VANS_shoe_03.jpg",
    desc: "Model paling sederhana dari Vans: siluet low-profile, kanvas tunggal, dan sol waffle. Ringan untuk dipakai seharian.",
    colors: [{ name: "Port Royale", hex: "#8a4b3c" }, { name: "True White", hex: "#f5f5f2" }],
    material: "Canvas upper + vulcanized",
    stock: 38, out: [], added: "2026-09-27", featured: 18,
  },
  {
    id: "vans-era-96",
    brand: "Vans",
    name: "Era 96 Marshmallow",
    category: "Skate",
    price: 1099000, oldPrice: null,
    rating: 4.6, reviews: 143,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/VANS_shoe_02.jpg/960px-VANS_shoe_02.jpg",
    desc: "Era dengan padding collar ekstra dan warna krem lembut. Nyaman langsung dari kotak, tanpa perlu break-in lama.",
    colors: [{ name: "Marshmallow", hex: "#e9e4d8" }, { name: "Black", hex: "#17171a" }],
    material: "Canvas upper + padded collar",
    stock: 25, out: ["45"], added: "2026-07-31", featured: 27,
  },
  {
    id: "vans-sk8hi-decon",
    brand: "Vans",
    name: "Sk8-Hi Decon Dress Blue",
    category: "Skate",
    price: 1399000, oldPrice: 1699000,
    rating: 4.7, reviews: 167,
    badge: "SALE",
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/VANS_shoe_06.jpg/960px-VANS_shoe_06.jpg",
    desc: "High-top klasik dengan konstruksi dekonstruksi: lebih tipis, lebih fleksibel, dan mudah dilipat. Proteksi ankle tetap ada.",
    colors: [{ name: "Dress Blue", hex: "#3a4f7a" }, { name: "Black", hex: "#17171a" }],
    material: "Suede & canvas + UltraCush",
    stock: 15, out: ["39"], added: "2026-07-26", featured: 36,
  },
  {
    id: "vans-ultrarange-exo",
    brand: "Vans",
    name: "UltraRange EXO",
    category: "Lifestyle",
    price: 1599000, oldPrice: null,
    rating: 4.6, reviews: 98,
    badge: null,
    img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/VANS_shoe_04.jpg/960px-VANS_shoe_04.jpg",
    desc: "Vans untuk perjalanan: midsole UltraCush yang empuk, panel mesh breathable, dan grip lug yang lebih agresif.",
    colors: [{ name: "True White", hex: "#f5f5f2" }, { name: "Green", hex: "#3f6b52" }],
    material: "Mesh & suede + UltraCush",
    stock: 17, out: ["44"], added: "2026-08-21", featured: 45,
  },
];

const CATEGORIES = ["All", "Lifestyle", "Running", "Court", "Trail", "Skate"];

const SHIPPING_FLAT = 25000;
const FREE_SHIPPING_MIN = 1500000;

/* ---------------- State & storage ---------------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable (private mode) — app still works in-memory */
    }
  },
};

const state = {
  cart: store.get("jws_cart", []),        // [{id, size, color, qty}]
  wishlist: store.get("jws_wishlist", []), // [productId]
  filters: { q: "", brand: null, category: "All", quick: null, sort: "featured" },
  modal: { id: null, size: null, color: null, qty: 1 },
};

const persistCart = () => store.set("jws_cart", state.cart);
const persistWishlist = () => store.set("jws_wishlist", state.wishlist);

/* ---------------- Helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const idr = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);

const byId = (id) => PRODUCTS.find((p) => p.id === id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const imgTag = (src, alt, cls = "") =>
  `<img src="${src}" alt="${esc(alt)}" loading="lazy" class="${cls}"
        onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">`;

const stars = (r) => `${r.toFixed(1)} &#9733;`;

function stockLabel(p) {
  if (p.stock <= 0) return { text: "Stok habis", cls: "is-out" };
  if (p.stock <= 8) return { text: `Sisa ${p.stock} pasang`, cls: "is-low" };
  return { text: `Stok tersedia — ${p.stock} pasang`, cls: "" };
}

/* ---------------- Toasts ---------------- */
function toast(message, type = "ok") {
  const el = document.createElement("div");
  el.className = `toast${type === "error" ? " toast--error" : ""}`;
  el.innerHTML = `<i class="toast__dot"></i><span>${esc(message)}</span>`;
  $("#toasts").appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, 2600);
}

/* ---------------- Layer (backdrop / drawers / modals) ---------------- */
const backdrop = $("#backdrop");
let openLayers = [];

function openLayer(el) {
  if (!openLayers.includes(el)) openLayers.push(el);
  el.classList.add("is-open");
  el.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add("is-visible"));
  document.body.classList.add("is-locked");
}

function closeLayer(el) {
  el.classList.remove("is-open");
  el.setAttribute("aria-hidden", "true");
  openLayers = openLayers.filter((l) => l !== el);
  if (!openLayers.length) hideBackdrop();
}

function closeAllLayers() {
  openLayers.slice().forEach(closeLayer);
}

function hideBackdrop() {
  backdrop.classList.remove("is-visible");
  document.body.classList.remove("is-locked");
  setTimeout(() => {
    if (!backdrop.classList.contains("is-visible")) backdrop.hidden = true;
  }, 400);
}

backdrop.addEventListener("click", closeAllLayers);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (openLayers.length) closeAllLayers();
    else if ($("#mobileMenu").classList.contains("is-open")) toggleBurger(false);
    else if ($("#searchbar").classList.contains("is-open")) toggleSearch(false);
  }
});

/* Delegated close buttons ([data-close] inside any layer) */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-close]");
  if (!btn) return;
  const layer = btn.closest(".drawer, .modal");
  if (layer) closeLayer(layer);
});

/* ---------------- Filtering / sorting ---------------- */
function filteredProducts() {
  const { q, brand, category, quick, sort } = state.filters;
  const query = q.trim().toLowerCase();

  let list = PRODUCTS.filter((p) => {
    if (brand && p.brand !== brand) return false;
    if (category !== "All" && p.category !== category) return false;
    if (quick === "new" && p.badge !== "NEW") return false;
    if (quick === "sale" && !p.oldPrice) return false;
    if (query) {
      const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  switch (sort) {
    case "price-asc": list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "rating": list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews); break;
    case "newest": list.sort((a, b) => new Date(b.added) - new Date(a.added)); break;
    default: list.sort((a, b) => a.featured - b.featured);
  }
  return list;
}

function hasActiveFilters() {
  const f = state.filters;
  return Boolean(f.q || f.brand || f.category !== "All" || f.quick || f.sort !== "featured");
}

/* ---------------- Renderers ---------------- */
function renderBrands() {
  const grid = $("#brandGrid");
  grid.innerHTML = BRANDS.map((b) => {
    const count = PRODUCTS.filter((p) => p.brand === b).length;
    const active = state.filters.brand === b ? " is-active" : "";
    return `
      <button class="brand-card${active}" data-brand="${esc(b)}" type="button">
        <span class="brand-card__name">${esc(b)}</span>
        <span class="brand-card__count">${count} products</span>
      </button>`;
  }).join("");
}

function renderCategoryChips() {
  $("#categoryChips").innerHTML = CATEGORIES.map((c) => {
    const active = state.filters.category === c ? " is-active" : "";
    return `<button class="chip${active}" data-category="${esc(c)}" type="button">${esc(c)}</button>`;
  }).join("");
}

function renderProducts() {
  const list = filteredProducts();
  const grid = $("#productGrid");

  grid.innerHTML = list.map((p, i) => {
    const wished = state.wishlist.includes(p.id) ? " is-on" : "";
    const badgeClass = p.badge === "SALE" ? " card__badge--sale" : p.badge === "NEW" ? " card__badge--new" : "";
    return `
      <article class="card" data-id="${p.id}" style="animation-delay:${Math.min(i * 45, 400)}ms">
        <div class="card__media" data-open="${p.id}">
          ${imgTag(p.img, p.name)}
          ${p.badge ? `<span class="card__badge${badgeClass}">${p.badge}</span>` : ""}
          <button class="card__wish${wished}" data-wish="${p.id}" type="button"
                  aria-label="Wishlist ${esc(p.name)}" aria-pressed="${wished ? "true" : "false"}">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.5 2.3C20.5 15 12 20.5 12 20.5Z"/>
            </svg>
          </button>
          <div class="card__quick">
            <button class="btn" data-add="${p.id}" type="button">+ Add to cart</button>
            <button class="btn" data-open="${p.id}" type="button">View</button>
          </div>
        </div>
        <div class="card__body" data-open="${p.id}">
          <p class="card__brand">${esc(p.brand)} &middot; ${esc(p.category)}</p>
          <h3 class="card__name">${esc(p.name)}</h3>
          <div class="card__meta">
            <div class="card__price">
              <strong>${idr(p.price)}</strong>
              ${p.oldPrice ? `<del>${idr(p.oldPrice)}</del>` : ""}
            </div>
            <span class="card__rating"><b>${p.rating.toFixed(1)}</b> &#9733;</span>
          </div>
        </div>
      </article>`;
  }).join("");

  $("#resultCount").textContent =
    `${list.length} produk${state.filters.brand ? ` — ${state.filters.brand}` : ""}`;
  $("#emptyState").hidden = list.length > 0;
  grid.hidden = list.length === 0;
  $("#clearFilters").hidden = !hasActiveFilters();
}

function lineItemHTML(item, context) {
  const p = byId(item.id);
  if (!p) return "";

  if (context === "wishlist") {
    return `
      <div class="line-item" data-key="${p.id}||">
        <div class="line-item__img" data-open="${p.id}">${imgTag(p.img, p.name)}</div>
        <div>
          <p class="line-item__brand">${esc(p.brand)}</p>
          <p class="line-item__name">${esc(p.name)}</p>
          <p class="line-item__variant">${esc(p.colors[0].name)} &middot; ${esc(p.category)}</p>
          <button class="line-item__remove" type="button" data-add-first="${p.id}">+ Tambah ke keranjang</button>
        </div>
        <div class="line-item__actions">
          <span class="line-item__price">${idr(p.price)}</span>
          <button class="mini-btn" type="button" data-wish-remove="${p.id}" aria-label="Hapus dari wishlist">&times;</button>
        </div>
      </div>`;
  }

  return `
    <div class="line-item" data-key="${p.id}|${item.size}|${item.color}">
      <div class="line-item__img" data-open="${p.id}">${imgTag(p.img, p.name)}</div>
      <div>
        <p class="line-item__brand">${esc(p.brand)}</p>
        <p class="line-item__name">${esc(p.name)}</p>
        <p class="line-item__variant">EU ${esc(item.size)} &middot; ${esc(item.color)}</p>
        <div class="qty">
          <button type="button" data-qty="-1" aria-label="Kurangi">&minus;</button>
          <span>${item.qty}</span>
          <button type="button" data-qty="1" aria-label="Tambah">+</button>
        </div>
        <button class="line-item__remove" type="button" data-remove>Hapus</button>
      </div>
      <div class="line-item__actions">
        <span class="line-item__price">${idr(p.price * item.qty)}</span>
      </div>
    </div>`;
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, it) => {
    const p = byId(it.id);
    return p ? sum + p.price * it.qty : sum;
  }, 0);
  const count = state.cart.reduce((n, it) => n + it.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT;
  return { subtotal, count, shipping, total: subtotal + shipping };
}

function renderCart() {
  const { subtotal, count, shipping, total } = cartTotals();
  const body = $("#cartItems");

  body.innerHTML = state.cart.length
    ? state.cart.map((it) => lineItemHTML(it, "cart")).join("")
    : `<div class="drawer-empty"><strong>Keranjang masih kosong.</strong><span>Yuk, pilih sneakers favoritmu.</span></div>`;

  $("#cartCount").textContent = count;
  $("#cartCount").hidden = count === 0;
  $("#cartHeadCount").textContent = `(${count})`;
  $("#cartSubtotal").textContent = idr(subtotal);
  $("#cartShipping").textContent =
    state.cart.length === 0 ? "Dihitung saat checkout"
      : shipping === 0 ? "Gratis" : idr(shipping);
  $("#cartTotal").textContent = idr(total);
  $("#checkoutBtn").disabled = state.cart.length === 0;
}

function renderWishlist() {
  const ids = state.wishlist.filter((id) => byId(id));
  const body = $("#wishlistItems");

  body.innerHTML = ids.length
    ? ids.map((id) => lineItemHTML({ id }, "wishlist")).join("")
    : `<div class="drawer-empty"><strong>Wishlist kosong.</strong><span>Ketuk ♥ pada produk yang kamu suka.</span></div>`;

  $("#wishlistCount").textContent = ids.length;
  $("#wishlistCount").hidden = ids.length === 0;
  $("#wishlistHeadCount").textContent = `(${ids.length})`;
}

function renderAll() {
  renderProducts();
  renderCart();
  renderWishlist();
}

/* ---------------- Product modal ---------------- */
function openProduct(id) {
  const p = byId(id);
  if (!p) return;

  const m = state.modal;
  m.id = id;
  m.qty = 1;
  const firstAvailable = SIZES.find((s) => !p.out.includes(s) && p.stock > 0) || null;
  m.size = m.forProduct === id && m.size && !p.out.includes(m.size) ? m.size : firstAvailable;
  m.forProduct = id;
  m.color = p.colors[0].name;

  const st = stockLabel(p);
  const wished = state.wishlist.includes(p.id);

  $("#pmContent").innerHTML = `
    <div class="pm__media">
      ${imgTag(p.img, p.name)}
      ${p.badge ? `<span class="pm__badge${p.badge === "SALE" ? " pm__badge--sale" : p.badge === "NEW" ? " pm__badge--new" : ""}">${p.badge}</span>` : ""}
    </div>
    <div class="pm__body">
      <p class="pm__brand">${esc(p.brand)} &middot; ${esc(p.category)}</p>
      <h2 class="pm__name">${esc(p.name)}</h2>
      <div class="pm__ratingline"><b>${stars(p.rating)}</b> &middot; ${p.reviews} reviews</div>
      <div class="pm__price">
        <strong>${idr(p.price)}</strong>
        ${p.oldPrice ? `<del>${idr(p.oldPrice)}</del>` : ""}
      </div>
      <p class="pm__desc">${esc(p.desc)}</p>

      <div class="pm__specs">
        <div class="pm__spec"><span>Material</span><strong>${esc(p.material)}</strong></div>
        <div class="pm__spec"><span>Kategori</span><strong>${esc(p.category)}</strong></div>
      </div>

      <p class="pm__label">Warna <em id="pmColorName">${esc(m.color)}</em></p>
      <div class="swatches">
        ${p.colors.map((c, i) => `
          <button type="button" class="swatch${i === 0 ? " is-active" : ""}"
                  style="background:${c.hex}" data-color="${esc(c.name)}"
                  title="${esc(c.name)}" aria-label="${esc(c.name)}"></button>`).join("")}
      </div>

      <p class="pm__label">Ukuran (EU) <em>${m.size ? `EU ${m.size}` : "pilih ukuran"}</em></p>
      <div class="sizes">
        ${SIZES.map((s) => {
          const out = p.out.includes(s) || p.stock <= 0;
          return `<button type="button" class="size${m.size === s ? " is-active" : ""}"
                          data-size="${s}" ${out ? "disabled" : ""}>${s}</button>`;
        }).join("")}
      </div>

      <p class="pm__stock ${st.cls}"><i></i>${st.text}</p>

      <div class="pm__actions">
        <div class="pm__buyrow">
          <div class="qty">
            <button type="button" data-modal-qty="-1" aria-label="Kurangi">&minus;</button>
            <span id="pmQty">1</span>
            <button type="button" data-modal-qty="1" aria-label="Tambah">+</button>
          </div>
        </div>
        <button class="btn btn--dark" type="button" data-modal-add>ADD TO CART</button>
        <button class="pm__wish${wished ? " is-on" : ""}" type="button" data-wish="${p.id}" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.5 2.3C20.5 15 12 20.5 12 20.5Z"/>
          </svg>
        </button>
      </div>
      <div class="pm__actions" style="margin-top:10px">
        <button class="btn btn--ghost" type="button" data-modal-buy>BUY NOW</button>
      </div>
    </div>`;

  openLayer($("#productModal"));
  $("#productModal").scrollTop = 0;
}

function modalQty(delta) {
  const p = byId(state.modal.id);
  if (!p) return;
  const next = Math.min(Math.max(state.modal.qty + delta, 1), Math.max(p.stock, 1));
  if (next === state.modal.qty) {
    toast("Melebihi stok yang tersedia", "error");
    return;
  }
  state.modal.qty = next;
  $("#pmQty").textContent = next;
}

/* ---------------- Cart / wishlist actions ---------------- */
function addToCart(id, size, color, qty = 1, { silent } = {}) {
  const p = byId(id);
  if (!p) return;
  if (p.stock <= 0) { toast("Stok habis", "error"); return; }
  if (!size) { toast("Pilih ukuran dulu", "error"); return; }

  const key = (it) => it.id === id && it.size === size && it.color === color;
  const existing = state.cart.find(key);
  const inCart = existing ? existing.qty : 0;
  const nextQty = Math.min(inCart + qty, p.stock);

  if (existing) existing.qty = nextQty;
  else state.cart.push({ id, size, color, qty: nextQty });

  persistCart();
  renderCart();
  if (!silent) toast(`${p.name} masuk keranjang`);
}

function toggleWishlist(id) {
  const p = byId(id);
  if (!p) return;
  const has = state.wishlist.includes(id);
  state.wishlist = has ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id];
  persistWishlist();
  renderWishlist();
  renderProducts();

  const modalWish = $(`#pmContent [data-wish="${id}"]`);
  if (modalWish) modalWish.classList.toggle("is-on", !has);
  toast(has ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist ♥");
}

/* ---------------- Checkout ---------------- */
const CHECKOUT_HTML = $("#checkoutContent").innerHTML;

function renderCheckout() {
  const { subtotal, shipping, total } = cartTotals();
  $("#checkoutItems").innerHTML = state.cart.map((it) => {
    const p = byId(it.id);
    if (!p) return "";
    return `<div class="co-item">
      <span><b>${it.qty}×</b> ${esc(p.name)} <span style="display:block">EU ${esc(it.size)} · ${esc(it.color)}</span></span>
      <strong>${idr(p.price * it.qty)}</strong>
    </div>`;
  }).join("");
  $("#coSubtotal").textContent = idr(subtotal);
  $("#coShipping").textContent = shipping === 0 ? "Gratis" : idr(shipping);
  $("#coTotal").textContent = idr(total);
}

function openCheckout() {
  if (!state.cart.length) { toast("Keranjang masih kosong", "error"); return; }
  closeLayer($("#cartDrawer"));
  if (!$("#checkoutForm")) $("#checkoutContent").innerHTML = CHECKOUT_HTML;
  renderCheckout();
  openLayer($("#checkoutModal"));
  $("#checkoutModal").scrollTop = 0;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fields = ["name", "phone", "address", "city", "zip"];
  let valid = true;

  fields.forEach((name) => {
    const input = form.elements[name];
    const ok = input.checkValidity() && input.value.trim() !== "";
    input.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    toast("Lengkapi data pengiriman dulu", "error");
    form.querySelector(".is-invalid")?.focus();
    return;
  }

  const orderId = `JWS-${Date.now().toString().slice(-8)}`;
  const name = form.elements.name.value.trim();

  $("#checkoutContent").innerHTML = `
    <div class="checkout-success">
      <div class="checkout-success__icon">&#10003;</div>
      <h3>Pesanan diterima, ${esc(name.split(" ")[0])}!</h3>
      <span class="order-id">${orderId}</span>
      <p>Tim kami akan menghubungi kamu via WhatsApp dalam 1x24 jam untuk konfirmasi pembayaran dan pengiriman.</p>
      <button class="btn btn--dark" type="button" data-close style="margin-top:22px">Lanjut belanja</button>
    </div>`;

  state.cart = [];
  persistCart();
  renderCart();
  toast("Pesanan berhasil dibuat 🎉");
}

/* ---------------- Info modal ---------------- */
const INFO = {
  contact: {
    eyebrow: "Contact",
    title: "Ngobrol dulu, yuk.",
    body: `
      <p>Tim JULIANA SNEAKERS siap membantu soal ukuran, stok, atau status pesanan.</p>
      <ul>
        <li>WhatsApp: <a href="https://wa.me/6281299001234" target="_blank" rel="noopener">+62 812-9900-1234</a></li>
        <li>Email: <a href="mailto:hello@julianasneakers.id">hello@julianasneakers.id</a></li>
        <li>Instagram / TikTok: <b>@julianasneakers</b></li>
        <li>Butik: Jl. Melawai Raya No. 12, Jakarta Selatan</li>
        <li>Jam buka: setiap hari 09.00–21.00 WIB</li>
      </ul>`,
  },
  shipping: {
    eyebrow: "Shipping",
    title: "Pengiriman.",
    body: `
      <ul>
        <li>Pesanan sebelum 15.00 WIB dikirim di hari yang sama.</li>
        <li>Jabodetabek 1–2 hari kerja, luar kota 2–5 hari kerja.</li>
        <li>Gratis ongkir untuk pembelian di atas Rp 1.500.000.</li>
        <li>Di bawah itu, ongkir flat Rp 25.000 ke seluruh Indonesia.</li>
        <li>Semua paket diasuransikan dan bisa dilacak via WhatsApp.</li>
      </ul>`,
  },
  returns: {
    eyebrow: "Return & Exchange",
    title: "Tukar atau kembalikan.",
    body: `
      <ul>
        <li>Pengajuan return/ukuran dalam 14 hari sejak barang diterima.</li>
        <li>Kondisi belum dipakai, kotak dan tag asli masih lengkap.</li>
        <li>Tukar ukuran gratis satu kali; return dikenakan biaya kirim balik.</li>
        <li>Refund diproses 3–5 hari kerja setelah barang kami terima.</li>
        <li>Hubungi WhatsApp kami dengan nomor pesanan untuk memulai.</li>
      </ul>`,
  },
};

function openInfo(key) {
  const data = INFO[key];
  if (!data) return;
  $("#infoContent").innerHTML = `
    <p class="eyebrow">${esc(data.eyebrow)}</p>
    <h3>${esc(data.title)}</h3>
    ${data.body}`;
  openLayer($("#infoModal"));
}

/* ---------------- UI wiring ---------------- */
function toggleSearch(force) {
  const bar = $("#searchbar");
  const open = force !== undefined ? force : !bar.classList.contains("is-open");
  bar.classList.toggle("is-open", open);
  $("#searchToggle").setAttribute("aria-expanded", String(open));
  if (open) setTimeout(() => $("#navSearch").focus(), 260);
}

function toggleBurger(force) {
  const menu = $("#mobileMenu");
  const open = force !== undefined ? force : !menu.classList.contains("is-open");
  menu.classList.toggle("is-open", open);
  menu.setAttribute("aria-hidden", String(!open));
  $("#burgerBtn").classList.toggle("is-open", open);
  $("#burgerBtn").setAttribute("aria-expanded", String(open));
  backdrop.hidden = !open;
  if (open) {
    requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    document.body.classList.add("is-locked");
    openLayers.push(menu); // reuse backdrop click to close
  } else {
    openLayers = openLayers.filter((l) => l !== menu);
    if (!openLayers.length) hideBackdrop();
  }
}

function resetFilters() {
  state.filters = { q: "", brand: null, category: "All", quick: null, sort: "featured" };
  $("#shopSearch").value = "";
  $("#navSearch").value = "";
  $("#sortSelect").value = "featured";
  renderBrands();
  renderCategoryChips();
  renderProducts();
}

function applyQuick(kind) {
  state.filters.quick = kind === "all" ? null : kind;
  state.filters.brand = null;
  state.filters.category = "All";
  renderBrands();
  renderCategoryChips();
  renderProducts();
}

function scrollToShop() {
  $("#shop").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* --- global click delegation --- */
document.addEventListener("click", (e) => {
  const t = e.target;

  const brand = t.closest("[data-brand]");
  if (brand) {
    const b = brand.dataset.brand;
    state.filters.brand = state.filters.brand === b ? null : b;
    state.filters.quick = null;
    renderBrands();
    renderProducts();
    scrollToShop();
    toast(state.filters.brand ? `Filter: ${b}` : "Filter brand dihapus");
    return;
  }

  const cat = t.closest("[data-category]");
  if (cat) {
    state.filters.category = cat.dataset.category;
    renderCategoryChips();
    renderProducts();
    return;
  }

  const wish = t.closest("[data-wish]");
  if (wish) {
    e.stopPropagation();
    toggleWishlist(wish.dataset.wish);
    return;
  }

  const wishRemove = t.closest("[data-wish-remove]");
  if (wishRemove) {
    toggleWishlist(wishRemove.dataset.wishRemove);
    return;
  }

  const add = t.closest("[data-add]");
  if (add) {
    e.stopPropagation();
    const p = byId(add.dataset.add);
    const size = SIZES.find((s) => !p.out.includes(s));
    addToCart(p.id, size, p.colors[0].name, 1);
    return;
  }

  const addFirst = t.closest("[data-add-first]");
  if (addFirst) {
    const p = byId(addFirst.dataset.addFirst);
    const size = SIZES.find((s) => !p.out.includes(s) && p.stock > 0);
    addToCart(p.id, size, p.colors[0].name, 1);
    return;
  }

  const open = t.closest("[data-open]");
  if (open) {
    openProduct(open.dataset.open);
    return;
  }

  const qtyBtn = t.closest("[data-qty]");
  if (qtyBtn) {
    const item = qtyBtn.closest(".line-item");
    const [id, size, color] = item.dataset.key.split("|");
    const line = state.cart.find((it) => it.id === id && it.size === size && it.color === color);
    if (!line) return;
    const p = byId(id);
    const next = line.qty + Number(qtyBtn.dataset.qty);
    if (next < 1) {
      state.cart = state.cart.filter((it) => it !== line);
    } else if (next > p.stock) {
      toast("Melebihi stok yang tersedia", "error");
      return;
    } else {
      line.qty = next;
    }
    persistCart();
    renderCart();
    return;
  }

  if (t.closest("[data-remove]")) {
    const item = t.closest(".line-item");
    const [id, size, color] = item.dataset.key.split("|");
    state.cart = state.cart.filter(
      (it) => !(it.id === id && it.size === size && it.color === color)
    );
    persistCart();
    renderCart();
    toast("Produk dihapus dari keranjang");
    return;
  }

  const info = t.closest("[data-info]");
  if (info) {
    e.preventDefault();
    openInfo(info.dataset.info);
    return;
  }

  const quick = t.closest("[data-quick]");
  if (quick) {
    applyQuick(quick.dataset.quick);
    if ($("#mobileMenu").classList.contains("is-open")) toggleBurger(false);
    return;
  }

  const nav = t.closest(".nav__link");
  if (nav) {
    $$(".nav__link").forEach((l) => l.classList.remove("is-active"));
    nav.classList.add("is-active");
    if (nav.dataset.quick) applyQuick(nav.dataset.quick);
  }
});

/* --- product modal interactions --- */
$("#pmContent").addEventListener("click", (e) => {
  const t = e.target;
  const p = byId(state.modal.id);
  if (!p) return;

  const size = t.closest("[data-size]");
  if (size && !size.disabled) {
    state.modal.size = size.dataset.size;
    $$("#pmContent .size").forEach((s) => s.classList.toggle("is-active", s === size));
    $("#pmContent .pm__label em").textContent = `EU ${state.modal.size}`;
    return;
  }

  const color = t.closest("[data-color]");
  if (color) {
    state.modal.color = color.dataset.color;
    $$("#pmContent .swatch").forEach((s) => s.classList.toggle("is-active", s === color));
    $("#pmColorName").textContent = state.modal.color;
    return;
  }

  const q = t.closest("[data-modal-qty]");
  if (q) { modalQty(Number(q.dataset.modalQty)); return; }

  if (t.closest("[data-modal-add]")) {
    addToCart(state.modal.id, state.modal.size, state.modal.color, state.modal.qty);
    if (state.modal.size) closeLayer($("#productModal"));
    return;
  }

  if (t.closest("[data-modal-buy]")) {
    if (!state.modal.size) { toast("Pilih ukuran dulu", "error"); return; }
    addToCart(state.modal.id, state.modal.size, state.modal.color, state.modal.qty, { silent: true });
    closeLayer($("#productModal"));
    openCheckout();
  }
});

/* --- header / search / menu --- */
$("#searchToggle").addEventListener("click", () => toggleSearch());
$("#searchClose").addEventListener("click", () => toggleSearch(false));
$("#burgerBtn").addEventListener("click", () => toggleBurger());
$("#cartToggle").addEventListener("click", () => { renderCart(); openLayer($("#cartDrawer")); });
$("#wishlistToggle").addEventListener("click", () => { renderWishlist(); openLayer($("#wishlistDrawer")); });
$("#checkoutBtn").addEventListener("click", openCheckout);
$("#clearFilters").addEventListener("click", resetFilters);
$("#emptyReset").addEventListener("click", resetFilters);
$("#checkoutModal").addEventListener("submit", handleCheckoutSubmit);

/* mobile menu links close the menu */
$$("#mobileMenu a").forEach((a) =>
  a.addEventListener("click", () => toggleBurger(false))
);

/* search inputs (nav + toolbar) stay in sync */
function onSearch(value, source) {
  state.filters.q = value;
  if (source !== "nav") $("#navSearch").value = value;
  if (source !== "shop") $("#shopSearch").value = value;
  renderProducts();
}
$("#navSearch").addEventListener("input", (e) => onSearch(e.target.value, "nav"));
$("#shopSearch").addEventListener("input", (e) => onSearch(e.target.value, "shop"));
$("#navSearch").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { toggleSearch(false); scrollToShop(); }
});

$("#sortSelect").addEventListener("change", (e) => {
  state.filters.sort = e.target.value;
  renderProducts();
});

/* close mobile menu when clicking backdrop */
backdrop.addEventListener("click", () => toggleBurger(false));

/* header shadow + active nav on scroll */
window.addEventListener("scroll", () => {
  $("#header").classList.toggle("is-scrolled", window.scrollY > 8);
}, { passive: true });

/* reveal on scroll */
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("is-visible");
      io.unobserve(en.target);
    }
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
$$(".reveal").forEach((el) => io.observe(el));

/* preloader */
window.addEventListener("load", () => {
  setTimeout(() => $("#preloader").classList.add("is-done"), 450);
});
setTimeout(() => $("#preloader")?.classList.add("is-done"), 3500); // safety net

/* ---------------- Init ---------------- */
renderBrands();
renderCategoryChips();
renderAll();
