import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../../components/page-title'
import EventForm from '../common/event-form'
import { toast } from 'react-toastify'
import { getEventById } from '../../../../../api-services/events-service'
import { useParams } from 'react-router-dom'
import Spinner from '../../../../../components/spinner'

const EditEventPage = () => {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      // If your API returns { message, event }, use response.event
      setEventData(response.event || {});
    } catch (error) {
      console.error("Error getting event:", error);
      toast.error("Error getting event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className='mt-5'>
        <EventForm initialData={eventData} type='edit' />
      </div>
    </div>
  );
};

export default EditEventPage;
