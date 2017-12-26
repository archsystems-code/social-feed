import React, { Component } from "react";
import renderHTML from 'react-render-html';
import { CSSGrid, measureItems, makeResponsive } from "react-stonecutter";
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
    function runDownElement(el) {
      if (el.type === "img") {
        if (el.props.className && !el.props.className.includes("avatar")) {
          return <ReactTooltip id={i} aria-haspopup="true">
            {el}
          </ReactTooltip>;
        } else if (!el.props.className) {
          return <ReactTooltip id={i} aria-haspopup="true">
            {el}
          </ReactTooltip>;
        }
      } else if (el.props && el.props.children) {
        el.props.children.forEach(elem => {
          runDownElement(elem);
        });
      }
    }
    if (element.type === "img") {
      return <ReactTooltip id={i} aria-haspopup='true'>
        {element}
      </ReactTooltip>
    } else {
      element.forEach(el => {
        if (el.type) {
          runDownElement(el)
        }
      });
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
        {feed.posts ? <Grid component="ul" columnWidth={200} duration={800} columns={5}>
            {feed.posts.map((el, i) => {
              return <li data-tip data-for={`post-${i}`} key={i}>
                  {renderHTML(el)}
                  {this.makeTooltip(renderHTML(el), `post-${i}`)}
                </li>;
            })}
          </Grid> : null}
      </div>;
  }
}
 export default Feed;