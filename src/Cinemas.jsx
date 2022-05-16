import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

let list = [
    { id: 0, name: "1st Avenue Mall", address: "Level 8, 1st Avenue Mall, Jalan Magazine, 10300 Georgetown, Pulau Pinang, Malaysia" },
    { id: 1, name: "Gurney Plaza", address: "Level 6, Gurney Plaza, Jalan Magazine, 10250 Georgetown, Pulau Pinang, Malaysia" },
    { id: 2, name: "Gurney Paragon", address: "Level 7, Gurney Paragon, Jalan Magazine, 10250 Georgetown, Pulau Pinang, Malaysia" },
    { id: 3, name: "Queensbay Mall", address: "Level 5, Queensbay Mall, Jalan Magazine, 10300 Bayan Lepas, Pulau Pinang, Malaysia" },
]

function Cinemas(props) {
    const [search, setSearch] = useState("");

    let searchList = search.length === 0 ? list : list.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="content cinema">
            <div className="cinema-search">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    placeholder="Search by cinema"
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