import React from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchKeyword,
  onSearchKeywordChange,
  onSearch,
}) => {
  return (
    <Container
      style={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="Search Keyword"
            variant="outlined"
            fullWidth
            value={searchKeyword}
            onChange={(e) => onSearchKeywordChange(e.target.value)}
            style={{
              marginBottom: "20px",
              backgroundColor: "#fff",
              borderRadius: "4px",
            }} // 둥근 테두리 추가
            InputLabelProps={{
              style: { color: "#000" }, // 입력창 라벨 색상
            }}
            InputProps={{
              style: { color: "#000", borderRadius: "4px" }, // 입력 텍스트 색상과 둥근 테두리 추가
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={onSearch}
            style={{ marginBottom: "20px", height: "100%", marginLeft: "10px" }} // 입력창과 버튼 사이 간격 추가
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchBar;
