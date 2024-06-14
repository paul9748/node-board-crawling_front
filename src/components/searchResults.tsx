import React, { useState, useEffect, useRef, useCallback } from "react";
import { Typography, Grid, Link } from "@mui/material";
import axios from "axios";

// SearchResult 타입 정의
interface SearchResult {
  dataNo: number;
  siteName: string;
  title: string;
  timestamp: string;
  link: string;
  contentText: string;
}

const apiUrl = `${window.location.origin}:${process.env.APIPORT}/searchDataPage`; // 실제 API URL로 교체

function SearchResults({
  initialResults,
  keyword,
  startDate,
  endDate,
  selectedTargets,
}: {
  initialResults: SearchResult[];
  keyword: string;
  startDate: string;
  endDate: string;
  selectedTargets: string[];
}) {
  const [searchResults, setSearchResults] =
    useState<SearchResult[]>(initialResults);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [searchEnd, setSearchEnd] = useState<boolean>(false); // 추가
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreResults = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | string[]> = {
        keyword,
        startDate,
        endDate,
        page: page.toString(),
      };
      selectedTargets.forEach((target, index) => {
        params[`siteNames[${index}]`] = target;
      });

      const response = await axios.get<{ posts: SearchResult[] }>(apiUrl, {
        params,
      });

      if (response.data.posts.length === 0) {
        setSearchEnd(true); // 데이터가 비어 있으면 검색 종료 처리
      } else {
        setSearchResults((prevResults) => [
          ...prevResults,
          ...response.data.posts,
        ]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, keyword, startDate, endDate, selectedTargets]);

  const lastResultRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || searchEnd) return; // 검색 종료 상태일 때는 추가 로드 요청 무시
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreResults();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMoreResults, searchEnd]
  );

  useEffect(() => {
    setSearchResults(initialResults);
    setPage(1);
    setSearchEnd(false); // 초기화 시 검색 종료 상태 초기화
  }, [initialResults]);

  return (
    <Grid container spacing={2}>
      {searchResults.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="body1">검색 결과가 없습니다.</Typography>
        </Grid>
      ) : (
        searchResults.map((result, index) => {
          if (index === searchResults.length - 1) {
            return (
              <SearchResultItem
                ref={lastResultRef}
                result={result}
                key={result.dataNo}
              />
            );
          }
          return <SearchResultItem result={result} key={result.dataNo} />;
        })
      )}
      {searchEnd && (
        <Grid item xs={12}>
          <Typography variant="body1">End page</Typography>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12}>
          <Typography variant="body1">Loading...</Typography>
        </Grid>
      )}
    </Grid>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem = React.forwardRef<
  HTMLDivElement,
  SearchResultItemProps
>(({ result }, ref) => (
  <Grid item xs={12} ref={ref}>
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
));

export default SearchResults;
