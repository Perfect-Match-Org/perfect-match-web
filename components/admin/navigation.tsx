interface AdminNavigationProps {
    activeSection: 'dashboard' | 'api-docs' | 'reviews';
    onSectionChange: (section: 'dashboard' | 'api-docs' | 'reviews') => void;
}

export default function AdminNavigation({ activeSection, onSectionChange }: AdminNavigationProps) {
    const navItems = [
        { name: "Dashboard", id: "dashboard" as const },
        { name: "API Docs", id: "api-docs" as const },
        { name: "Review Management", id: "reviews" as const }
    ];

    return (
        <nav className="bg-rose-50 shadow-sm">
            <ul className='flex gap-8 py-4 px-4 md:px-8 lg:px-12 text-gray-700'>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => onSectionChange(item.id)}
                            className={`hover:text-rose-400 transition-all duration-300 ease-in-out 
                            relative hover:after:w-full after:content-[""] after:bg-rose-400 after:absolute after:bottom-0 after:left-0 
                            after:h-[2px] after:w-0 after:transition-all after:duration-300 ${
                                activeSection === item.id ? 'text-rose-400 after:w-full' : ''
                            }`}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
