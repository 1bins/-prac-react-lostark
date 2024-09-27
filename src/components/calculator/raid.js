import classNames from "classnames/bind";
import {useEffect, useState} from "react";

const Raid = ({ id,
                name,
                img,
                gold,
                setRaid,
                editCharacterNumb,
                raidCount,
                setRaidCount
}) => {
  // ** states
  const [isChecked, setIsChecked] = useState(false);

  // ** variables
  useEffect(() => {
    if (raidCount === 0) {
      setIsChecked(false);
    }
  }, [raidCount]);
  const handleRaidCount = (name, raid) => {
    if (!editCharacterNumb) {
      alert('캐릭터를 먼저 선택해주세요')
      return;
    }

    if (raidCount >= 3) {
      alert('한 캐릭터 당 세 개의 레이드만 선택가능합니다')
      return;
    }

    setRaid(character => character.map(item => (
      item.id === editCharacterNumb ? {...item, raidList: [...item.raidList, {...raid, name}]} : item
    )))
    setIsChecked(true);
    setRaidCount(raidCount + 1);
  }

  return (
    <div className={classNames("raid-box", `raid-box${id}`, {'checked': isChecked})}>
      <div className="raid-img-box">
        <img src={require(`assets/images/calculator/${img}.jpg`)} alt="레이드 이미지"/>
      </div>
      <div className="raid-name-box">
        <p>{name}</p>
      </div>
      <div className="raid-gold-box">
        {
          gold.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {handleRaidCount(name, item)}}
                className={classNames({"normal" : item.level.includes('노말')}, {"hard" : item.level.includes('하드')})}
              >{item.level}</button>
          ))
        }
      </div>
    </div>
  )
}
export default Raid;