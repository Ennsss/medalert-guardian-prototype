export type Device = {
  wearer: string;
  model: string;
  status: string;
  battery: number;
  lastGpsUpdate: string;
  location: string;
  fallDetection: string;
  fetchedAt: string;
  alerts: {
    id: string;
    title: string;
    detail: string;
    time: string;
    kind: "check" | "battery" | "connection";
  }[];
};
export function getDemoDevice(): Device {
  const now = Date.now();
  return {
    wearer: "Margaret Thompson",
    model: "MedAlert PLUS",
    status: "Online",
    battery: 72,
    lastGpsUpdate: new Date(now - 120_000).toISOString(),
    location: "Sydney NSW",
    fallDetection: "Active",
    fetchedAt: new Date(now).toISOString(),
    alerts: [
      {
        id: "1",
        title: "Connection checked",
        detail: "Watch is connected to the network.",
        time: new Date(now - 120_000).toISOString(),
        kind: "connection",
      },
      {
        id: "2",
        title: "Charging complete",
        detail: "Watch removed from its charging dock.",
        time: new Date(now - 7200_000).toISOString(),
        kind: "battery",
      },
      {
        id: "3",
        title: "Scheduled check-in",
        detail: "Device status recorded successfully.",
        time: new Date(now - 10800_000).toISOString(),
        kind: "check",
      },
    ],
  };
}
