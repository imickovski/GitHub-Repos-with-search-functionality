import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [location, setLocation] = useState('');
  const [public_repos, setPublicRepos] = useState('');
  const [avatar_url, setAvatar] = useState('');
  // Repos Array from the User
  const [repos, setGithubRepos] = useState([]);
  // Search state for the search bar
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
        console.log(repos)
        setGithubRepos(repos)
      });
  }, []);

  const handleNameChange = event => {
    // console.log(event.target.value)
    setSearch(event.target.value)
  }

  // Filtering the Repos after search
  const filterRepos = repos.filter(repo => {
    // console.log(repo)
    if (handleNameChange) {
      return (repo.name.toLowerCase().includes(search.toLowerCase()));
    }
  })

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
          onChange={handleNameChange}
        />
      </form>

      <div className="profileAndRepos">

        {/* Rendering The User Data */}
        <div>
          <h1><img src={avatar_url} /></h1>
          <h1>{name}</h1>
          <h1>{login}</h1>
          <h1>{location}</h1>
          <h1>Repos: {public_repos}</h1>
        </div>

        {/* Rendering the list of the repos */}
        <div>
          {filterRepos.map(e =>
            <ul key={e.id}>
              <li>{e.name}</li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
