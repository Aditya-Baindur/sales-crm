export const TABLE_COLUMNS = [
  { key: "name", label: "Companies", className: "text-left" },
  { key: "segment", label: "Segment & Stage", className: "text-left" },
  { key: "owner", label: "Account Owner", className: "text-left" },
  { key: "openDeals", label: "Open Deals", className: "text-right tabular-nums" },
  {
    key: "pipelineValue",
    label: "Pipeline Value",
    className: "text-right tabular-nums",
  },
  {
    key: "winProbability",
    label: "Win Probability",
    className: "text-right tabular-nums",
  },
  { key: "trend", label: "Activity Trend", className: "text-center" },
  {
    key: "lastInteraction",
    label: "Last Interaction",
    className: "pl-6 text-left",
  },
] as const;

export type TableColumnKey = (typeof TABLE_COLUMNS)[number]["key"];

export function columnClass(key: TableColumnKey) {
  return TABLE_COLUMNS.find((column) => column.key === key)?.className ?? "";
}
