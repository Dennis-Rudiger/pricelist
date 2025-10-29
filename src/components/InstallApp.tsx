"use client";

import React, { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isiOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  // iOS Safari exposes navigator.standalone; other browsers support display-mode media query
  const nav = navigator as Navigator & { standalone?: boolean };
  const iosStandalone = nav.standalone === true;
  const mq = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
  return iosStandalone || mq;
}

export default function InstallApp() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState<boolean>(false);
  const [showIOSHint, setShowIOSHint] = useState<boolean>(false);

  useEffect(() => {
    // If already installed, don't show anything
    if (isStandalone()) {
      setInstalled(true);
      return;
    }

    const onBIP = (e: Event) => {
      e.preventDefault?.();
      setDeferred(e as BeforeInstallPromptEvent);
      setShowIOSHint(false);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onBIP as EventListener);
    window.addEventListener("appinstalled", onInstalled as EventListener);

    // For iOS (no beforeinstallprompt), show helper hint
    if (isiOS()) {
      // Only show if not standalone and no deferred prompt (iOS never sets it)
      setShowIOSHint(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP as EventListener);
      window.removeEventListener("appinstalled", onInstalled as EventListener);
    };
  }, []);

  if (installed) return null;

  const onInstallClick = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") {
        setDeferred(null);
      }
    } catch {
      // ignore
    }
  };

  // Render: If we have a deferred prompt (Android/Chrome), show Install button.
  // Else on iOS, show a subtle hint button that opens instructions.
  if (deferred) {
    return (
      <button
        onClick={onInstallClick}
        className="rounded bg-white/10 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-white/20"
        aria-label="Install app"
      >
        Install app
      </button>
    );
  }

  if (showIOSHint) {
    return (
      <button
        onClick={() => {
          // Simple inline instructions; could be replaced with a nicer modal if needed
          alert(
            "To install this app: tap the Share icon in Safari, then choose 'Add to Home Screen'."
          );
        }}
        className="rounded bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 hover:text-white"
      >
        How to install
      </button>
    );
  }

  return null;
}
