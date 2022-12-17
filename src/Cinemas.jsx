import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

let list = [
    { id: 0, name: "블루스퀘어", address: "서울특별시 용산구 한남동" },
    { id: 1, name: "아트센터", address: "서울특별시 서초구 서초동" }
]

function Cinemas(props) {
    const [search, setSearch] = useState("");

    let searchList = search.length === 0 ? list : list.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="content cinema">
            <div className="cinema-search">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    placeholder="Search by Theater"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    spellCheck="false"
                />
            </div>
            <hr />

            {search.length !== 0 && searchList.length === 0 ?
                <div className="d-flex w-100 justify-content-center text-danger mt-5" style={{ fontSize: "1.5rem" }}>Sorry, there are no results that match your search.</div>
                :
                <div className="cinema-list">
                    {searchList.map(x => {
                        return (
                            <div key={x.id}>
                                <h4>{x.name}</h4>
                                <p>{x.address}</p>
                                <button className="btn btn-primary" onClick={() => props.history.push("/Movies?cinema=" + x.name)}>Showtimes</button>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Cinemas;