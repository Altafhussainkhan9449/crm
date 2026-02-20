// ============================================================
// SmartCRM Pro - Mock Data
// All data is fictional and used for demonstration purposes
// ============================================================

export const LEAD_SOURCES = ['Facebook', 'Mobile App', 'Website', 'Other'];
export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted'];
export const DEAL_STAGES = ['New', 'Negotiation', 'Won', 'Lost'];

// --- Leads ---
export const initialLeads = [
    {
        id: 'l1',
        name: 'Alice Johnson',
        email: 'alice.johnson@techcorp.com',
        phone: '+1 (555) 201-4891',
        company: 'TechCorp Inc.',
        source: 'Facebook',
        status: 'Qualified',
        date: '2026-01-15',
    },
    {
        id: 'l2',
        name: 'Brian Martinez',
        email: 'brian.m@finova.io',
        phone: '+1 (555) 348-2210',
        company: 'Finova Solutions',
        source: 'Website',
        status: 'Contacted',
        date: '2026-01-18',
    },
    {
        id: 'l3',
        name: 'Carol Smith',
        email: 'carol.smith@nexgen.co',
        phone: '+1 (555) 489-6634',
        company: 'NexGen Labs',
        source: 'Mobile App',
        status: 'New',
        date: '2026-01-22',
    },
    {
        id: 'l4',
        name: 'David Lee',
        email: 'david.lee@brightwave.com',
        phone: '+1 (555) 573-9901',
        company: 'BrightWave Media',
        source: 'Facebook',
        status: 'Converted',
        date: '2026-01-25',
    },
    {
        id: 'l5',
        name: 'Emma Chen',
        email: 'emma.c@skybridge.net',
        phone: '+1 (555) 612-4456',
        company: 'SkyBridge Analytics',
        source: 'Website',
        status: 'Qualified',
        date: '2026-02-01',
    },
    {
        id: 'l6',
        name: 'Frank Ortega',
        email: 'frank.o@zephyr.co',
        phone: '+1 (555) 724-8812',
        company: 'Zephyr Digital',
        source: 'Mobile App',
        status: 'New',
        date: '2026-02-03',
    },
    {
        id: 'l7',
        name: 'Grace Kim',
        email: 'grace.kim@luminos.ai',
        phone: '+1 (555) 835-3390',
        company: 'Luminos AI',
        source: 'Other',
        status: 'Contacted',
        date: '2026-02-06',
    },
    {
        id: 'l8',
        name: 'Henry Davis',
        email: 'h.davis@pivotal.org',
        phone: '+1 (555) 946-7721',
        company: 'Pivotal Corp',
        source: 'Facebook',
        status: 'Qualified',
        date: '2026-02-08',
    },
    {
        id: 'l9',
        name: 'Isabella Torres',
        email: 'i.torres@apexfinance.com',
        phone: '+1 (555) 157-5523',
        company: 'Apex Finance Group',
        source: 'Website',
        status: 'Converted',
        date: '2026-02-10',
    },
    {
        id: 'l10',
        name: 'James Wilson',
        email: 'j.Wilson@crimsonstudio.io',
        phone: '+1 (555) 268-9934',
        company: 'Crimson Studio',
        source: 'Mobile App',
        status: 'New',
        date: '2026-02-12',
    },
    {
        id: 'l11',
        name: 'Karen Thompson',
        email: 'k.thompson@glassware.tech',
        phone: '+1 (555) 379-4416',
        company: 'Glassware Tech',
        source: 'Other',
        status: 'Contacted',
        date: '2026-02-14',
    },
    {
        id: 'l12',
        name: 'Liam Anderson',
        email: 'liam.a@vortexsystems.io',
        phone: '+1 (555) 480-8807',
        company: 'Vortex Systems',
        source: 'Facebook',
        status: 'Qualified',
        date: '2026-02-16',
    },
];

// --- Deals ---
export const initialDeals = [
    { id: 'd1', title: 'TechCorp License Deal', company: 'TechCorp Inc.', contact: 'Alice Johnson', value: 24500, stage: 'Won' },
    { id: 'd2', title: 'Finova Analytics Package', company: 'Finova Solutions', contact: 'Brian Martinez', value: 18000, stage: 'Negotiation' },
    { id: 'd3', title: 'NexGen Platform Subscription', company: 'NexGen Labs', contact: 'Carol Smith', value: 9800, stage: 'New' },
    { id: 'd4', title: 'BrightWave CRM Bundle', company: 'BrightWave Media', contact: 'David Lee', value: 32000, stage: 'Won' },
    { id: 'd5', title: 'SkyBridge Data Plan', company: 'SkyBridge Analytics', contact: 'Emma Chen', value: 15500, stage: 'Negotiation' },
    { id: 'd6', title: 'Zephyr Starter License', company: 'Zephyr Digital', contact: 'Frank Ortega', value: 7200, stage: 'New' },
    { id: 'd7', title: 'Luminos AI Integration', company: 'Luminos AI', contact: 'Grace Kim', value: 45000, stage: 'Negotiation' },
    { id: 'd8', title: 'Pivotal Enterprise Suite', company: 'Pivotal Corp', contact: 'Henry Davis', value: 61000, stage: 'Lost' },
    { id: 'd9', title: 'Apex Premium Support', company: 'Apex Finance Group', contact: 'Isabella Torres', value: 12000, stage: 'Won' },
    { id: 'd10', title: 'Vortex Systems Rollout', company: 'Vortex Systems', contact: 'Liam Anderson', value: 28000, stage: 'New' },
];

