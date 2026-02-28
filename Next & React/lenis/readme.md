# 🌊 Lenis — Smooth Scroll

Lenis is used to implement smooth scroll in a web page. This guide will help you implement it in a Next.js or React project.

---

# 🏗 Architecture

```
providers/
  lenis-provider.tsx   ← wrap your app with this
app/
  layout.tsx           ← call LenisProvider here
```

---

# 1️⃣ Install

```bash
pnpm add lenis
```

---

# 2️⃣ Create the Provider

📁 `providers/lenis-provider.tsx`

```tsx
/**
 * This is the main provider file for lenis.
 * You can call it in root layout of the project like:
 * /app/layout.tsx in Next
 * App.tsx in React
 *
 * You can configure it here in the component.
 * You can also use a hook if want more control.
 */

"use client";
import { ReactLenis } from "lenis/react";

const LenisProvider = () => {
  return <ReactLenis root />;
};

export default LenisProvider;
```

---

# 3️⃣ Use in Root Layout

📁 `app/layout.tsx`

```tsx
import LenisProvider from "@/providers/lenis-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

---

# ⚙️ Configuration (Optional)

You can pass options to `ReactLenis` for fine-grained control:

```tsx
<ReactLenis
  root
  options={{
    lerp: 0.1,        // smoothness (lower = smoother)
    duration: 1.2,    // scroll duration in seconds
    smoothWheel: true,
  }}
/>
```

---

# 🏆 Final Result

You now have:

* Smooth, physics-based scrolling across the entire app
* Zero extra setup — just wrap once in the root layout
* Compatible with GSAP ScrollTrigger and other animation libraries