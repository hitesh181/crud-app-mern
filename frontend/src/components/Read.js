import React from "react"
import {Link} from "react-router-dom"
export default function Read(){

    const [data, setData] = React.useState();
    const [error, setError] = React.useState("");
     
    async function getData(){
        const response = await fetch("http://localhost:5000");
        const result = await response.json();
        if(!response.ok){
            console.log(result.error)
            setError(result.error)
        }
        if(response.ok){
            console.log(result)
            setData(result)
            setError("")
        }
    }

    const handleDelete = async (id)=>{
        const response = await fetch(`http://localhost:5000/${id}`,{
        method:"DELETE"
    })
    const result = await response.json();
    if(!response.ok){
        console.log(result.error)
        setError(result.error);
    }
    if(response.ok){
        setError("Deleted Successfully");
        setTimeout(()=>{
            setError("");
            getData()
        },2000)
    } 
    }

    const handleEdit = async(id)=>{

    }
    React.useEffect(()=>{
        getData();

    },[])

    console.log(data);
    return (

        <div className="container my-2">
            {error && <div className = "alert alert-danger">{error}</div>}
            
            {data && data.length >0 ? <h2 className="text-center">All Data</h2> : <h1  className="text-center">Database empty</h1>}
            
            <div className="row">
            {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                <a className="card-link" onClick ={()=>handleDelete(ele._id)}>Delete</a>
              </div>
            </div>
          </div>
            ))}
                
            </div>
        
        </div>
    )
}