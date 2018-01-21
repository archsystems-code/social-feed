import React from 'react';
import ReactTooltip from 'react-tooltip';
import renderHTML from 'react-render-html';
import reactStringReplace from 'react-string-replace';

const Post = ({element, id}) => {

  const renderBackgroundImage = (element) => {
    const reactEl = renderHTML(element);
    if (reactEl.type) {
      let instaImages = reactEl.props.srcSet.split(",");
      let instagramBg = instaImages[instaImages.length - 1];
      return { backgroundImage: `url(${instagramBg.split(" ")[0]})`, backgroundSize: "cover"};
    } else {
      let returnedElement = [];
      reactEl.forEach( el => {  
        if (el.type) {
          returnedElement.push(el);
        }
      });
      let twitterBg = returnedElement[1].props.src;
      return { backgroundImage: `url(${twitterBg})`, backgroundSize: "cover"};
    }
  }

  const makeTooltip = (element, i) => {
    const reactEl = renderHTML(element);
    if (reactEl.type === "img") {
      const text = reactEl.props.alt
      let replacedText
      replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <a key={match + i} href={match}>{match}</a>
      ))
      replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://instagram.com/${match}`}>@{match}</a>
      ))
      replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://www.instagram.com/explore/tags/${match}`}>#{match}</a>
      ))
      return <ReactTooltip key={id} type="light" id={i} aria-haspopup='true'>
        <p>{replacedText}</p>
        {reactEl}
      </ReactTooltip>
    } else {
      const reactEls = []
      reactEl.forEach(el => {
        if (el.type) {
          reactEls.push(el);
        }
      });
      return <ReactTooltip key={id} type="light" id={i} aria-haspopup='true'>
        {reactEls[0]}
        {reactEls[1]}
      </ReactTooltip>
    
    }
  }

  return (
    <div style={renderBackgroundImage(element)} className="Feed--brick" data-tip data-for={`post-${id}`} key={id}>
          {makeTooltip(element, `post-${id}`)}
    </div>
  )
}

export default Post;