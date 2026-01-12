"use client";
import { useEffect, useRef } from "react";

export default function YouTubeMusic() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const enableSound = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "unMute", args: [] }),
        "*"
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );

      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };

    const handleVisibilityChange = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      if (document.visibilityState === "visible") {
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

    window.addEventListener("scroll", enableSound, { once: true });
    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
