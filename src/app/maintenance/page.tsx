import { Metadata } from "next";
import { Maintenance3D } from "@/components/Maintenance3D";

export const metadata: Metadata = {
  title: "Scheduled Maintenance • DevSuite Hub",
  description: "DevSuite Hub is currently undergoing scheduled performance and security upgrades.",
};

export default function MaintenancePage() {
  return <Maintenance3D />;
}
