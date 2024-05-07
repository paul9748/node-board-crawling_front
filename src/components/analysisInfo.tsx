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

interface AnalysisData {
  [key: string]: number;
}

interface AnalysisInfoProps {
  analysisData: AnalysisData;
}

class AnalysisInfo extends React.Component<AnalysisInfoProps> {
  render() {
    const { analysisData } = this.props;
    const data = Object.entries(analysisData).map(([emotion, value]) => ({
      emotion,
      value,
    }));

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
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    );
  }
}

export default AnalysisInfo;
