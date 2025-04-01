import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableAPI from "../../features/tables/TableAPI";

export default function TableProducts() {
  return (
    <>
      <PageMeta
        title="Table Products | CS AI"
        description="This is React.js Tanstack Table Products page for CS AI"
      />
      <PageBreadcrumb pageTitle="Table Products" />
      <div className="space-y-6">
        <ComponentCard title="Tables Products">
          <TableAPI />
        </ComponentCard>
      </div>
    </>
  );
}
