import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Button, Chip } from "@mui/material";
import SearchBar from "./components/SearchBar";
import DateRangeDialog from "./components/DateRangeDialog";
import TargetDialog from "./components/TargetDialog";
import getLPTheme from "./../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AnalysisInfo from "./components/AnalysisInfo";
import SearchResults from "./components/SearchResults";

function App() {
  const theme = createTheme(getLPTheme("light"));

  const today = new Date().toISOString().slice(0, 16);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [openTargetDialog, setOpenTargetDialog] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [loadingTargets, setLoadingTargets] = useState(false);
  const [defaultStartDate, setDefaultStartDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [targetList, setTargetList] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [analysisData, setAnalysisData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    setStartDate(sevenDaysAgo.toISOString().slice(0, 16));
    const defaultStartDateFormat = sevenDaysAgo.toISOString().slice(0, 16);
    setDefaultStartDate(defaultStartDateFormat);
  }, []);

  useEffect(() => {
    const formattedDateRange = `${startDate} - ${endDate}`;
    setSelectedDateRange(formattedDateRange);
  }, [startDate, endDate, selectedTargets]);

  useEffect(() => {
    if (openTargetDialog) {
      fetchTargetList();
    }
  }, [openTargetDialog]);

  const fetchTargetList = () => {
    setLoadingTargets(true);
    fetch(`${window.location.origin}:${process.env.APIPORT}/siteNameList`)
      .then((response) => response.json())
      .then((data) => {
        const targetOptions = data.map((item: any) => item.siteName);
        setTargetList(targetOptions);
        setLoadingTargets(false);
      })
      .catch((error) => {
        console.error("Error fetching target list:", error);
        setLoadingTargets(false);
      });
  };

  const handleSearch = () => {
    if (!searchKeyword) {
      alert("keyword cannot be null");
    } else {
      setSelectedDateRange(`${startDate} ~ ${endDate}`);
      const searchParams = new URLSearchParams({
        keyword: searchKeyword,
        startDate,
        endDate,
        page: "0",
      });
      if (selectedTargets.length > 0) {
        selectedTargets.forEach((target) =>
          searchParams.append("siteNames", target)
        );
      }

      const search_url = `${window.location.origin}:${
        process.env.APIPORT
      }/searchData?${searchParams.toString()}`;

      fetch(search_url)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.posts);
          setAnalysisData(data.analysis);
          setSearched(true);
        })
        .catch((error) => {
          console.error("Error searching:", error);
        });
    }
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
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="src/assets/logo.png"
                alt="Logo"
                style={{
                  marginRight: "10px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
              test_name
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <SearchBar
              searchKeyword={searchKeyword}
              onSearchKeywordChange={setSearchKeyword}
              onSearch={handleSearch}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={2}
            justifyContent="center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              item
              xs={12}
              md={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
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
            <Grid
              item
              xs={12}
              md={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
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
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            Selected Date Range:{" "}
            <Chip
              label={selectedDateRange}
              variant="outlined"
              style={{ marginLeft: "8px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
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

        {/* 검색이 이루어진 후에만 결과 및 분석 정보가 나타나도록 조건부 렌더링 */}
        {searched && (
          <>
            <AnalysisInfo analysisData={analysisData} />
            <SearchResults
              initialResults={searchResults}
              keyword={searchKeyword}
              startDate={startDate}
              endDate={endDate}
              selectedTargets={selectedTargets}
            />
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
