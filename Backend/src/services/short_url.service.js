import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.dao.js"

export const createShortUrlWithoutUser = async (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl, url)
    return shortUrl
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
};