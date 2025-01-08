import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  mobile?: boolean;
};

const NavigationLink = ({ to, children, className, mobile, isActive }: NavigationLinkProps) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/journey", label: "Journey" },
    { path: "/ai-tools", label: "AI Tools" },
    { path: "/ai-news", label: "AI News" },
    { path: "/ai-humanitarian", label: "AI Humanitarian" },
    { path: "/blog", label: "Blog" },
    { path: "/achievements", label: "Achievements" },
    { path: "/projects", label: "Projects" },
    { path: "/ideas", label: "Ideas" },
  ];

  const isMainLink = links.some(link => link.path === to);

  return (
    <NavLink
      to={to}
      className={({ isActive: routeActive }) =>
        cn(
          "transition-colors hover:text-white/90",
          isMainLink ? "font-semibold" : "font-normal",
          routeActive || isActive ? "text-white" : "text-white/75",
          mobile ? "block px-3 py-2 text-base" : "px-3 py-2 text-sm",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;