# Shibabet – Project Log

## Phase 1 – Project foundations

- **Date**: (fill in when you complete Phase 1)
- **Summary**:
	- Initialized a Next.js App Router project with TypeScript and Tailwind.
	- Integrated Shadcn UI primitives for consistent, modern components.
	- Applied Shibabet dark sportsbook theme with Orbitron headings and
		Montserrat body text.
- **Design choices**:
	- Chose Next.js App Router + TypeScript for a scalable, full-stack
		experience with good DX.
	- Used Tailwind CSS + Shadcn UI to move quickly while keeping a consistent,
		accessible design system.
	- Defined a dark theme centered on `#111827` with mint/orange/teal/red
		accents to match the sportsbook branding.
- **Trade-offs**:
	- Kept state management simple for now (no Redux or external stores) to
		avoid early complexity.
	- Deferred Firebase, security rules, and backend logic to later phases to
		keep foundations focused on UI and structure.
- **Open questions / next steps**:
	- Confirm if additional typography or branding assets (logo, icon set) are
		required.
	- Decide whether to introduce a more advanced layout system (e.g. sidebar
		shell) once dashboard and leaderboard requirements are implemented.

## Phase 2 – Firebase & data model setup

- **Date**: 2025-01-16
- **Summary**:
	- Created Firebase project (`shibabet-11e01`) and enabled Email/Password
		authentication.
	- Set up Firestore database in production mode (Standard edition).
	- Registered web app and configured environment variables in `.env.local`.
	- Installed Firebase JS SDK and created `lib/firebase.ts` for singleton
		initialization of `auth` and `db`.
	- Defined TypeScript interfaces for `UserProfile`, `Referral`, and `EventLog`
		matching the spec in `Shibabet.txt`.
	- Created Firebase Functions project structure (`functions/` folder with
		TypeScript config).
	- Wrote initial Firestore security rules that:
		- Allow users to read their own full profile and limited public fields
			for others.
		- Prevent direct client writes to points fields and referral/event
			documents (enforced via Cloud Functions).
- **Design choices**:
	- Used Email/Password auth for MVP (simpler than magic links initially; can
		add Google OAuth and passwordless later).
	- Chose Firestore Standard edition (sufficient for MVP, can upgrade if
		needed).
	- Security rules enforce separation: clients can update profile fields but
		points/referrals are Cloud Functions-only to prevent manipulation.
	- TypeScript types mirror Firestore document structure but use native
		`Date` instead of `Timestamp` in interfaces for easier client-side usage.
- **Trade-offs**:
	- Deferred Google OAuth and magic link auth to Phase 3 to keep Phase 2
		focused on infrastructure.
	- Security rules are basic but functional; will tighten in Phase 6 after
		Cloud Functions are implemented.
	- Functions folder is scaffolded but empty; actual functions will be built
		in Phase 3 (signup/onboarding) and Phase 4 (referrals/points).
- **Open questions / next steps**:
	- Need to deploy Firestore rules to Firebase (run `firebase deploy --only
		firestore:rules` when ready).
	- Verify Firebase connection works end-to-end once auth flow is implemented
		in Phase 3.
	- Consider adding composite indexes for leaderboard queries if needed (e.g.,
		sorting by `pointsTotal`).

## Phase 3 – Auth & onboarding

- **Date**: 2025-01-16
- **Summary**:
	- Installed React Hook Form + Zod for form validation.
	- Created `AuthProvider` context that subscribes to Firebase Auth state and
		fetches user profiles from Firestore.
	- Implemented email/password signup and signin forms with validation.
	- Added Google OAuth sign-in button.
	- Built onboarding form for username and optional Telegram handle with
		comprehensive validation (username rules, reserved words, Telegram format).
	- Created Cloud Function `createUserProfile` that:
		- Creates user document in Firestore with profile data.
		- Generates unique 8-character referral code.
		- Awards +5 signup points.
		- Handles referral attribution if `referrerCode` is provided.
		- Awards referral points (+5 to referrer, +1 loop bonus to upline).
		- Logs signup and referral events.
	- Built dashboard page that shows onboarding form for new users and displays
		points/referral link for completed profiles.
	- Updated landing page with signup/signin forms and Google OAuth option.
