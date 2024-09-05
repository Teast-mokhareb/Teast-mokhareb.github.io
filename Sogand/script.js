const texts = [
    "متعهد شدم به تعهدی به نام تو:) 🔗",
    "لبخند تو قشنگ ترین نقاشی دنیاست:⁦♥️⁩✨️",
    "تو‌قشنگ‌ترین‌دلخوشیه‌من‌میونِ‌هزارجور‌دردی؛️",
    "﮼تونورمنی‌بین‌این‌همه‌تاریکی.‌👀🩶️",
    "‌ ' طُ 'شاهزادِه مِهرَبونِ قصرِ قلبَمی🫀",
    "‌ ‌ •ز همه دست کشیدم که تُو بآشی همه ام🫂💙•  ‌️",
    "ذوق چشات از ستاره های آسمونم'قشنگ' تره🌌💞️"
];

function getRandomText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function typeText(textElement, text, i = 0) {
    if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeText(textElement, text, i), 100);
    }
}

function updateText() {
    const textElement = document.getElementById('typing-text');
    textElement.textContent = '';
    const randomText = getRandomText();
    typeText(textElement, randomText);
}

updateText();
setInterval(updateText, 7000); // تغییر متن هر 7 ثانیه
