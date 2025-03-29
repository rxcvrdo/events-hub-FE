
import { Link } from "react-router-dom";

const NavigationTabs = () => {
  return (
    <nav>
      <ul>
        {/* Using relative paths causes them to be appended to the current URL */}
        {/* <li><Link to="admin/events">Events</Link></li> */}

        {/* Use absolute paths (leading slash) to navigate correctly */}
        <li><Link to="/admin/events">Events</Link></li>
        <li><Link to="/admin/bookings">Admin Bookings</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationTabs;
