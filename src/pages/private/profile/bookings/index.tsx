import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { BookingType } from "../../../../interfaces";
import { toast } from "react-toastify";
import {
  cancelBooking,
  getUserBookings,
} from "../../../../api-services/booking-service";
import { Popconfirm, Table } from "antd";
import { getDateTimeFormat } from "../../../../helpers/date-time-formats";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      // Assume fetchBookings is a function that fetches bookings from an API
      const response = await getUserBookings();
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

  const onCancelBooking = async (bookingId: BookingType) => {
    try {
      setLoading(true);
      const payload = {
        eventId: bookingId.event._id,
        bookingId: bookingId._id,
        ticketTypeName: bookingId.ticketType,
        ticketsCount: bookingId.ticketsCount,
        paymentId: bookingId.paymentId,
      };
      await cancelBooking(payload);
      toast.success("Booking cancelled successfully");
      getData();
    } catch (error: any) {
      console.error("Error cancelling booking:", error);
      toast.error("Error cancelling booking");
    } finally {
      setLoading(false);
    }
  };

  const colunmns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "eventName",
      render: (event: any) => event.name,
    },
    {
      title: "Event Date & Time",
      dataIndex: "event",
      key: "eventDate",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_:any,record: BookingType) => {
        if (record.status === "booked") {
          return (
            <Popconfirm 
            title="Are you sure to cancel this booking?"
            onConfirm={() => onCancelBooking(record)}
            okText="Yes"
            cancelText="No"
            >
              <span
              className="text-red-500 cursor-pointer text-sm underline"
             
            >
              Cancel
            </span>
            </Popconfirm>
          );
        }
        return "";
      },
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

export default UserBookingsPage;
