"use client";
import { useEffect, useRef } from "react";

export default function YouTubeMusic() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // Function to unmute on first user interaction
    const unmuteMusic = () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "unMute" }),
          "*"
        );
      }

      window.removeEventListener("click", unmuteMusic);
      window.removeEventListener("scroll", unmuteMusic);
      window.removeEventListener("touchstart", unmuteMusic);
    };

    window.addEventListener("click", unmuteMusic);
    window.addEventListener("scroll", unmuteMusic);
    window.addEventListener("touchstart", unmuteMusic);
  }, []);

  return (
    <div style={{ display: "none" }}>
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        src="https://www.youtube.com/embed/NvIXu1pXNZM?autoplay=1&loop=1&playlist=NvIXu1pXNZM&mute=1&enablejsapi=1"
        title="YouTube background music"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}