// --- Contacts ---
export const initialContacts = [
    { id: 'c1', name: 'Alice Johnson', email: 'alice.johnson@techcorp.com', phone: '+1 (555) 201-4891', company: 'TechCorp Inc.', role: 'CTO' },
    { id: 'c2', name: 'Brian Martinez', email: 'brian.m@finova.io', phone: '+1 (555) 348-2210', company: 'Finova Solutions', role: 'VP Sales' },
    { id: 'c3', name: 'Carol Smith', email: 'carol.smith@nexgen.co', phone: '+1 (555) 489-6634', company: 'NexGen Labs', role: 'CEO' },
    { id: 'c4', name: 'David Lee', email: 'david.lee@brightwave.com', phone: '+1 (555) 573-9901', company: 'BrightWave Media', role: 'Product Manager' },
    { id: 'c5', name: 'Emma Chen', email: 'emma.c@skybridge.net', phone: '+1 (555) 612-4456', company: 'SkyBridge Analytics', role: 'Data Analyst' },
    { id: 'c6', name: 'Frank Ortega', email: 'frank.o@zephyr.co', phone: '+1 (555) 724-8812', company: 'Zephyr Digital', role: 'Marketing Head' },
    { id: 'c7', name: 'Grace Kim', email: 'grace.kim@luminos.ai', phone: '+1 (555) 835-3390', company: 'Luminos AI', role: 'Founder' },
    { id: 'c8', name: 'Henry Davis', email: 'h.davis@pivotal.org', phone: '+1 (555) 946-7721', company: 'Pivotal Corp', role: 'Director' },
    { id: 'c9', name: 'Isabella Torres', email: 'i.torres@apexfinance.com', phone: '+1 (555) 157-5523', company: 'Apex Finance Group', role: 'CFO' },
    { id: 'c10', name: 'James Wilson', email: 'j.Wilson@crimsonstudio.io', phone: '+1 (555) 268-9934', company: 'Crimson Studio', role: 'Creative Director' },
    { id: 'c11', name: 'Karen Thompson', email: 'k.thompson@glassware.tech', phone: '+1 (555) 379-4416', company: 'Glassware Tech', role: 'COO' },
    { id: 'c12', name: 'Liam Anderson', email: 'liam.a@vortexsystems.io', phone: '+1 (555) 480-8807', company: 'Vortex Systems', role: 'CTO' },
    { id: 'c13', name: 'Maria Gonzalez', email: 'm.gonzalez@crystalai.com', phone: '+1 (555) 591-2238', company: 'Crystal AI', role: 'Head of Ops' },
    { id: 'c14', name: 'Nathan Brooks', email: 'n.brooks@titanedge.io', phone: '+1 (555) 602-7729', company: 'TitanEdge', role: 'Sales Lead' },
    { id: 'c15', name: 'Olivia Park', email: 'o.park@neonpath.co', phone: '+1 (555) 713-6651', company: 'NeonPath', role: 'Account Executive' },
];

// --- Recent Activity (Dashboard) ---
export const recentActivity = [
    { id: 'a1', action: 'New lead added', subject: 'Liam Anderson', source: 'Facebook', time: '2 min ago' },
    { id: 'a2', action: 'Deal moved to Won', subject: 'TechCorp License Deal', source: '—', time: '18 min ago' },
    { id: 'a3', action: 'Lead status updated', subject: 'Emma Chen → Qualified', source: 'Website', time: '45 min ago' },
    { id: 'a4', action: 'New contact created', subject: 'Olivia Park', source: '—', time: '1 hr ago' },
    { id: 'a5', action: 'Deal lost', subject: 'Pivotal Enterprise Suite', source: '—', time: '2 hr ago' },
    { id: 'a6', action: 'Lead converted', subject: 'Isabella Torres', source: 'Website', time: '3 hr ago' },
    { id: 'a7', action: 'New deal created', subject: 'Vortex Systems Rollout', source: '—', time: '5 hr ago' },
    { id: 'a8', action: 'Lead contacted', subject: 'Grace Kim', source: 'Other', time: '8 hr ago' },
];

// --- Monthly Revenue (Dashboard Bar Chart) ---
export const monthlyRevenue = [
    { month: 'Sep', revenue: 38000 },
    { month: 'Oct', revenue: 52000 },
    { month: 'Nov', revenue: 47000 },
    { month: 'Dec', revenue: 61000 },
    { month: 'Jan', revenue: 55000 },
    { month: 'Feb', revenue: 73500 },
];

// --- Leads by source (Dashboard Pie Chart) ---
export const leadsBySource = [
    { name: 'Facebook', value: 4, color: '#3b82f6' },
    { name: 'Mobile App', value: 3, color: '#8b5cf6' },
    { name: 'Website', value: 3, color: '#10b981' },
    { name: 'Other', value: 2, color: '#f59e0b' },
];
