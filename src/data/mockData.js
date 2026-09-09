// Mock Data for Banteay Digital Admin Console

export const initialStats = {
  totalScans: '12,482',
  totalReports: '1,284',
  pendingReports: 42,
  approvedReports: 891
};

export const scanActivityData = {
  week: [
    { label: 'Mon', value: 1320 },
    { label: 'Tue', value: 1590 },
    { label: 'Wed', value: 1410 },
    { label: 'Thu', value: 1980 },
    { label: 'Fri', value: 2210 },
    { label: 'Sat', value: 1720 },
    { label: 'Sun', value: 1480 }
  ],
  month: [
    { label: 'Week 1', value: 2450 },
    { label: 'Week 2', value: 2890 },
    { label: 'Week 3', value: 3120 },
    { label: 'Week 4', value: 2680 },
    { label: 'Week 5', value: 1342 }
  ],
  year: [
    { label: 'Jan', value: 8200 },
    { label: 'Feb', value: 9400 },
    { label: 'Mar', value: 11200 },
    { label: 'Apr', value: 10500 },
    { label: 'May', value: 12100 },
    { label: 'Jun', value: 13800 },
    { label: 'Jul', value: 12400 },
    { label: 'Aug', value: 14100 },
    { label: 'Sep', value: 12800 },
    { label: 'Oct', value: 13500 },
    { label: 'Nov', value: 11900 },
    { label: 'Dec', value: 12500 }
  ]
};

export const reportDistributionData = [
  { id: 'pending', name: 'Pending', count: 42, color: '#f59e0b', percent: '3.3%' },
  { id: 'approved', name: 'Approved', count: 391, color: '#10b981', percent: '30.5%' },
  { id: 'rejected', name: 'Rejected', count: 163, color: '#ef4444', percent: '12.7%' },
  { id: 'published', name: 'Published', count: 688, color: '#4b9efe', percent: '53.5%' }
];

export const initialPendingReports = [
  {
    id: 'RPT-2024-0142',
    title: 'Fake Telegram investment group promising 3% daily returns',
    submitter: {
      name: 'Dara Pich',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      time: '1h ago',
      timestamp: 'Sep 7, 2026, 14:15',
      location: 'Phnom Penh'
    },
    description: 'A Telegram group called "Cambodia Crypto VIP" is soliciting deposits starting at $50, promising guaranteed daily returns. After I deposited $200, I was asked to pay a "withdrawal fee" of $80 to access my profits. The admin blocked me when I refused.',
    evidenceImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    aiResult: 'High Risk',
    riskLevel: 'critical',
    confidence: 96,
    category: 'Investment Fraud',
    severity: 'Critical',
    status: 'Pending'
  },
  {
    id: 'RPT-2024-0141',
    title: 'Fake Facebook marketplace seller — iPhone 15 Pro never delivered',
    submitter: {
      name: 'Sopheak Nget',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '3h ago',
      timestamp: 'Sep 7, 2026, 12:30',
      location: 'Siem Reap'
    },
    description: 'Found a listing on Facebook Marketplace for an iPhone 15 Pro at $350 (retail $1,199). Seller insisted on ABA transfer only, no COD. After payment, the seller deleted the listing and stopped responding. Phone number: 012 456 789.',
    evidenceImage: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80',
    aiResult: 'High Risk',
    riskLevel: 'high',
    confidence: 92,
    category: 'Online Shopping Scam',
    severity: 'High',
    status: 'Pending'
  },
  {
    id: 'RPT-2024-0140',
    title: 'Phishing SMS claiming ABA Bank account suspended',
    submitter: {
      name: 'Vannak Chea',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      time: '5h ago',
      timestamp: 'Sep 7, 2026, 10:15',
      location: 'Battambang'
    },
    description: 'Received an SMS from sender "ABA-Alert" with text "Your account is temporarily locked due to unusual activity. Verify immediately at hxxp://aba-security-kh.net/verify". The website cloned the official ABA mobile login interface.',
    evidenceImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    aiResult: 'Critical',
    riskLevel: 'critical',
    confidence: 98,
    category: 'Phishing SMS/Email',
    severity: 'Critical',
    status: 'Pending'
  },
  {
    id: 'RPT-2024-0139',
    title: 'Fake TikTok recruitment agency charging upfront training fee',
    submitter: {
      name: 'Sreyneang Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      time: '8h ago',
      timestamp: 'Sep 7, 2026, 07:20',
      location: 'Kandal'
    },
    description: 'TikTok advertisement promising remote data entry job paying $600/month. Recruiter required an initial $35 "security deposit and training module purchase" sent to a Wing account. Contact ceased after sending funds.',
    evidenceImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    aiResult: 'Medium Risk',
    riskLevel: 'medium',
    confidence: 87,
    category: 'Fake Recruitment',
    severity: 'Medium',
    status: 'Pending'
  },
  {
    id: 'RPT-2024-0138',
    title: 'Impersonation of ACLEDA Bank customer support on Telegram',
    submitter: {
      name: 'Bona Seng',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      time: '12h ago',
      timestamp: 'Sep 6, 2026, 23:45',
      location: 'Phnom Penh'
    },
    description: 'An account impersonating official ACLEDA support reached out offering to resolve loan issues. Asked for full 16-digit card number and OTP passcode sent to phone.',
    evidenceImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&auto=format&fit=crop&q=80',
    aiResult: 'Critical',
    riskLevel: 'critical',
    confidence: 95,
    category: 'Impersonation',
    severity: 'Critical',
    status: 'Pending'
  },
  {
    id: 'RPT-2024-0137',
    title: 'Lottery win notification asking for customs clearance fee',
    submitter: {
      name: 'Chan Mony',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      time: '1d ago',
      timestamp: 'Sep 6, 2026, 15:30',
      location: 'Kampong Cham'
    },
    description: 'WhatsApp message claiming I won $10,000 in an international lucky draw, but needed to wire $150 via Western Union for DHL delivery customs clearance.',
    evidenceImage: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&auto=format&fit=crop&q=80',
    aiResult: 'High Risk',
    riskLevel: 'high',
    confidence: 94,
    category: 'Lottery/Prize Scam',
    severity: 'High',
    status: 'Pending'
  }
];

