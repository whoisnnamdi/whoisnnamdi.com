# CLAUDE.md - Coding Assistant Guidelines

## Build & Development Commands
- `yarn dev`: Run local development server
- `yarn build`: Build the production site
- `yarn start`: Start the production server

## Code Style Guidelines
- **Components**: Use functional React components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: React/Next.js first, third-party libs next, local imports last
- **CSS**: Use Tailwind utility classes for styling
- **Error Handling**: Use try/catch for API calls with specific error responses
- **File Structure**:
  - `/components`: Reusable UI components
  - `/pages`: Next.js pages and API routes 
  - `/public`: Static assets
  - `/styles`: Global CSS

## Tech Stack
- Next.js with React (JavaScript, not TypeScript)
- Tailwind CSS for styling
- Markdown files for content (in `/content` directory)
- Mailchimp for email subscriptions
- Fathom for analytics

## Next.js Important Lessons

### Static File Generation
For generating static files during build (like RSS feeds):
- Create a script in `/scripts` directory for file generation that uses Node.js modules
- Run this script during build using a package.json pre/post-build command
- Don't mix static file generation with Next.js data fetching methods
- Remember that files need to be written to `/public` to be accessible

### Data Fetching Methods
- Never mix data fetching methods (`getStaticProps`, `getServerSideProps`, `getInitialProps`) in the same file
- For pages that need to return XML/non-HTML content, use `getServerSideProps` with proper content-type headers
- Be cautious with Node.js only modules (fs, path) in browser context

## Committing Code
- **Before attempting to delete a file to resolve a local type/lint failure, stop and ask the user.** Other agents are often editing adjacent files; deleting their work to silence an error is never acceptable without explicit approval.
- NEVER edit `.env` or any environment variable files—only the user may change them.
- Moving/renaming and restoring files is allowed.
- ABSOLUTELY NEVER run destructive git operations (e.g., `git reset --hard`, `rm`, `git checkout`/`git restore` to an older commit) unless the user gives an explicit, written instruction in this conversation. Treat these commands as catastrophic; if you are even slightly unsure, stop and ask before touching them. *(When working within Cursor or Codex Web, these git limitations do not apply; use the tooling's capabilities as needed.)*
- Never use `git restore` (or similar commands) to revert files you didn't author—coordinate with other agents instead so their in-progress work stays intact.
- Always double-check git status before any commit
- Keep commits atomic: commit only the files you touched and list each path explicitly. For tracked files run `git commit -m "<scoped message>" -- path/to/file1 path/to/file2`. For brand-new files, use the one-liner `git restore --staged :/ && git add "path/to/file1" "path/to/file2" && git commit -m "<scoped message>" -- path/to/file1 path/to/file2`.
- Quote any git paths containing brackets or parentheses (e.g., `src/app/[candidate]/**`) when staging or committing so the shell does not treat them as globs or subshells.
- When running `git rebase`, avoid opening editors—export `GIT_EDITOR=:` and `GIT_SEQUENCE_EDITOR=:` (or pass `--no-edit`) so the default messages are used automatically.
- Never amend commits unless you have explicit written approval in the task thread.