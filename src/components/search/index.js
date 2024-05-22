import {useState} from "react";
import {getCharacter} from "../../store/characterSlice";
import {useDispatch} from "react-redux";

const Search = () => {
  // ** state
  const [charName, setCharName] = useState('');

  // ** hooks
  const dispatch = useDispatch();

  // ** variables
  const handleSubmit = (value) => {
    dispatch(getCharacter(value))
        .unwrap()
        .catch((error) => {
            // 에러 분석
        });
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(charName);
    }
  }

  return(
      <section id="search">
        <div className="search-inner">
          <input
              type="text"
              placeholder="캐릭터명을 입력해주세요"
              value={charName}
              onChange={e => setCharName(e.target.value)}
              onKeyUp={e => handleKeyDown(e)}
          />
          <button
              type="button"
              onClick={() => handleSubmit(charName)}
          >검색하기
          </button>
        </div>
      </section>
  )
}

export default Search;