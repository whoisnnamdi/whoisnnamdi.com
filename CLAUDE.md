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

## Browser Automation
Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
