import React from "react";
import { useNavigate } from "react-router-dom";

export function Play() {
    const navigate = useNavigate();
    return <main>
        <button onClick={()=>navigate('/win')}>Win</button>
        <button onClick={()=>navigate('/lose')}>Lose</button>
    </main>
}