#!/usr/bin/env node
import { getArgs } from "./helpers/argv.js";
import { getWeather } from "./services/api.services.js";
import { printHelp, printError, printSuccess, printWeather } from "./services/log.services.js";
import { saveKeyValue, tokenDictionary } from "./services/storage.services.js";

const saveToken = async (token) => {
    if(!token.length) {
        printError("Немає токена!");
        return;
    }
    try{
        await saveKeyValue(tokenDictionary.token, token)
        printSuccess("Токен збережено")
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError("Немає міста!");
        return;
    }
    try{
        await saveKeyValue(tokenDictionary.city, city)
        printSuccess("Місто збережено")
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try{
        const weather = await getWeather();
        printWeather(weather)
    } catch (e) {
        if(e?.response?.status == 404) {
            printError('Помилка в назві місто!')
        } else if(e?.response?.status == 401){
            printError('Невірно вказаний токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if(args.h) {
        return printHelp()
    } 
    if(args.c) { 
        return saveCity(args.c)
    } 
    if(args.t) {
        return saveToken(args.t)
    }
    return getForcast();
}

initCLI();