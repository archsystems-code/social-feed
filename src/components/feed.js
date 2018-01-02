import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';
import { FacebookLoader, InstagramLoader } from './Loading/feed';
import './packery-mode.js';
import Isotope from 'isotope-layout';
import Post from './post.js';
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
  
  startRandomHover() {
    const calculatePosition = (el) => {
      const getPosition = (el) => {
        let xPos = 0;
        let yPos = 0;
        
        while (el) {
          if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            const yScroll = el.scrollTop || document.documentElement.scrollTop;
            
            xPos += el.offsetLeft - xScroll + el.clientLeft;
            yPos += el.offsetTop - yScroll + el.clientTop;
          } else {
            // for all other non-BODY elements
            xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
            yPos += el.offsetTop - el.scrollTop + el.clientTop;
          }
          
          el = el.offsetParent;
        }
        return { x: xPos, y: yPos };
      }
      const getQuadrant = (x, y, width, height) => {
        let vertical = "";
        let horizontal = "";
        if (y < height / 2) {
          vertical = "top";
        } else {
          vertical = "bottom";
        }
        if (x < width / 2) {
          horizontal = "left";
        } else {
          horizontal = "right";
        }
        return vertical + horizontal;
      }
      const position = getPosition(el);
      return getQuadrant(position.x, position.y, window.innerWidth, window.innerHeight);
    }

    const isInViewport = (el) => {
      const top = el.getBoundingClientRect().top;
      return top >= 0 && top <= window.innerHeight;
    }
    
    const hoverRandomPost = () => {
      const posts = Array.from(document.getElementsByClassName("Feed--brick"));
      posts.forEach(element => {    
        ReactTooltip.hide(element);
      });
      const randomPost = posts[Math.floor(Math.random()*posts.length)];
      const tooltipPosition = calculatePosition(randomPost);
      const isVisible = isInViewport(randomPost);
      if (isVisible) {
        switch (tooltipPosition) {
          case "topleft":
            randomPost.dataset.place = "bottom";
            randomPost.dataset.offset = "{'right': 250}";
            break;
          case "topright":
            randomPost.dataset.place = "bottom";
            randomPost.dataset.offset = "{'left': 250}";
            break; 
          case "bottomleft":
            randomPost.dataset.place = "top";
            randomPost.dataset.offset = "{'right': 250}";
            break;
          case "bottomright": 
            randomPost.dataset.place = "top";
            randomPost.dataset.offset = "{'left': 250}";
            break;
          default:
            console.log("nothing to do");
            break;
        }
      }     
      ReactTooltip.show(randomPost)
    }
    setInterval(hoverRandomPost, 8000)
  }
  
  initIsoPackery() {
    const iso = new Isotope('.Feed', {
      layoutMode: 'packery',
      itemSelector: '.Feed--brick'
    })
    iso.on( 'layoutComplete', this.startRandomHover());
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.feed.posts) {
      this.initIsoPackery();
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
    .then(data => this.setState({feed: data, isLoading: false }))
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
      return <Post key={i} element={el} id={i} />
    }) : null}
    <div className="Feed--overlay"></div>
    </div>;
  }
}
export default Feed;