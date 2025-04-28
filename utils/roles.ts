export enum Role {
    BASIC = 'team_member', // Basic Admin Access
    FULL = 'lead' // Full Access
}

export enum Permission {
    VIEW_BASIC_STATS = 'view_basic_stats',
    VIEW_USER_LIST = 'view_user_list',
    VIEW_SENSITIVE_DATA = 'view_sensitive_data'
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.BASIC]: [
        Permission.VIEW_BASIC_STATS,
        Permission.VIEW_USER_LIST
    ],
    [Role.FULL]: [
        Permission.VIEW_BASIC_STATS,
        Permission.VIEW_USER_LIST,
        Permission.VIEW_SENSITIVE_DATA
    ]
};


export const hasPermission = (userRole: Role | null, permission: Permission): boolean => {
    if (!userRole || !ROLE_PERMISSIONS[userRole]) return false;
    return ROLE_PERMISSIONS[userRole].includes(permission);
};