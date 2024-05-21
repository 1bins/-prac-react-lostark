import {useEffect, useState} from "react";
import axiosDefault from "../../configs/axios";
import {Link} from "react-router-dom";

const News = () => {
  // ** state
  const [newsList, setNewsList] = useState(null);

  // ** functions
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axiosDefault.get(`/news/notices`);
        setNewsList(response.data.slice(0, 8));
      } catch(error) {
        console.log(error);
      }
    }
    fetchNewsData();
  }, []);

  return(
    <section id="news">
      <div className="news-inner">
        <h3>로스트아크 공지사항</h3>
        <ul className="news-list">
          {newsList?.map((elem, idx) => {
            return(
                <li key={`news_${idx}`}>
                  <Link to={elem.Link} target="_blank" title="새 탭으로 열기">
                    <p className="title">{elem.Title}</p>
                    <p className="date">
                      <span className="type">{elem.type}</span>
                      {elem.Date}
                    </p>
                  </Link>
                </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default News;