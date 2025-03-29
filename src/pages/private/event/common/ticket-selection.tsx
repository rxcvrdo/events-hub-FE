import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input } from "antd";
import PaymentModal from "./payment-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { getClientSecret } from "../../../../api-services/payments-service";
import { createBooking } from "../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const TicketsSelection = ({ eventData }: { eventData: EventType }) => {
  const [loading, setLoading] = useState(false);
  const ticketTypes = eventData.ticketTypes ;
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);
  const navigate = useNavigate();
  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  )?.price;

  const [stripeOptions, setStripeOptions] = useState<any>({});
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const handleBooking = async () => {
    if (totalAmount === 0) {
      // For free events, bypass Stripe and directly create a booking
      const bookingPayload = {
        event: eventData._id,
        ticketType: selectedTicketType,
        ticketsCount: selectedTicketCount,
        totalAmount,
        paymentId: "free", 
        status: "booked",
      };
      try {
        setLoading(true);
        await createBooking(bookingPayload);
        navigate("/profile/bookings");
        toast.success("Booking successful");
      
      } catch (error: any) {
        console.error("Error creating booking", error);
        toast.error("Booking failed");
      } finally {
        setLoading(false);
      }
    } else {
      
      getClientSecretAndOpenPaymentModal();
    }
  };


  const getClientSecretAndOpenPaymentModal = async () => {
    try {
      setLoading(true);
      const response = await getClientSecret(totalAmount);
      setStripeOptions({
        clientSecret: response.clientSecret,
      });
      setShowPaymentModal(true);
    } catch (error: any) {
      console.error("Error getting client secret:", error);
      toast.error("Error getting client secret");
    }finally {
      setLoading(false);
    }
  };

  const totalAmount = (selectedTicketPrice || 0) * selectedTicketCount;

  return (
    <div>
      <div>
        <h1 className="text-sm text-orange-500 font-bold">
          Select ticket type
        </h1>
        <div className="flex flex-wrap gap-5">
          {ticketTypes.map((ticketType:any, index:any) => 
            {
              const availableTickets = ticketType.available?? ticketType.limit;
              return (<div
              key={index}
              className={`p-3 border border-gray-200 rounded-md shadow-md bg-gray-100 mt-3 lg:w-96 w-full cursor-pointer
                ${
                  selectedTicketType === ticketType.name
                    ? "border-orange-500"
                    : "border-gray-200"
                }
                `}
              onClick={() => {
                setSelectedTicketType(ticketType.name);
                setMaxCount(availableTickets);
              }}
            >
              <h1 className="text-sm text-gray-700 uppercase">
                {ticketType.name}
              </h1>
              <div className="flex justify-between">
                <h1 className="text-sm text-gray-700 font-bold">
                  £{ticketType.price}{" "}
                </h1>
                <h1 className="text-sm"> {availableTickets} Left</h1>
              </div>
            </div>)}
          )}
        </div>
        <h1 className="text-sm text-orange-500 font-bold mt-10 ">
          Select amount
        </h1>
        <Input
          type="number"
          value={selectedTicketCount}
          className="w-96"
          onChange={(e) => setSelectedTicketCount(parseInt(e.target.value))}
          min={0}
          max={maxCount}
        />
        <span className="text-gray-500 text-sm font-bold"> 
          {selectedTicketCount > maxCount
            ? `You can only select ${maxCount} tickets`
            : ""}
        </span>

        <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3">
          <h1 className="text-sm text-gray-500 font-bold">
            Total amount: £ {totalAmount}{" "}
          </h1>
          <Button
            type="primary"
            onClick={handleBooking}
            disabled={!selectedTicketType || !selectedTicketCount ||loading ||selectedTicketCount > maxCount} 
          >
            Book Now
          </Button>
        </div>
      </div>
      {stripeOptions?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          {showPaymentModal && <PaymentModal
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          selectedTicketsCount={selectedTicketCount}
          selectedTicketType={selectedTicketType}
          totalAmount={totalAmount}
          event={eventData}
          />}
        </Elements>
      )}
    </div>
  );
};

export default TicketsSelection;
