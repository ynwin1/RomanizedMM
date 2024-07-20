function isBot(userAgent) {
    return userAgent.includes('bot') || userAgent.includes('preview') || userAgent.includes('crawler');
}

export default isBot;