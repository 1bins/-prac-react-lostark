import 'assets/scss/home.scss';
import News from "components/news";
import Events from "components/events";
import Island from "components/island";

const Home = () => {
  return (
      <main className="home-wrap">
        <div className="left-inner">
          <News/>
          <Events/>
        </div>
        <div className="right-inner">
          <Island/>
        </div>
      </main>
  )
}

export default Home;