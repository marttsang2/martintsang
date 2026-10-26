"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content";

const format = new Intl.DateTimeFormat("en-CA", {
  timeZone: site.timeZone,
  hour: "numeric",
  minute: "2-digit",
});

const subscribe = (onTick: () => void) => {
  const timer = window.setInterval(onTick, 15_000);
  return () => window.clearInterval(timer);
};

export default function TorontoTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(new Date()),
    () => null,
  );

  return (
    <p className="t-small">
      {time ? `It’s ${time} in Toronto right now.` : "Based in Toronto, on Eastern Time."}
    </p>
  );
}
