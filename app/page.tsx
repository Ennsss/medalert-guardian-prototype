import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Phone,
  ShieldCheck,
  Watch,
} from "lucide-react";
import { Brand } from "./ui";
export default function Home() {
  return (
    <>
      <div className="announcement">
        Independence for you. Reassurance for the people who care.
      </div>
      <header className="site-header wrap">
        <Brand />
        <nav aria-label="Main navigation">
          <a className="desktop-link" href="#everyday">
            Why MedAlert
          </a>
          <a className="desktop-link" href="https://medalert.io/pages/contact">
            Talk to our team
          </a>
          <Link className="button secondary" href="/login">
            <ShieldCheck size={17} /> Guardian Login
          </Link>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="small-cross">+</span> MADE FOR LIFE, NOT LIMITS
              </div>
              <h1>
                MedAlert PLUS
                <span>
                  Stay independent.
                  <br />
                  Stay connected.
                </span>
              </h1>
              <p>
                A little reassurance, wherever life takes you. A lightweight
                medical alert watch that keeps family and support close at hand.
              </p>
              <div className="hero-actions">
                <a
                  className="button primary"
                  href="https://medalert.io/products/medalert-plus-medical-alert-watch-4g-with-gps"
                >
                  Explore the watch <ArrowRight size={18} />
                </a>
                <a
                  className="text-link"
                  href="https://medalert.io/pages/contact"
                >
                  Find your right fit <ArrowRight size={16} />
                </a>
              </div>
              <div className="hero-points">
                <span>
                  <ShieldCheck size={17} /> Fall detection
                </span>
                <span>
                  <MapPin size={17} /> GPS location
                </span>
                <span>
                  <Phone size={17} /> Two-way calling
                </span>
              </div>
            </div>
            <div className="product-caption">
              <span className="status-dot" /> MEDALERT PLUS{" "}
              <span>4G connected care</span>
            </div>
          </div>
        </section>
        <section className="trust-strip wrap" aria-label="Product highlights">
          <div>
            <Watch />
            <span>
              Just 28 grams<strong>Light on your wrist.</strong>
            </span>
          </div>
          <div>
            <Heart />
            <span>
              Family connected<strong>Reassurance, shared.</strong>
            </span>
          </div>
          <div>
            <Phone />
            <span>
              Australian support<strong>A real person to help.</strong>
            </span>
          </div>
        </section>
        <section id="everyday" className="everyday wrap">
          <div>
            <div className="eyebrow">YOUR DAY. YOUR WAY.</div>
            <h2>
              Support that fits into life.
              <br />
              Not the other way around.
            </h2>
          </div>
          <p>
            Out for a walk or relaxing at home, MedAlert helps you stay
            connected to the people you trust. Family and carers can check in
            through Guardian, without getting in the way of your independence.
          </p>
          <Link className="text-link" href="/login">
            Open Guardian <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <footer className="wrap footer">
        <Brand />
        <p>
          Independent concept by Frederick Ian Aranico with OpenAI Codex. Not
          the official MedAlert website.
        </p>
      </footer>
    </>
  );
}
