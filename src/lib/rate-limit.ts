const requests =
  new Map<
    string,
    {
      count: number;
      resetTime: number;
    }
  >();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
) {

  const now = Date.now();

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