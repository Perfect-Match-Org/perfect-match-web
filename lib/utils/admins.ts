export const admins = new Set([
    'cornell.perfectmatch@gmail.com',
    'ps2245@cornell.edu',
    'cyy6@cornell.edu',
    'gvw8@cornell.edu',
    'jak496@cornell.edu',
    'te89@cornell.edu',
    'yj472@cornell.edu',
    'njv27@cornell.edu',
]);

export const isAdmin = (email: string) => admins.has(email);
