import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { getNotes, reset as notesReset, createNote } from '../features/notes/notesSlice'
import NoteItem from "../components/NoteItem"
import Modal from 'react-modal'

function Ticket() {

  const { ticket, isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)
  const { notes, isLoading: notesLoading } = useSelector(state => state.notes)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const ticketId = params.id

  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    dispatch(getSingleTicket(params.id))
    dispatch(getNotes(params.id))

    // es-lint-disable-next-line

  }, [isError, message, params.id])

  const onTicketClose = () => {
    dispatch(closeTicket(params.id))
    toast.success("Ticket Closed")
    navigate('/')
  }

  const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative'
    },
  };

  Modal.setAppElement('#root')

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    setNoteText("")
    closeModal()

  }


  if (isLoading || notesLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <h1>
        Something Went Wrong
      </h1>
    )
  }

  return (
    <div>
      <div className="ticket-page ticket-pb">
        <header className="ticket-header">
          <BackButton url={'/tickets/'} />
          <h2>
            Ticket ID : {ticket._id}
            <span className={`status status${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleDateString('en-IN')} </h3>
          <h3>Product : {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>
        {
          ticket.status !== 'closed' && (
            <button className='btn' onClick={openModal}>Add Note</button>
          )
        }

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
          <button className="btn-close" onClick={closeModal}>X</button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <textarea name="noteText" id="noteText" className='form-control' placeholder='Enter Note' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type='submit'>Submit</button>
            </div>
          </form>
        </Modal>

        {
          notes.map(note => <NoteItem key={note.id} note={note} />)
        }

        {
          ticket.status !== 'closed' && (
            <button className='btn btn-block btn-danger ' onClick={() => onTicketClose()}>Close Ticket</button>
          )
        }

      </div>
    </div>
  )
}

export default Ticket
