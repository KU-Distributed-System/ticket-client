import React, { useEffect, useState } from 'react';
import Moment from "moment";
import Select from 'react-select'
import data from "./data";
import { Collapse } from 'reactstrap';

let dates = [Moment(), Moment().add(1, 'days'), Moment().add(2, 'days')];

let cinemaList = [
    { value: null, label: "All Theaters" },
    { value: 0, label: "블루스퀘어" },
    { value: 1, label: "아트센터" }
]

let movieList = [
    { value: null, label: "All Concerts" },
    { value: 1, label: "엘리자베스" },
    { value: 2, label: "라이온킹", },
    { value: 3, label: "데스노트" }
]

let slotList = ["05:00 PM", "07:00 PM"];

function Movie(props) {
    const [date, setDate] = useState(dates[0]);
    const [cinema, setCinema] = useState(cinemaList[0]);
    const [movie, setMovie] = useState(movieList[0]);
    const [collapse, setCollapse] = useState([false, false, false, false]);

    useEffect(() => {
        if (props.location.search.length > 0) {
            let search = new URLSearchParams(props.location.search);
            let movie = search.get("movie");
            let cinema = search.get("cinema");
            if (movie) {
                let searchMovie = movieList.find(x => x.label === movie);
                if (searchMovie) setMovie(searchMovie);
            }

            if (cinema) {
                let searchCinema = cinemaList.find(x => x.label === cinema);
                if (searchCinema) {
                    setCinema(searchCinema);
                    let newCollapse = collapse;
                    newCollapse[searchCinema.value] = true;
                    setCollapse(newCollapse)
                };
            }

        }
    }, [props.location.search]);


    const handleBooking = (c, m, time) => {
        props.history.push({
            pathname: '/Booking',
            search: `?date=${Moment(date).format("DD-MM-YYYY")}&cinema=${c}&movie=${m}&slot=${time}`,
        })
    }

    return (
        <div className="content">
            <div className="date-selection form-group">
                {dates.map((x, idx) => {
                    return (
                        <div key={idx} className={Moment(date).isSame(x, "day") ? "active" : ""} onClick={() => setDate(x)}>
                            <span style={{ fontWeight: "bold" }}>{Moment(x).format("dddd")}</span>
                            <span style={{ opacity: ".75" }}>{Moment(x).format("DD-MMM")}</span>
                        </div>
                    )
                })}
            </div>
            <div className="row movie-filter">
                <div className="col-12 col-lg-6 form-group">
                    <span><b>Cinema:</b></span>
                    <div style={{ color: "black" }}>
                        <Select options={cinemaList} value={cinema} onChange={e => {
                            setCinema(e);
                            let newCollapse = collapse;
                            newCollapse[e.value] = true;
                            setCollapse(newCollapse);
                            if (props.location.search) props.history.push("/Movies");
                        }} />
                    </div>
                </div>
                <div className="col-12 col-lg-6 form-group">
                    <span><b>Movie:</b></span>
                    <div style={{ color: "black" }}>
                        <Select options={movieList} value={movie} onChange={e => { setMovie(e); if (props.location.search) props.history.push("/Movies"); }} />
                    </div>
                </div>
            </div>
            {cinemaList.map((items, idx) => {
                if (items.value !== null && (cinema.value === null || cinema.label === items.label)) {
                    return (
                        <div key={idx} className="showtimes">
                            <div key={items.value} className="showtimes-location"
                                onClick={() => {
                                    let newCollapse = collapse;
                                    newCollapse[items.value] = !newCollapse[items.value];
                                    setCollapse([...newCollapse]);
                                }}>
                                <span>{items.label}</span>
                                {collapse[items.value] ?
                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                    :
                                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                                }
                            </div>
                            <Collapse isOpen={collapse[items.value]}>
                                <hr />
                                {data.map(x => {
                                    if ((movie.value === null || movie.label === x.name)) {
                                        return (
                                            <div key={x.id} className="showtimes-movie-display">
                                                <div className="showtimes-movie">
                                                    <img className="img-fluid" src={(`${process.env.PUBLIC_URL}/img/${x.poster}`)} alt={x.name} width={80} />
                                                </div>
                                                <div>
                                                    <h4>{x.name}</h4>
                                                    <div className="showtimes-slots">
                                                        {slotList.map((y, idx) => {
                                                            return <div key={idx} onClick={() => handleBooking(items.label, x.name, y)}>{y}</div>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}

                            </Collapse>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Movie;