Build the **frontend Admin Console for Banteay Digital**, a digital scam-detection and community reporting platform.

This Admin application is separate from the public/user-facing application.

For now, focus only on the **frontend UI and interactions using mock data**. Do not implement real backend/API integration unless explicitly needed for basic structure.

The Admin Console should look like an active application, so use realistic fictional data instead of empty states or zero values.

## Tech Direction

Use:
- React
- Vite
- JavaScript
- Tailwind CSS

Organize the code into reusable components and page-level components.

Keep the architecture simple and maintainable. Do not over-engineer it.

---

# Application Structure

The Admin frontend contains:

- Admin Login
- Dashboard
- Report Review
- Report Management
- Users
- Audit Log

There is no Admin Signup page.

Admin accounts will be handled separately and should not be publicly registered from this frontend.

---

# Routing

Use routes similar to:

```text
/admin/login
/admin/dashboard
/admin/reports/review
/admin/reports/manage
/admin/users
/admin/audit-log
```

Protect the Admin Console routes with a simple frontend authentication/authorization structure suitable for mock development.

For now, it is acceptable to use mock authentication state.

Do not treat frontend route protection as actual security; structure the code so real backend authentication can be integrated later.

---

# Layout

Create a reusable `AdminLayout` containing:

- Fixed left Sidebar
- Floating top Navbar in the main-content area
- Main page content

The Sidebar should remain visible across the four primary Admin pages.

The Audit Log page is still inside the Admin layout but is accessed from the Navbar rather than the Sidebar.

---

# Sidebar

Create a reusable Sidebar component.

At the top:
- Banteay Digital logo placeholder/icon
- Brand name: `Banteay Digital`

Below the branding, show exactly four navigation items:

- Dashboard
- Report Review
- Report Management
- Users

The current page should be visually highlighted.

At the bottom:
- Admin name, such as `Sokha Admin`

The sidebar should not be collapsible.

---

# Navbar

Create a reusable floating Navbar aligned inside the main-content area, not across the Sidebar.

Include:

- Light/Dark mode toggle
- Language switch between English and Khmer
- Audit Log button
- Admin dropdown

The Admin dropdown should contain:
- Logout

Do not add Profile or Settings pages.

The dark/light mode toggle should visibly switch the interface theme.

The language switch can use mock labels only for now; full translation logic is not required unless simple to implement.

---

# Admin Login Page

Create a separate Admin Login page.

Include:

- Banteay Digital branding
- `Admin Login` heading
- Email input
- Password input with show and hide password button
- Login button
- Optional `Forgot Password?` visual link

Do not create a Signup/Register page.

For mock behavior:
- Valid-looking credentials may redirect to `/admin/dashboard`
- Store mock authentication state in a simple reusable way

Keep the login page clean and professional.

---

# Dashboard Page

Create four statistic cards at the top.

Use mock values such as:

- Total Scans: `12,482`
- Total Reports: `1,284`
- Pending Reports: `42`
- Approved Reports: `891`

Do not show percentage change indicators.

Below the statistic cards, create two chart cards side-by-side on desktop.

## Scan Activity

Use a line chart.

Title:
`Scan Activity`

Add a dropdown with:

- Week
- Month
- Year

Behavior:

### Week
Show 7 points:
- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

### Month
Show weekly data:
- Week 1
- Week 2
- Week 3
- Week 4
- Week 5 if needed

### Year
Show:
- Jan
- Feb
- Mar
- Apr
- May
- Jun
- Jul
- Aug
- Sep
- Oct
- Nov
- Dec

Use realistic mock values with natural fluctuations.

Changing the dropdown should update the mock chart data.

## Report Distribution

Use a donut chart.

Title:
`Report Distribution`

Use the current report status categories:

- Pending
- Approved
- Rejected
- Published

Use mock values that total `1,284`.

Example:

- Pending: 42
- Approved: 391
- Rejected: 163
- Published: 688

These statuses should be treated as mutually exclusive current states.

---

# Report Review Page

Purpose:
Allow admins to review pending reports and approve or reject them.

Create:

- Page title
- Pending report count
- Search bar
- Report-type filter
- Sorting dropdown

Display several pending reports using reusable `ReportReviewCard` components.

Each report should include:

- Report ID
- Report title
- Submitted by
- Submission date/time
- Short description
- Evidence/image placeholder
- AI result
- Confidence indicator
- Category
- Status badge

Actions:

- View Details
- Reject
- Approve

Use realistic fictional reports.

Example report topics:

- Fake bank login website
- Suspicious Telegram investment message
- Fake online shop promotion
- Phishing SMS link
- Fake recruitment offer

## View Details

Clicking `View Details` should open a modal or side panel with expanded report information.

Do not create a separate page for report details unless necessary.

## Approve / Reject

For the mock frontend:

- Approve should update the report's mock status
- Reject should update the report's mock status
- The UI should reflect the change immediately

No real API request is required.

---

# Report Management Page

Purpose:
Manage approved reports and prepare them for publication.

Display reports as cards inspired by **Facebook-style community posts**, while keeping the overall interface professional.

Create a reusable `ManagedReportCard`.

Each report card should include:

- Header
- Report title
- Optional evidence/image
- Description
- Scam category
- Severity
- Current status
- Relevant metadata
- Edit button at the top-right

