import React from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function Update(){
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [age, setAge] = React.useState(0)

    const [error,setError] = React.useState("");

    const {id} = useParams()
    const navigate = useNavigate();

    //getting single user data
    const getSingleUser = async ()=>{
        const response = await fetch(`http://localhost:5000/${id}`)
        const result = await response.json();

        if(!response.ok){
            setError(result.error);
            console.log(result.error)
        }
        if(response.ok){
            setError("")
            console.log("updated", result)
            setName(result.name);
            setAge(result.age);
            setEmail(result.email)

        }
    } 
    React.useEffect(()=>{
        getSingleUser();
    },[])

    //sending updated data to backend
    const handleUpdate = async (e)=>{
        e.preventDefault()
        const upDatedUser = {name, email, age}
        const response = await fetch(`http://localhost:5000/${id}`,{
            method: "PATCH",
            body: JSON.stringify(upDatedUser),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result = response.json()
        if(!response.ok){
            console.log(result.error);
            setError(result.error)
        }
        if(response.ok){
            console.log(result);
            setError("")
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
            
            <h2 className="text-center">Edit the Data</h2>
            <form onSubmit = {handleUpdate}>
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