import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  ListItemText,
  Checkbox,
  Container,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import SearchIcon from "@mui/icons-material/Search";
import AnalysisInfo from "./components/analysisInfo";
import SearchResults from "./components/searchResults";
import getLPTheme from "./../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// MUI에서 ThemeProvider 가져오기
function App() {
  const theme = createTheme(getLPTheme("light"));
  const targetOptions = ["Community1", "Community2", "Community3"];
  const analysisData = {
    Happy: 80,
    Sad: 20,
    Angry: 10,
    Surprised: 50,
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  const today = new Date().toISOString().slice(0, 16);

  const [loginStatus, setLoginStatus] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [openTargetDialog, setOpenTargetDialog] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([
    "Community1",
  ]);
  const [loadingTargets, setLoadingTargets] = useState(false); // 로딩 상태 추가
  const [defaultStartDate, setDefaultStartDate] = useState("");
  const [defaultEndDate, setDefaultEndDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [targetList, setTargetList] = useState<string[]>([]); // API에서 가져온 Selected Target 목록을 저장할 상태 추가

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
  // 기본값으로 7일 전 날짜를 계산
  const fetchTargetList = () => {
    setLoadingTargets(true);
    // 여기에 API 호출하는 로직을 추가합니다.
    // API에서 가져온 데이터를 setTargetList로 설정합니다.
    // 데이터를 가져오는 데 성공하면 setLoadingTargets(false)로 로딩 상태를 변경합니다.
    setTimeout(() => {
      setTargetList(targetOptions); // 더미 데이터로 대체
      setLoadingTargets(false);
    }, 1000); // 더미 API 호출
  };

  const handleLogin = () => {
    // 로그인 처리
    setLoginStatus(true);
  };

  const handleLogout = () => {
    // 로그아웃 처리
    setLoginStatus(false);
  };

  const handleSearch = () => {
    // 검색 처리
    console.log("Search keyword:", searchKeyword);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Selected Targets:", selectedTargets);

    // 선택된 기간을 텍스트로 표시
    setSelectedDateRange(`${startDate} ~ ${endDate}`);
    // 선택된 대상을 텍스트로 표시
  };

  const handleDateDialogClose = () => {
    setOpenDateDialog(false);
  };

  const handleTargetDialogClose = () => {
    setOpenTargetDialog(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <img src="/logo.svg" alt="Logo" style={{ marginRight: "10px" }} />{" "}
              test_name
            </Typography>
            {!loginStatus && (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
            {loginStatus && (
              <div>
                <Button color="inherit">MyPage</Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* AppBar가 다른 컨텐츠를 덮지 않도록 공간 확보 */}
        <Container
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={10}>
              <TextField
                label="Search Keyword"
                variant="outlined"
                fullWidth
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </Grid>
            <Grid xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                style={{ marginBottom: "20px", height: "100%" }}
              >
                Search
              </Button>
            </Grid>
            <Grid xs={6}>
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
            <Grid xs={6}>
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
            <Grid xs={12}>
              Selected Date Range:{" "}
              <Chip
                label={selectedDateRange}
                variant="outlined"
                style={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid xs={12}>
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
          {/*검색창 파트 끝*/}
          <div>
            <Typography variant="h4">Analysis Information</Typography>
            <AnalysisInfo analysisData={analysisData} />
          </div>
          <div>
            <h1>Search Results on Another Page</h1>
            <SearchResults apiParams="test" />
          </div>
          <Dialog open={openDateDialog} onClose={handleDateDialogClose}>
            <DialogTitle>Select Date Range</DialogTitle>
            <DialogContent>
              <TextField
                label="Start Date"
                type="datetime-local"
                value={startDate || defaultStartDate || today}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                style={{ marginBottom: "10px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                type="datetime-local"
                value={endDate || defaultEndDate || today}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                style={{ marginBottom: "10px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDateDialogClose}>Cancel</Button>
              <Button onClick={handleDateDialogClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          {loadingTargets ? (
            <p>Loading Targets...</p>
          ) : (
            <div>
              {targetList.length > 0 && (
                <Dialog
                  open={openTargetDialog}
                  onClose={handleTargetDialogClose}
                >
                  <DialogTitle>Select Target</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth>
                      <InputLabel>Select Target</InputLabel>
                      <Select
                        multiple
                        value={selectedTargets}
                        onChange={(e) =>
                          setSelectedTargets(e.target.value as string[])
                        }
                        renderValue={(selected) =>
                          (selected as string[]).join(", ")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {targetList.map((target) => (
                          <MenuItem key={target} value={target}>
                            <Checkbox
                              checked={selectedTargets.indexOf(target) > -1}
                            />
                            <ListItemText primary={target} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleTargetDialogClose}>Cancel</Button>
                    <Button onClick={handleTargetDialogClose} color="primary">
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
