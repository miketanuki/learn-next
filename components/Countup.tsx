import { useState } from "react"

export default function CountUp() {
    const [count,setCount] = useState(0)

    return(
        <section>
        <p>{count}</p>
        <button onClick={()=>setCount(count + 1)}>count up</button>
      </section>
    )
    
}