import React,{useRef} from "react";
import {StandardSearchBox, LoadScript} from "@react-google-maps/api";
const LocationInput =() =>{
    const inputRef = useRef();
    const handlePlaceChange =() => {
        const [place] = inputRef.current.getPlaces()
        if(place){
            console.log(place.formatted_address);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        }
    };
    return(
        <LoadScript
            googleMapsApiKey="AIzaSyDeAYxbziLvvnGk01kg2xiZJ46ivC33IW4"
            libraries={["places"]}
        >
            <StandardSearchBox
                onLoad={ref =>(inputRef.current = ref)}
                onPlacesChanged = {handlePlaceChange}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập vào địa chỉ"
                ></input>
            </StandardSearchBox>
        </LoadScript>
    );
};
export default LocationInput;