import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent:'flex-end',position:'absolute',right:0}}>
          <span key="name" className=" badge rounded-pill bg-danger" >
            {source}
          </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://cdn.pixabay.com/photo/2016/07/19/08/00/system-1527687_1280.jpg"
                : imageUrl
            }
            className="card-img-top"

            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-info text-info">
                By {!author ? "Unknoen" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_bank"
              className="btn btn-sm btn-outline-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
