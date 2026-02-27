This folder shows how to implement favicon in Next Application.

Start by adding the icon file in public folder.

Now you can assign directly in html tags like this:
```
<html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favs/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favs/favicon.svg" />
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favs/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favs/site.webmanifest" />
      </head>
      <body>
          {children}
      </body>
    </html>
```

or you can pass it in metadata:
```
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  icons: {
    icon: [
      { url: "/favs/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favs/favicon.svg", type: "image/svg+xml" },
      { url: "/favs/favicon.ico" }, // shortcut icon
    ],
    apple: [
      { url: "/favs/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/favs/site.webmanifest",
};

```