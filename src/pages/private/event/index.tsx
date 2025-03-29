import React, { useEffect, useState } from 'react'
import { EventType } from '../../../interfaces'
import { getEventById } from '../../../api-services/events-service'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/spinner'
import { MapPin, Timer } from 'lucide-react'
import { getDateTimeFormat } from '../../../helpers/date-time-formats'
import { Image } from 'antd'
import TicketsSelection from './common/ticket-selection'

const EventInfoPage = () => {
    const [eventData, setEventData] = useState<EventType | null>(null)
    const [loading, setLoading] = useState(false)
    const params:any = useParams()

    const getData = async () => {
        try {
            setLoading(true)
            const response = await getEventById(params.id)
            setEventData(response.event)
        } catch (error) {
            console.error("Error getting event data:", error)
            toast.error("Error getting event data")
        } finally {
            setLoading(false)
        }
    }

    const renderEventProperty = (label: string, value: any) => {
        return (
            <div className="flex flex-col text-sm">
                <span className='text-white font-bold underline'>{label}</span>
                <span className='text-white'>{value}</span>
            </div>
        )
    }

    useEffect(() => {
        getData()
    }, [])

    if(loading){
        return <div className="flex h-screen justify-center items-center">
            <Spinner />
        </div>
    }

  return (
   eventData && <div>
        <div className='flex flex-col gap-1'>
            <h1 className="text-2xl font-bold text-orange-500">{eventData?.name}</h1>
            <div className="flex gap-10">
                <div className="flex gap-1 items-center">
                    <MapPin size={14} />
                    <span className='text-gray-500 text-xs'>
                        {eventData?.address} {eventData?.city} {eventData?.postcode}
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    <Timer size={14} />
                    <span className='text-gray-500 text-xs'>
                        {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
                    </span>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-5">
            {eventData?.media.map((media, index) => (
                <Image src={media} height={240} className='object-cover rounded' key={index} />
            ))}
        </div>
        <div className="mt-7">
            <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 p-3 bg-black mt-7 rounded gap-5">
            {renderEventProperty('Organiser', eventData?.organiser)}
            {renderEventProperty('Address', eventData?.address)}
            {renderEventProperty('City', eventData?.city)}
            {renderEventProperty('Postcode', eventData?.postcode)}
            {renderEventProperty('Date', getDateTimeFormat(eventData.date))}
            {renderEventProperty('Time', eventData.time)}
            <div className="col-span-3">
            {renderEventProperty("Guests", eventData.guests.join(', '))}
            </div>
        </div>

        <div className="mt-7">
            
            <TicketsSelection eventData={eventData} />
        </div>
    </div>
  )
}

export default EventInfoPage