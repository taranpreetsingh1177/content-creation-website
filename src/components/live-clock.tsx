"use client";

import { useEffect, useState } from "react";

function getTimezoneAbbreviation(date: Date) {
  const str = date.toString();
  const openParen = str.indexOf("(");
  const closeParen = str.indexOf(")");
  if (openParen !== -1 && closeParen > openParen) {
    const tzName = str.slice(openParen + 1, closeParen);
    if (/^[A-Z]{3,4}$/.test(tzName)) {
      return tzName;
    }
    const initials = tzName
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    if (initials && /^[A-Z]{2,4}$/.test(initials)) {
      return initials;
    }
    return tzName;
  }

  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return mins === 0
    ? `GMT${sign}${hours}`
    : `GMT${sign}${hours}:${String(mins).padStart(2, "0")}`;
}

function formatClock(date: Date) {
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const tz = getTimezoneAbbreviation(date);

  return `${time} ${tz}`;
}

export function LiveClock() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const tick = () => setDisplay(formatClock(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      className="font-mono text-base tracking-wide text-muted-text tabular-nums"
      dateTime={display || undefined}
      suppressHydrationWarning
    >
      {display || "—:—:—"}
    </time>
  );
}
