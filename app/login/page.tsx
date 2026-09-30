"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";
import { Brand } from "../ui";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      router.push("/guardian");
      router.refresh();
    } catch {
      setError("We couldn't connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header className="site-header wrap">
        <Brand guardian />
        <Link className="text-link" href="/">
          <ArrowLeft size={16} /> Back to MedAlert
        </Link>
      </header>
      <main id="main" className="login-layout wrap">
        <div className="login-intro">
          <div className="eyebrow">CLOSER, EVEN FROM HERE.</div>
          <h1>
            A little distance.
            <br />A lot of reassurance.
          </h1>
          <p>
            Your family&apos;s connection to the people who matter. Welcome to
            Guardian.
          </p>
          <div
            className="login-photo"
            role="img"
            aria-label="MedAlert PLUS medical alert watch"
          />
        </div>
        <section className="login-panel">
          <ShieldCheck className="login-icon" size={30} />
          <h2>Welcome back.</h2>
          <p className="muted">Sign in to your Guardian account.</p>
          <form onSubmit={submit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                title={show ? "Hide password" : "Show password"}
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div role="alert" className={error ? "form-error" : ""}>
              {error}
            </div>
            <button
              disabled={busy}
              className="button primary wide"
              type="submit"
            >
              {busy ? <LoaderCircle className="spin" size={18} /> : null}{" "}
              {busy ? "Signing in..." : "Sign in to Guardian"}
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="demo-credentials">
            <strong>Prototype access</strong>
            <p>Fictional data only. Do not enter personal credentials.</p>
            <button
              className="text-link"
              onClick={() => {
                setEmail("demo@medalert.test");
                setPassword("Guardian72!");
                setError("");
              }}
            >
              Use demo credentials <ArrowRight size={15} />
            </button>
            <small>demo@medalert.test / Guardian72!</small>
          </div>
        </section>
      </main>
    </>
  );
}