- **Design choices**:
	- Used Email/Password auth (simpler than magic links for MVP; can add later).
	- React Hook Form + Zod provides type-safe validation with good UX.
	- Onboarding happens on first dashboard visit (redirects after auth).
	- Referral code stored in localStorage and passed to Cloud Function during
		onboarding.
	- Cloud Functions handle all points/referral logic server-side for security.
	- Username validation includes extensible reserved words list.
- **Trade-offs**:
	- Deferred magic link (passwordless) auth to keep MVP simple; Email/Password
		works for now.
	- Onboarding happens after auth (not during signup flow) for simpler UX.
	- Error handling uses basic alerts; will add toast notifications in Phase 6.
	- Loop bonus logic simplified (1-level only) per spec.
- **Open questions / next steps**:
	- Need to deploy Cloud Functions to Firebase (`firebase deploy --only
		functions`).
	- Consider adding email verification requirement later.
	- May want to add "forgot password" flow in future.
	- Dashboard needs referral history table (Phase 5).

## Phase 4 – Referrals & points

- **Date**: 2025-01-16
- **Summary**:
	- Implemented `/invite/[code]` page that resolves referrer from referral code
		and displays "You were invited by <username>" UI.
	- Added ability to remove/change referrer before signup.
	- Referral code is stored in localStorage and passed to Cloud Function during
		onboarding.
	- Enhanced dashboard with:
		- Copy-to-clipboard buttons for referral link and code.
		- Referral history table showing referred usernames and status
			(pending/confirmed).
	- Referral and points logic (already implemented in Phase 3 Cloud Function):
		- Awards +5 points to referrer when referred user completes signup.
		- Awards +1 loop bonus to referrer's referrer (1-level upline).
		- Creates referral documents with proper status tracking.
		- Logs referral_confirmed events.
- **Design choices**:
	- Referral code stored in localStorage (persists across page refreshes, cleared
		after successful signup).
	- Invite page uses same auth forms as landing page for consistency.
	- Referral history shows usernames (not emails) for privacy.
	- Status badges (confirmed/pending/invalid) provide clear visual feedback.
	- Copy buttons provide immediate feedback ("Copied!" state).
- **Trade-offs**:
	- Referral history requires multiple Firestore queries (one per referral) to get
		usernames; could be optimized with denormalization later.
	- Loop bonus is 1-level only (per spec); could be extended to multi-level in
		future.
	- No real-time updates for referral history (would need Firestore listeners).
- **Open questions / next steps**:
	- Consider adding Firestore index for `referrals` collection queries (if needed
		for performance).
	- May want to add "Share" buttons (social media) in Phase 5 or later.
	- Consider adding referral analytics (click tracking, conversion rates) in
		future.

## Phase 5 – Product pages (dashboard, leaderboard, about)

- **Date**: 2025-01-16
- **Summary**:
	- Created `getLeaderboard` Cloud Function that returns top 20 users, total user
		count, and current user's rank/data.
	- Built `/leaderboard` page with table UI showing top 20 users, highlighting
		current user's row, and displaying user's rank even if outside top 20.
	- Enhanced dashboard with rank display: "You're #X out of Y users" fetched from
		leaderboard function.
	- Created `/about` page with wiki-style layout:
		- Left-hand sticky navigation with scroll-to-section links.
		- Sections: Overview, How points work, Referrals & leaderboard, Future
			perks, FAQ.
		- Content derived from `Shibabet.txt` spec.
	- All pages use consistent Shadcn/Tailwind styling matching the dark sportsbook
		theme.
- **Design choices**:
	- Leaderboard uses Cloud Function for secure, efficient data fetching (avoids
		exposing all user data to clients).
	- Rank calculation counts users with more points (efficient with Firestore
		count queries).
	- About page uses scroll-spy navigation for better UX on long-form content.
	- Dashboard rank display loads asynchronously to avoid blocking main content.
- **Trade-offs**:
	- Leaderboard query requires Firestore composite index (status + pointsTotal);
		may need to create manually if auto-indexing doesn't work.
	- About page navigation is desktop-only (hidden on mobile); could add mobile
		menu in future.
	- Rank calculation uses count queries which are efficient but may have slight
		delays with large user bases.
- **Open questions / next steps**:
	- May need to create Firestore composite index for leaderboard query if
		Firebase prompts for it.
	- Consider adding pagination or "load more" for leaderboard if user base grows
		beyond 20.
	- Could add filtering/sorting options to leaderboard (by date, by referral
		count, etc.) in future.

