import React, { useEffect, useState } from 'react'

const API= "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function SearchCokTile() {
    const [Search, setSearch]=useState("")
    const [drink , setDrink] = useState([])
    const [loading, setLoading] = useState(false)
    const [isError , setIsError]= useState({status:false , msg:""})

    const fetchApi = async(api) =>{
        try {
         setLoading(true)
         setIsError({status:false,msg:""})
         const response = await fetch(api);
         const {drinks} = await response.json();
         setDrink(drinks)
         setLoading(false)
         setIsError({status:false,msg:""})
         console.log(drinks)
         if (!drinks) {
            throw new Error("data not found")
         }
        } catch (error) {
         setLoading(false)
         setIsError({status:true,msg:error.message || "something went wrong plz try again"})
         console.log(error)
        }
         }

    useEffect(()=>{
        const currectUrl= `${API}${Search}`
        fetchApi(currectUrl);
    },[Search])
  return (
    <div>
    <form action="search">
    <input type="text"
    name='search'
    id='search'
    placeholder='search here'
    value={Search} 
    onChange={(e)=>setSearch(e.target.value)}/>
    </form>
    <hr />
    {loading && !isError?.status && <h1 className='loading'></h1>}
    {!loading && isError?.status && 
    <h1 style={{textAlign:"center",color:"red"}}>{isError.msg}</h1>}
    {!loading && !isError?.status && (
    <div className='container'>

       {
        drink.map((eachDrinks)=>{
            const{idDrink,strDrink,strAlcoholic,strCategory,strDrinkThumb}=eachDrinks;
            return(
                <div key={idDrink} className='card'>
                <img src={strDrinkThumb} alt="" />
                <ul className='mainTitle'>
                <li>{strDrink}</li>
                <li>{strCategory}</li>
                <li>{strAlcoholic}</li>
                </ul>
                </div>
            )
        })
       };

       </div>
       )};
    </div>
    )
}

export default SearchCokTile