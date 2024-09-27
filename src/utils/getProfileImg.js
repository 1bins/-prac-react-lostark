export const getProfileImg = (character) => {
  let result = '';

  switch (character) {
    // 슈샤이어
    case '버서커':
      result = 'Berserker';
      break;
    case '워로드':
      result = 'Warlord';
      break;
    case '디스트로이어':
      result = 'Destroyer';
      break;
    case '홀리나이트':
      result = 'HolyKnight';
      break;
    case '슬레이어':
      result = 'Slayer';
      break;
    // 실린
    case '서머너':
      result = 'Summoner';
      break;
    case '아르카나':
      result = 'Arcana';
      break;
    case '소서리스':
      result = 'Sorceress';
      break;
    case '바드':
      result = 'Bard';
      break;
    // 애니츠
    case '배틀마스터':
      result = 'BattleMaster';
      break;
    case '인파이터':
      result = 'Infighter';
      break;
    case '기공사':
      result = 'SoulMaster';
      break;
    case '창술사':
      result = 'LanceMaster';
      break;
    case '스트라이커':
      result = 'Striker';
      break;
    case '브레이커':
      result = 'Breaker';
      break;
    // 아르데타인
    case '데빌헌터':
      result = 'DevilHunter';
      break;
    case '블래스터':
      result = 'Blaster';
      break;
    case '호크아이':
      result = 'HawkEye';
      break;
    case '스카우터':
      result = 'Scouter';
      break;
    case '건슬링어':
      result = 'Gunslinger';
      break;
    // 데런
    case '데모닉':
      result = 'Demonic';
      break;
    case '블레이드':
      result = 'Blade';
      break;
    case '리퍼':
      result = 'Reaper';
      break;
    case '소울이터':
      result = 'SoulEater';
      break;
    // 요즈
    case '도화가':
      result = 'Artist';
      break;
    case '기상술사':
      result = 'WeatherArtist';
      break;
    default:
      result = 'Berserker';
  }

  return result;
}