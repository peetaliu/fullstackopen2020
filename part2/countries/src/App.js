import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const apiUrl = "https://restcountries.eu/rest/v2/all";
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  //effects
  useEffect(() => {
    axios.get(apiUrl).then(res => {
      setCountries(res.data);
    });
  }, []);

  //event handlers
  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Search search={search} handler={handleSearch} />
      <Countries countries={countries} search={search} />
    </div>
  );
};

export default App;
