/*
const mode = document.getElementById('theme');

// console.log(mode);

var current_theme = "";

mode.addEventListener('click', () => {
    console.log("click");
    document.documentElement.toggleAttribute('theme');
    if (current_theme === "")
    {
        localStorage.setItem('theme', "tango");
    }
    else if (current_theme === "tango")
    {
        localStorage.setItem('theme', "dark-tango");
    }
    else if (current_theme === "dark-tango")
    {
        localStorage.setItem('theme', "tango");
    }
});

let new_theme = localStorage.getItem('theme');
document.documentElement.setAttribute(new_theme, "");

if (current_theme !== "")
{
    document.documentElement.removeAttribute(current_theme);
}
current_theme = new_theme;
*/

const mode = document.getElementById('mode');

// console.log(mode);

mode.addEventListener('click', () => {
    console.log("click");
    document.documentElement.toggleAttribute('dark-mode');
    localStorage.setItem('theme', document.documentElement.hasAttribute('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark')
{

    document.documentElement.setAttribute('dark-mode', '');
}
else
{

    document.documentElement.removeAttribute('dark-mode');
}
