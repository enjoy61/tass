const url = window.location.pathname;

var arr = url.split('/');

for (i = 0; i < arr.length; ++i)
{
    var cur = arr[i];
    if (cur !== "")
    {
        // console.log(cur);
        break;
    }
}

const nav_item = document.getElementById(cur);
if (nav_item)
{
    // console.log("ddd", nav_item);
    nav_item.classList.add('active');
}

/*
const navbar = document.querySelector(`.navbar-s a[href="${url}"]`);
if (navbar)
{
    document.querySelector(`.navbar-s a[href="${url}"]`).classList.add('active');
}
else
{

    // console.log(url);
}*/