export const initialManagedReports = [
  {
    id: 'RPT-2024-0134',
    title: 'Fake online store "TechDeal Cambodia" — never delivered $450 order',
    author: 'Banteay Digital',
    publishedDate: 'Published Sep 5, 2024',
    timestamp: 'Sep 5, 2024, 11:20 AM',
    description: 'Ordered a Samsung Galaxy S24 from techdealcambodia.com for $450 (market price $899). Paid via ABA transfer. Two weeks passed with no delivery. The site then went offline. Customer service number is disconnected. Found 12 other victims on Facebook groups with the same experience.',
    evidenceImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
    category: 'Online Shopping Scam',
    severity: 'High',
    status: 'Published',
    location: 'Phnom Penh'
  },
  {
    id: 'RPT-2024-0133',
    title: 'Crypto Ponzi scheme "Khmer Wealth Fund" — $50K+ in losses',
    author: 'Banteay Digital',
    publishedDate: 'Published Sep 4, 2024',
    timestamp: 'Sep 4, 2024, 04:15 PM',
    description: 'A WhatsApp group called "Khmer Wealth Fund" operated a crypto investment scheme promising 5% weekly returns. Members deposited USDT into a wallet address. Early investors were paid from new deposits. After 3 months, the admins vanished with an estimated $50,000+ from 80+ victims. Wallet address: TN3x...k9Qv.',
    evidenceImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
    category: 'Investment Fraud',
    severity: 'Critical',
    status: 'Published',
    location: 'Phnom Penh'
  },
  {
    id: 'RPT-2024-0132',
    title: 'Phishing email spoofing Ministry of Interior fine notice',
    author: 'Banteay Digital',
    publishedDate: 'Approved Sep 6, 2024',
    timestamp: 'Sep 6, 2024, 09:30 PM',
    description: 'Bulk emails sent to civil servants claiming an unpaid traffic infraction with an attached ZIP file containing malware. Official domains were spoofed with a zero instead of an "o" in the domain name.',
    evidenceImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80',
    category: 'Phishing SMS/Email',
    severity: 'Critical',
    status: 'Approved',
    location: 'Phnom Penh'
  },
  {
    id: 'RPT-2024-0131',
    title: 'Fake NGO donation drive soliciting money for flood relief',
    author: 'Banteay Digital',
    publishedDate: 'Approved Sep 7, 2024',
    timestamp: 'Sep 7, 2024, 12:20 AM',
    description: 'Fraudulent Facebook page using stolen photos of genuine Red Cross volunteers, displaying private Wing/Bakong QR codes to collect humanitarian donations directly into scammer accounts.',
    evidenceImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    category: 'Charity Fraud',
    severity: 'High',
    status: 'Approved',
    location: 'Banteay Meanchey'
  }
];

