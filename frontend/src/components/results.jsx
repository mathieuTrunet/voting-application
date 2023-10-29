import {useEffect, useState} from "react";
import {setRef} from "@mui/material";

export default function Results(props){
    const [result, setResult] = useState();
    const [resultFormat, setResultFormat] = useState(String[""]);

    async function formatResult (result) {
        if(result) {
            const resultTemp = [];
            result[0].forEach((res, index) => {
                resultTemp.push(res + " : " + Number(result[1][index]))
            })
            await setResultFormat(resultTemp);
        }
    }

    async function getRestult() {
        // eslint-disable-next-line react/prop-types
        const result = await props.contract.contract._methods.getStats().call();
        await setResult(result);
        formatResult(result);
    }

    useEffect(() => {
        getRestult();
    },[])

    return (
        <>
            <div style={{display:"flex", flexDirection:"column"}}>
                {resultFormat ? resultFormat.map(propName => <span>{propName}</span>) : <></>}
            </div>
        </>
    )
}