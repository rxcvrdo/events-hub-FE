
import { EventType } from '../../../../interfaces'
import { Button } from 'antd'
import { MapPin, Timer } from 'lucide-react'
import { getDateTimeFormat } from '../../../../helpers/date-time-formats'
import { useNavigate } from 'react-router-dom'

const EventCard = ({event}: {
    event: EventType
}) => {
    const mainImage = event.media[0]
    const navigate = useNavigate()

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 border border-gray-200 rounded-md shadow-md items-center gap-5'>
    <div className="col-span-1">
        <img src={mainImage} alt="event" className="w-full h-58 object-cover rounded-l" />
    </div>
    <div className="col-span-2 flex flex-col p-4 gap-4">
        <h1 className="text-lg font-bold text-orange-500">
            {event.name}
        </h1>
        <p className="text-gray-600 text-sm line-clamp-3">
            {event.description}
        </p>
        <div className="flex justify-between items-center">
            <div className='bg-gray-300 p-2 rounded flex flex-col gap-1'>
                <div className="flex gap-2 items-center">
                    <MapPin size={20} />
                    <p className=' text-xs'>{event.address} {event.city} {event.postcode} </p>
                </div>

                <div className="flex gap-2 items-center">
                    <Timer size={20} />
                    <p className='text-xs'>{getDateTimeFormat(`${event.date} ${event.time}`)}
                    </p>
                </div>
            </div>
            <Button
            onClick={() => navigate(`/event/${event._id}`)}
            >View Event</Button>
        </div>
    </div>
    </div>
  )
}

export default EventCard