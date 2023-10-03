import DisplayPart from './DisplayPart';
import SearchPart from './SearchPart';

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
      "October", "November", "December",];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
}

export default function Weather({data,setCity,onSearch
}) {
    return (
        <>
            <DisplayPart data={data} dateBuilder = {dateBuilder}/>
            <SearchPart data={data} setCity={setCity} onSearch={onSearch}/>
        </>
    )
}