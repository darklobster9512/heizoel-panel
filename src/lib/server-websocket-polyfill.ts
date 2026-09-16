// Manche Server-Laufzeiten (Cloudflare Worker mit Node-Kompatibilität) melden
// sich als Node.js, stellen aber kein globales `WebSocket` bereit. Supabase
// richtet beim Erstellen eines Clients immer auch den Realtime-Kanal ein und
// bricht dann mit "Node.js detected but native WebSocket not found" ab.
// Serverseitig wird Realtime nie genutzt — ein Platzhalter genügt.
if (typeof globalThis !== "undefined" && typeof (globalThis as { WebSocket?: unknown }).WebSocket === "undefined") {
  class ServerWebSocketStub {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;

    constructor() {
      throw new Error("WebSocket-Verbindungen sind serverseitig nicht verfügbar.");
    }
  }

  Object.defineProperty(globalThis, "WebSocket", {
    value: ServerWebSocketStub,
    configurable: true,
    writable: true,
  });
}

export {};
