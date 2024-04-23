const { test, expect } = require('@playwright/test');
const data = require ( '../data-test/data')
class LoginPage {

    async loginApi(request,randomEmail) {
     const response = await request.post(`${data.urlApi}/api/auth/register`, {
      data: {
        "email": randomEmail,
        "password": data.password,
        "roles": [data.role]
        }
     });
     return response;
    }
      // create fresh token
    async tokenCreate(request) {
        const response = await request.post(`${data.urlApi}/api/auth/login`, {
         data: {
            "email": "test.qubika@qubika.com",
            "password": "12345678",
            "userName": "test.qubika"
          }
        });
        return response;
    }
    // Login function in Qubika website by UI
    
    async loginWeb(response, page) {
        const responseBody = await response.json();
        await page.goto(data.urlUi);
        await expect(page).toHaveTitle('Qubika Club');
        const element = await page.waitForSelector('[type="email"]');
        await page.fill('[type="email"]',responseBody.email);
        await page.fill('[type="password"]',data.password);
        await page.click('[type="submit"]');
        await page.waitForSelector('#sidenav-main')
        return await page.isVisible('#sidenav-main');
    }

    // api call for category 
    
    async verifyCategory(request,categoryNew,subCategory) {
        const token =  await this.tokenCreate(request)
        const newToken = await token.json()
        const categoryResponse = await request.get(`${data.urlApi}/api/category-type`, {
            headers:{
               "Authorization": `Bearer ${newToken.token}`,
             }
            });
        const categoryData = await categoryResponse.json()
        const categoryFiltered = categoryData.filter(data => data.name === categoryNew);
        const subCategoryFiltered = categoryData.filter(data => data.name === subCategory);
        // assert to confirm that sub cat belong to Category id
        return await expect(categoryFiltered[0].id).toBe(subCategoryFiltered[0].parentId);  
    }
  }
  
  
  module.exports = { LoginPage };