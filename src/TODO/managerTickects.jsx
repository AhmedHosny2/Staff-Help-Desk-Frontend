<td>
{ticketData.ticket.status === "pending" && (
  <div className="badge bg-base-300">Pending</div>
)}
{ticketData.ticket.status === "open" && (
  <div className="badge badge-accent ">Open</div>
)}
{ticketData.ticket.status === "closed" && (
  <div className="badge bg-neutral text-base-300">
    Closed
  </div>
)}
</td>


// admin / user get one ticket 
// user get all tickets and delete ticket 
// user can create ticket

