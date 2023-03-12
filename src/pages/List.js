import { Link } from "react-router-dom";
import UpcomingList from "../components/UpcomingList";
import rocket from "../images/rocket.png";

const List = () => {
  return (
    <div>
      <main className="list-main">
        <header className="list-header">
          <Link to="/">
            <img src={rocket} alt="" title="Back to Home" />
          </Link>
          <h1>Upcoming Launch List</h1>
        </header>
        <section className="list-section">
          <UpcomingList />
        </section>
      </main>
    </div>
  );
};

export default List;
