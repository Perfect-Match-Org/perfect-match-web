import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/header';
import { isAdmin } from '@/utils/admins';
import { useRouter } from 'next/router';
import AdminNavigation from '@/components/admin/navigation';
import { ApiDocs, ReviewManagement, Dashboard } from '@/components/admin';

type AdminSection = 'dashboard' | 'api-docs' | 'reviews';

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

    // Admin check
    useEffect(() => {
        if (session) {
            if (!isAdmin(session.user?.email!)) {
                router.push('/');
            }
        }
    }, [session, router]);    // Handler functions for component interactions
    const handleSectionChange = (section: AdminSection) => {
        setActiveSection(section);
    };

    // Render different sections based on active section
    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'api-docs':
                return <ApiDocs />;
            case 'reviews':
                return <ReviewManagement />;
            default:
                return null;
        }
    }; return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            <AdminNavigation
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />
            {renderContent()}
        </div>
    );
}