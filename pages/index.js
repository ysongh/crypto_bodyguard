import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function Index({ cbContract }) {
  const router = useRouter();

  const [bodyGuards, setbodyGuards] = useState([]);

  useEffect(() => {
    if(cbContract) fetchBodyguard();
  }, [cbContract])
  
  const fetchBodyguard = async () => {
    const total = await cbContract.bodyGuardCount();
    console.log(total)
    let temp = [];
    for(let i = 1; i <= total; i++){
      const data = await cbContract.bodyGuardList(i);
      console.log(data);
      temp.push(data);
    }
    setbodyGuards(temp);
  }

  return (
    <div className='container'>
      <h1>List of BodyGuard</h1>
      <div className='row'>
        {bodyGuards.map(b => (
           <div className='col-6' key={b.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{b.from}</h5>
                <p className="card-text">{b.city}</p>
                <button className="btn btn-primary me-1"  onClick={() => router.push(`/chat/${b.from}`)}>
                  Chat 
                </button>
                <button className="btn btn-success"  onClick={() => router.push(`/sendThankyou/${b.from}`)}>
                  Send Thank You NFT
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index