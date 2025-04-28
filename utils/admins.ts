import { Role, hasPermission, Permission } from './roles';

type AdminRolesMap = Record<string, Role>;

const ADMIN_ROLES: AdminRolesMap = {
    'cornell.perfectmatch@gmail.com': Role.FULL,
    'perfectmatch@cornell.edu': Role.FULL,
    'ps2245@cornell.edu': Role.FULL,
    'yj472@cornell.edu': Role.FULL,
    'njv27@cornell.edu': Role.FULL,
    'dc863@cornell.edu': Role.FULL,
    'vg245@cornell.edu': Role.FULL,
    'sls537@cornell.edu': Role.FULL,
    'kh635@cornell.edu': Role.FULL,
    'hz642@cornell.edu': Role.FULL,
    'dl2253@cornell.edu': Role.FULL,
    'js3696@cornell.edu': Role.FULL,
    'az468@cornell.edu': Role.FULL,
    'cz467@cornell.edu': Role.FULL,
    'cjh353@cornell.edu': Role.FULL,
    'cl2674@cornell.edu': Role.FULL,
    'ey272@cornell.edu': Role.FULL
}

export const isAdmin = (email: string): boolean => {
    // Double negation to convert `undefined` to `false`
    return !!ADMIN_ROLES[email];
};

export const getUserRole = (email: string): Role | null => {
    return ADMIN_ROLES[email] || null;
};

export const canViewSensitiveData = (email: string): boolean => {
    const role = getUserRole(email);
    return hasPermission(role, Permission.VIEW_SENSITIVE_DATA);
};