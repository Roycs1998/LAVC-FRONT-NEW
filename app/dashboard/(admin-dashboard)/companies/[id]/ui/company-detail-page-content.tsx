"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Company } from "@/modules/company";
import { useState } from "react";
import { CompanyHeaderHero } from "./company-header-hero";
import { CompanyTabOverview } from "./company-tab-overview";
import CompanyTabSettings from "./company-tab-settings";

interface Props {
  company: Company;
}

export default function CompanyDetailPageContent({ company }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <CompanyHeaderHero company={company} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="overview">Resumen general</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CompanyTabOverview company={company} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <CompanyTabSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
