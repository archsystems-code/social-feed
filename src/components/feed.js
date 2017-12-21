import React, { Component } from "react";
import renderHTML from 'react-render-html';
import { CSSGrid, measureItems, makeResponsive } from "react-stonecutter";
import "./feed.css"

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isLoading: false,
      error: null
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
    const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
      maxWidth: 1920
    });
    if (error) {
      return <div className="Feed">
          <iframe title="wallsio" allowFullScreen="" id="wallsio-iframe" src="https://walls.io/u6nur?nobackground=1&amp;theme=fluid&amp;hide_header=1" style={{ border: "0", height: "800px", width: "100%" }} />
        </div>;
    }
    if (isLoading) {
      return <p>Loading Feed...</p>;
    }

    return <div className="Feed">
        {feed.posts ? <Grid component="ul" columnWidth={200} duration={800} columns={5}>
            {feed.posts.map((el, i) => {
              return <li key={i}>{renderHTML(el)}</li>;
            })}
          </Grid> : null}
      </div>;
  }
}
 export default Feed;