export const initialUsers = [
  {
    id: 'USR-001',
    name: 'Rotha Kim',
    email: 'rotha.kim@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    reports: 15,
    published: 11,
    joined: 'Jan 8, 2024',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Dara Pich',
    email: 'dara.pich@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    reports: 12,
    published: 8,
    joined: 'Jan 15, 2024',
    status: 'Active'
  },
  {
    id: 'USR-003',
    name: 'Sokha Chen',
    email: 'sokha.chen@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    reports: 11,
    published: 9,
    joined: 'Jan 3, 2024',
    status: 'Active'
  },
  {
    id: 'USR-004',
    name: 'Sreyleak Hour',
    email: 'sreyleak.h@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    reports: 9,
    published: 6,
    joined: 'Feb 11, 2024',
    status: 'Active'
  },
  {
    id: 'USR-005',
    name: 'Sreypov Tan',
    email: 'sreypov.tan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    reports: 8,
    published: 5,
    joined: 'Jan 19, 2024',
    status: 'Active'
  },
  {
    id: 'USR-006',
    name: 'Vannak Chea',
    email: 'vannak.chea@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    reports: 7,
    published: 4,
    joined: 'Jul 18, 2026',
    status: 'Active'
  },
  {
    id: 'USR-007',
    name: 'Chan Mony',
    email: 'chan.mony@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    reports: 3,
    published: 1,
    joined: 'Aug 27, 2026',
    status: 'Active'
  },
  {
    id: 'USR-008',
    name: 'Kim Sreyneang',
    email: 'sreyneang.k@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    reports: 0,
    published: 0,
    joined: 'Sep 02, 2026',
    status: 'Active'
  },
  {
    id: 'USR-009',
    name: 'Menglong Vong',
    email: 'menglong.v@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    reports: 5,
    published: 2,
    joined: 'Jun 12, 2026',
    status: 'Suspended'
  },
  {
    id: 'USR-010',
    name: 'Piseth Ouk',
    email: 'piseth.ouk@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    reports: 1,
    published: 0,
    joined: 'Sep 05, 2026',
    status: 'Pending'
  }
];

export const userStats = {
  totalUsers: '8,421',
  submittedReports: '1,283',
  publishedReports: '472'
};

export const initialAuditLogs = [
  {
    id: 'LOG-108',
    admin: 'Sokha Admin',
    role: 'Administrator',
    action: 'Published',
    reference: 'RPT-2024-0133',
    timeAgo: 'Just now',
    timestamp: 'Sep 7, 2024, 4:15 PM',
    description: 'Published report "Crypto Ponzi scheme — Khmer Wealth Fund" to public feed'
  },
  {
    id: 'LOG-107',
    admin: 'Sokha Admin',
    role: 'Administrator',
    action: 'Edited',
    reference: 'RPT-2024-0130',
    timeAgo: '1h ago',
    timestamp: 'Sep 7, 2024, 3:42 PM',
    description: 'Updated description and severity for counterfeit cosmetics report'
  },
  {
    id: 'LOG-106',
    admin: 'Dara Mod',
    role: 'Moderator',
    action: 'Approved',
    reference: 'RPT-2024-0131',
    timeAgo: '16h ago',
    timestamp: 'Sep 7, 2024, 12:20 AM',
    description: 'Approved fake NGO donation drive report after evidence verification'
  },
  {
    id: 'LOG-105',
    admin: 'Sokha Admin',
    role: 'Administrator',
    action: 'Rejected',
    reference: 'RPT-2024-0128',
    timeAgo: '18h ago',
    timestamp: 'Sep 6, 2024, 10:05 PM',
    description: 'Rejected report due to insufficient evidence and duplicate submission'
  },
  {
    id: 'LOG-104',
    admin: 'Dara Mod',
    role: 'Moderator',
    action: 'Published',
    reference: 'RPT-2024-0132',
    timeAgo: '19h ago',
    timestamp: 'Sep 6, 2024, 9:30 PM',
    description: 'Published ACLEDA phishing email report to public feed'
  },
  {
    id: 'LOG-103',
    admin: 'Sokha Admin',
    role: 'Administrator',
    action: 'Approved',
    reference: 'RPT-2024-0129',
    timeAgo: '22h ago',
    timestamp: 'Sep 6, 2024, 6:12 PM',
    description: 'Approved Telegram forex trading group scam report'
  },
  {
    id: 'LOG-102',
    admin: 'Sokha Admin',
    role: 'Administrator',
    action: 'Approved',
    reference: 'RPT-2024-0102',
    timeAgo: '1d ago',
    timestamp: 'Sep 6, 2024, 2:42 PM',
    description: 'Approved fake bank login website report'
  },
  {
    id: 'LOG-101',
    admin: 'Dara Mod',
    role: 'Moderator',
    action: 'Edited',
    reference: 'RPT-2024-0098',
    timeAgo: '2d ago',
    timestamp: 'Sep 5, 2024, 1:18 PM',
    description: 'Updated title and scam category classification'
  }
];

export const currentAdmin = {
  name: 'Sokha Admin',
  role: 'Administrator',
  email: 'sokha.admin@banteay.digital',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
};
