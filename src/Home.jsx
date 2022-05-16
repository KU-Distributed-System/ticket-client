import React from 'react';
import Slider from "react-slick";
import data from './data';

function Home(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    const settingsPoster = {
        className: "center",
        centerMode: true,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        focusOnSelect: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    centerPadding: "0px",
                    slidesToShow: 1,
                }
            },
        ]

    };

    return (
        <>
            <div className="home-slideshow form-group">
                <Slider {...settings}>
                    {data.map(x => {
                        return (
                            <div key={x.id} >
                                <div className="home-slide" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/' + x.banner})` }}>
                                    <div>
                                        <div>
                                            <h1>{x.name}</h1>
                                            <span>{x.description}</span>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary btn-lg" onClick={() => props.history.push("/Movies?movie=" + x.name)}>Book Now!</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>

            <div className="home-content form-group">
                <div>
                    <div>Now Showing</div>
                </div>
                <hr />
                <Slider {...settingsPoster}>
                    {[...data, ...data].map(x => {
                        return (
                            <div key={x.id}>
                                <div className="movie-poster">
                                    <div style={{ position: "relative", width: "250px" }}>
                                        <img src={(`${process.env.PUBLIC_URL}/img/${x.poster}`)} alt={x.name} />
                                        <div className="movie-hover">
                                            <h4>{x.name}</h4>
                                            <button className="btn btn-primary btn-sm" onClick={() => props.history.push("/Movies?movie=" + x.name)}>Book Now!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </Slider>
            </div>


            <div id="promotions" className="home-content">
                <div>
                    <div>Promotions</div>
                </div>
                <hr />
                <div style={{ fontSize: "16px", fontWeight: "normal", marginLeft: "10px", marginBottom: "50px" }}>No promotion yet.</div>
            </div>
        </>
    )
}

export default Home;