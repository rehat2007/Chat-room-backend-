import { StreamChat } from "stream-chat";
import "dotenv/config"

// const API_KEY = process.env.UPSTREAM_API_KEY
// const API_SECRET =process.env.UPSTREAM_API_SECRET

const client = new StreamChat("cusd6bkg2h38", "q9h8jjzjrdbcc4cug426psbzjtf39bvftge49b2g97e655t543tfgrupmgkkfym8");

const upsertstreamuser = async (userdata)=>{
try {
    await client.upsertUser({
        id:userdata.id,
        name :userdata.fullName,
        email:userdata.email,
        bio : userdata.bio,
        location : userdata.location
    })
    return userdata;
} catch (error) {
    console.error("Upstream connection failed",error)
}
}

export {upsertstreamuser}