import * as cheerio from "cheerio";

    export const extractJobText = (html) => {
        const $ = cheerio.load(html);

        
    // Remove elements that usually don't contain job information
        $("script, style, nav, footer, header, noscript").remove();

        const text = $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim();

        return text;
    }

export const isBlockedPage = (text) => {
    const blockedKeywords = [
        "sign in",
        "log in",
        "login",
        "join now",
        "forgot password",
        "access denied",
        "captcha",
        "verify you are human"
    ];

    const lowerText = text.toLowerCase();

    return blockedKeywords.some((keyword) =>
        lowerText.includes(keyword)
    );
};

