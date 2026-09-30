"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { Brand } from "./ui";

const navigation = [
  ["The watch", "#the-watch"],
  ["How it works", "#how-it-works"],
  ["For families", "#for-families"],
  ["Questions", "#questions"],
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="home-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="wrap home-header-inner">
        <Brand />
        <nav className="home-desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="home-header-actions">
          <Link className="button secondary guardian-login" href="/login">
            <ShieldCheck size={17} aria-hidden="true" /> Guardian Login
          </Link>
          <button
            ref={toggle}
            className="menu-toggle icon-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="home-mobile-nav wrap"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href="https://medalert.io/pages/contact"
          onClick={() => setOpen(false)}
        >
          Contact MedAlert
        </a>
      </nav>
    </header>
  );
}

const photos = [
  {
    src: "/medalert-angle.jpg",
    label: "Side view",
    alt: "MedAlert PLUS black watch with an adjustable strap and alarm reminder on its screen",
  },
  {
    src: "/medalert-plus.jpg",
    label: "Watch face",
    alt: "Front view of the MedAlert PLUS watch",
  },
  {
    src: "/medalert-pendant.jpg",
    label: "Pendant",
    alt: "MedAlert PLUS with its pendant attachment",
  },
];

export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const photo = photos[selected];
  return (
    <div className="product-gallery">
      <div className="gallery-photo">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={823}
          height={823}
          sizes="(max-width: 720px) 100vw, 50vw"
        />
      </div>
      <div
        className="gallery-controls"
        role="group"
        aria-label="Product photos"
      >
        {photos.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            aria-label={`Show ${item.label.toLowerCase()}`}
          >
            <Image src={item.src} alt="" width={54} height={54} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
