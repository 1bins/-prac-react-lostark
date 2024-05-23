import {useSelector} from "react-redux";
const Profile = () => {
  // ** store
  const data = useSelector(state => state.character.characterProfile)
  const profileData = data?.ArmoryProfile

  // ** variables
  const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }

  return(
      <article id="profile">
        <div className="profile-inner">
          <div className="server-box">
            <p className="server">{profileData.ServerName}</p>
            <p className="class">{profileData.CharacterClassName}</p>
          </div>
          <div className="info-box">
            <p className="level">{profileData.ItemAvgLevel}</p>
            <p className="name">{profileData.CharacterName}
              <span>{profileData.Title}</span>
            </p>
          </div>
          <div className="img-box">
            <span className="effect" style={{'background': randomColor()}}></span>
            {profileData.CharacterImage && <img src={profileData.CharacterImage} alt="캐릭터 이미지"/>}
          </div>
        </div>
      </article>
  )
}

export default Profile;