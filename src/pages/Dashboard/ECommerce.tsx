import EcommerceMetrics from "../../features/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../features/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../features/ecommerce/StatisticsChart";
import MonthlyTarget from "../../features/ecommerce/MonthlyTarget";
import RecentOrders from "../../features/ecommerce/RecentOrders";
import DemographicCard from "../../features/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Ecommerce() {
  return (
    <>
      <PageMeta
        title="Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for CS AI"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
