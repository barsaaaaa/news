import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl,author,date } = this.props;
        // above list carries all the props it is also called destrusturing
        return (
            <div>
                <div className="card my-3" style={{ width: "19rem" }}>
                    <img src={!imageUrl ? 'https://neurosciencenews.com/files/2022/11/flavanols-cognition-neurosince-spublic.jpg' : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-primary">Read more</a>
                    </div>
                    <div className="card-footer text-muted">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</div>
                </div>
            </div>
        )
    }
}
