/*
const url_final2 = url + "/api/auth/login";

fetch(url_final2, {
    method : 'POST',
    headers : {'Content-Type' : 'application/json', "Accept" : "application/json"},
    mode : 'cors',
    body : JSON.stringify(request_data),
})
    .then(res => {
        var tt = res.json();
        console.log(tt);
    })
    .then(resdata => { console.log(resdata); });
*/
/*
fetch(url_final, {
method : 'GET',
mode : 'cors',
cache : 'default',
headers : {'Authorization' : 'Bearer ' + token, 'Content-Type' : 'application/json'}
})
.then(res => {
    var tt = res.json();
    console.log("ok", tt);
})
.then(resdata => { console.log(resdata); });
*/
// console.log("this is axios");

/*
fetch(url_token, {
    method : 'POST',
    body : JSON.stringify(user_info),
})
    .then(res => {
        var tt = res.json();
        console.log(tt);
    })
    .then(resdata => { console.log(resdata); });
*/

const axios = require('axios');
const url = 'https://umami.enjoy61.com';
const token =
    "m4Mc7bEF5KtnDIY2r10nsf0vFFv8d3iCS8jmxDayQ1voG3mgnyAyA1VGP/+d17sTifSYCqmBzTPdfD4orJ09jWGBb5aOq8DABcT+HH2D+Uvy3lfkKEkJFgYQdtRRLPusBvhgScdJpJ8fy5o4TPtgJxB71A+YnaGWs6Fcr3Pb5nh97K9JNHOxEAPgHlk19hKH6YjQdidSTruC4JHOx1iJClRsY1E/sqhJ5fVCzDp3ssaF71Viudc0VsnOp8BSbDy4du5O0tmT9sYia5KeOHTxpsiHO10CpN9ZklZt+OetNE/RXDhkqlt2iir1O5PYXUMg1dI2jYb5DNNfIr+6O7HPQ/D7K2i9eo8qwA==";
const website_id = "3b1506e8-f2b7-4af5-8f2e-760349a09854";

/*
const user_info = {
    'username' : '',
    'password' : ''
};

function get_user_token()
{
    const url_token = url + "/api/auth/login";
    axios.post(url_token, user_info)
        .then(response => {
            console.log("ok1", response.data.token);
            console.log(response.data.user);
        })
        .catch(error => {
            console.log("error1");
            // console.log(error);
        });
}
get_user_token();
*/

get_website_stat(token);

function get_website_stat(token)
{
    // console.log("ok2");
    var cur_time = Date.parse(new Date());
    const url_final = url + "/api/websites/" + website_id + "/pageviews?startAt=0&endAt=" + cur_time + "&unit=year";

    axios.get(url_final, {headers : {'Authorization' : 'Bearer ' + token, 'mode' : 'cors'}})
        .then(response => {
            // console.log(response.data);
            update_stat(response.data.pageviews, response.data.sessions);
        })
        .catch(error => {
            console.log("error2"); // console.log(error);
        });
}

function update_stat(pageviews, sessions)
{
    var pageview_num = 0;
    for (i = 0; i < pageviews.length; ++i)
    {
        pageview_num += pageviews[i].y;
    }

    var visitor_num = 0;
    for (i = 0; i < sessions.length; ++i)
    {
        visitor_num += sessions[i].y;
    }
    // console.log(pageview_num, visitor_num);

    const pageview_elem = document.getElementById("pageview");
    pageview_elem.innerText = pageview_num;

    const visitor_elem = document.getElementById("visitor");
    visitor_elem.innerText = visitor_num;
}

get_single_pageview(token);

const retry_times_max = 1;
var retry_times = retry_times_max;
var last_url;
function get_single_pageview(token)
{
    //console.log("ok3");
    var cur_time = Date.parse(new Date());

    if (retry_times == retry_times_max)
    {
        last_url = window.location.pathname;
        //console.log(window.location.pathname);
    }
    else
    {
        //console.log("en", last_url);
        last_url = last_url.replace(new RegExp(/%2F/g), "/");
        //console.log("re", last_url);
    }
    
    const url_local = encodeURIComponent(last_url);
    //console.log(url_local);
    last_url = url_local;
    
    const url_final = url + "/api/websites/" + website_id + "/stats?startAt=0&endAt=" + cur_time + "&url=" + url_local;

    //console.log(url_final);
    axios.get(url_final, {headers : {'Authorization' : 'Bearer ' + token, 'mode' : 'cors'}})
        .then(response => {
            if (!response.data.pageviews.value)
            {
                if (retry_times)
                {
                    --retry_times;
                    get_single_pageview(token);
                }
                else
                {
                    retry_times = retry_times_max;
                    update_single_pageview(response.data.pageviews.value);
                }

            }
            else
            {
                retry_times = retry_times_max;
                //console.log(response.data.pageviews.value);
                update_single_pageview(response.data.pageviews.value);
            }
        })
        .catch(error => {
            console.log("error2"); // console.log(error);
        });
}

function update_single_pageview(times)
{
    const pageview_elem = document.getElementById("single-pageview");
    if (pageview_elem) { pageview_elem.innerText = times; }
}

/*
get_pageviews(token);
function get_pageviews(token)
{
    // console.log("ok2");
    var cur_time = Date.parse(new Date());
    const url_final = url + "/api/websites/" + website_id + "/stats?startAt=0&endAt=" + cur_time;

    axios.get(url_final, {headers : {'Authorization' : 'Bearer ' + token, 'mode' : 'cors'}})
        .then(response => { console.log(response.data); })
        .catch(error => {
            console.log("error2"); // console.log(error);
        });
}
*/