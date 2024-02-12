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
    "+vTbCJXDr7ukNWdFEa7yMiLexyU4vqUld4imm2ATBh5K/f7Hyz4hsKEZ1dbCM4SgJsWsW7vC/qTekoDcgrFqvvdAkmKwlH1Cb91NI1JbT+aqm9EjMnSfEJgX9Il9fzGt1ZMy5bDkNZ6k3OFxytkOvGf8NNhB3ThL4uSvoplhttg/BT1/WjJ8SJGk7YgSq/MxakgTFCdXYS0Ac0cj4dDEeMzpVdXYbz+A2Dq/TZ91ChzGr6x7iIDss6dw+9avwrFemUMPwrXq5VTsPXRvzvzohdrKhrad8RkHNw77oBt6Nkic9UqGp0yOdrymP0BygREjTF6+zjst7ToQeYapgrDPt3MTMAdRLJN2SA==";
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

function get_single_pageview(token)
{
    // console.log("ok2");
    var cur_time = Date.parse(new Date());

    const url_local = encodeURIComponent(window.location.pathname);
    // console.log(url_local);
    const url_final = url + "/api/websites/" + website_id + "/stats?startAt=0&endAt=" + cur_time + "&url=" + url_local;

    axios.get(url_final, {headers : {'Authorization' : 'Bearer ' + token, 'mode' : 'cors'}})
        .then(response => {
            // console.log(response.data.pageviews.value);
            update_single_pageview(response.data.pageviews.value);
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