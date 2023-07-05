"use client";

import { useCallback, useEffect, useState } from "react";
import { timeAgo } from "./timeAgo";

export default function DateTime({ date }: { date: Date }) {
  const formatDate = useCallback(() => {
    const [formattedDate, timeToNextUpdate] = timeAgo.format(date, "twitter", {
      getTimeToNextUpdate: true,
    }) as unknown as [string, number?];

    return [formattedDate, timeToNextUpdate ?? 60_000] as const;
  }, [date]);

  const [formattedString, setFormattedString] = useState(formatDate()[0]);
  const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    const [string, timeToNextUpdate] = formatDate();
    const timeout = setTimeout(() => {
      setFormattedString(string);
      setLastUpdated(Date.now());
    }, timeToNextUpdate);

    return () => clearTimeout(timeout);
  }, [formatDate, lastUpdated]);

  return <>{formattedString}</>;
}
