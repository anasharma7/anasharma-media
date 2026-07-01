export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #0d0d0d",
        padding: "1.25rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily:
              'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
            fontSize: "0.58rem",
            color: "#1a1816",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          A·S · anasharma.com · est. 2025
        </span>
        <span
          style={{
            fontFamily:
              'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
            fontSize: "0.58rem",
            color: "#141210",
            letterSpacing: "0.1em",
          }}
        >
          AI · INTERNET CULTURE · DIGITAL BEHAVIOR · COGNITIVE INEQUALITY
        </span>
      </div>
    </footer>
  );
}
