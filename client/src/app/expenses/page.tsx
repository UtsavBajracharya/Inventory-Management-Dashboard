"use client";

import {ExpenseByCategorySummary, useGetExpensesByCategoryQuery} from "../state/api";
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/redux";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        
       if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          };
        }

        acc[data.category].amount += amount;
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const classNames = {
    label: "block text-sm font-medium text-gray-700 dark:text-gray-300",
    selectInput:
      "mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-base text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:[color-scheme:dark]",
    card: "rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-900",
    cardHeading: "mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100",
  };

  const labelColor = isDarkMode ? "#e5e7eb" : "#374151";

  const renderPieLabel = ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => {
    return `${name} ${((percent ?? 0) * 100).toFixed(0)}%`;
  };


  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS + CHART */}
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        {/* FILTER CARD */}
        <div className={`w-full p-6 md:w-1/3 ${classNames.card}`}>
          <h3 className={classNames.cardHeading}>Filter by Category and Date</h3>

          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PIE CHART CARD */}
        <div className={`flex-grow p-4 md:p-6 ${classNames.card}`}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="amount"
                label={renderPieLabel}
                labelLine={false}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map((entry: AggregatedDataItem, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "rgb(29, 78, 216)" : entry.color}
                    stroke={isDarkMode ? "#111827" : "#ffffff"}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#111827" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  color: isDarkMode ? "#f3f4f6" : "#111827",
                }}
                itemStyle={{
                  color: isDarkMode ? "#f3f4f6" : "#111827",
                }}
                labelStyle={{
                  color: isDarkMode ? "#d1d5db" : "#374151",
                }}
          
              />

              <Legend
                wrapperStyle={{
                  color: labelColor,
                  paddingTop: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;