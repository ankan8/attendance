import React from 'react'
import { useState,useEffect } from 'react';
import './tablestyle.css'
const ReadSheet = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
       

        fetch('https://sheetdb.io/api/v1/c7dm29h1gujhn')
        .then((response) => response.json())
        .then((data) =>{console.log(data);setData(data)}).catch((error)=>{
            console.error('error fetching data',error);
        });

    },[])
  return (
    
        <div className='box'>
          {data.length > 0 ? (
            <table className='hh'>
              <thead className='uu'>
                <tr style={{textAlign:"center"}}>
                  <th>Name</th>
                  <th>Registration Number</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Name}</td>
                    <td>{row.RegistrationNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      
      
    


  )
}

export default ReadSheet