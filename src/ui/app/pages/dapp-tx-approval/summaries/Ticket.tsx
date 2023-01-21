import type { SummaryGeneratorArgs } from './standard';

const Ticket = ({ address }: SummaryGeneratorArgs) => {
    return <div key="ticket-summary">TICKET for {address}</div>;
};

export default Ticket;