Use realistic mock reports.

Possible statuses:
- Approved
- Unpublished
- Published

`Approved` reports have never been published. `Unpublished` reports retain their community-post record but are hidden from public community views.

Card actions:

- Show either Publish or Unpublish according to the current publication state.
- Keep Edit visible in the card action row.
- Place permanent Delete in an overflow menu and require confirmation.
- Unpublishing removes the post's likes and comments while keeping the approved report available to administrators.
- Deleting permanently removes the approved report and its linked community content.

## Edit Report

Clicking Edit should open an `EditReportModal`.

Editable fields can include:

- Title
- Description
- Category
- Severity
- Status if appropriate

Buttons:

- Cancel
- Save Changes

When Save Changes is clicked, update the local mock data so the edited content is immediately reflected in the report card.

No version history is required.

---

# Users Page

Keep this page simple.

At the top, show three statistic cards:

- Total Users: `8,421`
- Users Who Submitted Reports: `1,283`
- Users With Published Reports: `472`

Below them, create a table.

Columns:

- User
- Reports
- Published
- Joined
- Status

Use realistic fictional users.

Example rows:

```text
Sok Dara       12 reports    8 published    Aug 21, 2026    Active
Chan Mony      3 reports     1 published    Aug 27, 2026    Active
Kim Sreyneang  0 reports     0 published    Sep 02, 2026    Active
Vannak Chea    7 reports     4 published    Jul 18, 2026    Active
```

Include:

- Search
- Basic sorting/filtering if simple

Do not implement:

- User profile page
- User detail page
- User activity page
- Complex user-management functionality

---

# Audit Log Page

The Audit Log is a full page but should not appear in the Sidebar.

Access it through the Navbar.

Include:

- Page title
- Search
- Admin filter
- Action filter
- Date filter

Display chronological activity entries.

Each entry should contain:

- Admin name
- Action
- Related report/reference
- Timestamp
- Optional short description

Use realistic fictional events such as:

```text
Sokha Admin approved Report #102
September 7, 2026 · 14:42

Dara Admin edited Report #98
Updated title and description
September 7, 2026 · 13:18

Sokha Admin rejected Report #91
Reason: Insufficient evidence
September 7, 2026 · 11:52

Mony Admin published Report #87
September 6, 2026 · 18:14
```

---

# Reusable Components

Prefer reusable components such as:

```text
AdminLayout
Sidebar
Navbar
StatCard
ScanActivityChart
ReportDistributionChart
ReportReviewCard
ReportReviewModal
ManagedReportCard
EditReportModal
UserTable
AuditLogTable or AuditLogList
StatusBadge
SearchInput
FilterDropdown
```

Do not put everything into one large component.

---

# Suggested Folder Structure

Use a clean structure similar to:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   ├── dashboard/
│   ├── reports/
│   ├── users/
│   └── common/
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── ReportReview.jsx
│   ├── ReportManagement.jsx
│   ├── Users.jsx
│   └── AuditLog.jsx
│
├── layouts/
│   └── AdminLayout.jsx
│
├── data/
│   └── mockData.js
│
├── routes/
│
└── App.jsx
```

This is only a guideline. Adjust the structure if a cleaner implementation makes more sense.

---

# Mock Data

Keep mock data separate from page components where possible.

Create realistic data for:

- Dashboard statistics
- Scan activity
- Report distribution
- Pending reports
- Managed reports
- Users
- Audit logs

The interface should look populated and active.

Do not use placeholders like:

```text
User 1
Report 1
Lorem ipsum
```

Prefer realistic fictional names, report titles, descriptions, dates, and numbers.

---

# Responsive Behavior

The primary target is desktop because this is an Admin Console.

Still provide reasonable responsive behavior:

- Statistic cards can wrap on smaller widths
- Dashboard charts stack vertically on smaller screens
- Tables should remain usable with horizontal scrolling if necessary
- Modals should fit smaller screens
- Sidebar may remain fixed for desktop

Do not spend excessive effort designing a mobile-first Admin Console.

---

# Visual Style

Design direction:

- Modern
- Professional
- Trustworthy
- Clean
- Minimal without feeling empty
- Suitable for a digital safety platform

Theme: 
- The color scheme should be based on the logo.
Primary Color: #012475, #fbfbfb, #4b9efe  
Secondary Color: You choose as long as it fits  

Use:

- Rounded cards
- Subtle shadows
- Clear typography
- Consistent spacing
- Status badges
- Clean tables
- Modern form controls
- Good hover/focus states
- Smooth but subtle transitions
- Dropdown menu items have rounded border and the items as a whole is margin by 5px to the bottom of the dropdown button 

Support both light mode and dark mode.

Avoid:
- Excessive animations
- Excessive gradients
- Neon/cyberpunk styling
- Overly colorful dashboards
- Dense enterprise-style interfaces
- Unnecessary pages or features

---

# Scope Restrictions

Do not add:

- Admin Signup
- Profile page
- Settings page
- User detail page
- Complex permissions management
- Notification system
- Backend implementation
- Database integration
- AI API integration
- Real authentication API
- Extra pages not requested

The goal is to create a polished, functional **frontend mock Admin Console** that can later be connected to the real Banteay Digital backend.

Prioritize working UI, reusable components, clean code, and realistic mock interactions over unnecessary complexity.
