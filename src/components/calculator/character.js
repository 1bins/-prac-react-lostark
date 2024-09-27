import {useEffect, useMemo, useState} from "react";
import axiosDefault from "../../configs/axios";
import classNames from "classnames/bind";
import {getProfileImg} from "utils/getProfileImg";

const Character = ({ setCharacter,
                     id,
                     characterInfo,
                     editList,
                     setEditList,
                     editCharacterNumb,
                     setRaidCount,
                     raidCount,
                     setModalOpen
}) => {
  //** state
  const [loading, setLoading] = useState(false);
  const [charName, setCharName] = useState('');
  const [charClass, setCharClass] = useState('');
  const [isFull, setIsFull] = useState(false);
  const isEdit =  editList.find(item => item.id === id).isEdit;

  //** variables
  useEffect(() => {
    setCharName(characterInfo.name);
    setCharClass(characterInfo.class);
  }, [characterInfo]);
  const hasCharacterClass = charClass.length > 0;
  useEffect(() => {
    setIsFull(characterInfo.raidList.length === 3);
  }, [characterInfo]);
  // 자동 저장기능
  useEffect(() => {
    if (raidCount === 3) {
      setEditList(list => list.map(elem => elem.id === id ? {...elem, isEdit: false} : elem));
      setRaidCount(0);
      setModalOpen(false);
    }
  }, [raidCount])
  // 랜덤 숫자 구하기
  const getRandomNumb = useMemo(() => {
    return parseInt(Math.random() * 3) + 1;
  }, [charClass]);
  // 랜덤 RGB 구하기
  const getRandomColor = useMemo(() => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0.65)`
  }, [charClass]);
  // 캐릭터 API 가져오기
  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axiosDefault.get(`/armories/characters/${charName}`);
      if (response.status !== 200) throw new Error();
      return response.data;
    } catch(error) {
      throw error.response;
    } finally {
      setLoading(false);
    }
  }
  // alert 및 초기화
  const commonAlert = (message) => {
    alert(message);
    setCharClass('');
    setCharName('');
  }
  // 캐릭터 버튼
  const handleCharacterButton = () => {
    if (isEdit) {
      // 캐릭터 레이드 개수 체크
      if (raidCount !== 3) {
        alert('세 개의 레이드를 선택해주세요.');
        return;
      }
    } else {
      if (isFull) {
        commonAlert('캐릭터 정보를 초기화합니다');
        setCharacter(list => list.map(character => character.id === id ? {...character, name: '', class: '', raidList: []} : character))
        return;
      }

      // 캐릭터 수정 함수
      setModalOpen(true);
      if (editCharacterNumb) {
        alert('이미 다른 캐릭터가 골드 계산을 진행중입니다')
        return;
      }
      setEditList(list => list.map(elem => elem.id === id ? {...elem, isEdit: true} : elem));
    }
  }
  // 캐릭터 검색_input Enter
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      if(charName.length > 1) {
        getCharacter().then(response => {
          if (response) {
            let characterClass = response.ArmoryProfile.CharacterClassName;
            setCharClass(characterClass);
            setCharacter(list => list.map(character => character.id === id ? {...character, name: charName, class: characterClass} : character))
          } else {
            commonAlert('존재하지 않는 캐릭터입니다');
          }
        });
      } else {
        commonAlert('두 글자 이상 입력해주세요');
      }
    }
  }

  return(
      <div className="character-box">
        {
          loading &&
            <div className="loader-box">
              <div className="loader loader-3">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
              </div>
            </div>
        }
        {
          hasCharacterClass &&
            <div className="button-box">
              <button onClick={handleCharacterButton}>
                <img src={require(`assets/images/calculator/button-${isEdit ? 'ing' : isFull ? 'reset' : 'edit'}.png`)} alt="버튼 아이콘"/>
              </button>
            </div>
        }
        <div className="profile-box">
          {
            hasCharacterClass ?
                <img src={require(`assets/images/calculator/class/${getProfileImg(charClass)}.png`)} alt="캐릭터 프로필 이미지"/>
                :
                <img src={require(`assets/images/calculator/class/None${getRandomNumb}.png`)} alt="캐릭터 프로필 이미지"/>
          }
        </div>
        <div className={classNames("input-box", {"active" : hasCharacterClass})}>
          <input
              type="text"
              placeholder="캐릭터명입력"
              value={charName}
              onChange={e => setCharName(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
              readOnly={charClass.length > 0}
          />
        </div>
        <div className="raidList-box">
          {
            [0, 1, 2].map((index) => (
                <p key={index} className={classNames("raid-name", { "selected": characterInfo.raidList[index] })}>
                  {characterInfo.raidList[index]
                      ? `${characterInfo.raidList[index].name} ${characterInfo.raidList[index].level}`
                      : "미선택"}
                </p>
            ))
          }
        </div>
        <div className="gold-box">
          <img src={require('assets/images/calculator/icon-gold.png')} alt="골드 이미지"/>
          <p className="gold">{characterInfo.raidList.reduce((sum, raid) => sum + raid.price, 0).toLocaleString()}</p>
        </div>
        <div className="deco-box" style={{'backgroundColor': hasCharacterClass ? getRandomColor : '#d9d9d9'}}></div>
      </div>
  )
}

export default Character;