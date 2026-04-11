"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function VisitTracker() {
  const pathname = usePathname();
  const tracked = useRef(new Set());

  useEffect(() => {
    // Avoid tracking admin pages or duplicate entries per session
    if (pathname.startsWith("/admin")) return;
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    const device = window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";

    supabase.from("visits").insert({
      page_path: pathname,
      referrer: document.referrer || "direct",
      device_type: device,
      timestamp: new Date().toISOString(),
    }).then(({ error }) => {
      if (error) console.warn("Visit tracking failed:", error.message);
    });
  }, [pathname]);

  return null;
}
