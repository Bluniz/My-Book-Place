import React, {useState, useEffect} from 'react';
import {TextField, Box} from '@material-ui/core';
import useStyles from './style';
import SearchIcon from '@material-ui/icons/Search';
import {getBooks} from '../../service/booksService';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useDispatch} from 'react-redux'


const SearchBar = () =>  {

  const classes = useStyles();

  const [value, setValue] = useState('');

  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);


 

  function loadBooks(){
    try{
      getBooks(value, dispatch, index);
     }catch(error){
       console.log(error);
     }
  }

  useEffect(()=>{
    if(value !== ''){
      loadBooks();
    }
  },[index])

  function nextPage(){
    setIndex(index+10);
  }

  function prevPage(){
    if(index-10 > 0){
      setIndex(index - 10);
    }
    
  }


   function handleChange(event){
    clearTimeout(timer);
    setValue(event.target.value);
 
    setTimer(setTimeout(()=>{
      if(value !== ''){
        setIndex(10);
        loadBooks();
    }
    }, 1000))
  }


  return(
    <Box className={classes.root}>
            <IconButton color="primary" onClick={prevPage}><ArrowBackIcon/></IconButton>

      <TextField
        className={classes.field}
        variant="outlined"
        value={value}
        onChange={(event)=>handleChange(event)}
        placeholder="Pesquise aqui um livro"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
      <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <IconButton color="primary" onClick={nextPage}><ArrowForwardIcon/></IconButton>
      
    </Box>
  )
}


export default SearchBar;