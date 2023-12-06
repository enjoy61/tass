// 高亮
let HeadingFlag;

function addHeadingIdx(list)
{
    let i = 0;
    list.forEach((item) => { item.setAttribute('headingIdx', i++); });
}

document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.toc-panel');
    if (!toc)
    {
        console.log("toc is null", toc);
        return;
    }

    const headings = Array.apply(null, document.querySelectorAll('h2[id], h3[id], h4[id]'))
                         .filter(function(value, index, arr) { return arr[index].querySelector('.anchor'); });
    const tocHeadings = toc.querySelectorAll('li');

    if (tocHeadings.length !== headings.length)
    {
        console.log(headings);
        console.log(tocHeadings);
        return;
    }

    addHeadingIdx(tocHeadings);
    addHeadingIdx(headings);

    HeadingFlag = new Array(headings.length).fill(false);

    const intersectionOptions = {threshold : 1.0};
    const headingObserver = new IntersectionObserver(headings => { unfold_headings(headings); }, intersectionOptions);

    headings.forEach((heading) => { headingObserver.observe(heading); });
});

function refresh_highlight(last)
{
    for (let i = 0; i < HeadingFlag.length; ++i)
    {
        if (i === last)
        {
            continue;
        }

        if (HeadingFlag[i])
        {
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).childNodes[0].classList.add('active');
        }
        else
        {
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).childNodes[0].classList.remove('active');
        }
    }
}

function refresh_fold(last)
{
    // console.log(last);
    for (let i = 0; i < HeadingFlag.length; ++i)
    {
        const cur_toc_item = document.querySelector(`.toc-panel li[headingIdx="${i}"]`);

        // console.log(cur_toc_item);
        // console.log(cur_toc_item.childElementCount);

        // 展开/关闭子节点
        if (cur_toc_item.childElementCount !== 1)
        {
            // console.log(cur_toc_item.childNodes[1]);

            const toc_button = cur_toc_item.childNodes[1];
            const toc_div = cur_toc_item.childNodes[2];

            if (HeadingFlag[i] || i === last)
            {
                // if (i === last) console.log(2, i);
                toc_button.setAttribute('aria-expanded', 'true');
                toc_div.classList.add('show');
            }
            else
            {
                toc_button.setAttribute('aria-expanded', 'false');
                toc_div.classList.remove('show');
            }
        }

        if (HeadingFlag[i] || i === last) // 展开双亲节点
        {
            // if (i === last) console.log(1, i);
            // console.log(cur_toc_item);
            // console.log(cur_toc_item.parentElement.parentElement.previousElementSibling.tagName);
            if (cur_toc_item && cur_toc_item.parentElement && cur_toc_item.parentElement.parentElement &&
                cur_toc_item.parentElement.parentElement.previousElementSibling &&
                cur_toc_item.parentElement.parentElement.previousElementSibling.tagName == "BUTTON")
            {

                // console.log(cur_toc_item.parentElement.parentElement);
                // console.log(cur_toc_item.parentElement.parentElement.previousElementSibling);
                const toc_div = cur_toc_item.parentElement.parentElement;
                const toc_button = toc_div.previousElementSibling;

                toc_div.classList.add('show');
                toc_button.setAttribute('aria-expanded', 'true');

                let sub_item = toc_div.parentElement;

                while (sub_item && sub_item.parentElement && sub_item.parentElement.parentElement &&
                       sub_item.parentElement.parentElement.previousElementSibling &&
                       sub_item.parentElement.parentElement.previousElementSibling.tagName == "BUTTON")
                {
                    // console.log(sub_item.parentElement.parentElement);
                    // console.log(sub_item.parentElement.parentElement.previousElementSibling.childNodes[2]);

                    const toc_div_sub = sub_item.parentElement.parentElement;
                    const toc_button_sub = toc_div_sub.previousElementSibling;

                    toc_div_sub.classList.add('show');
                    toc_button_sub.setAttribute('aria-expanded', 'true');

                    sub_item = toc_div_sub.parentElement;
                }
            }
        }
    }
}

function get_highlight_num()
{
    let cnt = 0;
    for (let i = 0; i < HeadingFlag.length; ++i)
    {
        if (HeadingFlag[i])
        {
            ++cnt;
        }
    }
    return cnt;
}

function unfold_headings(headings)
{
    let last;
    // console.log(headings.length);
    headings.forEach(heading => {
        // console.log('ratio', heading.target.getAttribute('id'), heading.intersectionRatio, heading.isIntersecting, HeadingCnt);
        const idx = heading.target.getAttribute('headingIdx');
        HeadingFlag[idx] = heading.isIntersecting;
        if (!heading.isIntersecting)
        {
            last = parseInt(idx);
        }
    });

    let cnt = get_highlight_num();
    if (cnt)
    {
        last = -1;
    }
    refresh_highlight(last);
    refresh_fold(last);
}
