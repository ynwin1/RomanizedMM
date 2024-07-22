import isBot from "../../src/ssr/botcheck.js";
import {expect} from "chai";


describe('Bot detection', () => {
   const botUserAgent = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
   const nonBotUserAgent = "'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'";

    it('Detects bot', () => {
         expect(isBot(botUserAgent)).to.be.true;
    });

    it('Detects non-bot', () => {
         expect(isBot(nonBotUserAgent)).to.be.false;
    });
});