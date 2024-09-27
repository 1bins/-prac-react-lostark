import 'assets/scss/calculator.scss';
import Character from "components/calculator/character";
import {useEffect, useMemo, useState} from "react";
import {characterList} from "utils/characterList";
import {clearGold} from "utils/cleargold";
import Raid from "components/calculator/raid";

const Calculator = () => {
  // ** states
  const [editList, setEditList] = useState(new Array(6).fill(null).map((_, i) => ({id: i + 1, isEdit: false})));
  const [charList, setCharList] = useState(characterList);
  const [raidCount, setRaidCount] = useState(0);

  // ** variables
  const editCharacterNumb = useMemo(() => (
      editList.find(item => item.isEdit === true)?.id
  ), [editList]);
  const handleDataSave = () => {
    localStorage.setItem('data', JSON.stringify(charList));
    alert('저장완료 하였습니다.')
  }

  useEffect(() => {
    const localData = localStorage.getItem('data');
    if (localData) {
      setCharList(JSON.parse(localData))
    }
  }, []);

  return(
      <main className="calc-wrap">
        <section id="calculator">
          <div className="calc-inner">
            {/* 캐릭터 리스트 */}
            <article className="character-wrap">
              {
                charList.map((character, idx) => (
                    <Character
                        key={character.id}
                        id={idx + 1}
                        characterInfo={charList.find(character => character.id === idx + 1)}
                        setCharacter={setCharList}
                        editList={editList}
                        setEditList={setEditList}
                        editCharacterNumb={editCharacterNumb}
                        raidCount={raidCount}
                        setRaidCount={setRaidCount}
                    />
                ))
              }
            </article>
            {/* 총 금액 */}
            <article className="total-wrap">
              <img src={require('assets/images/calculator/icon-gold.png')} alt="골드 이미지"/>
              <p className="total-gold">총 골드 <b>{charList.reduce((sum, group) => {
                return sum + group.raidList.reduce((innerSum, raid) => innerSum + raid.price, 0);
              }, 0).toLocaleString()}</b></p>
            </article>
            {/* 레이드 리스트 */}
            <article className="raid-wrap">
            {
                clearGold.map((raid, idx) => (
                    <Raid
                      key={idx}
                      id={raid.id}
                      name={raid.name}
                      img={raid.src}
                      gold={raid.gold}
                      setRaid={setCharList}
                      editCharacterNumb={editCharacterNumb}
                      raidCount={raidCount}
                      setRaidCount={setRaidCount}
                    />
                ))
              }
            </article>
            {/* 저장하기 버튼 */}
            <article className="button-wrap">
              <button type="button" className="btn-save" onClick={handleDataSave}>저장하기</button>
            </article>
          </div>
        </section>
      </main>
  )
}

export default Calculator;