function format_attribute(attribute, content)
{
    temp = attribute;
    temp += "=\"" + content + "\"";
    return temp;
}

function format_span(circle_color)
{
    temp = "<span ";
    temp += format_attribute("class", "d-inline-block rounded-circle " + circle_color);
    temp += format_attribute("style", "width: .5em; height: .5em; flex-shrink: 0 ");
    temp += "></span>";

    return temp;
}

function format_a(heading, class_content, descript, circle_color)
{
    temp = "<a ";

    href_content = "#" + heading;
    temp += format_attribute("href", href_content);

    temp += " ";
    temp += format_attribute("class", class_content);
    temp += ">";
    temp += format_span(circle_color);
    temp += " &nbsp " + descript;
    temp += "</a>";

    return temp;
}

function format_li(heading, descript, circle_color)
{
    temp = "<li ";
    temp += format_attribute("class", "mb-1 my-1 ms-3");
    temp += ">";
    temp += format_a(heading, "rounded align-items-baseline", descript, circle_color);
    temp += "</li>";

    return temp;
}

function format_li_start(class_content)
{
    temp = "<li ";
    temp += format_attribute("class", class_content);
    temp += ">";

    return temp;
}

function format_button(class_content, if_toggle, toggle_target, expanded_value, descript, a_class, heading)
{
    temp = "<a ";

    href_content = "#" + heading;
    temp += format_attribute("href", href_content);

    temp += " ";
    temp += format_attribute("class", a_class + " " +
                                          "align-items-baseline");

    temp += ">";

    temp += format_span("bg-success");
    temp += " &nbsp " + descript;

    temp += format_button_toogle(class_content, if_toggle, toggle_target, expanded_value)
    temp += "</a>";
    return temp;
}

function format_button_toogle(class_content, if_toggle, toggle_target, expanded_value)
{

    temp = "<button ";
    temp += format_attribute("class", class_content);

    temp += " ";
    temp += format_attribute("data-bs-toggle", if_toggle);

    temp += " ";
    temp += format_attribute("data-bs-target", toggle_target);

    temp += " ";
    temp += format_attribute("aria-expanded", expanded_value);

    temp += "></button>";

    return temp;
}
/*
function format_button(class_content, if_toggle, toggle_target, expanded_value, descript, a_class, heading)
{
    temp = "<button ";
    temp += format_attribute("class", class_content);

    temp += " ";
    temp += format_attribute("data-bs-toggle", if_toggle);

    temp += " ";
    temp += format_attribute("data-bs-target", toggle_target);

    temp += " ";
    temp += format_attribute("aria-expanded", expanded_value);

    temp += ">";

    temp += format_a(heading, a_class, descript, "bg-primary");

    temp += "</button>";

    return temp;
}
*/
function format_div_start(id)
{
    temp = "<div ";

    /* 默认不展开， 添加show可以展开 */
    temp += format_attribute("class", "collapse");

    temp += " ";
    temp += format_attribute("id", id);

    temp += ">";

    return temp;
}

function format_ul_start(class_content)
{
    temp = "<ul ";

    temp += format_attribute("class", class_content);

    temp += ">";

    return temp;
}

function button_pack_start(heading, descript)
{
    temp = format_li_start("mb-1 my-1 ms-3");

    toggle_target_id = "toc-" + heading;
    toggle_target = "#" + toggle_target_id;

    a_class = "rounded";

    temp += format_button("toc-btn-toggle rounded collapsed", "collapse", toggle_target, "false", descript, a_class, heading);

    temp += format_div_start(toggle_target_id);

    temp += format_ul_start("btn-toggle-nav list-unstyled fw-normal pb-1");

    return temp;
}

/*
function format_li(id)
{
    return "<li class=\"mb-1 my-1 ms-3\"><a href=\"#" + id + "\" class=\"link-dark rounded\"> &nbsp " + id + "</a></li>";
}

function format_button(id)
{
    temp = "";
    temp += "<li class=\"mb-1 my-1 ms-3\">";
    temp += "<button class=\"btn-toggle align-items-center rounded collapsed\" data-bs-toggle=\"collapse\" data-bs-target=\"#toc-" + id +
            "\" aria-expanded=\"false\">" + id + "</button>";
    // 默认不展开， 给div添加show可达到
    temp += "<div class=\"collapse\" id=\"toc-" + id + "\">";
    temp += "<ul class=\"btn-toggle-nav list-unstyled fw-normal pb-1\">";

    return temp;
}
*/

function button_pack_close() /* close_button */
{
    temp = "";
    temp += "</ul>";
    temp += "</div>";
    temp += "</li>";
    return temp;
}

function format_toc(headings)
{
    toc = "<div class=\"flex-shrink-0 p-3 toc-sticky\">\n";
    toc += "<ul class=\"list-unstyled ps-0\">\n"

    for (i = 1; i < headings.length; ++i)
    {
        tag_next = parseInt(headings[i].tagName[1]);

        heading = headings[i - 1];
        // console.log(heading.innerText.replace(" #", ""));

        id = heading.getAttribute('id');
        tag = parseInt(heading.tagName[1]);
        descript = heading.innerText.replace(" #", "");

        if (tag_next > tag)
        {
            // toc += format_button(id);
            toc += button_pack_start(id, descript);
        }
        else
        {
            // toc += format_li(id);
            toc += format_li(id, descript, "bg-primary") + "\n";
            if (tag_next < tag)
            {
                for (j = 0; j < tag - tag_next; ++j)
                {
                    // toc += close_button();
                    toc += button_pack_close() + "\n";
                }
            }
        }
    }

    heading = headings[headings.length - 1];
    id = heading.getAttribute('id');
    tag = parseInt(heading.tagName[1]);
    descript = heading.innerText.replace(" #", "");

    // toc += format_li(id_next);
    toc += format_li(id, descript, "bg-primary");
    for (j = 0; j < tag - 2; ++j)
    {
        // toc += close_button();
        toc += button_pack_close() + "\n";
    }

    toc += "</ul></div>\n";

    // console.log(toc);

    return toc;
}

function add_toc()
{
    const headings = Array.apply(null, document.querySelectorAll('h2[id], h3[id], h4[id]'))
                         .filter(function(value, index, arr) { return arr[index].querySelector('.anchor'); });

    const toc = format_toc(headings);
    document.write(toc);
}

add_toc();