import Clock from "react-live-clock";

export default function ({ data,dateBuilder}) {
    return (
        <div className="display-part">
            <header>
                <h2>{data.city}</h2>
                <h3>{data.country}</h3>
            </header>
            <footer>
                <div className="date-section">
                    <Clock 
                      format="HH:mm:ss" 
                      interval={1000} 
                      ticking={true} 
                      className="time" 
                      timezone=""
                    />
                    <p className="date">{dateBuilder(new Date())}</p>
                </div>
                <div className="temperature">
                    <h1>{data.temperature}
                        <sup><span>o</span></sup>
                        <span>C</span>
                    </h1>
                </div>
            </footer>
        </div>
    )
}