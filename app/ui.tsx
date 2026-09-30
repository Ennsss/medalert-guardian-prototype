import Link from "next/link";
export function Brand({ guardian = false }: { guardian?: boolean }) {
  return (
    <Link href="/" aria-label="MedAlert home" className="brand">
      <span className="brand-mark" aria-hidden="true">
        +
      </span>
      <span>MedAlert{guardian && <small>Guardian</small>}</span>
    </Link>
  );
}
