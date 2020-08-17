import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [location, setLocation] = useState('');
  const [public_repos, setPublicRepos] = useState('');
  const [avatar_url, setAvatar] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
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
    followers,
    following,
  }) => {
    setName(name);
    setLogin(login);
    setLocation(location);
    setPublicRepos(public_repos);
    setAvatar(avatar_url);
    setFollowers(followers);
    setFollowing(following);
  }

  // Calling imickovski username from the Github API 
  useEffect(() => {
    fetch("https://api.github.com/users/imickovski")
      .then(res => res.json())
      .then(data => {
        console.log(data)
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
          <h3><img src={avatar_url} /></h3>
          <h3>{name}</h3>
          <h3>{login}</h3>
          <h3>Location: {location}</h3>
          <h3>Repos: {public_repos}</h3>
          <h3>Followers: {followers}</h3>
          <h3>Following: {following}</h3>
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
