import { faker } from '@faker-js/faker';
const { LoginPage } = require('../page-objects/login-page');
const { CategoryPage} = require('../page-objects/category-page')
const { test, expect } = require('@playwright/test');
// create new random email using fake random
const randomName = faker.person.fullName(); 
const randomEmail = faker.internet.email(); 
const loginPage = new LoginPage();
const categoryPage = new CategoryPage();

test('Validate API login and UI', async ({ request, page }) => {
  // response has json with API request details
  const response = await loginPage.loginApi(request,randomEmail);
  // Assert that new user creation worked in API
  expect(response.status()).toBe(201);
  const userLogged = await loginPage.loginWeb(response, page)
  // Assert login process in UI validating left-banner with configuration is visible
  expect (userLogged).toBe(true)
});

test('Create new category and subcategory', async ({ request, page }) => {
  const categoryNew = `category_${randomName}`
  const subCategory = `subCategory${randomName}`
  const response = await loginPage.loginApi(request,randomEmail);
  const userLogged = await loginPage.loginWeb(response, page);
  expect (userLogged).toBe(true)
  //validate Category in UI by banner
  await categoryPage.categoryForm(page, categoryNew, subCategory)
// Method to request Category API and confirm that sub category and 
// category were created successfully
  await loginPage.verifyCategory(request,categoryNew,subCategory);
     
});


