export const admins = new Set([
    'cornell.perfectmatch@gmail.com',
    'perfectmatch@cornell.edu',
    'ps2245@cornell.edu',
    'gvw8@cornell.edu',
    'te89@cornell.edu',
    'yj472@cornell.edu',
    'njv27@cornell.edu',
    'dc863@cornell.edu',
    'vg245@cornell.edu',
    'vm344@cornell.edu',
    'sls537@cornell.edu',
    'kh635@cornell.edu',
]);

export const isAdmin = (email: string) => admins.has(email);
