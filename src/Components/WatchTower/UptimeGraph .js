import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { pillGraphDetails } from "../../APIconfig/getAPIconfig";
import moment from "moment";

const UptimeGraph = ({ monitorId }) => {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state?.MonitorSliceReducer?.ViewGraphSlice || {});
  
  // console.log("Pill Graph Data:", graphData);

  useEffect(() => {
    // console.log("Monitor ID:", monitorId);
    if (monitorId) {
      dispatch(pillGraphDetails(monitorId));
    }
  }, [monitorId, dispatch]);

  const [chartPillData, setChartPillData] = useState({
    series: [{ name: "Uptime", data: [] }],
    options: {
      chart: {
        type: "line",
        height: 250,
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#10B981"], 
      },
      markers: {
        size: 4,
        colors: ["#10B981"], 
        strokeColors: "#0E9F6E",
        strokeWidth: 2,
      },
      colors: ["#10B981"], 
      tooltip: {
        x: { format: "hh:mm:ss A" },
        theme: "light",
      },
      fill: {
        type: "gradient", 
        gradient: {
          shadeIntensity: 0.6,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100],
          colorStops: [
            { offset: 0, color: "#10B981", opacity: 0.4 },
            { offset: 100, color: "#10B981", opacity: 0.1 },
          ],
        },
      },
      xaxis: {
        categories: [],
        labels: { style: { colors: "#6B7280", fontSize: "12px" } },
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 5,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
        row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
      },
    },
  });

  useEffect(() => {
    const rawData = graphData?.data?.data || [];
    if (rawData.length) {
      // console.log("Raw Data:", rawData);
      const newCategories = rawData.map((item) =>
        moment(item.start).format("hh:mm:ss A")
      );
      const newSeriesData = rawData.map((item) =>
        Number((item.percentage ?? 0).toFixed(2))
      );

      setChartPillData((prev) => ({
        ...prev,
        series: [{ name: "Uptime", data: newSeriesData }],
        options: { ...prev.options, xaxis: { categories: newCategories } },
      }));
    }
  }, [graphData]);

  return (
    <div className="bg-white rounded-xl p-4 border mt-10">
      <h2 className="text-lg font-semibold">Uptime Graph</h2>
      <p className="text-gray-500">Average Uptime for selected period</p>
      <Chart options={chartPillData.options} series={chartPillData.series} type="line" height={250} />
    </div>
  );
};

export default UptimeGraph;
