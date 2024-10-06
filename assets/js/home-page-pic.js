// 图片水平循环滚动
const PicWidth = 205;
const FrontEnd = 2000;
const BackEnd = -460;
const Step = 0.2;
const ScrollTimerInterval = 5;

function translatePic(pics, cur)
{
    for (let i = 0; i < pics.length; ++i)
    {
        let thisCur = cur + i * PicWidth;

        if (thisCur > FrontEnd)
            thisCur -= FrontEnd - BackEnd;
        else if (thisCur < BackEnd)
            thisCur += FrontEnd - BackEnd;

        const value = 'translateX(' + thisCur + 'px)';
        pics[i].style.setProperty('transform', value);
    }
}

let Cur1 = 0;
let Cur2 = 0;
document.addEventListener('DOMContentLoaded', () => {
    const pics1 = document.querySelectorAll('#scrollpic1 li');
    const pics2 = document.querySelectorAll('#scrollpic2 li');
    if (!pics1.length || !pics2.length) return;

    const scrollTimer = window.setInterval(function() {
        Cur1 = (Cur1 + Step) % (FrontEnd - BackEnd); // 0 ~ (FrontEnd - BackEnd)
        Cur2 = (Cur2 - Step) % (FrontEnd - BackEnd); // (BackEnd - FrontEnd) ~ 0
        translatePic(pics1, Cur1);
        translatePic(pics2, Cur2);
    }, ScrollTimerInterval);
});