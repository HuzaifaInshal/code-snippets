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
