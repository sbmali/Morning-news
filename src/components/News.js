import React, { useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArtiacals] =useState([])
  const [loading, setLoading] =useState(true)
  const [page, setPage] =useState(1)
  const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

  const updateNews= async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey} &page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArtiacals(parsedData.articles)
    setTotalResults(parsedData.totalResult)
    setLoading(false)

    props.setProgress(100)
  }
  useEffect(()=>{
     document.title = `${capitalizeFirstLetter(props.category)} - NewsWeb`;
    updateNews();
  },[])
  // const handlePrevClick = async () => {
  //   console.log("Previous");
  //   setPage(page+1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  //   console.log("Next");
    
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey} &page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArtiacals(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:'90px' }}>
          NewsWeb - Top {capitalizeFirstLetter(props.category)}{" "}
          Headline
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  contury: "in",
  pageSize: 6,
  category: "general",
};
News.propsType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
