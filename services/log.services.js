import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed('ERROR'), error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS'), message)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Без ппраметрів - виведення погоди
        -c [CITY] - для встановлення міста
        -h для виведення допомоги
        -t [API_KEY] - для виведення токенів
        `
    )
}

const printWeather = (weather) => {
    console.log(
        dedent`${chalk.yellowBright('WEATHER IN YOUR CITY')}
        Місто: ${chalk.blueBright(weather.name)}
        Погода: ${chalk.blueBright(weather.weather[0].description)}
        Температура: ${chalk.blueBright(weather.main.temp)}
        Відчувається як: ${chalk.blueBright(weather.main.feels_like)}
        Вологість: ${chalk.blueBright(weather.main.humidity)}
        Швидкість вітру: ${chalk.blueBright(weather.wind.speed)}
        `)
}

export {printError, printSuccess, printHelp, printWeather}