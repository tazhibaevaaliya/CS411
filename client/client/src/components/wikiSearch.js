import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function WikiSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    console.log(search);
    const options = {
      method: "GET",
      url: "http://localhost:4000/wikipedia",
      params: { artistName: search },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response);
        setResults(response.data.query.search);
        setSearchInfo(response.data.query.searchinfo);
        console.log(searchInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="wikiSearch">
      <header>
        <h1>Wiki Seeker</h1>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WikiSearch;
