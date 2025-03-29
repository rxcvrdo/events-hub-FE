
import { useEffect, useState } from "react";
import usersGlobalStore, { UserStoreType } from "../../../store/users-store";
import { toast } from "react-toastify";
import { getEvents } from "../../../api-services/events-service";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";
import Filters from "./common/filters";
import Spinner from "../../../components/spinner";

const HomePage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",

  });
  const [loading, setLoading] = useState(false);
  const {currentUser} = usersGlobalStore() as UserStoreType

  const getData = async (filtersObj: any) => {
    try {
      setLoading(true)
      const response = await getEvents(filtersObj);
      setEvents(response.events);
    } catch (error:any) {
      toast.error("Error while fetching data", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getData({searchText: '', date: ''})
  }, []);

  if(loading){
    return <div className="flex h-screen justify-center items-center">
        <Spinner />
    </div>
}


  return (
    <div className="p-5">
      <p className="text-orange-500 text-xl font-bold"> Welcome, {currentUser?.name}!</p>
      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className="flex flex-col gap-7 mt-8">
        {events.map((event: any) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
