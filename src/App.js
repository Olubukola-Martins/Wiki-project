import React, {useState} from 'react';
import {useRef} from 'react';
// import ReactDOM from 'react-dom/client';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faGlobe} from '@fortawesome/free-solid-svg-icons'


const App = () => {

const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const [searchInfo, setSearchInfo] = useState({});
const inputRef = useRef(null);
//handling search event
const handleSearch = async e => {
e.preventDefault ();
if (search === '') return ;
const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`;
const response = await fetch(endpoint);
if (!response.ok) {throw Error(response.statusText);}
const json = await response.json();
setResults(json.query.search);
setSearchInfo(json.query.searchinfo);
}

  return(
    <div className='App'>
      <header>
        <h1> <FontAwesomeIcon icon={faGlobe}/> Wiki Surf</h1>
        <form className='search-box'  onSubmit={handleSearch}>
          <input 
          ref={inputRef}
          type="search" 
          placeholder= 'Ask wikipedia.....' 
          value={search} 
          onChange={e => setSearch(e.target.value)}/> 
          
        </form>
        <div className='hotSites'>
        <a href='https://www.youtube.com/' target="__blank"> <img className='siteImage' src="/images/youtube.png" alt='youtube' /> </a>
        <a href='https://web.facebook.com/?_rdc=1&_rdr' target="__blank"> <img className='siteImage' src="/images/facebook.png" alt='facebook'/> </a>
        <a href='https://www.google.com/' target="__blank"> <img className='siteImage' src="/images/Google.jpg" alt='Google'/> </a>
      </div>

          {(searchInfo.totalhits) ? <p> <FontAwesomeIcon icon={faSearch}/> results found: {searchInfo.totalhits}</p> : ' '}
     </header>
      <div className='results'>
      {results.map((result, i) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
        return (
          <div className='result' key={i}>
          <h3>{result.title}</h3>
          <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
          <a href={url} rel="noreferrer">See more <FontAwesomeIcon icon={faArrowRight}/> </a>
        </div>
        )
      })}
      </div>
    </div>
  );
};

export default App;