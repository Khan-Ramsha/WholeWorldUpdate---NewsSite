import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
export default class News extends Component {
    constructor(props) {
        super(props);
        console.log("I am a bitcoin constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
    }
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/everything?q=bitcoin&pageSize=6&apiKey=2bb09eb25bd74ce5a2023ecb3ba8d36a';
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles,
             totalResults: parsedData.totalResults, 
             loading: false })

    }
    handleNext = async () => {
        console.log("NEXT");

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url = 'https://newsapi.org/v2/everything?q=bitcoin&pageSize=6&apiKey=2bb09eb25bd74ce5a2023ecb3ba8d36a';
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
        let url = 'https://newsapi.org/v2/everything?q=bitcoin&pageSize=6&apiKey=2bb09eb25bd74ce5a2023ecb3ba8d36a';
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
            <div className="container">
                <div className="col" style={{ height: '10%' }}>
                    <div className="my-2">A news website</div>
                    <h2 className=" d-flex justify-content-center my-5">News Monkey - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row mx-6">
                        {!this.state.loading && this.state.articles.map((element, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <Newsitem
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
        );
    }
}

