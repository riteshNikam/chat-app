import { server } from "./app.js"
import { DBConnect } from "./dbs/index.js"

DBConnect()
.then(
    () => {
        try {
            server.listen(4000, () => {
                console.log(`SERVER CONNECTED AT PORT ${ 4000 }`)
            })
        } catch (error) {
            throw new Error("Something went wrong while connecting the server.");
            
        }
        
    }
)
.catch(
    (error) => {
        console.log(error.message)
    }
)
