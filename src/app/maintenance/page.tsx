import { Metadata } from "next";
import { Maintenance3D } from "@/components/Maintenance3D";
import { getMaintenanceState } from "@/lib/maintenance";

export const metadata: Metadata = {
  title: "Scheduled Maintenance • DevSuite Hub",
  description: "DevSuite Hub is currently undergoing scheduled performance and security upgrades.",
};

export default async function MaintenancePage() {
  const state = await getMaintenanceState();

  return (
    <Maintenance3D
      initialMessage={state.message}
      initialEstimatedTime={state.estimatedTime}
    />
  );
}
