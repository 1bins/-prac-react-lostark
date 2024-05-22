import {useState, useEffect} from "react";
import axiosDefault from "../../configs/axios";

const Island = () => {
  // ** state
  const [islandData, setIslandData] = useState(null);

  // ** variables
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosDefault.get(`/gamecontents/calendar`);
        return response.data;
      } catch(error) {
        throw error.response;
      }
    }
    fetchEventData()
        .then(response => setIslandData(response))
        .catch(error => {
          switch(error.status){
            case 503:
              break;
            default:
              console.log(error);
          }
        });
  }, []);

  const processedData = islandData?.filter(schedule =>
    String(schedule.StartTimes).split('T')[0] === today &&
    schedule.CategoryName === '모험 섬'
  );

  return(
      <section id="island">
        <div className="island-inner">
          <h3>오늘의 모험 섬</h3>
          <ul className="island-list">
            {processedData?.map((island, idx) => {
              return (
                <li key={`island_${idx}`}>
                  <div className="island-info">
                    <img src={island.ContentsIcon} alt={`${island.ContentsName} 이미지`}/>
                    <p className="title">{island.ContentsName}</p>
                  </div>
                  <div className="island-time">
                    {island.StartTimes.filter(times => times.split('T')[0] === today)
                        .map((time, idx) =>
                            <p key={`time_${idx}`} className={new Date(time) < new Date() ? 'over' : ''}>{time.split('T')[1].slice(0,5)}</p>
                        )
                    }
                  </div>
                  <ul className="island-rewards">
                    {island.RewardItems.map((reward, idx) =>
                      <li key={`reward_${idx}`}>
                        <img src={reward.Icon} alt={`${reward.Name} 이미지`}/>
                        <p className="hover">{reward.Name}</p>
                      </li>
                    )}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
  );
}

export default Island;