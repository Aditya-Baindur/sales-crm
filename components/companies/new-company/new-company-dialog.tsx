"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/_ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/_ui/dialog";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_ui/select";
import {
  DEFAULT_TREND,
  OWNERS,
  SEGMENTS,
  STAGES,
  type Company,
  type Segment,
  type Stage,
} from "@/data/companies";
import { slugify } from "@/lib/utils";
import { useCompaniesStore } from "@/stores/companies-store";
import PlusIcon from "@/public/assets/images/_common/plus.svg";

const TODAY = "2026-09-14";

const EMPTY_FORM = {
  name: "",
  owner: OWNERS[0].name,
  segment: SEGMENTS[0] as Segment,
  stage: STAGES[0] as Stage,
  pipelineValue: "",
  openDeals: "1",
};

export default function NewCompanyDialog() {
  const open = useCompaniesStore((state) => state.newCompanyOpen);
  const setOpen = useCompaniesStore((state) => state.setNewCompanyOpen);
  const addCompany = useCompaniesStore((state) => state.addCompany);
  const [form, setForm] = useState(EMPTY_FORM);

  function update<K extends keyof typeof EMPTY_FORM>(
    key: K,
    value: (typeof EMPTY_FORM)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    const company: Company = {
      id: `${slugify(name)}-${Date.now()}`,
      name,
      tags: [form.segment, form.stage],
      owner: form.owner,
      openDeals: Math.max(0, Number(form.openDeals) || 0),
      pipelineValue: Math.max(0, Number(form.pipelineValue) || 0),
      winProbability: 50,
      trend: DEFAULT_TREND,
      lastInteraction: { date: TODAY, label: "Created" },
      activityDays: 0,
    };

    addCompany(company);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onCloseAutoFocus={() => setForm(EMPTY_FORM)}>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <DialogHeader>
            <DialogTitle>New Company</DialogTitle>
            <DialogDescription>
              Add a company to the pipeline. It appears in the list right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-6 py-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company-name">Company name</Label>
              <Input
                id="company-name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Acme Inc."
                autoFocus
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="company-owner">Account owner</Label>
              <Select
                value={form.owner}
                onValueChange={(value) => update("owner", value)}
              >
                <SelectTrigger id="company-owner">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OWNERS.map((owner) => (
                    <SelectItem key={owner.name} value={owner.name}>
                      {owner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-segment">Segment</Label>
                <Select
                  value={form.segment}
                  onValueChange={(value) => update("segment", value as Segment)}
                >
                  <SelectTrigger id="company-segment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map((segment) => (
                      <SelectItem key={segment} value={segment}>
                        {segment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-stage">Stage</Label>
                <Select
                  value={form.stage}
                  onValueChange={(value) => update("stage", value as Stage)}
                >
                  <SelectTrigger id="company-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-pipeline">Pipeline value ($)</Label>
                <Input
                  id="company-pipeline"
                  type="number"
                  min={0}
                  step={1000}
                  inputMode="numeric"
                  value={form.pipelineValue}
                  onChange={(event) =>
                    update("pipelineValue", event.target.value)
                  }
                  placeholder="250,000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-deals">Open deals</Label>
                <Input
                  id="company-deals"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={form.openDeals}
                  onChange={(event) => update("openDeals", event.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="subtle" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="primary" size="sm" type="submit">
              <PlusIcon aria-hidden className="size-3" />
              Create Company
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
