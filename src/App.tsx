import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import DateRangeDialog from "./components/DateRangeDialog";
import TargetDialog from "./components/TargetDialog";
import getLPTheme from "./../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AnalysisInfo from "./components/AnalysisInfo";
import SearchResults from "./components/SearchResults";

function App() {
  const theme = createTheme(getLPTheme("light"));
  const targetOptions = ["Community1", "Community2", "Community3"];
  const analysisData = {
    Happy: 80,
    Sad: 20,
    Angry: 10,
    Surprised: 50,
  };

  const today = new Date().toISOString().slice(0, 16);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [openTargetDialog, setOpenTargetDialog] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([
    "Community1",
  ]);
  const [loadingTargets, setLoadingTargets] = useState(false);
  const [defaultStartDate, setDefaultStartDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [targetList, setTargetList] = useState<string[]>([]);
  const [searched, setSearched] = useState(false); // 검색 버튼을 클릭했는지 여부를 나타내는 상태

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    setStartDate(sevenDaysAgo.toISOString().slice(0, 16));
    const defaultStartDateFormat = sevenDaysAgo.toISOString().slice(0, 16);
    setDefaultStartDate(defaultStartDateFormat);
    fetchTargetList();
  }, []);

  useEffect(() => {
    const formattedDateRange = `${startDate} - ${endDate}`;
    setSelectedDateRange(formattedDateRange);
  }, [startDate, endDate, selectedTargets]);

  const fetchTargetList = () => {
    setLoadingTargets(true);
    setTimeout(() => {
      setTargetList(targetOptions);
      setLoadingTargets(false);
    }, 1000);
  };

  const handleSearch = () => {
    setSelectedDateRange(`${startDate} ~ ${endDate}`);
    setSearched(true); // 검색 버튼을 클릭했음을 나타내는 상태를 true로 설정
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <img src="/logo.svg" alt="Logo" style={{ marginRight: "10px" }} />{" "}
              test_name
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <SearchBar
              searchKeyword={searchKeyword}
              onSearchKeywordChange={setSearchKeyword}
              onSearch={handleSearch}
            />
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                onClick={() => setOpenDateDialog(true)}
                style={{
                  marginLeft: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                Select Date Range
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                onClick={() => setOpenTargetDialog(true)}
                style={{
                  marginLeft: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                Select Target
              </Button>
            </Grid>
            <Grid item xs={12}>
              Selected Date Range:{" "}
              <Chip
                label={selectedDateRange}
                variant="outlined"
                style={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid item xs={12}>
              Selected Targets:{" "}
              {selectedTargets.map((target) => (
                <Chip
                  key={target}
                  label={target}
                  variant="outlined"
                  style={{ marginLeft: "8px" }}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* 검색이 이루어진 후에만 결과 및 분석 정보가 나타나도록 조건부 렌더링 */}
        {searched && (
          <>
            <AnalysisInfo analysisData={analysisData} />
            <SearchResults apiParams="test" />
          </>
        )}
        <DateRangeDialog
          open={openDateDialog}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClose={() => setOpenDateDialog(false)}
        />
        {!loadingTargets && (
          <TargetDialog
            open={openTargetDialog}
            targetList={targetList}
            selectedTargets={selectedTargets}
            onSelectedTargetsChange={setSelectedTargets}
            onClose={() => setOpenTargetDialog(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
