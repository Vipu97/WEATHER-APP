export default function Loader() {
    return (
        <div className="loader">
            <img src={require("./images/WeatherIcons.gif")} alt="loading-image" height='300px'/>
            <h2>Detecting your Location</h2>
            <h3>Your current location will be displayed on the App <br/>
            & used for calculating Real-time weather</h3>
        </div>
    )

}