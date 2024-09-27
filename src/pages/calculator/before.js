import {useState, useEffect, useMemo} from "react";
import {cleargold} from "utils/cleargold";

import 'assets/scss/calculator.scss';

const Calculator = () => {
  // ** state
  const [isEdit, setIsEdit] = useState(false);
  const initialRaid = Array.from({ length: 11 }, (_, idx) => ({ id: idx, clicked: false }));
  const initialCharacters = Array.from({length: 6}, (_, idx) => ({ id: idx, class: '', raid: [], isEdit: false }));
  const [clickedRaid, setClickedRaid] = useState(initialRaid);
  const [characters, setCharacters] = useState(initialCharacters);

  // ** variables
  useEffect(() => {
    const anyCharacterInEditMode = characters.some((c) => c.isEdit);
    setIsEdit(anyCharacterInEditMode);
  }, [characters])

  const handleGoldClick = (raid, level) => {
    // 캐릭터 선택 alert
    if(!isEdit) {
      alert('편집할 캐릭터를 선택해주세요')
      return;
    }

    const clickedItems = clickedRaid.filter(elem => elem.clicked === true).length;
    const editingCharacter = characters.find((c) => c.isEdit);

    if(editingCharacter.raid.length < 3){
      const updatedClickedRaid = clickedRaid.map(item =>
          item.id === raid.id ? { ...item, clicked: true } : item
      );
      setClickedRaid(updatedClickedRaid);
      setCharacters(prevState => (
          prevState.map((character => character.isEdit ? {...character, raid: [...character.raid, {name: raid.name, level: level.level, price: level.price}]} : character))
      ))
      if (clickedItems === 2) {
        setCharacters(prevCharacters => (
            prevCharacters.map(character => ({...character, isEdit: false}))
        ));
      }
    } else {
      alert('캐릭터당 총 3개 레이드의 골드 획득이 가능합니다');
      setCharacters(prevState => (
          prevState.map((character => character.isEdit ? {...character, isEdit: false} : character))
      ))
    }
  }

  const updateCharacterEdit = (id) => {
    setCharacters(prevCharacters => {
      const updatedCharacters = prevCharacters.map(character =>
          character.id === id
              ? { ...character, isEdit: !character.isEdit }
              : character
      );

      const anyOtherCharacterEditing = updatedCharacters.some(c => c.id !== id && c.isEdit);

      if (anyOtherCharacterEditing) {
        alert('현재 다른 캐릭터가 편집중입니다');
        return prevCharacters;
      }

      setClickedRaid(prevState => (
          prevState.map(raid => ({...raid, clicked: false}))
      ));
      return updatedCharacters;
    });
  };


  const getClickedItem = (idx) => {
    return clickedRaid.filter(elem => elem.id === idx);
  }

  const totalPrice = useMemo(() => {
    return characters
        .flatMap(character => character.raid)
        .reduce((sum, raidItem) => sum + raidItem.price, 0);
  }, [characters]);

  return(
      <main className="calc-wrap">
        <section id="onetouch">
          <div className="onetouch-inner">
            <h3>원터치 계산기</h3>
            <div className="flex">
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
              <div className="character-list">
                {characters.map(character => (
                    <div className="character" key={character.id}>
                      <div className="profile">
                        {/*<div className="img-box">*/}
                        {/*  <img src={require('assets/images/calculator/char_sample.jpg')} alt="캐릭터 이미지 샘플"/>*/}
                        {/*</div>*/}
                        <p>캐릭터<span>{character.id + 1}</span></p>
                        <button type="button"
                                onClick={() => updateCharacterEdit(character.id)}>
                          <img src={require(`assets/images/calculator/icon-edit${character.isEdit ? 'ing' : ''}.png`)} alt="편집하기 아이콘"/>
                        </button>
                        {
                            character.isEdit &&
                            <span className="isEdit">(편집중)</span>
                        }
                      </div>
                      <div className="raids">
                        {character.raid.map((raid, idx) => (
                            <p key={idx}><b>{raid.name}</b>{raid.level}</p>
                        ))}
                      </div>
                      <div className="total-gold">
                        {character.raid.reduce((acc, cur) => {
                          return acc + cur.price
                        }, 0).toLocaleString()}
                      </div>
                    </div>
                ))}
                <div className="total-price">
                  {totalPrice.toLocaleString()}골드
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Calculator;