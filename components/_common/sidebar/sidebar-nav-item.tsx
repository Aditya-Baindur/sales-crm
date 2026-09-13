import type { ComponentType, SVGProps } from "react";
import Button from "@/components/_ui/button";
import CountBadge from "@/components/_ui/count-badge";
import { cn } from "@/lib/utils";

type SidebarNavItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  count?: number;
  active?: boolean;
  tone?: "default" | "quiet";
  iconClassName?: string;
};

export default function SidebarNavItem({
  icon: Icon,
  label,
  count,
  active = false,
  tone = "default",
  iconClassName,
}: SidebarNavItemProps) {
  return (
    <li>
      <Button
        variant="nav"
        size="md"
        data-active={active}
        aria-current={active ? "page" : undefined}
        className={cn("group gap-1.5", tone === "quiet" && "text-subtle")}
      >
        <Icon
          aria-hidden
          className={cn(
            "size-3.5 shrink-0 text-subtle transition-colors duration-150 ease-power3-in-out group-hover:text-icon group-data-[active=true]:text-icon",
            iconClassName,
          )}
        />
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {count !== undefined && <CountBadge>{count}</CountBadge>}
      </Button>
    </li>
  );
}
