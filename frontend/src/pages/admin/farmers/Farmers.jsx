import React,{useState} from 'react'

import "./Farmers.css"
import Sidebar from '../../../component/admin/sidebar/Sidebar.jsx'

const Farmers = () => {

    const [form, setForm]=useState(false);
    return (
        <div className="farmers">
            <Sidebar />
            <div className="content">
                {/* button to add farmers */}
                <div className={form?"add remove":"add"} onClick={()=>{setForm(!form)}}>
                    <h1>+</h1>
                </div>
            </div>
        </div>
    )
}

export default Farmers