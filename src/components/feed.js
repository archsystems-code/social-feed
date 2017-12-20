import React, { Component } from "react";
import renderHTML from 'react-render-html';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isLoading: false,
      error: null,
    }
  }
  
  componentDidMount() {
    this.setState({ isLoading: true});

    fetch("https://asi-social-feed.herokuapp.com/api/v1/feed")
    .then( response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong...");
      }
    })
    .then(data => this.setState({feed: data, isLoading: false}))
    .catch(error => this.setState({error, isLoading: false}));
  }
  render() {
    const { feed, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading Feed...</p>;
    }
    console.log(feed)
    return (
      <div className="Feed">
        <ul>
          <li>Twitter</li>
          {feed.twitter_html ? renderHTML(feed.twitter_html) : null}
        </ul>
      </div>
    );
  }
}
 export default Feed;