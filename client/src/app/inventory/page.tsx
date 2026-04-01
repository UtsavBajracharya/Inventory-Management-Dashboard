"use client";

import { useGetProductsQuery } from "../state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", width: 200 },
    {
        field: "price",
        headerName: "Price",
        width: 110,
        type: "number",
        valueGetter: (value, row) => `$${row.price.toFixed(2)}`,
    },
    { 
        field: "rating",
        headerName: "Rating",
        width: 110,
        type: "number",
        valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
        field: "stockQuantity",
        headerName: "Stock Quantity",
        width: 150,
        type: "number",
    },
];

const Inventory = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();


    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }

    if (isError || !products) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products. Please try again later.
             </div>
        );
    }   
        
    return (
        <div className="p-4">
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row.productId}
                checkboxSelection
                className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            />
        </div>
    );
};

export default Inventory;