import Health from "@/components/health/Health";
import DashboardLayout from "@/layouts/DashboradLayout";

const health = () => {
  return (
    <DashboardLayout title="Health Check">
      <Health />
    </DashboardLayout>
  );
}

export default health;