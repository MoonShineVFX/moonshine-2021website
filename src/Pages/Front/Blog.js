import React,{useState,useEffect} from 'react'

function Blog() {
  const mediumRssFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/moonshinevfx"
  const MAX_ARTICLES = 10;
  const [articles, setArticles] = useState();
  // 讀取 medium 文章
  useEffect(() => {
    const loadArticles = async () => {
      fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item) => item.title.length > 0))
        .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
        .then((articles) => setArticles(articles))
        .catch((error) => console.log(error));
    };
    loadArticles();
    }, [MAX_ARTICLES]);
  return (
    <div className="cContainter">
      <div className="jsonContent mt30">
        {
          articles ? 
          articles.map((item,index)=>{
            console.log(item)
            const{guid,thumbnail,title,link,description,pubDate} = item
            return(
              <div className="blogCard animate__animated animate__fadeIn" key={guid}>
                <a href={link} className="thumb" style={{backgroundImage:`url(${thumbnail})`}} target="_blank" rel="noreferrer" ></a>
                <div className="blogCard-body">
                  <h5 className="blogCard-title"><a href={link} target="_blank" rel="noreferrer" >{title}</a></h5>
                  <div className="blogCard-text">{description.replace(/(<([^>]+)>)/ig,"").substr(0,120)}...</div>
                  <div className="blogCard-date">{pubDate.substr(0,10)}</div>
                </div>
              </div>

            )
          }):<div>目前還沒有文章</div>
        }
      </div>
      
    </div>
  )
}

export default Blog
