# Sentinel

Sentinel is a compact enterprise SaaS admin and analytics platform built with the Next.js App Router.

## What this implementation demonstrates

- **SEO-friendly server prefetching** with server components that hydrate TanStack Query caches before the client takes over.
- **Secure operator flows** using Zod-validated route handlers, signed JWT cookies, and Drizzle-powered SQLite queries.
- **High-performance dashboards** with dynamically imported Recharts visualisations plus Suspense-based loading states.
- **Accessible interaction patterns** including a keyboard-dismissable modal, a responsive sidebar that becomes a mobile drawer, and a guided multi-step onboarding form.
- **Scalable feature structure** under `src/features/*`, with reusable primitives in `src/components/ui` and shared logic in `src/lib`.

## Key routes

- `/login` – demo JWT login using `admin@sentinel.app` / `Sentinel123!`
- `/dashboard` – server-prefetched overview with charts, onboarding, and team insights
- `/analytics` – analytics drilldown page
- `/team` – optimistic team invitation workflow

## Why these decisions improve the project

- **Server-side prefetch + hydration** keeps the initial render fast while preserving a rich client-side cache for follow-up actions.
- **Drizzle with local SQLite** keeps the data layer type-safe and easy to run locally without external infrastructure.
- **Zod input schemas** centralise validation rules so the same business constraints can power secure APIs and friendly form feedback.
- **Feature-based folders** keep analytics, onboarding, and team concerns isolated, which scales better than a flat component tree.
- **Dynamic chart loading** reduces the amount of JavaScript in the critical path while still enabling interactive visualisation.

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run cypress:run`

Set `SENTINEL_JWT_SECRET` before running the production build or server.

## Testing

- Jest unit tests live in `src/__tests__/unit`.
- Cypress happy-path and accessibility smoke coverage live in `cypress/e2e`.
