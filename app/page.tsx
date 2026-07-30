import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero container">
        <p className="eyebrow">SurDev / software studio</p>
        <h1>Projektujemy i tworzymy proste rzeczy w internecie.</h1>
        <p className="hero-copy">
          Budujemy szybkie strony i aplikacje webowe. Stawiamy na czytelny kod,
          dobre doświadczenia użytkownika i rozwiązania bez zbędnych komplikacji.
        </p>
        <div className="actions">
          <Link className="button" href="/blog">Przeczytaj blog</Link>
          <a className="text-link" href="#kontakt">Porozmawiajmy →</a>
        </div>
      </section>

      <section className="section container" id="o-nas">
        <p className="section-number">01 / O nas</p>
        <div className="two-columns">
          <h2>Tworzymy użyteczne cyfrowe doświadczenia.</h2>
          <div className="body-copy">
            <p>SurDev projektuje i buduje nowoczesne strony oraz aplikacje internetowe.</p>
            <p>Na blogu dzielimy się wiedzą zdobytą podczas realizacji projektów.</p>
          </div>
        </div>
      </section>

      <section className="section contact container" id="kontakt">
        <p className="section-number">02 / Kontakt</p>
        <h2>Masz pomysł? Porozmawiajmy.</h2>
        <a className="mail-link" href="mailto:kontakt@surdev.pl">kontakt@surdev.pl ↗</a>
      </section>
    </main>
  );
}
