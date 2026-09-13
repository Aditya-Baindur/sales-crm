"use client";

import type { MouseEvent } from "react";
import Avatar from "@/components/_ui/avatar";
import Button from "@/components/_ui/button";
import { Checkbox } from "@/components/_ui/checkbox";
import Tag from "@/components/_ui/tag";
import { TableCell, TableRow } from "@/components/_ui/table";
import SegmentBar from "@/components/_common/segment-bar";
import Sparkline from "@/components/_common/sparkline";
import { TAG_TONES, ownerByName, type Company } from "@/data/companies";
import { formatDate, formatMoney, splitTags } from "@/lib/companies";
import { cn } from "@/lib/utils";
import CalendarIcon from "@/public/assets/images/_common/calendar.svg";
import DotsIcon from "@/public/assets/images/companies/table/dots-horizontal.svg";

type CompanyRowProps = {
  company: Company;
  selected: boolean;
  active: boolean;
  onToggle: () => void;
  onOpen: () => void;
};

export default function CompanyRow({
  company,
  selected,
  active,
  onToggle,
  onOpen,
}: CompanyRowProps) {
  const owner = ownerByName(company.owner);
  const { visible, hidden } = splitTags(company.tags);

  function stop(event: MouseEvent) {
    event.stopPropagation();
  }

  return (
    <TableRow
      onClick={onOpen}
      data-active={active || selected}
      className="cursor-pointer hover:bg-card/60 data-[active=true]:border-card data-[active=true]:bg-card"
    >
      <TableCell className="w-9 pr-0 text-center" onClick={stop}>
        <Checkbox
          checked={selected}
          onCheckedChange={onToggle}
          aria-label={`Select ${company.name}`}
          className="align-middle"
        />
      </TableCell>
      <TableCell className="w-[160px]">{company.name}</TableCell>
      <TableCell className="w-[217px]">
        <span className="flex items-center gap-[3px]">
          {visible.map((tag) => (
            <Tag key={tag} tone={TAG_TONES[tag]}>
              {tag}
            </Tag>
          ))}
          {hidden > 0 && (
            <Tag tone="neutral" size="sm">
              +{hidden}
            </Tag>
          )}
        </span>
      </TableCell>
      <TableCell className="w-[140px]">
        <span className="flex items-center gap-1.5">
          <Avatar src={owner.avatar} alt="" />
          {owner.name}
        </span>
      </TableCell>
      <TableCell className="w-[89px]">{company.openDeals}</TableCell>
      <TableCell className="w-[103px]">
        <span className="flex items-center gap-1">
          <span className="text-muted-foreground">$</span>
          {formatMoney(company.pipelineValue)}
        </span>
      </TableCell>
      <TableCell className="w-[135px]">
        <span className="flex items-center justify-between gap-2">
          <SegmentBar percent={company.winProbability} className="w-[74px]" />
          <span className="text-right">{company.winProbability}%</span>
        </span>
      </TableCell>
      <TableCell className="w-[101px]">
        <Sparkline values={company.trend} className="justify-center" />
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-1">
          <CalendarIcon aria-hidden className="size-3.5 shrink-0 text-foreground" />
          {formatDate(company.lastInteraction.date)}
          <span aria-hidden className="mx-[3px] h-2 w-px bg-white/15" />
          {company.lastInteraction.label}
        </span>
      </TableCell>
      <TableCell className="w-[60px] text-center" onClick={stop}>
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn("text-foreground", active && "bg-white/6")}
          aria-label={`Open ${company.name} details`}
          onClick={onOpen}
        >
          <DotsIcon aria-hidden className="size-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
