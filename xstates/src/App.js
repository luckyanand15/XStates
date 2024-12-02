import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resp = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(resp.data);
        setSelectedState("");
        setSelectedCity("");
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const resp = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          setStates(resp.data);
          setSelectedState("");
          setSelectedCity("");
        } catch (err) {
          console.log(err);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const resp = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(resp.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  return (
    <div className="wrapper">
      <h1>Select Location</h1>
      <select
        id="country"
        name="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        id="state"
        name="state"
        value={selectedState}
        onChange={handleStateChange}
        className="dropdown"
        disabled={selectedCountry.length === 0}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        id="city"
        name="city"
        value={selectedCity}
        onChange={handleCityChange}
        className="dropdown"
        disabled={selectedState.length === 0}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <p>
          <strong>
            You selected <span className="selectedCity">{selectedCity}</span>,{" "}
            <span className="selectedState">
              {selectedState}, {selectedCountry}
            </span>
          </strong>
        </p>
      )}
    </div>
  );
}

export default App;
