import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableExample from "../../features/tables/TableExample";

export default function TanstackTables() {
  return (
    <>
      <PageMeta
        title="Tanstack Tables Dashboard | CS AI"
        description="This is React.js Tanstack Tables Dashboard page for CS AI"
      />
      <PageBreadcrumb pageTitle="Tanstack Tables" />
      <div className="space-y-6">
        <ComponentCard title="Tanstack Tables">
          <TableExample />
        </ComponentCard>
      </div>
    </>
  );
}
