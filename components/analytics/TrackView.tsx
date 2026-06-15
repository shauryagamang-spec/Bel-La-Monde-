"use client";
import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event on mount (e.g. view_content on detail pages). */
export function TrackView({
  event,
  data,
}: {
  event: AnalyticsEvent;
  data?: Record<string, unknown>;
}) {
  useEffect(() => {
    track(event, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
