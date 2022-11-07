import axios from 'axios';
import https from 'https';
import { getKeyValue, tokenDictionary } from './storage.services.js';

const getWeather = async () => {
    const token = process.env.TOKEN ?? await getKeyValue(tokenDictionary.token);
    const city = process.env.CITY ?? await getKeyValue(tokenDictionary.city)
    if(!token) {
        throw new Error('Не задан ключ API, задайте його через команду -t [API_KEY]')
    } else if(!city) {
        throw new Error('Не задане місто, задайте його через команду -c [CITY]')
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ua',
            units: 'metric'
        }
    })
    return data;

    /*const url = new URL('https://api.openweathermap.org/data/2.5/weather');

    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'ua');
    url.searchParams.append('units', 'metric');

    https.get(url, (response) => {
        let res = '';
        response.on('data', (chunk) => {
            res += chunk;
        })

        response.on('end', () => {
            console.log(JSON.parse(res))
        })
    })*/
}

export { getWeather }