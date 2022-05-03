'use strict';

// Source: https://gitlab.metropolia.fi/hyte2022/kubios/-/blob/main/app.js
// Creating variables for node modules.

require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const userAgent = 'Kubios 0.1';

// The kubiosFetch and login functions for fetching Kubios person data was created by Patrick Ausderau.
// https://gitlab.metropolia.fi/hyte2022/kubios/-/tree/main

// Login function is for login in to Kubios Cloud account and after login user can fetch information
// from Kubios Cloud server for example user's readiness measurement values.

//* FETCHING DATA FROM KUBIOS CLOUD NOT WORKING SINCE WE DIDNT HAVE TIME TO FINISH IT :( */

const login = async () => {
    const cookie = 'keyboardCatRandom';
    const myHeaders = { Cookie: `XSRF-TOKEN=${cookie}`, 'User-Agent': userAgent };
    const myBody = new URLSearchParams();
    myBody.set('client_id', process.env.KUBIOS_CLIENT_ID);
    myBody.set('redirect_uri', 'https://analysis.kubioscloud.com/v1/portal/login');
    myBody.set('username', process.env.KUBIOS_USERNAME);
    myBody.set('password', process.env.KUBIOS_PASSWORD);
    myBody.set('response_type', 'token');
    myBody.set('access_type', 'openid');
    myBody.set('_csrf', cookie);
    const option = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'manual',
        body: myBody,
    };
    console.log("client_id", process.env.KUBIOS_CLIENT_ID)
    console.log("username", process.env.KUBIOS_USERNAME)
    console.log("password", process.env.KUBIOS_PASSWORD)
    const response = await fetch('https://kubioscloud.auth.eu-west-1.amazoncognito.com/login', option);
    console.log('rivi 35', response.headers);
    const location = response.headers.raw().location[0];
    const token = location.substring(location.indexOf('=') + 1, location.indexOf('&'));
    return token;
};

// kubiosFetch for fetching user's information from Kubios Cloud server.
const kubiosFetch = async () => {

    const person = async () => {
        const token = await login();
        const myHeaders = { Authorization: 'Bearer ' + token, 'User-Agent': userAgent };
        const response = await fetch('https://analysis.kubioscloud.com/v2/user/self', { headers: myHeaders });
        const json = await response.json();
        console.log('json', json);
    };
    person();
};

// Kubios fetch measurement function will get user's Kubios measurement data from Kubios Cloud server.
const kubiosFetchMeasurement = async (user_id) => {
    let vastaus = [];
    try {

        // Fetching measurement value function for getting readiness measurement results for each id.
        const fetchingMeasurementValue = async (token, myHeaders, json, user_id) => {

            /* console.log("Testing:", json.results[0].result_id); */
            /* for (const measurement of json.results) {
                const id = measurement.result_id;
                const response = await fetch(`https://analysis.kubioscloud.com/v2/result/self/${id}`, { headers: myHeaders });
                const jsonMeasure = await response.json();
                // console.log("Measurement json id:", jsonMeasure); 
                console.log("Measurement json id:", jsonMeasure.result.measure_id,
                    "\nMeasurement date:", jsonMeasure.result.daily_result,
                    "\nMeasurement mean hr bpm:", jsonMeasure.result.result.mean_hr_bpm,
                    "\nMeasurement readiness:", jsonMeasure.result.result.readiness,
                    "\nMeasurement respiratory rate:", jsonMeasure.result.result.respiratory_rate,
                    "\nMeasurement stress index:", jsonMeasure.result.result.stress_index,
                    "\nMeasurement comment:", jsonMeasure.result.user_comment,
                    "\nMeasurement user happiness:", jsonMeasure.result.user_happiness, "\n");
                vastaus.push(jsonMeasure);
            } */
            const response = await fetch('http://localhost:3000/json/all_results.json');
            console.log(response);
            const jsonMittaus = await response.json();
            vastaus = jsonMittaus.results;
        };

        // Fetching measurement id function for getting all the id's of the measurements user has done using Kubios application.
        const fetchingMeasurementId = async (user_id) => {
            const token = await login();
            console.log('fetching measurements id 85 ', token);
            const myHeaders = { Authorization: 'Bearer ' + token, 'User-Agent': userAgent };
            const response = await fetch('https://analysis.kubioscloud.com/v2/result/self', { headers: myHeaders });
            const json = await response.json();
            console.log('json', json);
            await fetchingMeasurementValue(token, myHeaders, json, user_id);
        };

        await fetchingMeasurementId(user_id);
        return vastaus;
    } catch (e) {
        console.log("Error in kubiosFetchMeasurement function in kubiosModel js file:", e.message);
    }
};

// Exporting functions
module.exports = {
    kubiosFetch,
    kubiosFetchMeasurement,
}
