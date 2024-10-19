import { Prayer } from './Prayer';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState, useCallback } from 'react';
import useTimings from '../hooks/useTimings';
import { availableCities } from '../data/availableCities';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import '../App.css';
import Typography from '@mui/material/Typography';


export function MainContent() {
    const [city, setCity] = useState(availableCities[0]);
    const { timings, error, nextPrayer, countdown, currentTime } = useTimings(city);


    const handleCityChange = useCallback((event) => {
        const selectedCity = availableCities.find(cityObj => cityObj.apiName === event.target.value);
        setCity(selectedCity);
    }, [setCity]);

    return (
        <>
            {/* City Selection */}
            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item>
                    <FormControl >
                        <InputLabel id="city-select-label">
                            <span style={{ color: "white" }}>City</span>
                        </InputLabel>
                        <Select
                            style={{ color: "white", minWidth: '200px' }}
                            labelId="city-select-label"
                            id="city-select"
                            value={city.apiName}
                            label="City"
                            onChange={handleCityChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LocationCityIcon />
                                </InputAdornment>
                            }
                        >
                            {availableCities.map((city) => (
                                <MenuItem key={city.apiName} value={city.apiName}>
                                    {city.displayName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {nextPrayer && countdown && (
                    <Grid item>
                        <Card>
                            <div style={{ textAlign: 'center', margin: '20px' }}>
                                <Typography variant="h6" color="text.secondary">Time right now: {currentTime}</Typography>
                                <Typography variant="h6" color="text.secondary">Next Prayer: {nextPrayer.name}</Typography>
                                <Typography variant="h6" color="text.secondary">Time Remaining: {`${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</Typography>
                            </div>
                        </Card>
                    </Grid>
                )}
            </Grid>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error.message}</p>
            ) : timings ? (
                <Grid row container spacing={2} sx={{ mt: 1 }} className="centered-grid">
                    {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
                        <Grid item xs={12} sm={6} md={3} lg={2} xl={2} key={prayer}>
                            <Prayer name={prayer} time={timings[prayer]} image={`src/assets/images/${prayer}.webp`} isNextPrayer={nextPrayer && nextPrayer.name === prayer} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" color="text.secondary">Loading...</Typography>
            )}
        </>
    );
}