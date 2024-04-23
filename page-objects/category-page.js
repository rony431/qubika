const { test, expect } = require('@playwright/test');
const selectors = require ( '../data-test/selectors')
class CategoryPage {

    async categoryForm(page, categoryNew, subCategory) {
        await page.click(selectors.categories);
        await page.click(selectors.addCategory);
        await page.fill(selectors.newCategory,categoryNew);
        await page.click(selectors.accept);
        await page.waitForSelector(selectors.leftBanner);
        //validate 
        await page.isVisible(selectors.confirmMessage);
        // create subcategory
        await page.click(selectors.categories);
        await page.click(selectors.addCategory);
        await page.fill(selectors.newCategory,subCategory);
        await page.click(selectors.subCatCheck);
        await page.fill(selectors.searchCat,categoryNew);
        await page.click(selectors.catOption);
        await page.click(selectors.accept);
        await page.waitForSelector(selectors.leftBanner)
        return await page.isVisible(selectors.confirmMessage);
    }
  }
  
  
  module.exports = { CategoryPage };