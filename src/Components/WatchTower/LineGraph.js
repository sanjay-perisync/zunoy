import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { LineGraphDetails } from "../../APIconfig/getAPIconfig";
import { useDispatch, useSelector } from "react-redux";

const ResponseTimeGraph = ({ monitorId }) => {
  const [averageResponseTime, setAverageResponseTime] = useState("");
  const dispatch = useDispatch();
  const LineData = useSelector(
    (state) => state?.MonitorSliceReducer?.LineviewGraphSlice || {}
  );

  const [chartData, setChartData] = useState({
    series: [{ name: "Response Time", data: [] }],
    options: {
      chart: { type: "line", height: 350, zoom: { enabled: false } },
      stroke: { curve: "smooth" },
      colors: ["#4A90E2"],
      tooltip: { x: { format: "hh:mm:ss A" } },
    },
  });

  useEffect(() => {
    if (monitorId) {
      dispatch(LineGraphDetails(monitorId));
    }
  }, [monitorId, dispatch]);

  useEffect(() => {
    if (!LineData || !LineData.graph?.MUMBAI) return;

    const mumbaiData = LineData.graph.MUMBAI;
    if (LineData.average) {
      setAverageResponseTime(LineData.average.toFixed(2));
    }

    const categories = mumbaiData.map((item) =>
      moment(item.start).format("hh:mm:ss A")
    );
    const responseTimeData = mumbaiData.map((item) => Number(item.y));

    setChartData((prev) => ({
      ...prev,
      series: [{ name: "Response Time", data: responseTimeData }],
      options: {
        ...prev.options,
        xaxis: { categories },
      },
    }));
  }, [LineData]);

  return (
    <div className="bg-white rounded-xl p-4 border mt-10">
      <h2 className="text-lg font-semibold">Response time per zone</h2>
      <p className="text-gray-500">
        Average Response Time for selected period - {averageResponseTime} ms
      </p>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default ResponseTimeGraph;
