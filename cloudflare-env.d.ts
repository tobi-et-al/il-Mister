declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    COACH_FUNCTION_URL?: string;
    COACH_PROXY_SECRET?: string;
  }
}
