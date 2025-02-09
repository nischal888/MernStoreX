import { Outlet } from 'react-router-dom';
import AdminSideNavigation from './adminSidenav';
import AdminHeader from './adminHeader';

function AdministrationLayout() {
  return (
    <div className="flex min-h-screen w-ful">
      <AdminSideNavigation />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default AdministrationLayout;
