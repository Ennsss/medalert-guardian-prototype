import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Signal,
  Watch,
} from "lucide-react";
import { Brand } from "./ui";
import { HomeHeader, ProductGallery } from "./home-interactions";

const productUrl =
  "https://medalert.io/products/medalert-plus-medical-alert-watch-4g-with-gps";
const contactUrl = "https://medalert.io/pages/contact";
const features = [
  {
    icon: Phone,
    title: "A familiar voice, close by.",
    text: "An SOS button and two-way calling help you reach your chosen contacts directly from the watch.",
  },
  {
    icon: ShieldCheck,
    title: "An extra layer of support.",
    text: "Automatic fall detection can alert your emergency contacts when a fall is detected.",
  },
  {
    icon: MapPin,
    title: "A little less wondering.",
    text: "GPS location sharing helps authorised family and carers check where the wearer was last located.",
  },
];
const steps = [
  {
    title: "Find your fit",
    text: "Talk through your needs with MedAlert and choose the device and support plan that suit you.",
  },
  {
    title: "Get connected",
    text: "Charge the device, activate it, and set up your emergency contacts with help from the team.",
  },
  {
    title: "Make it part of your day",
    text: "Practise using the watch together, then keep it charged and ready for everyday wear.",
  },
];
const questions = [
  {
    question: "Does the wearer need a smartphone?",
    answer:
      "No. MedAlert PLUS uses its own 4G connection for calls and alerts. Mobile coverage and an active plan are required.",
  },
  {
    question: "Can my family help manage the watch?",
    answer:
      "Yes. The MedAlert portal supports shared access for authorised family and carers, including contact and device settings.",
  },
  {
    question: "Is 24/7 monitoring included?",
    answer:
      "A response-centre monitoring plan is an optional extra. Check current plans with MedAlert before choosing the level of support you need.",
  },
  {
    question: "Can I wear it another way?",
    answer:
      "Yes. MedAlert PLUS includes wristwatch, lanyard and brooch-clip options, so you can choose a comfortable fit.",
  },
  {
    question: "Where can I check pricing and funding options?",
    answer:
      "The official MedAlert website has current product and plan pricing. Contact the team about NDIS or aged-care funding options and your eligibility.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <div className="announcement">
        Independence for you. Reassurance for the people who care.
      </div>
      <HomeHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="small-cross" aria-hidden="true">
                  +
                </span>{" "}
                Made for life, not limits
              </div>
              <h1 id="hero-title">
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
                <a className="button primary" href={productUrl}>
                  Explore the watch <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="text-link" href="#how-it-works">
                  How it works <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-points">
                <span>
                  <ShieldCheck size={17} aria-hidden="true" /> Fall detection
                </span>
                <span>
                  <MapPin size={17} aria-hidden="true" /> GPS location
                </span>
                <span>
                  <Phone size={17} aria-hidden="true" /> Two-way calling
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
            <Watch aria-hidden="true" />
            <span>
              Just 28 grams<strong>Light on your wrist.</strong>
            </span>
          </div>
          <div>
            <Heart aria-hidden="true" />
            <span>
              Family connected<strong>Reassurance, shared.</strong>
            </span>
          </div>
          <div>
            <Phone aria-hidden="true" />
            <span>
              Australian support<strong>A real person to help.</strong>
            </span>
          </div>
        </section>
        <section className="home-section wrap" aria-labelledby="features-title">
          <div className="section-intro">
            <div>
              <div className="eyebrow">Your day. Your way.</div>
              <h2 id="features-title">
                More living.
                <br />A little less worrying.
              </h2>
            </div>
            <p>
              For people who value their independence. And for the people who
              want to know they can stay in touch.
            </p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text }, index) => (
              <article className="home-feature" key={title}>
                <div className={`feature-symbol feature-symbol-${index}`}>
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="safety-note">
            Fall detection may not detect every fall. Calls, alerts and location
            updates depend on connectivity and device conditions.
          </p>
        </section>
        <section
          id="the-watch"
          className="watch-section"
          aria-labelledby="watch-title"
        >
          <div className="wrap watch-layout">
            <ProductGallery />
            <div className="watch-copy">
              <div className="eyebrow">Meet MedAlert PLUS</div>
              <h2 id="watch-title">
                Small on your wrist.
                <br />
                Big on connection.
              </h2>
              <p>
                No bulky equipment. Just a lightweight wearable designed to fit
                into your routine.
              </p>
              <dl className="watch-specs">
                <div>
                  <dt>Weight</dt>
                  <dd>
                    28<span>g</span>
                  </dd>
                </div>
                <div>
                  <dt>Ways to wear</dt>
                  <dd>3</dd>
                </div>
                <div>
                  <dt>Connection</dt>
                  <dd>4G</dd>
                </div>
              </dl>
              <ul className="watch-benefits">
                <li>
                  <Bell size={21} aria-hidden="true" />
                  <div>
                    <strong>A nudge for your routine</strong>
                    <span>Scheduled reminders, right on your wrist.</span>
                  </div>
                </li>
                <li>
                  <Signal size={21} aria-hidden="true" />
                  <div>
                    <strong>Connected without a phone</strong>
                    <span>A built-in SIM uses the Telstra 4G network.</span>
                  </div>
                </li>
              </ul>
              <a className="text-link" href={productUrl}>
                See full product details{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="setup-section"
          aria-labelledby="setup-title"
        >
          <div className="wrap home-section">
            <div className="section-intro">
              <div>
                <div className="eyebrow">Getting started</div>
                <h2 id="setup-title">
                  A few simple steps.
                  <br />A human to help.
                </h2>
              </div>
              <a href={contactUrl} className="text-link">
                Ask about setup <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <ol className="setup-steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          id="for-families"
          className="guardian-section"
          aria-labelledby="guardian-title"
        >
          <div className="wrap home-section">
            <div className="section-intro">
              <div>
                <div className="eyebrow">MedAlert Guardian</div>
                <h2 id="guardian-title">
                  Stay close.
                  <br />
                  Even from a little further away.
                </h2>
              </div>
              <div className="guardian-intro">
                <p>
                  A clearer picture for family and carers. Check device status,
                  battery and recent location in one place.
                </p>
                <Link className="button secondary" href="/login">
                  Try the Guardian demo{" "}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="guardian-preview-label">
              <span>
                <ShieldCheck size={17} aria-hidden="true" /> Your connection to
                everyday care
              </span>
              <span>Prototype preview</span>
            </div>
            <Link
              href="/login"
              className="guardian-preview"
              aria-label="Open the Guardian dashboard demo"
            >
              <picture>
                <source
                  media="(max-width: 720px)"
                  srcSet="/guardian-preview-mobile.png"
                  width={390}
                  height={844}
                />
                <Image
                  src="/guardian-preview.png"
                  alt="Guardian prototype showing Margaret Thompson's watch status, 72 percent battery, Sydney location and recent activity"
                  width={1440}
                  height={900}
                  sizes="(max-width: 1240px) 100vw, 1168px"
                />
              </picture>
            </Link>
            <div className="guardian-bottom">
              <div>
                <span>
                  <Check size={16} aria-hidden="true" /> Device status
                </span>
                <span>
                  <Check size={16} aria-hidden="true" /> Last known location
                </span>
                <span>
                  <Check size={16} aria-hidden="true" /> Recent activity
                </span>
              </div>
              <p>Fictional data. No live monitoring or emergency response.</p>
            </div>
          </div>
        </section>
        <section
          id="questions"
          className="wrap home-section faq-section"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro">
            <div className="eyebrow">Good questions</div>
            <h2 id="faq-title">
              A little clarity
              <br />
              before you choose.
            </h2>
            <p>Still wondering about something?</p>
            <a className="text-link" href={contactUrl}>
              Talk to the MedAlert team{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="faq-list">
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-band" aria-labelledby="contact-title">
          <div className="wrap contact-layout">
            <div>
              <div className="eyebrow">
                An Australian team, a real conversation
              </div>
              <h2 id="contact-title">Let&apos;s find what feels right.</h2>
              <p>
                Choosing support is personal. The MedAlert team can help you
                take the next step.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button primary" href="tel:+61272275833">
                <Phone size={18} aria-hidden="true" /> 02 7227 5833
              </a>
              <a className="text-link" href="mailto:support@medalert.io">
                <Mail size={18} aria-hidden="true" /> support@medalert.io
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="wrap">
          <div className="home-footer-top">
            <div>
              <Brand />
              <p>Independence, connected.</p>
            </div>
            <nav aria-label="Footer navigation">
              <a href={productUrl}>MedAlert PLUS</a>
              <Link href="/login">Guardian demo</Link>
              <a href={contactUrl}>Contact MedAlert</a>
              <a href="#main">
                Back to top <ArrowRight size={14} aria-hidden="true" />
              </a>
            </nav>
          </div>
          <div className="home-footer-bottom">
            <p>
              Independent concept by Frederick Ian Aranico with OpenAI Codex.
              <br />
              Not the official MedAlert website. Product and support links open
              MedAlert&apos;s official services.
            </p>
            <a href="https://github.com/Ennsss/medalert-guardian-prototype">
              View the project <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
