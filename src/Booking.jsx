import React, { useEffect, useState } from 'react';
import Moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

let dates = [Moment(), Moment().add(1, 'days'), Moment().add(2, 'days')];

let cinemaList = [
    "1st Avenue Mall",
    "Gurney Plaza",
    "Gurney Paragon",
    "Queensbay Mall",
]

let movieList = [
    "Tom and Jerry",
    "Godzilla vs Kong",
    "Raya and the Last Dragon",
    "Mortal Kombat",
]

let slotList = ["10:30 AM", "12:00 PM", "04:30 PM", "06:00 PM", "08:00 PM"];

let seatList = [
    { seatNumber: ["A1", "A2", "A3", "A4", "A5"] },
    { seatNumber: ["B1", "B2", "B3", "B4", "B5"] },
    { seatNumber: ["C1", "C2", "C3", "C4", "C5"] },
    { seatNumber: ["D1", "D2", "D3", "D4", "D5"] },
    { seatNumber: ["E1", "E2", "E3", "E4", "E5"] },
]

function Booking(props) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState(null);
    const [seat, setSeat] = useState([]);
    const [classic, setClassic] = useState(0);
    const [kids, setKids] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let search = new URLSearchParams(props.location.search);
        let date = search.get("date");
        let cinema = search.get("cinema");
        let movie = search.get("movie");
        let slot = search.get("slot");

        if (date && cinema && movie && slot) {
            if (dates.some(x => Moment(date, "DD-MM-YYYY").isSame(x, "day")) && cinemaList.some(x => x === cinema) && movieList.some(x => x === movie) && slotList.some(x => x === slot)) {
                let data = {
                    date: date,
                    cinema: cinema,
                    movie: movie,
                    slot: slot,
                    hall: "Hall " + (Math.floor(Math.random() * 10) + 1)
                }
                setTitle(data);
            } else {
                props.history.goBack();
            }
        } else {
            props.history.goBack();
        }

    }, []);


    const handleSeatChange = value => {
        let seatNo = seat;
        let index = seatNo.findIndex(x => x === value);
        if (index !== - 1) {
            seatNo.splice(index, 1);
        } else {
            seatNo.push(value);
        }
        setSeat([...seatNo]);
    }

    const toggle = () => setModal(!modal);

    const handleConfirm = () => {
        if (seat.length !== 0) {
            setClassic(seat.length);
            setKids(0);
            setModal(true);
        }
    }

    const handleMinus = field => {
        if (field == "Classic") {
            if (classic !== 0) {
                setClassic(classic - 1)
            }
        } else {
            if (kids !== 0) {
                setKids(kids - 1)
            }
        }
    }

    const handleAdd = field => {
        if (field == "Classic") {
            if (classic !== seat.length) {
                setClassic(classic + 1);
                if (kids === seat.length) {
                    setKids(kids - 1);
                }
            }
        } else {
            if (kids !== seat.length) {
                setKids(kids + 1);
                if (classic === seat.length) {
                    setClassic(classic - 1);
                }
            }
        }
    }

    const handleDone = () => {
        setSuccess(false);
        props.history.push("/")
    }

    return (
        <div>
            {title &&
                <div className="d-flex flex-column align-items-center booking-details">
                    <div>{title.movie}</div>
                    <div className="list">
                        <span><i className="fa fa-map-marker" aria-hidden="true"></i>{title.cinema}</span>
                        <span><i className="fa fa-play-circle" aria-hidden="true"></i>{title.hall}</span>
                        <span><i className="fa fa-calendar" aria-hidden="true"></i>{title.date}</span>
                        <span><i className="fa fa-clock-o" aria-hidden="true"></i>{title.slot}</span>
                    </div>
                </div>
            }
            <div className="screen"><div>Screen</div></div>
            <div className="seat-selection">
                {seatList.map((x, idx) => {
                    return <div key={idx}>
                        {x.seatNumber.map((y, id) => {
                            let active = seat.includes(y);
                            return (
                                <span key={id} className={active ? "active" : ""} onClick={() => handleSeatChange(y)}>
                                    {active ? <i className="fa fa-check" aria-hidden="true"></i> : y}
                                </span>
                            )
                        })}
                    </div>
                })}
            </div>
            <div className="seat-footer">
                <div className="seat-type">
                    <div className={"selected"}><span><i class="fa fa-check" aria-hidden="true"></i></span> Selected</div>
                    <div className={"sold"}><span><i class="fa fa-times" aria-hidden="true"></i></span> Sold</div>
                    <div className={"lock"}><span><i class="fa fa-lock" aria-hidden="true"></i></span> Unavailable</div>
                </div>
                <div className={"confirm-ticket" + (seat.length === 0 ? " disabled" : "")} onClick={handleConfirm}>
                    <span>CONFIRM</span>
                    <span style={{ fontSize: "14px" }}>{seat.length} ticket(s)</span>
                </div>
            </div>

            {modal &&
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        <div>
                            <div className="d-flex justify-content-between form-group"><h4>Tickets </h4><span style={{ marginRight: "10px", fontSize: "20px", cursor: "pointer" }} onClick={toggle}>&#x2715;</span></div>
                            <div className="ticket-type">
                                <div><b>Classic</b><br /><span style={{ fontSize: "12px" }}>RM 18.00</span></div>
                                <div className="number">
                                    <span onClick={() => handleMinus("Classic")}>&#8211;</span>
                                    <span className="number">{classic}</span>
                                    <span onClick={() => handleAdd("Classic")}>&#43;</span>
                                </div>
                            </div>
                            <div className="ticket-type">
                                <div><b>Kids</b><br /><span style={{ fontSize: "12px" }}>RM 12.00</span></div>
                                <div className="number">
                                    <span onClick={() => handleMinus("Kids")}>&#8211;</span>
                                    <span className="number">{kids}</span>
                                    <span onClick={() => handleAdd("Kids")}>&#43;</span>
                                </div>
                            </div>
                            <div className="ticket-total">
                                <div>Total: RM {(classic * 18 + kids * 12).toFixed(2)}</div>
                                <button className="btn btn-primary" disabled={(classic + kids) !== seat.length} onClick={() => { setSuccess(true); setModal(false) }}>Confirm</button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            }
            {success &&
                <Modal isOpen={success} toggle={() => setSuccess(!success)}>
                    <ModalBody>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="success">
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                            <div className="mb-5">Your booking has been confirmed.<br /> Check your email for more details.</div>
                            <button className="btn btn-success w-75" onClick={handleDone}>OKAY</button>
                        </div>
                    </ModalBody>
                </Modal>
            }
        </div>
    )
}

export default Booking;