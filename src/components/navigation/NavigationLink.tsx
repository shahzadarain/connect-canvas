import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

const NavigationLink = ({ to, children, className }: NavigationLinkProps) => {
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
      className={({ isActive }) =>
        cn(
          "transition-colors hover:text-white/90",
          isMainLink ? "font-semibold" : "font-normal",
          isActive ? "text-white" : "text-white/75",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;