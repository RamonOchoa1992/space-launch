import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="home-title">
        <div>
          <h1>Space Launch</h1>
          <Link to="/list" className="red">
            Upcoming Launch List
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
