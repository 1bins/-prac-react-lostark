import 'assets/scss/calculator.scss';
import {cleargold} from "utils/cleargold";
import {useState} from "react";

const Calculator = () => {
  // ** state
  const [totalGold, setTotalGold] = useState(0);
  const initialState = Array.from({ length: 11 }, (_, idx) => ({ id: idx, clicked: false }));
  const [clickedRaid, setClickedRaid] = useState(initialState);

  // ** variables
  const handleGoldClick = (raid, level) => {
    if(clickedRaid.filter(elem => elem.clicked === true).length < 3){
      setTotalGold(prevState => prevState + level.price);
      const updatedClickedRaid = clickedRaid.map(item =>
          item.id === raid.id ? { ...item, clicked: true } : item
      );
      setClickedRaid(updatedClickedRaid);

      console.log(raid, level)
    } else {
      alert('캐릭터 당 3개의 엔드컨텐츠 골드 획득이 가능합니다')
    }
  }

  const getClickedItem = (idx) => {
    return clickedRaid.filter(elem => elem.id == idx);
  }
  const handleGoldReset = () => {
    const resetRaidClicked = clickedRaid.map(raid => ({
      ...raid,
      clicked: false
    }));

    setClickedRaid(resetRaidClicked);
    setTotalGold(0);
  }

  return(
      <main className="calc-wrap">
        <section id="onetouch">
          <div className="onetouch-inner">
            <h3>원터치 계산기</h3>
            <div className="raid-list">
              {cleargold.map(raid => (
                  <div className="raid" key={raid.id}>
                    <div className="img-box">
                      <img src={require(`assets/images/calculator/${raid.src}.jpg`)} alt={`${raid.name} 이미지`}/>
                    </div>
                    <div className="button-box">
                      {raid.gold.map((level, idx) => (
                          <button
                              type="button"
                              key={idx}
                              onClick={() => handleGoldClick(raid, level)}
                              disabled={getClickedItem(raid.id)[0].clicked}
                          ><b>{raid.name}</b> {level.level}</button>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
            <div className="temp">
              <div className="total-gold">
                <p className="text">총 골드 <span className="text-gold">{totalGold}</span></p>
                <button type="button" onClick={handleGoldReset}>초기화</button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Calculator;