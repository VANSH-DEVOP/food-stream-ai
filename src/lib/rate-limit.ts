const requests =
  new Map<
    string,
    {
      count: number;
      resetTime: number;
    }
  >();

// Entries are only revisited when their own key is hit again, so without a
// periodic sweep the map grows by one entry per user and never shrinks.
const SWEEP_INTERVAL_MS = 60_000;

let lastSweep = Date.now();

function sweep(now: number) {

  if (
    now - lastSweep <
    SWEEP_INTERVAL_MS
  ) {
    return;
  }

  lastSweep = now;

  for (const [
    key,
    entry,
  ] of requests) {

    if (now > entry.resetTime) {
      requests.delete(key);
    }
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
) {

  const now = Date.now();

  sweep(now);

  const existing =
    requests.get(key);

  if (
    !existing ||
    now > existing.resetTime
  ) {

    requests.set(key, {
      count: 1,
      resetTime:
        now + windowMs,
    });

    return true;
  }

  if (
    existing.count >= limit
  ) {
    return false;
  }

  existing.count++;

  return true;
}