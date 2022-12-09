import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {


  async update() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  handlePrev = async () => {
    this.setState({page: this.state.page - 1})
    this.update();

  }
  handleNext = async () => {
    this.setState({page: this.state.page + 1})
    this.update();
    }

  async componentDidMount() {
      this.update();
      // inside class so this hav eto be used 
  }

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      // loading: false,
      page: 1
    }
  }


  render() {
    return (
      <div className='container my-3' >
        <h2 className='heading'>NewsBlog</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 40) : ''} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          }
          )}{/* <div className="col-md-4">
          <NewsItem title='hot news' description='this is the new news' imageUrl='https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/TUTJCAW5KK5JZH6PWS3VIBAEUI.jpg&w=1440' />
        </div> */}
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className='btn ' type="button" class="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn ' type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </div >
    )
  }
}
