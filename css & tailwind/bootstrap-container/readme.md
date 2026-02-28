# 📦 Bootstrap Container — Vanilla CSS

These are Bootstrap's container breakpoints written in vanilla CSS. The purpose is to override Tailwind's default container classes when you need much narrower containers that match Bootstrap's sizing.

---

# 🧠 Why Use This?

Tailwind's default `container` class only centers content with `margin: auto` — it doesn't set a `max-width` by breakpoint the way Bootstrap does. This snippet gives you that behaviour without installing Bootstrap.

| Breakpoint       | Min Width | Max Container |
| ---------------- | --------- | ------------- |
| Extra small      | `< 576px` | `100%`        |
| Small            | `≥ 576px` | `540px`       |
| Medium           | `≥ 768px` | `720px`       |
| Large            | `≥ 992px` | `960px`       |
| Extra Large      | `≥ 1200px`| `1140px`      |
| Extra Extra Large| `≥ 1400px`| `1320px`      |

---

# 1️⃣ The CSS

📁 `app/globals.css` (or any global stylesheet)

```css
/* ========================|| Container max widths modified ||======================== */

/* --------> Base: Extra small (<576px) */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
/* --------> Small (≥576px) */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
/* --------> Medium (≥768px) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
/* --------> Large (≥992px) */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
/* --------> Extra Large (≥1200px) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
/* --------> Extra Extra Large (≥1400px) */
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
```

---

# 2️⃣ Usage

Simply add the `container` class to any wrapper element:

```html
<div class="container">
  <!-- your content here -->
</div>
```

In JSX / TSX:

```tsx
<div className="container">
  {/* your content here */}
</div>
```

---

# ⚠️ Tailwind Conflict

If using Tailwind alongside this, make sure to configure `container` in your `tailwind.config.ts` to avoid conflicts:

```ts
theme: {
  container: {
    center: true,
  },
}
```

Or simply avoid using Tailwind's `container` class and use this CSS snippet exclusively.

---

# 🏆 Final Result

You now have:

* Bootstrap-like responsive container widths
* No Bootstrap dependency
* Works standalone or alongside Tailwind
* Easy to customize breakpoints to your own design system