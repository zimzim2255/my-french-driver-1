import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './components/admin-sidebar';
import { DashboardOverview } from './components/dashboard-overview';
import { BookingsManagement } from './components/bookings-management';
import { FleetManagement } from './components/fleet-management';
import { MessagesManagement } from './components/messages-management';
import { NotificationsManagement } from './components/notifications-management';
import { ReportsAnalytics } from './components/reports-analytics';
import { ProfileManagement } from './components/profile-management';
import { SystemSettings } from './components/system-settings';
import { NotificationsDropdown } from './components/notifications-dropdown';
import { SearchModal } from './components/search-modal';
import { Login } from './components/login';
import { Button } from './components/ui/button';
import { User, Menu, X, LogOut } from 'lucide-react';
import { PaymentsInvoices } from './components/payments-invoices';
import { authService, bookingService, messageService, type Admin } from './services/api';

function roleLabel(role?: string) {
  switch (role) {
    case 'super_admin':
      return 'Super Administrator';
    case 'admin':
      return 'Administrator';
    case 'manager':
      return 'Manager';
    case 'support':
      return 'Support';
    default:
      return role || '-';
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<Admin | null>(null);
  const [badgeCounts, setBadgeCounts] = useState({ bookings: 0, messages: 0, notifications: 0 });
  const [notificationsCleared, setNotificationsCleared] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Verify token is still valid
      authService.getProfile().then(response => {
        if (response.success) {
          setIsAuthenticated(true);
          setAdminInfo(response.data?.admin || null);
        } else {
          localStorage.removeItem('admin_token');
        }
        setIsLoading(false);
      }).catch(() => {
        localStorage.removeItem('admin_token');
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Ensure admin info is loaded once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      authService.getProfile().then(res => {
        if (res.success && res.data?.admin) {
          setAdminInfo(res.data.admin);
        }
      }).catch(() => {});
    }
  }, [isAuthenticated]);

  // Fetch sidebar badge counts (bookings, messages, notifications)
  useEffect(() => {
    let timer: any;
    const loadCounts = async () => {
      try {
        // Pending bookings count
        const br = await bookingService.getAll({ status: 'pending', limit: 1 });
        const bookings = br.success && br.data?.pagination ? br.data.pagination.total_items : 0;

        // Unread messages count
        const mr = await messageService.getAll({ status: 'unread', limit: 1 });
        const messages = mr.success && mr.data?.pagination ? mr.data.pagination.total_items : 0;

        // Notifications badge: for now, mirror pending bookings + unread messages (can be refined later)
        const notifications = bookings + messages;

        setBadgeCounts({ bookings, messages, notifications });
      } catch {
        // keep previous counts on error
      }
    };

    if (isAuthenticated) {
      loadCounts();
      // refresh every 30s to reflect new activity
      timer = setInterval(loadCounts, 30000);
    }
    return () => timer && clearInterval(timer);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsAuthenticated(false);
    setActiveSection('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard Overview',
      bookings: 'Booking Management',
            fleet: 'Fleet Management',
      messages: 'Customer Messages',
      notifications: 'Notification Center',
      reports: 'Analytics & Reports',
      profile: 'Profile Management',
      settings: 'System Settings',
      payments: 'Payments & Invoices'
    };
    return titles[section] || 'Dashboard';
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'view-all-bookings':
        setActiveSection('bookings');
        break;
      case 'analytics':
        setActiveSection('reports');
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview onQuickAction={handleQuickAction} />;
      case 'bookings':
        return <BookingsManagement />;
      case 'fleet':
        return <FleetManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'profile':
        return <ProfileManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'payments':
        return <PaymentsInvoices />;
      default:
        return <DashboardOverview />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // When user navigates to notifications section, clear the notifications badge.
    if (section === 'notifications') {
      setNotificationsCleared(true);
      setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
    }
    // Close sidebar after selection on all sizes
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex bg-background relative">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50
        w-64 h-full
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          onClose={() => setSidebarOpen(false)}
          adminName={adminInfo?.name || ''}
          adminRole={roleLabel(adminInfo?.role)}
          bookingsBadge={badgeCounts.bookings}
          messagesBadge={badgeCounts.messages}
          notificationsBadge={notificationsCleared ? 0 : badgeCounts.notifications}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
                            
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-primary leading-tight">{getSectionTitle(activeSection)}</h1>
                <p className="text-sm md:text-base text-muted-foreground hidden sm:block">Manage your French driver service with ease</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 ml-auto mt-2 sm:mt-0">
              <SearchModal />
              
              <NotificationsDropdown 
                onSectionChange={setActiveSection}
                onOpened={() => {
                  setNotificationsCleared(true);
                  setBadgeCounts(prev => ({ ...prev, notifications: 0 }));
                }}
              />
              
              <div 
                className="flex items-center gap-2 md:gap-3 pl-2 sm:pl-4 border-0 sm:border-l border-border cursor-pointer hover:bg-secondary/50 rounded-md p-1.5 md:p-2 transition-colors"
                onClick={() => setActiveSection('profile')}
              >
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="text-sm hidden sm:block">
                  <p className="font-medium text-primary">{(adminInfo?.name || '').split(' ')[0] || '-'}</p>
                  <p className="text-muted-foreground">{roleLabel(adminInfo?.role)}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-red-600"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}