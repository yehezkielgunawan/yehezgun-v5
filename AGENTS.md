# AGENTS.md - Coding Agent Instructions

This file provides instructions for AI coding agents working in this repository.

## Project Overview

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.9
- **Package Manager**: pnpm (v10.29.2)
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Content**: MDX with Content Collections
- **Testing**: Vitest + Testing Library
- **Linting/Formatting**: Biome

## Build/Lint/Test Commands

### Development

```bash
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
```

### Linting and Formatting

```bash
pnpm biome:lint       # Lint and auto-fix src/
pnpm biome:format     # Format src/
pnpm biome:lint:ci    # Lint check only (CI, no auto-fix)
```

### Testing

```bash
pnpm test                           # Run tests in watch mode
pnpm test:ci                        # Run all tests once
pnpm test:coverage                  # Run tests with coverage report

# Run a single test file
pnpm test -- src/__test__/services/blogs.test.ts

# Run tests matching a pattern
pnpm test -- --grep "formatDate"

# Run a single test by name
pnpm test -- -t "should return formatted date"
```

### Deployment

```bash
pnpm cloudflare:preview   # Deploy to Cloudflare preview
pnpm cloudflare:deploy    # Deploy to Cloudflare production
```

## Code Style Guidelines

### Formatting Rules (Biome)

- **Indentation**: Tabs (width 2)
- **Line endings**: LF
- **Semicolons**: Always required
- **Trailing commas**: All (including function parameters)
- **Arrow function parens**: Always required `(x) => x`
- **JSX quotes**: Double quotes
- **Unused imports**: Error (auto-removed)
- **Unused variables**: Warning

### Import Order and Style

1. Use path aliases - prefer `@/` over relative paths:

```typescript
// Good
import { formatDate } from "@/services/formatDate";
import BlogCard from "@/components/BlogCard";

// Avoid (unless in same directory)
import { formatDate } from "../../services/formatDate";
```

2. Import patterns:
   - `content-collections` for MDX content
   - Named imports for utilities/services
   - Default imports for React components

```typescript
import { allBlogs } from "content-collections";
import { formatDate, sortByDate } from "@/services/formatDate";
import GeneralWrapper from "@/components/GeneralWrapper";
```

### TypeScript Guidelines

- **Strict mode** is enabled - no implicit any
- **Path aliases**:
  - `@/*` -> `./src/*`
  - `content-collections` -> `./.content-collections/generated`

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogCard.tsx`, `GeneralWrapper.tsx` |
| Services/Utils | camelCase | `formatDate.ts`, `metadata.ts` |
| Constants | camelCase | `menuList.ts`, `baseConst.ts` |
| Test files | `*.test.ts(x)` | `blogs.test.ts`, `Home.test.tsx` |
| Page files | `page.tsx` | Next.js App Router convention |
| Variables/Functions | camelCase | `formatDate`, `getBlogBySlug` |
| Types/Interfaces | PascalCase | `BlogCardProps`, `OGImageProps` |

### Component Structure

```typescript
// Use "use client" directive only when needed
"use client";

import { useState } from "react";
import { clsx } from "clsx";

type ComponentProps = {
  title: string;
  isActive?: boolean;
};

export default function Component({ title, isActive = false }: ComponentProps) {
  // Component logic
  return (
    <div className={clsx("base-class", isActive && "active-class")}>
      {title}
    </div>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Use `clsx` for conditional class names
- Tailwind classes are auto-sorted by Biome
- DaisyUI components available for common UI patterns
- Themes: `nord` (light) / `dim` (dark) via `next-themes`

### Error Handling

```typescript
// Service layer - throw descriptive errors
export function getBlogBySlug(slug: string) {
  const post = allBlogs.find((blog) => blog._meta.path === slug);
  if (!post) {
    throw new Error(`No post found for slug: ${slug}`);
  }
  return post;
}

// Type-safe error handling
try {
  // operation
} catch (err) {
  const e = err instanceof Error ? err : new Error(String(err));
  console.error(e.message);
}
```

## Project Structure

```
src/
├── __test__/           # Tests and mocks
│   ├── mocks/          # Test mocks
│   ├── services/       # Service tests
│   └── setup.ts        # Vitest setup
├── app/                # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── blog/           # Blog routes
│   ├── projects/       # Projects page
│   └── globals.css     # Global styles
├── components/         # React components
├── constants/          # App constants
├── context/            # React contexts
└── services/           # Business logic

content/                # MDX content files
├── blogs/
├── projects/
├── quick-notes/
└── work-experiences/
```

## Testing Guidelines

- Test files go in `src/__test__/`
- Use `@testing-library/react` for component tests
- Mock `content-collections` using `src/__test__/mocks/`
- Setup file: `src/__test__/setup.ts`

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Component from "@/components/Component";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## CI/CD Pipeline

GitHub Actions runs on PR to main:
1. `pnpm biome:lint:ci` - Lint check
2. `pnpm build` - Build verification
3. `pnpm test:coverage` - Tests with coverage

Ensure all checks pass before merging.

## Content Collections

MDX content is validated with Zod schemas in `content-collections.ts`:

```typescript
import { allBlogs, allProjects } from "content-collections";
```

## Key Dependencies

- `next-themes` - Theme switching
- `clsx` - Conditional classes
- `@content-collections/mdx` - MDX processing
- `daisyui` - UI components
- `next-view-transitions` - Page transitions
