import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid #1a1a1a",
        marginTop: "auto",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#e8e6e1",
                letterSpacing: "-0.01em",
                marginBottom: "0.25rem",
              }}
            >
              Ana Sharma
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#5c5a56",
                maxWidth: "32ch",
              }}
            >
              Documenting what it feels like to live through the AI transition
              era.
            </p>
          </div>

          <nav
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              { href: "/essays", label: "Essays" },
              { href: "/signals", label: "Signals" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid #141414",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.7rem", color: "#3a3836" }}>
            © {year} Ana Sharma. All rights reserved.
          </p>
          <p style={{ fontSize: "0.7rem", color: "#3a3836" }}>
            anasharma.com
          </p>
        </div>
      </div>
    </footer>
  );
}
