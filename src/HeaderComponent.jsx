import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faPowerOff, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import data from './data';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom'

function HeaderComponent(props) {
    console.log(props)
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);
    const [profile, setProfile] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    let searchRef = useRef(null);
    let inputRef = useRef(null);
    let profileRef = useRef(null);

    const location = useLocation();

    const handleUserMouseDown = event => {
        if (profileRef && !profileRef.current.contains(event.target)) {
            setProfile(false)
        }

        if (searchRef && !searchRef.current.contains(event.target)) {
            setSearch(false)
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleUserMouseDown);

        return () => {
            window.removeEventListener('mousedown', handleUserMouseDown);
        };

    }, []);


    let searchList = [];
    if (searchInput.length > 0) {
        searchList = data.filter(x => x.name.toLowerCase().includes(searchInput.toLowerCase()))
    }

    return (
        <div>
            <div className={"header-navbar active"}>
                <FontAwesomeIcon className="menu-bar" icon={faBars} onClick={() => setMenu(true)} />
                <div className={"left-navbar" + (menu ? " active" : "")}>
                    <div onClick={() => setMenu(false)}><Link to="/">ABC Company</Link> <FontAwesomeIcon className="menu-close" icon={faTimes} onClick={() => setMenu(false)} /></div>
                    <div onClick={() => setMenu(false)}><Link to="/Movies">Movies</Link></div>
                    <div onClick={() => setMenu(false)}><Link to="/Cinemas">Cinemas</Link></div>
                    <div onClick={() => setMenu(false)}><Link to={{ pathname: "/", hash: "#promotions" }} >Promotions</Link></div>
                </div>
                <div className="right-navbar">
                    <div className={"search" + (search ? " focus" : "")} ref={searchRef}>
                        <FontAwesomeIcon icon={faSearch} onClick={() => { inputRef.current.focus(); }} />
                        <input
                            ref={inputRef}
                            placeholder="Search by movie"
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            onFocus={() => setSearch(true)}
                            // onBlur={() => setSearch(false)}
                            spellCheck="false"
                        />
                        {searchList.length > 0 &&
                            <div className="search-result">
                                {searchList.map(x => {
                                    return (
                                        <Link to={"/Movies?movie=" + x.name} onClick={() => { setSearch(false); setSearchInput(""); }}>
                                            <div key={x.id} className="d-flex flex-rows align-items-center">
                                                <div style={{ width: "100px", marginRight: "15px" }}>
                                                    <img src={(`${process.env.PUBLIC_URL}/img/${x.poster}`)} alt={x.name} width={80} />
                                                </div>
                                                <div style={{ fontWeight: "normal" }}>
                                                    <div style={{ fontSize: "16px" }}>{x.name}</div>
                                                    <div style={{ fontSize: "10px", opacity: ".5" }}>{x.description}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        }

                    </div>
                    <div className="profile" ref={profileRef}>
                        <FontAwesomeIcon icon={faUser} onClick={() => setProfile(!profile)} />
                        {profile &&
                            <div className="profile-popover">
                                <div><FontAwesomeIcon icon={faUser} /> My Profile</div>
                                <div><FontAwesomeIcon icon={faPowerOff} /> Logout</div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;