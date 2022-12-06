const puppeteer = require('puppeteer');
const { sleep } = require('./timeout');
const data = require("./getData");
const cron = require('node-cron');

const email = 'AnastasiiaPlakhtii@outlook.com';
const pasw = '2020Mama';

const zahvatByuBox = async () => {
    let arrayGoogle = await data();
    let asin;
    let account;
    let price;
    let orders;
    arrayGoogle.map((el) => {
        asin = el[0];
        account = el[1];
        price = el[2];
        orders = el[3];
    })

    const url = "https://sellercentral.amazon.com/sbr#legacy-template-id/success/1";
    const pathToExtension = "C:\\Users\\Administrator\\Desktop\\bhghoamapcdpbohphigoooaddinpkbai\\6.3.3_0"
    const browser = await puppeteer.launch({headless: false, args: ['--window-size=1920,1080', `--start-maximized`,`--disable-extensions-except=${pathToExtension}`, `--load-extensions=${pathToExtension}`]});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto(url);
    let pages = await browser.pages();
    await pages[0].close();
    await pages[2].close();
    await authorization(browser, page, email, pasw);

    await page.waitForSelector("div.picker-body");
    await page.waitForTimeout(3000);
    await page.click("div.picker-body > div.picker-view-area > div.picker-view-column:nth-last-child(1) > div.picker-item-column > div:nth-last-child(1) > button.picker-button")

    await page.waitForTimeout(1000);
    await page.waitForSelector("#picker-container > div.picker-app > div.picker-footer > div.picker-footer-buttons > button.picker-switch-accounts-button");
    await page.click("#picker-container > div.picker-app > div.picker-footer > div.picker-footer-buttons > button.picker-switch-accounts-button");

    await page.waitForSelector("#native_id_dropdown_actions-announce");
    await page.click("#native_id_dropdown_actions-announce");

    await page.waitForTimeout(3000);
    await page.waitForSelector("div.a-popover-wrapper");
    await page.click("div.a-popover-wrapper");
    await page.click("div.a-popover-wrapper > div.a-popover-inner > ul > li:nth-child(2)");
    
    await page.waitForTimeout(3000);
    await page.waitForSelector("#shipping_template_name") 
    await page.click("#shipping_template_name > div > div > div > div:nth-child(2) > input");
    const input = await page.$("#shipping_template_name > div > div > div > div:nth-child(2) > input");
    await input.click({clickCount: 3})
    await input.type("Template")

    await page.waitForSelector("#submitButton-announce");
    await page.click("#submitButton-announce");
    
    await page.waitForTimeout(2000)
    await page.waitForSelector("#shippingTemplateLinks")
    await page.click("#shippingTemplateLinks > div.a-box:nth-child(2)")

    await page.waitForTimeout(1000);
    await page.click("#template_actions_split_dropdown")

    await page.waitForTimeout(1000);
    await page.waitForSelector("div.a-input-text-addon-group-wrapper");
    await page.waitForTimeout(4000)
    
    const asinPage = await browser.newPage();
    await asinPage.setViewport({width: 1920, height: 1080});
    await asinPage.goto(`https://sellercentral.amazon.com/product-search?`);
    
    await asinPage.waitForTimeout(2000);
    await asinPage.waitForSelector("#SearchInputContent");
    await asinPage.click("#SearchInputContent");
    await asinPage.type("#SearchInputContent", `${asin}`)
    
    await asinPage.waitForTimeout(1000);
    await asinPage.keyboard.press('Enter')
    
    await asinPage.waitForTimeout(2000);
    await asinPage.waitForSelector("span.listing-actions-dropdown");
    await asinPage.click("span.listing-actions-dropdown")
    await asinPage.type("span.listing-actions-dropdown", "New")
    await asinPage.keyboard.press('Enter');

    await asinPage.click("a.copy-kat-button")

    await asinPage.waitForTimeout(5000)
    let newPages = await browser.pages();
    await newPages[2].setViewport({width: 1920, height:1080})
    const el = await newPages[2].$('div.bottom-padding-30 > div.top-padding-5 > kat-radiobutton:nth-child(3)')
    await el.click();

    await newPages[2].waitForTimeout(6000);
    const channel = await newPages[2].$("div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(17) > section > div > section:nth-child(2) > div > kat-box:nth-child(1) > div > section > kat-radiobutton > input")
    await channel.click();

    await newPages[2].waitForTimeout(3000);
    await newPages[2].waitForSelector("div.ZL1Bz9whxafaDcn8mLJ8")
    const shipping = await newPages[2].$('div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(14) > section > div > div> div> div > section:nth-child(2)')
    await shipping.click();
    await shipping.type("Template");
    await newPages[2].keyboard.press("Enter");

    const maxOrder = await newPages[2].$('div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(15) > section > div > div > div > div > section:nth-child(2) > kat-input');
    await maxOrder.click();
    await maxOrder.type('1');
    
    const priceElement = await newPages[2].$('div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(9) > section > div:nth-child(5) > div > section:nth-child(2) > kat-input-group > kat-input');
    await priceElement.click();
    await priceElement.type(`${price}`)

    const quantityElement = await newPages[2].$('div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(8) > section > div:nth-child(2) > section:nth-child(2) > kat-input');
    await quantityElement.click();
    await quantityElement.type(`${orders}`);

    const condition = await newPages[2].$('div.ZL1Bz9whxafaDcn8mLJ8 > div.top-padding-15 > div.kat-row:nth-child(10) > section > div > div > div > div section:nth-child(2)');
    await condition.click();
    await condition.type("New");
    await newPages[2].keyboard.press("Enter");

    await newPages[2].waitForTimeout(10000)
    await newPages[2].click("div.lvHNjzMtUJ_Wv1TUXDQ9 > div > div:nth-child(2) > div > kat-popover-trigger")
    const buyBox = await browser.newPage();
    await buyBox.setViewport({width:1920, height:1080})
    await buyBox.goto(`https://www.amazon.com/dp/${asin}`)

    await checkBuyBox(buyBox, account, 60);

    await page.bringToFront();
    await page.waitForTimeout(2000);

    const delivery = await page.$("#US_STANDARD\\.DOMESTIC > div.a-box-group.configRulesBox > div.a-box.a-box-normal.configRulesContent > div > table > tbody > tr.nonPrimeRule.last_child > td.shippingFee > div:nth-child(4) > div > input")
    await delivery.click();
    await delivery.type("39.99");
    const item = await page.$("#US_STANDARD\\.DOMESTIC > div.a-box-group.configRulesBox > div.a-box.a-box-normal.configRulesContent > div > table > tbody > tr.nonPrimeRule.last_child > td.shippingFee > span.a-dropdown-container > span > span > span")
    await item.click();
    await item.type("Item");
    await page.keyboard.press("Enter");

    await page.click("#submitButton-announce")

    await buyBox.bringToFront();
    await buyBox.waitForTimeout(900000)
    await recheckBuyBox(buyBox, account, 300)

    const countPages = await browser.pages();
    const inventory = countPages[2];
    await inventory.bringToFront();
    await inventory.reload();
    await inventory.waitForTimeout(5000);
    inventory.once('dialog', x => {
        x.accept();
    })

    await inventory.waitForSelector("#myitable")
    await inventory.waitForTimeout(5000);
    await inventory.click("#a-autoid-5");
    await inventory.waitForTimeout(5000);
    await inventory.waitForSelector("div.a-popover-wrapper")
    await inventory.click("#a-popover-1 > div > div > ul > li:nth-child(8)")
    await inventory.waitForTimeout(2000);
    await inventory.waitForTimeout(300000)

    const shipp = countPages[0];
    await shipp.bringToFront();
    await shipp.reload();
    await shipp.waitForTimeout(5000);
    await shipp.click("#shippingTemplateLinks > div.a-box:nth-child(2)")

    await shipp.waitForTimeout(2000);
    await shipp.click("#native_id_dropdown_actions-announce")
    await shipp.click("div.a-popover-wrapper > div.a-popover-inner > ul > li:nth-child(4)")
    await shipp.waitForSelector("div.a-popover-footer");
    await shipp.waitForTimeout(3000);

    await shipp.click("div.a-popover-footer > #submitButtonInPopup");

    await page.waitForTimeout(1000)
    await browser.close();
}

