import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/Parshant124')
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log(res)
    //         setData(res)})
    // }, [])

    const data = useLoaderData()

  return (
    <div className="flex items-center text-center m-4 bg-gray-600 text-white">
      <img src={data.avatar_url} alt="" width={"300px"} className="p-4" />
      <div>
        <h2 className="text-2xl">Name: {data.name}</h2>
        <h2 className="text-2xl">Public repos: {data.public_repos}</h2>
      </div>
    </div>
  );
}

export default Github

export const githubInfoLoader = async() => {
    const response = await fetch("https://api.github.com/users/Parshant124");
    return response.json()
}