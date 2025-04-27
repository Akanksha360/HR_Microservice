import { useState } from 'react';
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

const RequestBody = ({
    setRequestModel,setRequestModelQuery
}) => {
    const [id, setID]=useState();
    return (
        <>
            <br />
            <div>Request Model Query</div>
            <textarea
                className='border'
                minRows={2}
                maxRows={4}
                style={textareaStyle}
                onChange={(e) => setRequestModelQuery(e.target.value)}
            />
            
            <div>Request Model</div>
            <textarea
             className='border'
                minRows={2}
                maxRows={4}
                style={textareaStyle}
                onChange={(e) =>setRequestModel(e.target.value)}
            />
            Provide the id for update and delete here....
            ID : <input type="number" placeholder='id' onChange={(e)=>setID(e.target.value)}/>
            
        </>
    )
}

export default RequestBody;