import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page-title'
import { Button, Table } from 'antd'
import { data, useNavigate } from 'react-router-dom'
import { deleteEvent, getEvents } from '../../../../api-services/events-service'
import { toast } from 'react-toastify'
import { Key, Pen, Trash2 } from 'lucide-react'
import { getDateTimeFormat } from '../../../../helpers/date-time-formats'

const EventsPage = () => { 

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    const getData = async () => {

      try{
        setLoading(true)
        const response = await getEvents({
          searchText: '',
          date: ''
        })
        console.log('Events:', response.events);
        setEvents(response.events)
      } catch (error) {
        console.error("Error getting events:", error)
        toast.error("Error getting events")
      }finally{
        setLoading(false)
      }
    }

    const deleteEventHandler = async (id: string) => {
      try {
        setLoading(true)
       await deleteEvent(id)
        // console.log('Delete Event:', response)
        toast.success("Event deleted successfully")
        getData()
      } catch (error) {
        console.error("Error deleting event:", error)
        toast.error("Error deleting event")
      } finally {
        setLoading(false)
      }
    }

      useEffect(() => {
        getData()
      }, [])

      const columns = [
        {
          title: 'Event Name',
          dataIndex: 'name',
        },
        {
          title: 'Date & Time',
          dataIndex: 'date',
          render: (date: any, row: any) => {
            return getDateTimeFormat(`${date} ${row.time}`);
          }
        },
        {
          title: 'Organiser',
          dataIndex: 'organiser',
          key: 'organiser'
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          render: (date: any) =>  getDateTimeFormat(date) 
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          render: (text: any, record: any) => (
            <div className='flex gap-5'>
              <Trash2 
              className='text-red-700'
              cursor={'pointer'}
              size={16}
              onClick={() => deleteEventHandler(record._id)}
              />
              <Pen
              className='cursor-pointer text-orange-700' 
              size={16}
              onClick={() => navigate(`/admin/events/edit/${record._id}`)}
              />
            </div>
          )
        }
      ]

  return (
    <div>
        <div className="flex justify-between items-center">
            <PageTitle title="Events" />
            <Button type='primary' onClick={() => navigate("/admin/events/create")} >Create Event</Button>
        </div>
        <Table dataSource={events} columns={columns} loading={loading} rowKey="_id" />
    </div>
  )
}

export default EventsPage