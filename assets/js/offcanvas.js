const url = window.location.pathname;
// console.log(url);

const active_article = document.querySelector(`.offcanvas-s a[href="${url}"]`);

active_article.classList.add('active');
// console.log(active_article);

var child = active_article;
while (child.tagName !== "BODY")
{
    let parent = child.parentNode; // 获取父节点

    if (!parent) break;

    if (parent.tagName == "DIV" && parent.hasAttributes())
    {
        const id = parent.getAttribute("id");
        if (id && id.startsWith("section"))
        {
            parent.classList.add("show");
            parent.classList.add("active");

            let up = parent.parentNode;
            if (up)
            {
                // console.log("parent", up);
                for (i = 0; i < up.children.length; ++i)
                {
                    let brother = up.children[i];
                    if (brother.tagName == "BUTTON")
                    {
                        // console.log("button", brother);

                        brother.setAttribute("aria-expanded", "true");
                        brother.classList.add("active");
                        // console.log("button", brother);

                        break;
                    }
                }
            }

            // console.log(parent);
        }
    }
    child = parent;
}