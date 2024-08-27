import {useSelector} from "react-redux";
import Search from "components/search";
import Profile from "components/character/profile";
import 'assets/scss/character.scss';

const Character = () => {
  // ** store
  const data = useSelector(state => state.character.characterProfile)

  // 캐릭터 조회 성공
  return (
      <main className="character-wrap">
        <section id="character">
          <h3 className="-offscreen">캐릭터 조회 박스</h3>
          <div className="character-inner">
            <div className="character-left-area">
              {data === null
                  ? <div className="character-error-area">
                      <img src={require('assets/images/character/not-fount-mococo.webp')} alt="캐릭터 미존재시 이미지"/>
                        존재하지 않는 캐릭터입니다.
                   </div>
                  : JSON.stringify(data) === "{}"
                      ? <div className="character-error-area">캐릭터명을 입력하고 내 캐릭터를 조회해보세요.</div>
                      :
                      <div className="character-area">
                        <Profile/>
                      </div>
              }
            </div>
            <div className="character-right-area">
              <Search/>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Character;