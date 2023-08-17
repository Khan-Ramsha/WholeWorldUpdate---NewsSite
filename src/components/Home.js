import React, { Component } from "react";
import Homeitem from "./Homeitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class Home extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }
    constructor(props) {
        super(props);
        console.log("I am home constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a83caf7ab1e44b7791ea8ca0794fa16e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })


    }
    handleNext = async () => {
        console.log("NEXT");

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a83caf7ab1e44b7791ea8ca0794fa16e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false

            })
        }
    }

    handlePrevious = async () => {
        console.log("PREVIOUS");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a83caf7ab1e44b7791ea8ca0794fa16e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    render() {
        return (
            <>
            <div className="container">
                <div className="col" style={{ height: '10%' }}>
                    <div className="my-2">A news website</div>
                    <h2 className=" d-flex justify-content-center my-5">News Monkey - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row mx-6">
                        {!this.state.loading && this.state.articles.map((element, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <Homeitem
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handlePrevious}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next  &rarr;</button>
                </div>
            </div>


            </>
        );
    }
}
