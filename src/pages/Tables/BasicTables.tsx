import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../features/tables/BasicTableOne";
import PageMeta from "../../components/common/PageMeta";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Basic Tables Dashboard | CS AI"
        description="This is React.js Basic Tables Dashboard page for CS AI"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
