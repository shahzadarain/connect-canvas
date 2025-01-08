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
          "transition-all duration-300 px-4 py-2 rounded-lg",
          "hover:text-white hover:shadow-lg hover:shadow-white/10",
          isMainLink ? "font-semibold" : "font-normal",
          routeActive || isActive ? "text-white bg-white/10" : "text-white/75",
          mobile ? "block text-base" : "text-sm",
          "relative overflow-hidden",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;