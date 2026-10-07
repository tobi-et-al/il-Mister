import Script from "next/script";
import { requireChatGPTUser } from "./chatgpt-auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireChatGPTUser("/");

  return (
    <>
      <div id="cloud-account" data-user-id={user.userId} data-user-email={user.email} data-user-name={user.displayName} hidden />
      <div className="app-shell">
        <aside className="rail" aria-label="Primary navigation">
          <a className="brand" href="#home" aria-label="Il Mister home">
            <span className="brand-mark">IM</span>
            <span><strong>Il Mister</strong><small>LISTEN / DISTIL / REPLAY</small></span>
          </a>
          <nav id="primary-nav" className="rail-nav" />
          <div className="rail-foot">
            <div id="cloud-status" className="cloud-status" data-state="loading" role="status" aria-live="polite">
              <span className="cloud-dot" />
              <span><strong>Connecting</strong><small>{user.email}</small></span>
            </div>
            <div className="rail-stat"><span id="rail-percent">0%</span><small>target met</small></div>
            <div className="mini-track"><span id="rail-track" /></div>
          </div>
        </aside>
        <main id="app" tabIndex={-1} />
        <nav id="mobile-nav" className="mobile-nav" aria-label="Primary navigation" />
      </div>
      <dialog id="coach-dialog" className="coach-dialog"><div id="coach-shell" /></dialog>
      <dialog id="confirm-dialog" className="confirm-dialog">
        <form method="dialog">
          <p className="eyebrow">Please confirm</p>
          <h2 id="confirm-title">Reset progress?</h2>
          <p id="confirm-copy">This cannot be undone unless you exported a backup.</p>
          <div className="dialog-actions">
            <button value="cancel" className="button button-quiet">Cancel</button>
            <button id="confirm-action" value="confirm" className="button button-danger">Reset</button>
          </div>
        </form>
      </dialog>
      <div id="toast" className="toast" role="status" aria-live="polite" />
      <input id="backup-input" type="file" accept="application/json" hidden />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
