export const admins = new Set([
    'cornell.perfectmatch@gmail.com',
    'perfectmatch@cornell.edu',
    'ps2245@cornell.edu',
    'yj472@cornell.edu',
    'njv27@cornell.edu',
    'dc863@cornell.edu',
    'vg245@cornell.edu',
    'sls537@cornell.edu',
    'kh635@cornell.edu',
    'hz642@cornell.edu',
    'dl2253@cornell.edu',
    'js3696@cornell.edu',
    'az468@cornell.edu',
    'cz467@cornell.edu',
    'cjh353@cornell.edu',
    'cl2674@cornell.edu',
    'ey272@cornell.edu',
]);

export const isAdmin = (email: string) => admins.has(email);
