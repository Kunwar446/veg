import React, { useEffect } from "react";
import "./Notification.css";
import { FiAlertTriangle } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Notification = ({ status, text , onClose}) => {


    useEffect(() => {
        // Auto-dismiss after 2 seconds
        const timer = setTimeout(() => {
        //   onClose();
        }, 2000);
    
        return () => clearTimeout(timer); // Cleanup on component unmount
      }, [onClose]);

      

    // Define colors based on the status
    const color = {
        success: "var(--lightGreen)",
        failed: "var(--lightDanger)",
        successText: "var(--midGreen)",
        failedtext: "var(--midDanger)",
    };

    // Example icon logic (customize as needed)
    //   const icon = status === "success" ? "✅" : "❌";
    const icon = status === "success" ? <IoMdCheckmarkCircleOutline /> : <FiAlertTriangle />;

    return (
        <div
            className="notificationBox"
            style={{ backgroundColor: status === "success" ? color.success : color.failed }}
        >
            <div className="notificationIcon" style={{ color: status === "success" ? color.successText : color.failedtext }}>{icon}</div>

            <div className="notificationText"
                style={{ color: status === "success" ? color.successText : color.failedtext }}
            >{text}</div>
        </div>
    );
};

export default Notification;
