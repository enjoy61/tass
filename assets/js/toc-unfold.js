// 高亮
let HeadingFlag;
let HeadingCnt = -1;

function addHeadingIdx(list)
{
    let i = 0;
    list.forEach((item) => { item.setAttribute('headingIdx', i++); });
}

function refreshHighlight()
{
    HeadingCnt = 0;
    for (let i = 0; i < HeadingFlag.length; ++i)
    {
        if (HeadingFlag[i])
        {
            ++HeadingCnt;
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).childNodes[0].classList.add('active');
        }
        else
        {
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).childNodes[0].classList.remove('active');
        }
    }
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
    HeadingCnt = 0;

    const intersectionOptions = {threshold : 1.0};

    const headingObserver = new IntersectionObserver(headings => {
        let LastHighlight;
        let CurHighlight;
        let flag = -1;

        // HeadingCnt为1时， 可能当前没有高亮
        if (HeadingCnt === 1)
        {
            for (let i = 0; i < HeadingFlag.length; ++i)
            {
                if (HeadingFlag[i])
                {
                    LastHighlight = i;
                    break;
                }
            }
            if (LastHighlight)
            {
                ++flag;
                // console.log("last", flag, LastHighlight);
            }
        }

        headings.forEach(heading => {
            // console.log('ratio', heading.target.getAttribute('id'), heading.intersectionRatio, heading.isIntersecting, HeadingCnt);
            const idx = heading.target.getAttribute('headingIdx');
            // console.log(idx);
            if ((HeadingFlag[idx] = heading.isIntersecting) || (HeadingCnt !== 1))
            {
                refreshHighlight();
            }
        });

        // HeadingCnt为1时， 可能当前没有高亮
        if (HeadingCnt === 1)
        {
            for (let i = 0; i < HeadingFlag.length; ++i)
            {
                if (HeadingFlag[i])
                {
                    CurHighlight = i;
                    break;
                }
            }

            if (CurHighlight)
            {
                if (flag === -1)
                {
                    flag = 2;
                }
                else
                {
                    ++flag;
                    // console.log("cur", flag, CurHighlight);
                }
            }
        }

        if (HeadingCnt > 1 || flag === 2 || (flag === 1 && LastHighlight !== CurHighlight))
        {
            if (flag === 1)
            {
                // console.log(flag, LastHighlight, CurHighlight);
            }

            for (let i = 0; i < HeadingFlag.length; ++i)
            {
                const cur_toc_item = document.querySelector(`.toc-panel li[headingIdx="${i}"]`);

                // 展开/关闭子节点
                if (HeadingFlag[i])
                {
                    // console.log(cur_toc_item);
                    // console.log(cur_toc_item.childElementCount);
                    if (cur_toc_item.childElementCount !== 1)
                    {
                        // console.log(cur_toc_item.childNodes[1]);
                        const toc_button = cur_toc_item.childNodes[0].childNodes[2];
                        // console.log(toc_button);
                        toc_button.setAttribute('aria-expanded', 'true');
                        const toc_div = cur_toc_item.childNodes[1];
                        toc_div.classList.add('show');
                    }
                }
                else if (cur_toc_item.childElementCount !== 1)
                {
                    // console.log(cur_toc_item.childNodes[1]);
                    const toc_button = cur_toc_item.childNodes[0].childNodes[2];
                    // console.log(toc_button);
                    toc_button.setAttribute('aria-expanded', 'false');
                    const toc_div = cur_toc_item.childNodes[1];
                    toc_div.classList.remove('show');
                }

                // 展开父节点
                if (HeadingFlag[i])
                {
                    // console.log(cur_toc_item);
                    if (cur_toc_item && cur_toc_item.parentElement && cur_toc_item.parentElement.parentElement &&
                        cur_toc_item.parentElement.parentElement.previousElementSibling &&
                        cur_toc_item.parentElement.parentElement.previousElementSibling.childNodes[2])
                    {

                        // console.log(cur_toc_item.parentElement.parentElement);
                        // console.log(cur_toc_item.parentElement.parentElement.previousElementSibling.childNodes[2]);
                        const toc_div = cur_toc_item.parentElement.parentElement;
                        const toc_button = cur_toc_item.parentElement.parentElement.previousElementSibling.childNodes[2];

                        toc_div.classList.add('show');
                        toc_button.setAttribute('aria-expanded', 'true');

                        let sub_item = cur_toc_item.parentElement.parentElement.parentElement;

                        while (sub_item && sub_item.parentElement && sub_item.parentElement.parentElement &&
                               sub_item.parentElement.parentElement.previousElementSibling &&
                               sub_item.parentElement.parentElement.previousElementSibling.childNodes[2])
                        {
                            // console.log(sub_item.parentElement.parentElement);
                            // console.log(sub_item.parentElement.parentElement.previousElementSibling.childNodes[2]);

                            const toc_div_sub = sub_item.parentElement.parentElement;
                            const toc_button_sub = sub_item.parentElement.parentElement.previousElementSibling.childNodes[2];

                            toc_div_sub.classList.add('show');
                            toc_button_sub.setAttribute('aria-expanded', 'true');

                            sub_item = toc_div_sub.parentElement;
                        }
                    }
                }
            }
        }
    }, intersectionOptions);

    headings.forEach((heading) => { headingObserver.observe(heading); });
});
