import '../../assets/scss/home.scss';
import News from "../../components/news";
import Events from "../../components/events";

const Home = () => {
  return (
      <main className="home-wrap">
        <News/>
        <Events/>
      </main>
  )
}

export default Home;