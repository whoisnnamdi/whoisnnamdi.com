import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";

/**
 * Layout component that wraps all pages with common structure:
 * - Analytics tracking
 * - Navbar with container
 * - Footer
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {Object} props.navbarProps - Props to pass to Navbar component
 * @param {boolean} props.showNavbarContainer - Whether to wrap Navbar in container (default: true)
 */
export default function Layout({
  children,
  navbarProps = {},
  showNavbarContainer = true,
}) {
  return (
    <div className="bg-paper min-h-screen">
      {showNavbarContainer ? (
        <Container>
          <Navbar {...navbarProps} />
        </Container>
      ) : (
        <Navbar {...navbarProps} />
      )}
      {children}
      <Footer />
    </div>
  );
}
