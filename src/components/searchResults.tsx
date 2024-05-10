import React, { useState, useEffect } from "react";
import { Typography, Grid, Link } from "@mui/material";

// SearchResult 타입 정의
interface SearchResult {
  dataNo: number;
  siteName: string;
  title: string;
  timestamp: string;
  link: string;
  contentText: string;
}

// API 파라미터 타입 정의
interface ApiParams {
  // 필요한 경우 API 호출을 위한 파라미터를 여기에 정의
}

function SearchResults({ searchResults }: { searchResults: SearchResult[] }) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // API 호출 코드 (임시로 주석 처리)
    /*
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(apiParams),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    */
    setLoading(false);
  }, [searchResults]); // searchResults가 변경될 때마다 호출

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid item xs={12}>
          <Typography variant="body1">Loading...</Typography>
        </Grid>
      ) : (
        searchResults.map((result) => (
          <SearchResultItem result={result} key={result.dataNo} />
        ))
      )}
    </Grid>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => (
  <Grid item xs={12}>
    <Typography variant="h6" gutterBottom>
      <Link href={result.link} target="_blank" rel="noopener noreferrer">
        {result.title}
      </Link>
    </Typography>
    <Typography variant="subtitle1" component="div">
      Site: {result.siteName} | Date: {result.timestamp}
    </Typography>
    <Typography variant="body1">{result.contentText}</Typography>
  </Grid>
);

export default SearchResults;
