# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CLAUDE.md Maintenance

- **Language:** All content in this file must be written in English.
- **Living document:** During any conversation, if a question, correction, or new pattern surfaces that would benefit future sessions, Claude and the user should jointly decide whether to update this file. When in doubt, propose the update and let the user confirm.

## Project Overview

TEEKY is a web application for university students - a personalized study assistant. The frontend is built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4. It uses shadcn/ui (base-nova style, @base-ui/react 기반) as the component library and a mobile-first design approach with a fixed 375px width layout optimized for web apps.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run linter
npm run lint
```

## Architecture

### Project Structure

The project follows Next.js 15 App Router conventions with a custom organization pattern:

```
app/
├── (main)/                      # Main page routes (Next.js route group)
│   ├── page.tsx                 # Home page (subjects list)
│   └── subjects/[subjectId]/
│       ├── page.tsx             # Subject detail (weeks list)
│       └── records/[recordId]/
│           ├── page.tsx         # Record detail (feature cards)
│           └── manage/
│               ├── page.tsx     # File management page
│               └── move/
│                   └── page.tsx # File move page
├── _components/                 # Shared components (underscore prefix excludes from routing)
│   ├── ui/                      # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── layout/                  # Layout components (AppShell, Header, BottomNav)
│   ├── shared/                  # Reusable components (ListItem, EmptyState, etc.)
│   └── pages/                   # Page-specific components
│       ├── records/             # Record detail page components
│       └── manage/              # File management page components
│           └── move/            # File move page components
├── _lib/                        # Utility functions and libraries
│   ├── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   └── mock/                    # Mock data and simulation functions
├── types.ts                     # Shared TypeScript types
├── layout.tsx                   # Root layout (font, Toaster)
└── globals.css                  # Global styles, Tailwind v4 theme, CSS variables
```

**Key architectural decisions:**

- **Route groups:** `(main)` folder enables logical grouping without affecting URL structure
- **Private folders:** Folders prefixed with `_` are excluded from Next.js routing but remain part of the project structure
- **Component organization:** `ui/` for shadcn primitives, `layout/` for shell components, `shared/` for reusable components, `pages/{pageName}/` for page-specific components
- **Absolute imports:** All imports use the `@/` alias (e.g., `@/app/_components/pages/manage/...`) configured in tsconfig.json
- **Mock data:** `_lib/mock/` contains mock data and simulation functions for features where the backend is not yet implemented

### Installed shadcn/ui Components

alert-dialog, badge, button, card, checkbox, dialog, input, progress, separator, sonner(toast)

### Styling Approach

- **Tailwind CSS v4** with inline theme configuration in globals.css
- **Design system:** Mobile-first, 375px fixed-width container centered on larger screens (AppShell)
- **Color scheme:** oklch CSS variables 기반 (`--primary`, `--background`, `--card`, `--muted`, etc.)
- **Typography:** Pretendard (Korean sans-serif, `@font-face` in globals.css), Geist Mono as monospace fallback
- **Component patterns:** Components accept `className` prop, merging with base styles via `cn()` utility
- **Toast notifications:** Sonner 기반, root layout에 `<Toaster>` 전역 설정

### Component Patterns

All components follow these conventions:

1. **Type definitions inline** - Props types defined above component (not in separate files)
2. **Style composition** - Base styles merged with optional `className` via `cn()` utility or array filter/join pattern
3. **Props spreading** - Button components spread remaining HTML attributes with `...rest`
4. **Children support** - Container components use `PropsWithChildren<T>` for type safety

Example pattern:
```typescript
type ComponentProps = {
  title: string;
  className?: string;
};

export function Component({ title, className }: ComponentProps) {
  const wrapperClass = [
    "base-styles",
    className,
  ].filter(Boolean).join(" ");

  return <div className={wrapperClass}>{title}</div>;
}
```

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./*` (project root)
- Target: ES2017
- JSX: preserve (handled by Next.js)

## Development Guidelines

### Adding New Components

1. **shadcn/ui primitives:** `app/_components/ui/` (install via `npx shadcn@latest add <component>`)
2. **Layout components:** `app/_components/layout/`
3. **Reusable shared components:** `app/_components/shared/`
4. **Page-specific components:** `app/_components/pages/{pageName}/`
5. Use TypeScript with inline prop type definitions
6. Accept `className` prop for style customization

### Adding New Pages

- Create in `app/(main)/` for main app routes
- Page-specific components go in `app/_components/pages/{pageName}/`, NOT in route-colocated `_components/`
- Import components using absolute paths: `@/app/_components/...`
- Follow mobile-first responsive design (375px base width)

