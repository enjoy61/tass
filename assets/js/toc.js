// 高亮
let HeadingFlag;
let HeadingCnt;

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
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).classList.add('active');
        }
        else
        {
            document.querySelector(`.toc-panel li[headingIdx="${i}"]`).classList.remove('active');
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
        headings.forEach(heading => {
            // console.log('ratio', heading.target.getAttribute('id'), heading.intersectionRatio, heading.isIntersecting, HeadingCnt);
            const idx = heading.target.getAttribute('headingIdx');
            // console.log("ttttt");
            // console.log(idx);
            if ((HeadingFlag[idx] = heading.isIntersecting) || (HeadingCnt !== 1))
            {
                // console.log("edaener");
                refreshHighlight();
            }
        });
    }, intersectionOptions);

    headings.forEach((heading) => { headingObserver.observe(heading); });
});

/*
// 跟随滚动
let HeadingHeight, UpIdx;
let FollowTimer = null;
const FollowTimerInterval = 300;

function computeHeadingHeight()
{
    const toc = document.querySelector('.toc-s');
    console.log(toc);
    return toc.scrollHeight / toc.querySelectorAll('a').length;
}

function computeUpIdx()
{
    const fullToc = document.querySelector('.toc-sticky');
    const myToc = document.querySelector('.toc-s');
    const offset = fullToc.scrollHeight - myToc.scrollHeight;
    const max = parseInt((window.innerHeight - offset) / HeadingHeight);
    return parseInt(max / 6);
}

function scrollFollow()
{
    const activeHeadings = document.querySelector('.toc-s').querySelectorAll('a.active');
    if (activeHeadings.length > 0)
    {
        const heading = activeHeadings.item(0);
        console.log(heading)
        const idx = heading.getAttribute('scrollIdx');
        const scrollTarget = idx - UpIdx;
        document.querySelector('.toc-sticky').scrollTop = HeadingHeight * scrollTarget;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const myToc = document.querySelector('.toc-s');
    const fullToc = document.querySelector('.toc-sticky');
    if (!myToc || !fullToc) return;

    let i = 0;
    myToc.querySelectorAll('a').forEach(entry => { entry.setAttribute('scrollIdx', i++); });

    HeadingHeight = computeHeadingHeight();
    UpIdx = computeUpIdx();

    window.onscroll = function() {
        clearTimeout(FollowTimer);
        FollowTimer = setTimeout(scrollFollow, FollowTimerInterval);
    };
});
*/