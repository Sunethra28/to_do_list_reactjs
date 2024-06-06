import { Content } from "./Content";
//import { Footer } from "./Footer";
import { Header } from "./Header";
import './App.css';
import { useState, useEffect  } from 'react';
import { AddItem } from "./AddItem";
//import { SearchItem } from "./SearchItem";
import apiRequest from "./apiRequest";


function App() {
  const API_URL='http://localhost:3600/items';
  const[items,setItems]=useState([]);
  const[newItem,setNewItem]=useState('') //to get a new variable
  //const[search,setSearch]=useState('')
  const[fetchError,setFetchError]=useState(null)
  const[isLoading, setIsLoading]=useState(true)

  /* useEffect(()=>{
    JSON.parse(localStorage.getItem('todo_list'))
  },[]) *///to leave with an empty array when no elements left in the console
  
  useEffect(()=>{
    const fetchItems= async ()=>{
      try{
        const response=await fetch(API_URL);
        if(!response.ok) throw Error("Data not received");
        const listItems= await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch(err){
        setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{
      (async ()=>await fetchItems()) ()
    },2000)
  },[])

  //passing the variable and creating an object and forming a new array
  const addItem=async (item)=>{
    const id=items.length? items[items.length-1].id+1:1;
    const addNewItem={id,checked:false, item}
    const listItems=[...items,addNewItem]
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    //tocallapiRequest create 
    const postOpt={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOpt)
    if(result) setFetchError(result)
  }
  
  const handleCheck= async (id)=>{
   /*creating a new array and maping the id*/ 
    const listItems=items.map((item)=>
    item.id===id?{...item, checked:!item.checked}: item)/* ...item is to display the text eg.learn reacrjs otherwise the text will be gone*/
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    //tocallapiRequest
    const myItem=listItems.filter((item)=> item.id===id)
    const updateOpt={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`//cannot pass full id so we are only passing the particular id
    const result=await apiRequest(reqUrl,updateOpt)
    if(result) setFetchError(result)
  }

  const handleDelete=async (id)=>{
    const listItems=items.filter((item)=>item.id!==id)
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    //tocallapiRequest
    const deleteOpt={method:'DELETE'}
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,deleteOpt)
    if(result) setFetchError(result)

  }

  const handleSubmit=(e)=>{
    e.preventDefault()  //toavoid refreshing the page
    if(!newItem) return 
    //console.log(newItem)
    //to add 
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">  
      {/* <p>{handleNameChange()} Sunethra!</p> */}

      <Header/>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      {/* <SearchItem
        search={search}
        setSearch={setSearch}
      /> */}
      <main>
        {isLoading && <p> Loading items..</p>}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />}
      
      </main>
      {/* <Footer
      length={items.length} /> */}
    </div>
  );
}
export default App;
