import React,{useState,useEffect} from 'react'
import Display from './Display';

const FormPractice = () => {
    // ANY OTHER WAY TO REDUCE THE USESTATE VARIABLE
    //OR ALTERNATIVE WAY TO OPTIMISE
    const [filter,setFilter] = useState('');
    const [block, setBlock] = useState(false);
    const [durationErr, setDurationErr] = useState(true);
    const [filterList,setFilterList] = useState([]);
    const [movie, setMovie] = useState([]);
    const [movieDetails,setMovieDetails] = useState({movieName:"",duration:"",rating:""});
    const handlemovie = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        //console.log( e.target.name)
        if(name == 'rating'){ // TO INPUT RATING IN POINT
            
            if(value < 1 || value > 10){

                setBlock(true);
            }
            else{
            setBlock(false);
             }
        }
       else if(name == 'duration'){
           if(value.indexOf('hr')<-1 && value.indexOf('min')<-1){
                setDurationErr(true)
            }
            else{
                let tempDuration = 0;
                if(value.indexOf('hr')>-1){
                    tempDuration = value.split('hr')[0];
                    value = tempDuration * 60;
                }
                else {
                    tempDuration= value.split('min')[0]
                    value = tempDuration
                }
                setDurationErr(false)
                console.log(value)

   //const splitVar = value.indexOf('hr')>-1 ? value.split('hr')[0]: value.split('min')[0]
           
        }
    }

        
        setMovieDetails({...movieDetails,[name]:value})
    }

    
    const handleFilter = (e) =>{
        let value = e.target.value;
        setFilter(e.target.value);//NOT WORKING ON USESTATE
        var filteredMovie = movie.filter( (mov) =>{
            return mov.movieName.toLowerCase().indexOf(value) > -1;
        });
        setFilterList(filteredMovie);


    }
   
    const handleSubmit = (e) => {
   
        const {movieName,duration,rating} = movieDetails;
        e.preventDefault();
        
        if(movieName && duration && rating){
            const newmovie = {
               movieName,
               duration,
               rating
            }
            setMovie([...movie,newmovie]);
            //setMovieDetails({movieName:"",duration:"",rating:""});
        }

    }
    return (
     <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className='movieName'>
                <div className='label'>
                <label htmlFor="movieName">Name : </label>
                </div>
                <div className='content'>
                <input 
                    type = 'text' 
                    id='movieName'
                    name = 'movieName' 
                    value={movieDetails.movieName}
                    onChange={handlemovie}
                    required/>
                    </div>
            </div>
            <div className='duration'>
            <div className='label'>
                <label htmlFor="duration">duration : </label>
                </div>
                <div className='content'>
                <input 
                    type = 'text' 
                    id = 'duration' 
                    name = 'duration'
                   // value={movieDetails.duration} 
                    onChange={(e) =>handlemovie(e)}
                    
                   // onInput="this.value = Math.abs(this.value) >=0 ? Math.abs(this.value) :null"
                    required/>
                    </div>
                    
                    {!durationErr && <span>Please Enter the duration in hr or min e.g. 10hr/20min</span>}     
                    
            </div>
            
            <div className='rating'> 
            <div className='label'>
                <label htmlFor="rating">rating : </label>
                </div>
                <div className='content'>
                <input 
                type="number" 
                id = 'rating' 
                name = 'rating' 
                value={movieDetails.rating}
                onChange={(e) =>handlemovie(e)} 
                min='0' max='10'
                required/>
                </div>
           </div>
           {block && <span>Please Enter the values between 1 and 10</span>}
           
          

           <div>
           <button type='submit'>Submit</button>
           <button type="reset">Reset</button>
           </div>
           
        </form>
        <h5>Movies List</h5>
        <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder='Search...' 
                onChange={(e) =>handleFilter(e)}
               />
            
        <br />
        <br />
      
          <Display search = {filter?filterList:movie}/>
        

          
             
                
           

           
            </div>
        
        
    )
}

export default FormPractice
/* const search = (movie) =>{ // to ask how to not call search upon null entry
        var filteredMovie = movie.filter( function(mov){
            return mov.movieName.toLowerCase().indexOf(filter) > -1;
        }

        )

        //const {movieName,duration,rating,format} = movie;
        //console.log(movie[0].movieName.toLowerCase().indexOf(filter))
        //console.log(filter)
        //return console.log(movie[0].movieName);
    //return movie.filter(mov => mov.movieName.toLowerCase().indexOf(filter) > -1);
    return filteredMovie

        

    }

    /*useEffect(() => {
        console.log(name);
        
    })*/