## Phase 6 – Security, bot protection, error handling

- **Date**: 2025-01-16
- **Summary**:
	- Implemented global error boundary (`app/error.tsx`) with user-friendly error
		UI and "Try again" / "Go home" options.
	- Added toast notifications (react-hot-toast) to replace alert() calls for better
		UX across all auth flows (signup, signin, Google OAuth, onboarding).
	- Created Cloudflare Turnstile integration:
		- Reusable `Turnstile` component that loads and renders the widget.
		- Next.js API route (`/api/verify-turnstile`) to verify tokens server-side.
		- Integrated into email signup form (verification required before signup).
	- Refined Firestore security rules:
		- Limited list queries to `limit <= 1` for unauthenticated users (prevents
			bulk data access while allowing invite page queries).
		- Maintained strict write protections for points and referral/event
			collections.
	- Added error logging to Cloud Functions:
		- Functions now log errors to `events` collection with type `error`.
		- Error logging wrapped in try-catch to prevent logging failures from
			breaking functions.
	- Updated event types to include `error` type for backend failure tracking.
- **Design choices**:
	- Turnstile only required for signup (not signin) to reduce friction for
		returning users while protecting against bot signups.
	- Toast notifications provide non-blocking feedback (better UX than alerts).
	- Error boundary catches React errors gracefully without breaking the entire app.
	- Firestore rules balance security (prevent bulk access) with functionality
		(invite page needs unauthenticated queries).
	- Error logging in Functions helps with debugging production issues without
		exposing errors to clients.
- **Trade-offs**:
	- Turnstile adds a step to signup flow; acceptable trade-off for bot protection.
	- Turnstile only on signup (not signin) - could add to signin later if needed.
	- Error logging adds Firestore writes; minimal cost for MVP, can optimize later.
	- Firestore rules allow `limit <= 1` queries for unauthenticated users; still
		secure but slightly more permissive than ideal.
- **Open questions / next steps**:
	- Need to add Turnstile site key and secret key to `.env.local` (user needs to
		register with Cloudflare).
	- Consider adding Turnstile to signin flow if bot attacks become an issue.
	- May want to add rate limiting to API routes in future.
	- Consider adding Sentry or similar for production error tracking.

## Phase 7 – Polish, testing, refactors

- **Date**: 2025-01-16
- **Summary**:
	- Improved responsive design across all pages:
		- Added responsive padding (`p-4 sm:p-6`) for better mobile/tablet experience.
		- Made about page navigation stack on mobile (`flex-col md:flex-row`).
		- Ensured all cards and content adapt to smaller screens.
	- Extracted reusable hooks for cleaner code:
		- `useLeaderboard()` - manages leaderboard data fetching and state.
		- `useReferrals(userId)` - handles referral history loading with username resolution.
		- `useRank(userId)` - fetches and manages user rank data.
	- Accessibility improvements:
		- Added ARIA labels and roles to interactive elements (tabs, buttons, navigation).
		- Improved focus states with visible focus rings (`focus:ring-2 focus:ring-primary`).
		- Added semantic HTML (`role='tablist'`, `aria-selected`, `aria-controls`).
		- Navigation sections labeled with `aria-label`.
	- Code cleanup:
		- Removed duplicate data fetching logic from dashboard and leaderboard pages.
		- Centralized referral and rank logic in reusable hooks.
		- Improved type safety with exported `ReferralWithUsername` interface.
- **Design choices**:
	- Hooks pattern provides better separation of concerns and reusability.
	- Responsive design uses Tailwind's breakpoint system (`sm:`, `md:`) for consistency.
	- Accessibility improvements follow WCAG 2.1 guidelines without over-engineering.
	- Focus states use primary color to match brand while maintaining visibility.
- **Trade-offs**:
	- Test setup deferred (Jest + RTL) - can be added later if needed for MVP.
	- Some accessibility features (like skip links) not implemented - can be added in future.
	- Mobile navigation for about page could be enhanced with a collapsible menu.
- **Open questions / next steps**:
	- Consider adding E2E tests with Playwright or Cypress for critical flows.
	- May want to add loading skeletons instead of "Loading..." text for better UX.
	- Consider adding keyboard shortcuts for power users.
	- Future: Add admin dashboard for monitoring signups, referrals, and points.


