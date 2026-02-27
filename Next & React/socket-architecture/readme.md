Good — using **Zustand instead of Context** is actually cleaner for sockets.

You’ll get:

* ✅ Single socket instance
* ✅ No reconnect on re-renders
* ✅ Global access from anywhere
* ✅ Route-scoped connection (/xyz only)
* ✅ Latest reference always available
* ✅ No provider wrapper needed

Below is the **production-safe pattern** 👇

---

# 🏗 Architecture

```
lib/socket.ts
stores/socket.store.ts
hooks/useXYZSocket.ts (optional helper)
app/xyz/layout.tsx
```

---

# 1️⃣ Create a Singleton Socket

📁 `lib/socket.ts`

```ts
import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export const createSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      autoConnect: false,
      transports: ["websocket"],
    })
  }

  return socket
}

export const getSocket = () => socket
```

Why:

* Module-level variable
* Never recreated
* Shared across entire app

---

# 2️⃣ Create Zustand Store

📁 `stores/socket.store.ts`

```ts
import { create } from "zustand"
import { Socket } from "socket.io-client"
import { createSocket } from "@/lib/socket"

interface SocketState {
  socket: Socket | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: () => {
    let socket = get().socket

    if (!socket) {
      socket = createSocket()
      set({ socket })
    }

    if (!socket.connected) {
      socket.connect()
    }

    socket.on("connect", () => {
      set({ isConnected: true })
    })

    socket.on("disconnect", () => {
      set({ isConnected: false })
    })
  },

  disconnect: () => {
    const socket = get().socket
    if (socket && socket.connected) {
      socket.disconnect()
      set({ isConnected: false })
    }
  },
}))
```

---

# 3️⃣ Connect Only on `/xyz`

If using **App Router**

📁 `app/xyz/layout.tsx`

```tsx
"use client"

import { useEffect } from "react"
import { useSocketStore } from "@/stores/socket.store"

export default function XYZLayout({ children }: { children: React.ReactNode }) {
  const connect = useSocketStore((s) => s.connect)
  const disconnect = useSocketStore((s) => s.disconnect)

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return <>{children}</>
}
```

Now:

* Socket connects when entering `/xyz`
* Disconnects when leaving
* No re-renders cause reconnect
* No provider needed

---

# 4️⃣ Use Socket Anywhere

Inside `/xyz` pages/components:

```tsx
import { useSocketStore } from "@/stores/socket.store"
import { useEffect } from "react"

export function ChatComponent() {
  const socket = useSocketStore((s) => s.socket)

  useEffect(() => {
    if (!socket) return

    const handler = (data: any) => {
      console.log("message", data)
    }

    socket.on("message", handler)

    return () => {
      socket.off("message", handler)
    }
  }, [socket])

  return <div>Listening...</div>
}
```

---

# 🚀 Even Cleaner (Optional Helper Hook)

If you want cleaner usage:

📁 `hooks/useXYZSocket.ts`

```ts
import { useSocketStore } from "@/stores/socket.store"

export const useXYZSocket = () => {
  const socket = useSocketStore((s) => s.socket)
  const isConnected = useSocketStore((s) => s.isConnected)

  return { socket, isConnected }
}
```

Usage:

```ts
const { socket, isConnected } = useXYZSocket()
```

---

# 🧠 Why This Pattern Is Better Than Context

| Context              | Zustand                      |
| -------------------- | ---------------------------- |
| Requires provider    | ❌ No provider                |
| Rerender propagation | ❌ Only subscribed components |
| Easy global access   | ✅                            |
| Cleaner for sockets  | ✅                            |
| Better devtools      | ✅                            |

---

# ⚠️ Important Best Practice

Avoid duplicate listeners inside `connect()`.

If you want enterprise-level safety:

```ts
socket.removeAllListeners()
```

before re-adding listeners.

---

# 🏆 Final Result

You now have:

* Single socket instance
* Route-based lifecycle
* Global availability
* No stale references
* No unnecessary reconnects
* No context boilerplate
* Clean architecture

---

If you want next-level improvements, I can show you:

* 🔐 JWT auto-refresh socket pattern
* 🧠 Event bus abstraction layer
* ⚡ Prevent duplicate listeners globally
* 🏗 Scalable multi-namespace socket architecture
* 🔄 TanStack Query + socket sync pattern

Just tell me your backend stack (Nest? Express? Laravel?).
