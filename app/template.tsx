// A template re-mounts on every navigation (unlike layout), so this wrapper
// replays a reveal each time a page opens — echoing the preloader's
// blur-to-focus. CSS-driven (see .route-enter in globals.css); the nav/footer
// live in the layout and stay anchored.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
