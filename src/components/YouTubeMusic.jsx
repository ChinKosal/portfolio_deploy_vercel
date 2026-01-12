"use client";
import { useEffect, useRef } from "react";

export default function YouTubeMusic() {
  const iframeRef = useRef(null);

  useEffect(() => {
    let iframeLoaded = false;

    const enableSound = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow || !iframeLoaded) return;

      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "unMute", args: [] }),
        "*"
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );

      // Remove listeners after first interaction
      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };

    const handleVisibilityChange = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow || !iframeLoaded) return;

      if (document.visibilityState === "visible") {
        // Restart from beginning
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [0, true] }),
          "*"
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: [] }),
          "*"
        );
      }
    };

    // Listen for scroll on window
    window.addEventListener("scroll", enableSound, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Wait for iframe to load
    const iframe = iframeRef.current;
    const onLoad = () => {
      iframeLoaded = true;
    };
    iframe?.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      iframe?.removeEventListener("load", onLoad);
    };
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <iframe
      ref={iframeRef}
      width="1"
      height="1"
      style={{ display: "none" }}
      src={`https://www.youtube.com/embed/NvIXu1pXNZM?autoplay=1&mute=1&loop=1&playlist=NvIXu1pXNZM&enablejsapi=1&origin=${origin}`}
      allow="autoplay; encrypted-media"
    />
  );
}
