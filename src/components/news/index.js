import {useEffect, useState} from "react";
import axiosDefault from "../../configs/axios";
import {Link} from "react-router-dom";

const News = () => {
  // ** state
  const [newsList, setNewsList] = useState(null);

  // ** varibales
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axiosDefault.get(`/news/notices`);
        return response.data;
      } catch(error) {
        throw error
      }
    }
    fetchNewsData()
        .then(response => setNewsList(response.slice(0, 6)))
        .catch(error => console.log(error));
  }, []);

  const dateFormat = dateTime => dateTime.slice(0, 10).replaceAll('-', '.');
  const noticeTypeFormat = noticeType => {
    switch(noticeType){
      case '공지':
        return 'type-notce'
      case '상점':
        return 'type-shop'
      case '점검':
        return 'type-check'
      case '이벤트':
        return 'type-event'
      default:
        break;
    }
  }

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
                      <span className={['type', noticeTypeFormat(elem.Type)].join(' ')}>{elem.Type}</span>
                      {dateFormat(elem.Date)}
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