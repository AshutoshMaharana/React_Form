import React from 'react'

const Display = (props) => {
    const {search} = props;
    search.sort((a,b) => a.duration-b.duration)


    
    return (
            <div className='movieTable'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <td>Movie Name</td>
                                    <td>Duration</td>
                                    <td>Rating</td>
                                </tr>
                            </thead>
                            <tbody className='tableBody'> 
                    
            {
             search.map((movie) => {
                    var {movieName,duration,rating} = movie;
                   
                    return(
                            <tr>
                                <td>{movieName}</td>
                                <td>{duration}</td>
                                <td>{rating}</td>
                        </tr>
                        )
                }
                

                )
                
            }
            {
                search.length===0 && <span>No Results found</span>
            }
            
            </tbody>
                        </table>
                    </div>
    )
}

export default Display
