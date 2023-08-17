import React, { Component } from "react";
import SourceItems from "./SourceItems";
import Spinner from './Spinner';
export default class Sources extends Component {
    constructor(props) {
        super(props);
        console.log("I am source constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
    }
    async componentDidMount() {
        let url ="https://newsapi.org/v2/top-headlines/sources?&apiKey=2bb09eb25bd74ce5a2023ecb3ba8d36a";
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.sources ,
             totalResults: parsedData.totalResults, loading: false })

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
                                <SourceItems
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
          
            </div>
        );
    }
}

