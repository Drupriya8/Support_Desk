import { Link } from "react-router-dom";

import React from 'react'

function TicketItem({ticket}) {
  return (
    <div className="ticket">
      <div>
        {
            new Date(ticket.createdAt).toLocaleDateString('en-IN')
        }
      </div>
      <div>
        {
            ticket.product
        }
      </div>
      <div className={`status status-${ticket.status}`}>
        {
            ticket.status
        }
      </div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
  )
}

export default TicketItem
