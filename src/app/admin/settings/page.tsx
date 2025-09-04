// app/admin/settings/page.tsx  (Server Component, без "use client")
import AdminMain from '@/components/Admin/AdminMain';

export const dynamic = 'force-dynamic'; // необов’язково, але ок для SSR

function AdminSettingsPage() {
  return (
    <AdminMain>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600">Here will be a settings …</p>
    </AdminMain>
  );
}
export default AdminSettingsPage;
