import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="SurDev — strona główna">
          SurDev<span>.</span>
        </Link>
        <div className="header-actions">
          <nav aria-label="Główna nawigacja">
            <Link href="/#o-nas">O nas</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#kontakt">Kontakt</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
