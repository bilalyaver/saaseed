import Users from "@/components/users/Users";
import DashboardLayout from "@/layouts/DashboradLayout";

const index = () => {
  return (
    <DashboardLayout title="Users">
      <Users />
    </DashboardLayout>
  );
}

export default index;