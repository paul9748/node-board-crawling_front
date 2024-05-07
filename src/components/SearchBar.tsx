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
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid xs={8}>
          <TextField
            label="Search Keyword"
            variant="outlined"
            fullWidth
            value={searchKeyword}
            onChange={(e) => onSearchKeywordChange(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid xs={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={onSearch}
            style={{ marginBottom: "20px", height: "100%" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchBar;