const authorization = async (browser, page, login, password) => {
    await page.waitForSelector('#ap_email');
    await page.type('#ap_email', login);
    await page.type('#ap_password', password);
    await page.click('#signInSubmit');
    const authPage = await browser.newPage();
    await authPage.goto('chrome-extension://bhghoamapcdpbohphigoooaddinpkbai/view/popup.html');

    await authPage.waitForSelector("#i-edit")
    await authPage.click("#i-edit")
    await authPage.waitForSelector("#i-plus");
    await authPage.click("#i-plus");
    await authPage.waitForTimeout(2000);
    await authPage.waitForSelector("#infoContent > button:nth-child(2)");
    await authPage.click("#infoContent > button:nth-child(2)");

    await authPage.waitForSelector(`#infoContent > div > input[type="text"]`);
    await authPage.type(`#infoContent > div > input[type="text"]`, "AnastasiiaPlakhtii@outlook.com");

    await authPage.waitForSelector(`#infoContent > div > input[type="text"]`);
    await authPage.type(`#infoContent > div:nth-child(2) > input[type="text"]`, "6FDLX3WIWUX5CVIZDLRIFCQBY4F5YPEEBAJB4GG6U5TTSFSDKCMQ");

    await authPage.waitForSelector(".button-small");
    await authPage.click(".button-small");

    await authPage.waitForSelector(".code");
    const codeElement = await authPage.$(".code");
    const code = await authPage.evaluate(element => element.textContent, codeElement);
    await authPage.close();
    await page.waitForSelector("#auth-mfa-otpcode");
    await page.type("#auth-mfa-otpcode", `${code}`);
    await page.click("#auth-signin-button");
}

const checkBuyBox = async (buyBox, account, sec) => {
    let acc;
    while(account != acc){
        buyBox.reload();
        await buyBox.waitForTimeout(sec * 1000)
        const buyB = await buyBox.$("#tabular_feature_div > #tabular-buybox > div > div.tabular-buybox-text:nth-child(2) > div > span")
        acc = await buyBox.evaluate(element => element.textContent, buyB);
        console.log(acc);
        console.log(acc.length)
    }
    return
}

const recheckBuyBox = async (buyBox, account, sec) => {
    let acc;
    while(account == acc){
        buyBox.reload();
        await buyBox.waitForTimeout(sec * 1000)
        const buyB = await buyBox.$("#tabular_feature_div > #tabular-buybox > div > div.tabular-buybox-text:nth-child(2) > div > span")
        acc = await buyBox.evaluate(element => element.textContent, buyB);
    }
    return
}

const start = async () => {
    await zahvatByuBox();
    await zahvatByuBox();
    await zahvatByuBox();
    await sleep(60);
    await zahvatByuBox();
    await zahvatByuBox();
    await zahvatByuBox();
    await sleep(60);
    await zahvatByuBox();
    await zahvatByuBox();
    await zahvatByuBox();
    await sleep(60);
    await zahvatByuBox();
    await zahvatByuBox();
    await zahvatByuBox();
}

cron.schedule('0 0 10 * * 5', () => {
    start()
})

 const func = async () => {
    await zahvatByuBox();
    await zahvatByuBox();
} 

func()