export interface UserType {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
}

export interface EventType {
    _id: string;
    name: string;
    description: string;
    organiser: string;
    guests: string[];
    address: string;
    city: string;
    postcode: string;
    date: string;
    time: string;
    media: string[];
    ticketTypes: [{
        name: string;
        price: number;
        limit: number;
    }]
}

export interface BookingType {
    _id: string;
    event: EventType;
    ticketType: string;
    ticketsCount: number;
    quantity: number;
    totalAmount: number;
    paymentId?: string;
    status?: string;
    createdAt: string;
}