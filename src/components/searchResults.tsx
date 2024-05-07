import React, { useState, useEffect } from "react";
import { Typography, Grid, Link } from "@mui/material";

// 가정한 타입 설정
interface SearchResult {
  site: string;
  title: string;
  date: string;
  link: string;
  emotion: string;
  text: string;
}

interface ApiParams {
  // API 호출을 위한 파라미터 타입 설정
}

function SearchResults({ apiParams }: { apiParams: ApiParams }) {
  const [results, setResults] = useState<SearchResult[] | null>(null); // 결과 데이터의 초기 상태를 null로 설정
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    function fetchData() {
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
          setResults(prevResults =>
            prevResults !== null ? [...prevResults, ...data] : data
          );
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
      */

      // 예시 데이터를 사용하여 결과를 설정
      const exampleResults: SearchResult[] = [
        {
          site: "ExampleSite1",
          title: "Example Title 1",
          date: "2024-05-05",
          link: "https://www.example.com/page1",
          emotion: "Happy",
          text: "This is an example text for the first search result.",
        },
        {
          site: "ExampleSite2",
          title: "Example Title 2",
          date: "2024-05-06",
          link: "https://www.example.com/page2",
          emotion: "Sad",
          text: "This is an example text for the second search result.",
        },
      ];

      setResults((prevResults) =>
        prevResults !== null
          ? [...prevResults, ...exampleResults]
          : exampleResults
      );
      setLoading(false);
    }

    fetchData();

    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;

      fetchData();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [apiParams, loading]);

  return (
    <Grid container spacing={2}>
      {results !== null ? (
        results.map((result, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h6" gutterBottom>
              <Link
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </Link>
            </Typography>
            <Typography variant="subtitle1" component="div">
              {" "}
              {/* 여기서 Typography 대신에 component="div"를 사용하여 <div> 요소를 사용합니다. */}
              Site: {result.site} | Date: {result.date} | Emotion:{" "}
              {result.emotion}
            </Typography>
            <Typography variant="body1">{result.text}</Typography>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">Loading...</Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default SearchResults;
