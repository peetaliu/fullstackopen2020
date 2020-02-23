import React from 'react'

const Search = (props) => <div>Find Countries: <input value={props.search} onChange={props.handler}/></div>

export default Search