import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <p className="eyebrow">404</p>
      <h1>Nie ma takiej strony.</h1>
      <Link className="button" href="/">Wróć na stronę główną</Link>
    </main>
  );
}
