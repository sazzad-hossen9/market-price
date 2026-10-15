# 🛒 বাজার দর (BazarDor)

A Bengali-language web app that shows daily market prices of everyday essentials in Bangladesh — with price changes, so you can see at a glance what went up and what came down.

🔗 **Live:** [market-price-gamma.vercel.app](https://market-price-gamma.vercel.app/)

---

##  Features

- **Today's prices at a glance** — current price with unit (per kg, per litre, per dozen, per piece)
- **Price change indicator** — ▲ increase / ▼ decrease / — no change, shown as a percentage
- **"Prices went up today"** highlight section for quick scanning
- **8 product categories** with dedicated pages
- **Individual product pages** for each item
- **Authentication pages** — Sign In and Sign Up
- **Bengali UI** with Bengali numerals and a live date display
- **Responsive design** with SEO-friendly metadata

## 🗂️ Categories

| Emoji | Category | Route |
|-------|----------|-------|
| 🍚 | চাল (Rice) | `/category/chal` |
| 🫘 | ডাল (Lentils) | `/category/dal` |
| 🛢 | তেল (Oil) | `/category/tel` |
| 🥬 | সবজি (Vegetables) | `/category/sobji` |
| 🐟 | মাছ (Fish) | `/category/mach` |
| 🍗 | মাংস (Meat) | `/category/mangsho` |
| 🥛 | ডিম-দুধ (Eggs & Dairy) | `/category/dim-dui` |
| 🌶 | মসলা (Spices) | `/category/mosla` |

##  Routes

| Route | Description |
|-------|-------------|
| `/` | Home — today's prices overview |
| `/category/[slug]` | Products of a category |
| `/product/[slug]` | Single product details |
| `/signin` | Sign in |
| `/signup` | Sign up |

##  Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Deployment:** [Vercel](https://vercel.com/)

##  Getting Started

```bash
# Clone the repository
git clone <your-repository-url>
cd <project-folder>

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

##  Disclaimer

All prices shown are approximate and may change depending on market conditions.

##  Author

**Sazzad Hossen**

- GitHub: [@sazzad-hossen9](https://github.com/sazzad-hossen9)
- LinkedIn: [sazzadhossen-dev](https://linkedin.com/in/sazzadhossen-dev)

---

⭐ If you find this project useful, consider giving it a star!