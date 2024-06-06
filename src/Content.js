import React from 'react'


import { Itemslist } from './Itemslist';
/* export const Content = () => {
    
  function handleNameChange(){
    const greet=["Hi","Hello","Welcome"];
    const int=Math.floor(Math.random()*3);
    return greet[int];
  }
  const handleClick=(e)=>{
   //console.log(e.target.innerText)
    console.log(`Welcome to my page ${e}`)
  }

  return (
    <main>
      <p>{handleNameChange()} Sunethra!</p>
      <button onClick={(e)=>{handleClick(e)}}>CLick </button>
      <button>click</button>
    </main>
    
  )
} */

export const Content=({items, handleCheck, handleDelete})=>{
  /* const[items,setItems]=useState([
    {
      id:1,
      checked:false,
      item:"Practice Coding"
    },
    {
      id:2,
      checked:false,
      item:"Learn ReactJS"

    },
    {
        id:3,
        checked:false,
        item:"Create Resume"
    }
  ]);

  const handleCheck=(id)=>{
   /*creating a new array and maping the id*/ /*const listItems=items.map((item)=>
     item.id===id?{...item, checked:!item.checked}: item)/* ...item is to display the text eg.learn reacrjs otherwise the text will be gone*/
    /*setItems(listItems)
  }
  const handleDelete=(id)=>{
    const listItems=items.filter((item)=>item.id!==id)
    setItems(listItems)
  } */
  return(
    <>
      {(items.length)?(
        
      <Itemslist
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
      />

      ):(
        <p>You completed the tasks!!</p>
      )
      }
    </>
  )
}


