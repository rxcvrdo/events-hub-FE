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

  const onCancelBooking = async (booking: BookingType) => {
    try {
      setLoading(true);
      const payload = {
        eventId: booking.event._id,
        bookingId: booking._id,
        ticketTypeName: booking.ticketType,
        ticketsCount: booking.ticketsCount,
        paymentId: booking.paymentId,
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

  const handleAddToCalendar = (record: BookingType) => {
    const startDate = new Date(`${record.event.date}T${record.event.time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;
    const text = encodeURIComponent(record.event.name);
    const details = encodeURIComponent(record.event.description || "");
    const location = encodeURIComponent(
      `${record.event.address || ""} ${record.event.postcode || ""}`.trim()
    );
  

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&`;

    window.open(calendarUrl, "_blank");
  };

  const columns = [
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
      title: "Total Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `£${totalAmount.toFixed(2)}`,
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "bookingDate",
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-UK", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
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
      render: (_: any, record: BookingType) => {
        if (record.status === "booked") {
          return (
            <Popconfirm
              title="Are you sure to cancel this booking?"
              onConfirm={() => onCancelBooking(record)}
              okText="Yes"
              cancelText="No"
            >
              <span className="text-red-500 cursor-pointer text-sm underline">
                Cancel
              </span>
            </Popconfirm>
          );
        }
        return "";
      },
    },
    {
      title: "Calendar",
      key: "calendar",
      render: (_: any, record: BookingType) => (
        <button
          onClick={() => handleAddToCalendar(record)}
          className="btn btn-primary text-sm underline cursor-pointer hover:text-blue-700"
        >
          Add to Calendar
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="bookings" />
      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default UserBookingsPage;
