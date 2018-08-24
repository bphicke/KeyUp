import React from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>UserProfile component</p>
        <Link to="/favorites">Go to favorites</Link>
      </div>
    )
  }
}

export default UserProfile;