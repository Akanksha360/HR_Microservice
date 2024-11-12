// import { useContext } from 'react';
import { useState } from 'react';

import { TextareaAutosize, Typography } from '@mui/material';

// import { DataContext } from '../context/DataProvider';

const textareaStyle = {
    width: '100%',
    padding: 10,
    background: `url(http://i.imgur.com/2cOaJ.png)`,
    backgroundAttachment: 'local',
    backgroundRepeat: 'no-repeat',
    paddingLeft: 35,
    paddingTop: 10,
    borderColor: '#ccc'
}

const RequestBody = () => {

    const [RequestModel, setRequestModel] = useState();
    const [RequestModelQuery, setRequestModelQuery] = useState();
    const [id, setID]=useState();
    const onValueChange1 = (e) => {
        setRequestModel(e.target.value);
        
       
    }
    if(RequestModel!=undefined)
    localStorage.setItem("RequestModel", JSON.stringify(RequestModel));
    const onValueChange2 = (e) => {
        setRequestModelQuery(e.target.value);
       
       
    }
    if(RequestModelQuery!=undefined)
    localStorage.setItem("RequestModelQuery", JSON.stringify(RequestModelQuery));

    if(id!=null)
    localStorage.setItem("id",id)
    
   
    return (
        <>
            <br />
            <div>Request Model Query</div>
            <textarea
                className='border'
                minRows={2}
                maxRows={4}
                style={textareaStyle}
                onChange={(e) => onValueChange2(e)}
            />
            <Typography mt={2} mb={2}>Request Model</Typography>
            <textarea
             className='border'
                minRows={2}
                maxRows={4}
                style={textareaStyle}
                onChange={(e) => onValueChange1(e)}
            />
            Provide the id for update and delete here....
            ID : <input type="number" placeholder='id' onChange={(e)=>setID(e.target.value)}/>
            
        </>
    )
}

export default RequestBody;