export default function Container({ children, className = "", as: Component = "div" }) {
  return (
    <Component className={`max-w-[1200px] mx-auto px-6 lg:px-10 ${className}`.trim()}>
      {children}
    </Component>
  );
}
