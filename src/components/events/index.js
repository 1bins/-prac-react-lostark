import {useEffect, useState} from "react";
import axiosDefault from "../../configs/axios";
import {Link} from "react-router-dom";

const Events = () => {
  // ** state
  const [eventList, setEventList] = useState(null);

  // ** functions
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosDefault.get(`/news/events`);
        return response.data;
      } catch(error) {
        throw error.response;
      }
    }
    fetchEventData()
        .then(response => setEventList(response))
        .catch(error => {
          switch(error.status){
            case 503:
              setEventList([
                {
                  Title: '로스트아크 게임이 점검중입니다',
                  EndDate: new Date().toISOString().slice(0, 10)
                }
              ]);
              break;
            default:
              console.log(error);
          }
        });
  }, []);

  const dateFormat = dateTime => dateTime.slice(0, 10).replaceAll('-', '.');

  return(
      <section id="event">
        <div className="event-inner">
          <h3>로스트아크 이벤트</h3>
          <ul className="event-list">
            {eventList?.map((elem, idx) => {
              return(
                  <li key={`event_${idx}`}>
                    <Link to={elem.Link} target="_blank" title="새 탭으로 열기">
                      <div className="img-box">
                        <img src={elem.Thumbnail} alt={`${elem.Title} 썸네일 이미지`}/>
                      </div>
                      <div className="text-box">
                        <p className="title">{elem.Title}</p>
                        <p className="date">이벤트 종료일: {dateFormat(elem.EndDate)}</p>
                      </div>
                    </Link>
                  </li>
              )
            })}
          </ul>
        </div>
      </section>
  )
}

export default Events;