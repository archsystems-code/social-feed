import React, { Component } from "react";
import renderHTML from 'react-render-html';
import ReactTooltip from 'react-tooltip';
import { FacebookLoader, InstagramLoader } from './Loading/feed';
import "./feed.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isLoading: false,
      error: null
    }
  }

  makeTooltip(element, i) {
    const reactEl = renderHTML(element);
    if (reactEl.type === "img") {
      return <ReactTooltip type="light" id={i} aria-haspopup='true'>
        <p>{reactEl.props.alt}</p>
        {reactEl}
      </ReactTooltip>
    } else {
      const reactEls = []
      reactEl.forEach(el => {
        if (el.type) {
          reactEls.push(el);
        }
      });
      return <ReactTooltip type="light" id={i} aria-haspopup='true'>
        {reactEls[0]}
        {reactEls[1]}
      </ReactTooltip>
    
    }
  }

  renderImage(element) {
    const reactEl = renderHTML(element);
    if (reactEl.type) {
      return reactEl;
    } else {
      let returnedElement = [];
      reactEl.forEach( el => {  
        if (el.type) {
          returnedElement.push(el);
        }
      });
      return returnedElement[1];
    }
  }

  startRandomHover() {
    const hoverRandomPost = () => {
      const posts = Array.from(document.getElementsByClassName("Feed--brick"));
      posts.forEach(element => {    
        ReactTooltip.hide(element);
      });
      const randomPost = posts[Math.floor(Math.random()*posts.length)];
      ReactTooltip.show(randomPost)
    }
    setInterval(hoverRandomPost, 8000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.feed.posts) {
      this.startRandomHover();
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
      return <div className="Feed">
          <iframe title="wallsio" allowFullScreen="" id="wallsio-iframe" src="https://walls.io/u6nur?nobackground=1&amp;theme=fluid&amp;hide_header=1" style={{ border: "0", height: "800px", width: "100%" }} />
        </div>;
    }
    if (isLoading) {
      return <div className="Feed--loading">
        <FacebookLoader/>
        <FacebookLoader/>
        <FacebookLoader/>
        <InstagramLoader/>
        <InstagramLoader/>
        <InstagramLoader/>
        <FacebookLoader/>
        <FacebookLoader/>
        <FacebookLoader/>
      </div>;
    }

    return <div className="Feed">
        {feed.posts ? feed.posts.map((el, i) => {
          return <div className="Feed--brick" data-tip data-for={`post-${i}`} key={i}>
                    {this.renderImage(el)}
                    {this.makeTooltip(el, `post-${i}`)}
          </div>;
        }) : null}
      </div>;
  }
}
 export default Feed;