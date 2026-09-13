"use client";

import { useMemo } from "react";
import { Checkbox } from "@/components/_ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_ui/table";
import CompanyRow from "./company-row";
import TableFooter from "./table-footer";
import { filterCompanies } from "@/lib/companies";
import { useCompaniesStore } from "@/stores/companies-store";

const COLUMNS = [
  "Companies",
  "Segment & Stage",
  "Account Owner",
  "Open Deals",
  "Pipeline Value",
  "Win Probability",
  "Activity Trend",
  "Last Interaction",
];

export default function CompaniesTable() {
  const companies = useCompaniesStore((state) => state.companies);
  const sortBy = useCompaniesStore((state) => state.sortBy);
  const owner = useCompaniesStore((state) => state.owner);
  const stage = useCompaniesStore((state) => state.stage);
  const activityWindow = useCompaniesStore((state) => state.activityWindow);
  const selectedIds = useCompaniesStore((state) => state.selectedIds);
  const detailId = useCompaniesStore((state) => state.detailId);
  const detailOpen = useCompaniesStore((state) => state.detailOpen);
  const toggleSelected = useCompaniesStore((state) => state.toggleSelected);
  const setSelected = useCompaniesStore((state) => state.setSelected);
  const openDetail = useCompaniesStore((state) => state.openDetail);

  const visible = useMemo(
    () =>
      filterCompanies(companies, { sortBy, owner, stage, activityWindow }),
    [companies, sortBy, owner, stage, activityWindow],
  );

  const selectedVisible = visible.filter((company) =>
    selectedIds.includes(company.id),
  );
  const allSelected =
    visible.length > 0 && selectedVisible.length === visible.length;
  const someSelected = selectedVisible.length > 0 && !allSelected;

  function toggleAll() {
    setSelected(allSelected ? [] : visible.map((company) => company.id));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <Table className="min-w-[1120px]">
        <TableHeader>
          <TableRow className="border-t">
            <TableHead className="w-9 pr-0 text-center">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={toggleAll}
                aria-label="Select all companies"
                className="align-middle"
              />
            </TableHead>
            {COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead className="w-[60px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              selected={selectedIds.includes(company.id)}
              active={detailOpen && detailId === company.id}
              onToggle={() => toggleSelected(company.id)}
              onOpen={() => openDetail(company.id)}
            />
          ))}
          {visible.length === 0 && (
            <TableRow>
              <td
                colSpan={COLUMNS.length + 2}
                className="caption-style h-[120px] text-center text-muted-foreground"
              >
                No companies match the current filters.
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter count={visible.length} />
    </div>
  );
}
