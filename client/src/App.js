import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { STATES } from 'mongoose';

function App() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [location, setLocation] = useState('');
  const [public_repos, setRepos] = useState('');
  const [avatar_url, setAvatar] = useState('');



  const [search, setSearch] = useState('');

  // Calling imickovski username from the Github API 
  useEffect(() => {
    fetch('https://api.github.com/users/imickovski')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
      });
  }, [])

  const setData = ({
    name,
    login,
    location,
    public_repos,
    avatar_url
  }) => {
    setName(name);
    setLogin(login);
    setLocation(location);
    setRepos(public_repos);
    setAvatar(avatar_url);
  }

  // useEffect(() => {
  //   fetch('"https://api.github.com/users/example/repos"')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  // }, [])

  return (
    <div className="App">
      <h1>Github Search </h1>
      <form>
        <label htmlfor='repos'> Search Repos</label>
        <input
          type='text'
          name='repos'
          id='repos'
        // value={state.search}
        // onChange={handleNameChange}
        />
      </form>
    </div>
  );
}

export default App;
