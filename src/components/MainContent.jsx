import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';



export default function MainContent() {

    //states
    const [timings, setTimings] = useState({
        Fajr: "04:42",
        Dhuhr: "13:01",
        Asr: "16:27",
        Maghrib: "19:20",
        Isha: "21:12",
    });

    const [city, setCity] = useState({
        displayName: "Berlin",
        apiName: "Berlin",
    });

    const [today, setToday] = useState("");

    const availableCities = [
        {
            displayName: "Berlin",
            apiName: "Berlin",
            country: "Germany",
        },
        {
            displayName: "Damaskus",
            apiName: "Damaskus",
            country: "Syria",
        },
        {
            displayName: "Makkah",
            apiName: "Makkah al Mukarramah",
            country: "Saudi Arabia",
        },
    ];

    const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState(''); // New state variable


    const getTimings = async () => {
        const selectedCity = availableCities.find(cityObj => cityObj.apiName === city.apiName);
        if (selectedCity) {
            const response = await axios.get(
                `https://api.aladhan.com/v1/timingsByCity?country=${selectedCity.country}&city=${city.apiName}&method=3`
            );
            setTimings(response.data.data.timings);
        } else {
            console.error(`City with apiName "${city.apiName}" not found in availableCities`);
        }
    }

    useEffect(() => {
        getTimings();

        const t = moment().format('MMM Do YYYY | h:mm');
        setToday(t);
    }
        , [city]);

    //const data = await axios.get("http://api.aladhan.com/v1/timingsByCity?city=Berlin&country=Germany&method=3");
    // setTimings(data.data.timings);



    const handleCityChange = (event) => {
        const cityObject = availableCities.find((city) => {
            return city.apiName === event.target.value;
        });
        setCity(cityObject)
    };

    return (<>
        {/* TOP ROW*/}
        <Grid container>
            <Grid xs={6}>
                <div>
                    <h2>{today}</h2>
                    <h1>{city.displayName}</h1>
                </div>
            </Grid>
            <Grid xs={6}>
                <div>
                    <h2>Time till next Prayer</h2>
                    <h1>10</h1>
                </div>
            </Grid>
        </Grid>
        {/* TOP ROW*/}

        <Divider style={{ borderColor: "white", opacity: "0.1" }} />

        {/* Prayers Cards*/}
        <Stack direction={'row'} justifyContent={"space-around"}
            style={{ marginTop: "50px" }} >
            <Prayer name="Fajr" time={timings.Fajr} image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2" />
            <Prayer name="Dhuhr" time={timings.Dhuhr} image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921" />
            <Prayer name="Asr" time={timings.Asr} image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf" />
            <Prayer name="Maghrib" time={timings.Maghrib} image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5" />
            <Prayer name="Isha" time={timings.Isha} image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d" />
        </Stack>
        {/* Prayers Cards*/}

        {/* City Selection*/}
        <Stack direction="row" justifyContent={"center"} style={{ marginTop: "20px" }}>
            <FormControl style={{ width: "20%" }}>
                <InputLabel id="demo-simple-select-label">
                    <span style={{ color: "white" }}>
                        City
                    </span>
                </InputLabel>
                <Select
                    style={{ color: "white" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Age"
                    onChange={handleCityChange}
                >
                    {availableCities.map((city) => {
                        return (
                            <MenuItem value={city.apiName}>{city.displayName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Stack>
    </>

    )
}
