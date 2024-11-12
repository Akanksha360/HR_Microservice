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

    const [jsonText, setJsonText] = useState({});

    const onValueChange = (e) => {
        setJsonText(e.target.value);
    }
    localStorage.setItem("Body", JSON.stringify(jsonText));
    var js = JSON.parse(localStorage.getItem("Body"));
    return (
        <>
            <br />
            <Typography mt={2} mb={2}>BODY (JSON)</Typography>
            <TextareaAutosize
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                onChange={(e) => onValueChange(e)}
            />
            <button onClick={()=>console.log()}></button>
        </>
    )
}

export default RequestBody;