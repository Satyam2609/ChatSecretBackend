import {cashfree , CFEnvironment} from "cashfree-pg"
import crypto from 'crypto'
import { asyncHandler } from "../utils/asyncHandler.js"

const cashfree = new cashfree(
    CFEnvironment.SANDBOX,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

function generateOrderID(){
    const uniqueId = crypto.randomBytes(8).toString("hex")
    const hash = crypto.createHash("sha256")
    hash.update(uniqueId)
    return hash.digest("hex").substring(0 , 20)
}

const createOrder = asyncHandler(async(req , res) => {


    let request = {
        order_id:generateOrderID(),
        order_amount:"1.00",
        order_currency:"INR",
        order_note:"custom order",
        customer_details:{
            customer_id:"customer_001",
            customer_email:"dfgkmngenrjngj@gmail.com",
            customer_phone:"9999999999"
        }

    }
})
