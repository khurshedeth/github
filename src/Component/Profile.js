import React, { useState } from "react";
import DisplayTable from "./DisplayTable";

const Profile = () => {
  const [data, setdata] = useState({});
  const [username, setusername] = useState("");
  const [repositories, setrepositories] = useState([]);

  const onChangeHandler = (e) => {
    setusername(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const profile = await fetch(`https://api.github.com/users/${username}`);

    const profileJson = await profile.json();
    //console.log(profileJson);

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();

    if (profileJson) {
      setdata(profileJson);
      setrepositories(repoJson);
    }
  };

  return (
    <>
      <div style={{padding:20}}>
      <div className="ui search">
      <div className="ui icon input">
      <i className="search icon"></i>

        <input
        className="prompt"
          type="text"
          value={username}
          placeholder="Enter username here..."
          onChange={onChangeHandler}
        />
        </div>
        <button className="ui primary button" type="submit" onClick={onSubmitHandler}><i className="github icon "></i>Search</button>
        <DisplayTable data={data} repositories={repositories}/>
        </div>
        
       
      </div>
    </>
  );
};
export default Profile;
