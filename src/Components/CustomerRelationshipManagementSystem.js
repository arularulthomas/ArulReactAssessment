
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Customer.css";

const Displayform = ({ details, onEdit, onDelete }) => {
    if (details.length === 0) {
        return (
            <h1>No data found</h1>
        )
    } else {
        return (
            <div className="displayform">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer id</th>
                            <th>Customer name</th>
                            <th>Contact info</th>
                            <th>Purchase history</th>
                            <th>Feedback</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {details.map((detail, index) => <tr key={index}>
                            <td>{detail.id}</td>
                            <td>{detail.name}</td>
                            <td>{detail.contactInfo}</td>
                            <td>{detail.purchaseHistory}</td>
                            <td>{detail.feedback}</td>
                            <td><button onClick={() => onEdit(detail)}>Edit</button></td>
                            <td><button onClick={() => onDelete(detail)}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function CustomerRelationshipManagementSystem() {
    const [detail, setdetail] = useState({
        id: "",
        name: "",
        contactInfo: "",
        purchaseHistory: "",
        feedback: ""
    });
    const [details, setdetails] = useState([]);
    const [edit, setedit] = useState(false);
    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const [purchaseHistory, setpurchaseHistory] = useState("");
    const [feedback, setfeedback] = useState("");
    const [error, seterror] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/detail").then((res) => {
            setdetails(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const adddetail = (e) => {
        e.preventDefault();
        if (detail.id === "" || detail.name === "" || detail.contactInfo === "" || detail.purchaseHistory === "" || detail.feedback === "") {
            seterror("All fields are required");
        } else {
            axios.post("http://localhost:5000/detail", detail).then((res) => {
                setdetails([...details, res.data]);
            }).catch((err) => {
                console.log(err);
            })
            setdetail({ id: "", name: "", contactInfo: "", purchaseHistory: "", feedback: "" });
            seterror("");
        }
    }

    const onEdit = (detail) => {
        setedit(true);
        setid(detail.id);
        setname(detail.name);
        setcontactInfo(detail.contactInfo);
        setpurchaseHistory(detail.purchaseHistory);
        setfeedback(detail.feedback);
    }

    const updatedetail = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/detail/${id}`, { name: name, contactInfo: contactInfo, purchaseHistory: purchaseHistory, feedback: feedback }).then((res) => {
            setdetails(details.map((detail) => {
                return detail.id === id ? { ...detail, name: name, contactInfo: contactInfo, purchaseHistory: purchaseHistory, feedback: feedback } : detail;
            }));
            setedit(false);
            setid("");
            setname("");
            setcontactInfo("");
            setpurchaseHistory("");
            setfeedback("");
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const onDelete = (detail) => {
        axios.delete(`http://localhost:5000/detail/${detail.id}`).then((res) => {
            setdetails(details.filter((d) => d.id !== detail.id));
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="CustomerRelationshipManagementSystem">
            <h1>Customer Relationship Management System</h1>
            <form className='form'>
                <label>Customer id:</label>
                <input type="text" placeholder="Customer id" value={detail.id} onChange={(e) => setdetail({ ...detail, id: e.target.value })}></input>
                <label>Customer name:</label>
                <input type="text" placeholder="Customer name" value={detail.name} onChange={(e) => setdetail({ ...detail, name: e.target.value })}></input>
                <label>Contact info:</label>
                <input type="text" placeholder="Contact info" value={detail.contactInfo} onChange={(e) => setdetail({ ...detail, contactInfo: e.target.value })}></input>
                <label>Purchase history:</label>
                <input type="date" placeholder="Purchase history" value={detail.purchaseHistory} onChange={(e) => setdetail({ ...detail, purchaseHistory: e.target.value })}></input>
                <label>Feedback:</label>
                <input type="text" placeholder="Feedback" value={detail.feedback} onChange={(e) => setdetail({ ...detail, feedback: e.target.value })}></input>
                <button onClick={adddetail}>{edit ? "Update data" : "Add data"}</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <Displayform details={details} onEdit={onEdit} onDelete={onDelete}></Displayform>
            {edit && <form>
                <input type="text" placeholder="Customer name" value={name} onChange={(e) => setname(e.target.value)}></input>
                <input type="text" placeholder="Contact info" value={contactInfo} onChange={(e) => setcontactInfo(e.target.value)}></input>
                <input type="date" placeholder="Purchase history" value={purchaseHistory} onChange={(e) => setpurchaseHistory(e.target.value)}></input>
                <input type="text" placeholder="Feedback" value={feedback} onChange={(e) => setfeedback(e.target.value)}></input>
                <button onClick={updatedetail}>Update</button>
            </form>}
        </div>
    );
}

export default CustomerRelationshipManagementSystem;

   
