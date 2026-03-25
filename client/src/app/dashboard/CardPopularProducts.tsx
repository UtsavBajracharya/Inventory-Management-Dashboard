import React  from "react";
import { useGetDashboardMetricsQuery } from "@/this.state.api.ts";

const CardPopularProducts = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
    return  (
        <div className="row-span-3 xl:row-span-6 bg-gray-500">
           {isLoading ? (
                <div className="m-5">Loading...</div>
            ) : (
                <>
                <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
                    Popular Products
                </h3>
                </>
            )}
        </div>;
    );
};

export default CardPopularProducts;