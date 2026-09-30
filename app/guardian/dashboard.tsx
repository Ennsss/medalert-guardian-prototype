"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Battery,
  Bell,
  Check,
  ChevronRight,
  LogOut,
  MapPin,
  Radio,
  RefreshCw,
  ShieldCheck,
  Watch,
} from "lucide-react";
import { Brand } from "../ui";
import type { Device } from "@/lib/device";
export default function Dashboard() {
  const router = useRouter();
  const [device, setDevice] = useState<Device | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/device", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      if (!res.ok) throw new Error();
      const data: Device = await res.json();
      setDevice(data);
      setNotice(
        `Demo information refreshed at ${new Date(data.fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`,
      );
    } catch {
      setError("Device information couldn't be loaded. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [router]);
  useEffect(() => {
    void load();
  }, [load]);
  async function logout() {
    try {
      const res = await fetch("/api/login", { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.replace("/login");
      router.refresh();
    } catch {
      setError("We couldn't sign you out. Please try again.");
    }
  }
  return (
    <div className="dashboard">
      <div className="demo-bar">
        DEMO WORKSPACE{" "}
        <span>
          Fictional wearer and device data. No emergency services are connected.
        </span>
      </div>
      <header className="guardian-header wrap">
        <Brand guardian />
        <div className="account">
          <span className="avatar">ST</span>
          <span className="desktop-link">Sarah Thompson</span>
          <button
            className="icon-button"
            aria-label="Sign out"
            title="Sign out"
            onClick={logout}
          >
            <LogOut size={19} />
          </button>
        </div>
      </header>
      <main id="main" className="wrap dashboard-main">
        <div className="breadcrumb">
          My family <ChevronRight size={14} /> Margaret
        </div>
        <div className="dashboard-heading">
          <div>
            <div className="eyebrow">YOUR FAMILY, CONNECTED</div>
            <h1>{device?.wearer ?? "Margaret Thompson"}</h1>
            <p className="muted">A clear view of Margaret's watch.</p>
          </div>
          <button className="button secondary" disabled={busy} onClick={load}>
            <RefreshCw size={17} className={busy ? "spin" : ""} />
            {busy ? "Refreshing..." : "Refresh status"}
          </button>
        </div>
        {error && (
          <div role="alert" className="form-error">
            {error}
          </div>
        )}
        <div className="refresh-notice" role="status">
          {notice}
        </div>
        {!device ? (
          <div className="loading-surface">
            {error ? "Information unavailable" : "Connecting to Guardian..."}
          </div>
        ) : (
          <>
            <section className="device-overview">
              <div className="device-title">
                <img
                  src="/medalert-plus.jpg"
                  alt="Black MedAlert PLUS watch"
                  width="100"
                  height="100"
                />
                <div>
                  <span className="eyebrow">MARGARET'S WATCH</span>
                  <h2>{device.model}</h2>
                  <span className="status-pill">
                    <span className="status-dot" />
                    {device.status}
                  </span>
                </div>
              </div>
              <div className="metric">
                <Battery size={23} />
                <span>Battery level</span>
                <strong>{device.battery}%</strong>
                <div className="battery-track">
                  <i style={{ width: `${device.battery}%` }} />
                </div>
              </div>
              <div className="metric">
                <ShieldCheck size={23} />
                <span>Fall detection</span>
                <strong>{device.fallDetection}</strong>
                <small>Detection enabled</small>
              </div>
              <div className="metric">
                <Radio size={23} />
                <span>Last GPS update</span>
                <strong>
                  {Math.max(
                    0,
                    Math.round(
                      (new Date(device.fetchedAt).getTime() -
                        new Date(device.lastGpsUpdate).getTime()) /
                        60000,
                    ),
                  )}{" "}
                  minutes ago
                </strong>
                <small>
                  {new Date(device.lastGpsUpdate).toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Australia/Sydney",
                  })}{" "}
                  Sydney time
                </small>
              </div>
            </section>
            <div className="dashboard-columns">
              <section className="location-section">
                <div className="section-heading">
                  <h2>Last known location</h2>
                  <MapPin size={20} />
                </div>
                <div className="location-display">
                  <MapPin size={35} />
                  <strong>{device.location}</strong>
                  <span>Last reported location, not a live position.</span>
                  <a
                    href="https://www.openstreetmap.org/#map=12/-33.8688/151.2093"
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    View Sydney map <ChevronRight size={16} />
                  </a>
                </div>
                <div className="location-foot">
                  <ShieldCheck size={17} /> Location is visible to your care
                  circle.
                </div>
              </section>
              <section className="alerts-section">
                <div className="section-heading">
                  <h2>Recent activity</h2>
                  <Bell size={20} />
                </div>
                <p className="muted activity-subtitle">
                  The little updates that keep you connected.
                </p>
                <ul className="activity-list">
                  {device.alerts.map((alert) => (
                    <li key={alert.id}>
                      <span className="activity-icon">
                        {alert.kind === "battery" ? (
                          <Battery size={19} />
                        ) : alert.kind === "connection" ? (
                          <Radio size={19} />
                        ) : (
                          <Check size={19} />
                        )}
                      </span>
                      <div>
                        <strong>{alert.title}</strong>
                        <p>{alert.detail}</p>
                        <time dateTime={alert.time}>
                          {new Date(alert.time).toLocaleTimeString("en-AU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Australia/Sydney",
                          })}{" "}
                          Sydney time
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <p className="dashboard-note">
              <Watch size={16} /> Watch connectivity does not confirm the
              wearer's wellbeing. This prototype does not monitor a real device.
            </p>
          </>
        )}
      </main>
      <footer className="wrap footer">
        <span>MedAlert Guardian</span>
        <span>Prototype by Frederick Ian Aranico + Codex</span>
      </footer>
    </div>
  );
}
