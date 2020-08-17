import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import { STATES } from 'mongoose';

function App() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [location, setLocation] = useState('');
  const [public_repos, setPublicRepos] = useState('');
  const [avatar_url, setAvatar] = useState('');
  // This is the Repos Array from the User
  const [repos, setGithubRepos] = useState([]);



  const [search, setSearch] = useState('');

  // Implementing the Data into the states
  const setData = ({
    name,
    login,
    location,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setLogin(login);
    setLocation(location);
    setPublicRepos(public_repos);
    setAvatar(avatar_url);
  }

  // Calling imickovski username from the Github API 
  useEffect(() => {
    fetch("https://api.github.com/users/imickovski")
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setData(data)
      });
    // Calling the username's repos
    fetch("https://api.github.com/users/imickovski/repos")
      .then(res => res.json())
      .then(repos => {
        // console.log(repos)
        setGithubRepos(repos)
      });
  }, []);

  return (
    <div className="App">
      <h1>Github Search </h1>
      <form>
        <label htmlFor='repos'> Search Repos</label>
        <input
          type='text'
          name='repos'
          id='repos'
          placeholder='Find a repository'
          value={search}
        // onChange={handleNameChange}
        />
      </form>

      <div>
        <h1><img src={avatar_url} /></h1>
        <h1>{name}</h1>
        <h1>{login}</h1>
        <h1>{location}</h1>
        <h1>Repos: {public_repos}</h1>
      </div>

      <div>
        {repos.map(e =>
          <ul key={e.id}>
            <li>{e.name}</li>
          </ul>
        )}
      </div>

    </div>
  );
}

export default App;
