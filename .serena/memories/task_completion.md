# Task Completion Checklist

When a development task is completed:

1. **Build the project**: Run `vc build` to ensure the code compiles without errors
2. **Test locally**: Run `vc dev` and verify the application works as expected
3. **Commit changes**: Use `git add .` and `git commit -m "description"` to save changes
4. **Deploy if ready**: Run `vc deploy` to push changes to production (only for completed features)

Note: There are currently no automated tests configured. Manual testing via `vc dev` is recommended.

Ensure TypeScript compilation succeeds and the Hono app exports correctly.