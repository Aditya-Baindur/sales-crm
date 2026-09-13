import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DetailSectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DetailSection({
  title,
  action,
  children,
  className,
}: DetailSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 border-b border-line-strong p-5",
        className,
      )}
    >
      <div className="flex min-h-[30px] items-center justify-between gap-2">
        <h4 className="eyebrow-style font-normal">{title}</h4>
        {action}
      </div>
      {children}
    </section>
  );
}
