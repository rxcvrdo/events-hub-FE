import  { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { BookingType } from "../../../../interfaces";
import { toast } from "react-toastify";
import {
    getAllBookings,

} from "../../../../api-services/booking-service";


import { Table } from "antd";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      // Assume fetchBookings is a function that fetches bookings from an API
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error: any) {
      console.error("Error getting bookings data:", error);
      toast.error("Error getting bookings data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  const colunmns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "eventName",
      render: (event: any) => event.name,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
        render: (user: any) => {
            return `${user.name}`;
        },
    },

    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Amount Booked",
      dataIndex: "ticketsCount",
      key: "ticketsCount",
    },
    {
      title: "Total Price ",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => {
        return `£${totalAmount.toFixed(2)}`;
      },
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-UK", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      key: "bookingDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status.toUpperCase(),
    },

  ];

  return (
    <div>
      <PageTitle title="bookings" />
      <Table
        dataSource={bookings}
        columns={colunmns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default AdminBookingsPage;
