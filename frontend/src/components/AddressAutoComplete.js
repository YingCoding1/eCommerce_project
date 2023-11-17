import React, {useEffect, useRef, useState} from "react";
import {apiKey, extractAddress, loadAsyncScript, mapApi} from "../Helper";

function AddressAutoComplete() {

    const searchInput = useRef(null);
    const [address, setAddress] = useState({})

    // init map script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApi}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src)
    }

    // onchange address
    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        console.log(extractAddress(place));

        setAddress(extractAddress(place));
    }

    // init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;
        console.log(searchInput.current)
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
    }

    // load map script after amounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, []);

    useEffect(() => {
        console.log(searchInput.current.value)
        searchInput.current.value = address.streetName != undefined ? `${address.streetNumber} ${address.streetName}` : ""
    }, [address])
    return (
        <div className="addressAutoComplete">
            <div>
                <div className="search">
                    <span></span>
                    <input ref={searchInput} type="text"/>
                    {/*<button onChange={findMyLocation}></button>*/}
                </div>
                <div className="address">
                    <p>City: <span>{address.city}</span></p>
                    <p>State: <span>{address.state}</span></p>
                    <p>Zip: <span>{address.zip}</span></p>
                    <p>Country: <span>{address.country}</span></p>
                </div>
            </div>
        </div>
    )
}

export default AddressAutoComplete;