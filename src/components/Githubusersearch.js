import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  align-items: center;
  margin: 100px;
`;
const Input = styled.input`
  background-color: #383838;
  border: 1ex solid none;
  border-top-width: 1.7em;

  color: wheat;
  word-wrap: break-word;
  outline: 7px solid #383838;
  height: 30px;
  width: auto;
  font-size: 20px;
  text-align: center;
  transition: all 1s;
  width: 190px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
`;

const Button = styled.button`
  --color: #0077ff;
  font-family: inherit;
  display: inline-block;
  width: 6em;
  height: 2.6em;
  line-height: 2.6em;
  overflow: hidden;
  margin: 20px;
  font-size: 17px;
  position: relative;
  background: var(--color);
  border-radius: 40px;
`;

const SearchResult = styled.li`
  margin-bottom: 10px;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  text-align: center;
  color: blanchedalmond;
  list-style: none;
`;

const Div = styled.div`
  align-items: center;
  position: relative;
`;

const Githubusersearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={searchTerm} onChange={handleChange} />
        <Button type="submit">Search</Button>
      </Form>
      <ul>
        {searchResults.map((user) => (
          <SearchResult key={user.id}>
            <a href={user.html_url}>{user.login}</a>
          </SearchResult>
        ))}
      </ul>
    </Div>
  );
};

export default Githubusersearch;