### Back Navigation

Back button behavior is centralized in `Header.tsx`. Pages only need `showBack` on `AppShell` — no per-page `backHref` required in most cases.

**How it works (priority order):**
1. `backHref` prop on `AppShell` — explicit override for truly exceptional cases
2. `BACK_NAV_OVERRIDES` in `Header.tsx` — for routes where the auto-derived parent doesn't exist as a page
3. Auto-derivation — strips the last path segment (covers most pages: `manage`, `move`, etc.)

**When to add to `BACK_NAV_OVERRIDES`:**
Add an entry when a URL segment exists as part of the path but has no corresponding page.
Example: `/subjects` and `/records` are segments without pages, so their children need overrides.

```typescript
// Header.tsx
const BACK_NAV_OVERRIDES: [pattern: string, parent: string][] = [
  ["subjects/:a",            "/"],
  ["subjects/:a/records/:b", "/subjects/:a"],
  // add new entries here if a new intermediate segment has no page
];
```

**When NOT to add an override:**
Pages that follow the standard URL hierarchy (`manage`, `move`, etc.) are handled automatically — `showBack` alone is sufficient.

### Working with Types

- Shared types go in `app/types.ts`
- Feature-specific types can be co-located in `app/_lib/mock/` (for mock-backed features) or relevant lib directories
- Component-specific types are defined inline above the component
- Use proper TypeScript utility types (PropsWithChildren, ButtonHTMLAttributes, etc.)

### Styling

- Use Tailwind utility classes directly in components
- Use CSS variable tokens (`bg-primary`, `text-muted-foreground`, etc.) instead of hardcoded colors
- Maintain consistent spacing, border-radius (`rounded-xl`, `rounded-2xl`), and ring patterns (`ring-1 ring-foreground/10`)
- Scrollable containers with `ring` children: add padding (`p-0.5 -m-0.5`) to prevent ring clipping from `overflow-y-auto`
- Minimum 44px touch target for interactive elements on mobile

### Git Commit Convention

```
{Type}/#{issueNumber}: 설명
```

Types: `Feat`, `Fix`, `Refactor`, `Style`, `ci`, `Docs`

Examples:
- `Feat/#1: 파일관리 페이지 컴포넌트 구현`
- `Refactor: shadcn 기반 UI 개선`
- `ci: 이슈, PR 템플릿 적용`

## State Management Strategy

This project is both a toy project and a learning vehicle. Trying new stacks (Jotai, Zustand, TanStack Query) is an explicit goal.
**Claude should proactively suggest a stack when a fitting opportunity is observed — before or after a task, as appropriate.**

### Current Pain Points

- `manage/page.tsx` concentrates 15+ `useState` calls and fans them out to child components via props.
- `subjectNames` / `recordNames` are hardcoded in each page — a pattern that will cause prop drilling as the app grows.

### Planned Stacks (priority order)

#### 1. Zustand — Global Client State
- **When to introduce:** When subject/record data needs to be shared across pages, or when replacing the hardcoded `subjectNames`/`recordNames` maps with a real data structure.
- **Use cases:** `useSubjectStore`, `useManageStore`, any app-wide UI state.
- **Why over Redux:** No boilerplate, intuitive `create()` API, works well with Next.js App Router. Redux is intentionally avoided — it is overkill at this scale.

#### 2. Jotai — Atomic State
- **When to introduce:** When `manage/page.tsx`'s `mode`, `uploadFiles`, `completedFiles` state is complex enough to warrant splitting, or when derived state is needed.
- **Use cases:** `modeAtom`, `uploadFilesAtom`, `selectedFilesAtom`, derived `hasUploadedFilesAtom`.
- **Why:** Atom-based subscriptions reduce unnecessary re-renders. Complements Zustand — use Zustand for store-level state, Jotai for fine-grained atoms.

#### 3. TanStack Query — Server State
- **When to introduce:** When the backend API is integrated, or when `_lib/mock/simulate*` functions are replaced with real API calls.
- **Use cases:** File listing, upload, delete, all async data fetching.
- **Why:** Cleanly separates server state (cache, loading, error, retry) from client UI state.

### Claude's Proactive Advisory Role

Suggest the appropriate stack when any of the following patterns are detected:

| Pattern | Suggestion |
|---|---|
| A new page re-declares hardcoded subject/record data | Zustand store |
| 5+ `useState` hooks in one component, drilled to multiple children | Jotai atoms or Zustand |
| `simulate*` mock replaced by a real API call | TanStack Query |
| Derived state managed with `useMemo`/`useCallback` chains | Jotai derived atom |
