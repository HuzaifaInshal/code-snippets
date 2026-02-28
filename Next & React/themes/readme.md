# 🌗 Themes — Dark / Light Mode in Next.js

In order to implement dark themes and light themes (or even more themes), we can easily use the `next-themes` library.

---

# 🏗 Architecture

```
providers/
  providers.tsx     ← ThemeProvider wrapper
app/
  layout.tsx        ← wrap app with Providers
  globals.css       ← CSS variables for light/dark
```

---

# 1️⃣ Install

```bash
pnpm add next-themes
```

---

# 2️⃣ Create the Theme Provider

📁 `providers/providers.tsx`

```tsx
"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
```

Why `attribute="class"`:

* Adds `.dark` or `.light` class to `<html>` element
* Lets you use CSS class-based theming
* Works perfectly with Tailwind's `darkMode: "class"` config

---

# 3️⃣ Define CSS Variables

📁 `app/globals.css`

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-text: var(--text);
  --color-text-light: var(--text-light);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --background: #FFFFFF;
  --text: #242126;
  --text-light: #575757;
}

.dark {
  --background: #232126;
  --text: #c4c5c9;
  --text-light: #969696;
}
```

Now use these variables anywhere:

```css
body {
  background-color: var(--background);
  color: var(--text);
}
```

---

# 4️⃣ Toggle Theme in a Component

📁 `hooks/useThemesUpdate.ts`

```ts
import { useTheme } from "next-themes";

function useThemesUpdate() {
  const { theme, setTheme, systemTheme } = useTheme();

  const effectiveTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    const next = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return { effectiveTheme, toggleTheme };
}
```

Usage in a button:

```tsx
const { effectiveTheme, toggleTheme } = useThemesUpdate();

<button onClick={toggleTheme}>
  {effectiveTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
</button>
```

---

# 5️⃣ Wrap Your App

📁 `app/layout.tsx`

```tsx
import Providers from "@/providers/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

> ⚠️ Always add `suppressHydrationWarning` to `<html>` to avoid hydration mismatch caused by `next-themes` injecting the class server vs client.

---

# 🧠 How It Works

| Feature                  | How                             |
| ------------------------ | ------------------------------- |
| Theme persistence        | ✅ localStorage automatic        |
| System theme detection   | ✅ `prefers-color-scheme` media  |
| SSR safe                 | ✅ With `suppressHydrationWarning` |
| Custom themes (3+)       | ✅ Just add more CSS classes      |

---

# 🏆 Final Result

You now have:

* Light / dark / system theme support
* CSS variable-based theming (easy to extend)
* Persistent theme across page reloads
* No flash of unstyled content (FOUC)