import React, { useState, useEffect } from 'react';
import { Card, Icon, Image, Form } from 'semantic-ui-react';
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
  // Search state for the search bar for Repos
  const [searchRepo, setSearchRepo] = useState('');

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

  useEffect(() => {
    // Calling imickovski username from the Github API 
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


  const handleRepoChange = event => {
    // console.log(event.target.value)
    setSearchRepo(event.target.value)
  }

  // Filtering the Repos after search
  const filterRepos = repos.filter(repo => {
    // console.log(repo)
    if (handleRepoChange) {
      return (repo.name.toLowerCase().includes(searchRepo.toLowerCase()));
    }
  })

  // console.log(props)
  return (
    <>
      <div className='navbar'>Github Search </div>

      <div className='search'>        
        {/* Search field for the Repos */}
        <Form>
          <Form.Group>
            <Form.Input
              type='text'
              name='repos'
              id='repos'
              placeholder='Find a repository'
              value={searchRepo}
              onChange={handleRepoChange}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="profileAndRepos">
        {/* Rendering The User Data */}
        <div className='ui card'>
          <Card>
            <Image src={avatar_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                <span>{login}</span>
              </Card.Meta>
              <Card.Meta>
                <span>{location}</span>
              </Card.Meta>
              <Card.Description>
                Repositories: {public_repos}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />
                Followers: {followers}
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />
                Following: {following}
            </Card.Content>
          </Card>
        </div>

        {/* Rendering the list of the repos */}
        <div>
          My Repositories:
          {filterRepos.map(e =>
          <ul key={e.id}>
            <li>{e.name}</li>
          </ul>
        )}
        </div>
      </div>
    </>
  );
}

export default App;
