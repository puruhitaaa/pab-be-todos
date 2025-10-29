# Code Style and Conventions

## TypeScript Configuration
- Target: ESNext
- Module: NodeNext (ES modules)
- Strict mode: Enabled
- Verbatim module syntax: Enabled
- Skip lib check: Enabled
- Types: Node.js types included
- JSX: React JSX with Hono as import source
- Output directory: ./dist

## Coding Conventions
- Use ES modules (`import`/`export`)
- Strict TypeScript checking
- JSX for UI components (if any) using Hono's JSX
- No specific linting rules configured (no ESLint or Prettier)
- Follow standard TypeScript naming conventions
- Use type annotations where beneficial

## File Structure
- Source code in `src/` directory
- Main entry point: `src/index.ts`
- Export default from main file

## Dependencies
- Runtime: Hono framework
- Dev: TypeScript, Node types