import React from "react";
import { Typography, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalysisResult {
  key_columns: string;
  total_val_columns: number;
  percent_total: number;
  total_sum: number;
}

interface AnalysisInfoProps {
  analysisData: AnalysisResult[];
}

class AnalysisInfo extends React.Component<AnalysisInfoProps> {
  render() {
    const { analysisData } = this.props;

    // 검색 결과가 없는 경우
    if (analysisData.length === 0) {
      return (
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Emotion Analysis
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No analysis data available.
            </Typography>
          </Grid>
        </Grid>
      );
    }

    // 검색 결과가 있는 경우
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Emotion Analysis
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={analysisData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="key_columns" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="percent_total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    );
  }
}

export default AnalysisInfo;
