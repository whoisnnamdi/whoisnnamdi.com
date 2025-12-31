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
This repo uses jj (jujutsu) on top of Git.
- `jj status` status (always shows working copy changes)
- `jj diff` to see changes
- `jj new` to create a checkpoint before big tasks
- `jj new <change-id>` to create a checkpoint on top of specific revision
- `jj describe -m "better message"` analogous to commit message, use when you finish a chunk of work / to update current change
- `jj edit <change-id>` to check out a previous change for fixing
- `jj split` to break messy changes into multiple logical commits
- `jj undo` to revert last operation (or any via ID) if something breaks
- `jj log -r @-::@` to see recent changes in this stack
- `jj op log` to see every operation (amazing safety net)
- `jj git push` for normal git push (jj handles branch creation)
- Never run `git commit/add/push/reset/rebase` in this repo
- Never run `jj rebase`, `jj move`, `jj squash` (unless explicitly told by human)
- Never run any command that touches bookmarks or remote state
- When done with a logical chunk: `jj describe -m "meaningful message"`
- Then: commit and push to main yourself if needed