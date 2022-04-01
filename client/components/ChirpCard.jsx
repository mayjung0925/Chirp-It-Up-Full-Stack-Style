import React from 'react'

const ChirpCard = ({name, content, created,deleteFunction, detailsFunction}) => {

  
 

    return (
        <>
            <h3>{name}</h3>
            <p>{content}</p>
            <small>{created}</small>
            <button className="btn btn-outline-dark m-3" onClick={deleteFunction}>Delete</button>
            <button className="btn btn-outline-dark m-3" onClick={detailsFunction}>Details</button>
        </>
    )
}

export default ChirpCard;