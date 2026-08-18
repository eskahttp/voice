import 'server-only';


type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

if (!(globalThis as any).__rateLimitCleanup) {
    (globalThis as any).__rateLimitCleanup = setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of store.entries()) {
            if (entry.resetAt < now) store.delete(key);
        }
    }, 10 * 60 * 1000);
}

export type RateLimitOptions = {
    action: string;
    identifier: string;
    limit?: number;
    windowMs?: number;
};

export type RateLimitResult = {
    allowed: boolean;
    remaining: number;
    retryAfterMs: number;
};

export function rateLimit(opts: RateLimitOptions): RateLimitResult {
    const { action, identifier, limit = 10, windowMs = 10 * 60 * 1000 } = opts;
    const key = `${action}:${identifier}`;
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.resetAt < now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1, retryAfterMs: 0 };
    }

    if (entry.count >= limit) {
        return {
            allowed: false,
            remaining: 0,
            retryAfterMs: entry.resetAt - now,
        };
    }

    entry.count += 1;
    return {
        allowed: true,
        remaining: limit - entry.count,
        retryAfterMs: 0,
    };
}