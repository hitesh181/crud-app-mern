import React from "react"
import { useNavigate } from "react-router-dom";
export default function Create(){
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [age, setAge] = React.useState(0)

    const [error,setError] = React.useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault()
        const addUser = {name, email, age}
        const response = await fetch("http://localhost:5000",{
         method: "POST",
         body: JSON.stringify(addUser),
         headers:{
            "Content-Type": "application/json"
         },
        });

        const result = await response.json()
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok){
            console.log(result)
            setError("");
            setName("")
            setEmail("")
            setAge("")
            navigate("/all")
        }
    }
    return (
        <div className="container my-4 text-center">
            {error &&
                <div className="alert alert-danger">
                {error}
            </div>}
            <h2 className="text-center">Enter Data</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control"
                 placeholder="Name" value = {name}  onChange={(e)=>setName(e.target.value)}/>
            </div>
                <label>Email address</label>
                <input type="email" className="form-control"
                  placeholder="Enter email" value = {email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Age</label>
                <input type="number" className="form-control"
                 placeholder="Age" value = {age} onChange={(e)=>setAge(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}