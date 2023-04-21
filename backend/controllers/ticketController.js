const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')



// @desc : GET user tickets
// @route : /api/ticket
// @access : Private

const getTickets = asyncHandler(async (req,res) => {
    
    // Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    
    const tickets = await Ticket.find({user : req.user.id})    
    res.status(200).json(tickets)
    // res.send("get tickets")
})

const createTicket = asyncHandler(async(req,res)=>{

    const {product , description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error("Please fill All Details")
    }

    // // Get user from JWT using id
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user : req.user.id,
        status : 'new'
    })

    if(!ticket){
        res.status(401)
        throw new Error("Cant Raise Ticket")
    }else{
        res.status(200).json(ticket)
    }

    // res.send("create tickets")

})

// @desc : GET user ticket
// @route : /api/ticket/:id
// @access : Private

const getTicket = asyncHandler(async(req,res)=>{

    //   // Get user using the id in JWT
      const user = await User.findById(req.user.id)

      if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    // console.log(req.params)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket Not Found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Athorized')
    }

    res.status(200).json(ticket)

    // res.send("get single tickets by Id")

})

// @desc : Update user ticket
// @route : /api/ticket/:id
// @access : Private

const updateTicket = asyncHandler(async(req,res)=>{
    
//      // Get user using the id in JWT
     const user = await User.findById(req.user.id)

     if(!user){
       res.status(401)
       throw new Error("User not found")
   }

   const ticket = await Ticket.findById(req.params.id)

   if(!ticket){
       res.status(404)
       throw new Error('Ticket Not Found')
   }

   if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Athorized')
}


   const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body , {new : true})

   res.status(200).json(updatedTicket)

// res.send("Update ticket")

})

// @desc : Delete user ticket
// @route : /api/ticket/:id
// @access : Private

const deleteTicket = asyncHandler(async(req,res)=>{
    
//     // Get user using the id in JWT
    const user = await User.findById(req.user.id)

    if(!user){
      res.status(401)
      throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
      res.status(404)
      throw new Error('Ticket Not Found')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Athorized')
}

    await ticket.remove()

    res.status(200).json({success : true})

// res.send("delet ticket")
  

})

module.exports = {getTickets , createTicket , getTicket , updateTicket , deleteTicket}