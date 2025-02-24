import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

let driver;
const url = 'http://localhost:3000'; // Adjust for your local app

describe("Login Page Unit Tests", function () {
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  beforeEach(async function () {
    await driver.get(url);
    
    const loginLink = await driver.findElement(By.xpath('//li[text()="Login"]'));
    await loginLink.click();
  });

  /****************************
   * Test ID: TestCase1
   * Description: Verify that an invalid login attempt shows the "Invalid credentials" error.
   * Test Procedure:
   * 1. Enter incorrect username and password.
   * 2. Click login and verify the error message.
   ****************************/
  it('should show "Invalid credentials" with incorrect login', async function() {
      const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
      const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
      const loginButton = await driver.findElement(By.css('form button'));
      
      await usernameInput.sendKeys('wronguser');
      await passwordInput.sendKeys('wrongpass123');
      await loginButton.click();

      let errorElement = await driver.wait(until.elementLocated(By.className('error')), 5000);
      let errorText = await errorElement.getText();
      expect(errorText).to.equal('Invalid Credentials');
  });

  /****************************
   * Test ID: TestCase2
   * Description: Verify the error message when the username field is left blank.
   * Test Procedure:
   * 1. Enter only the password and leave the username field blank.
   * 2. Click login and verify the error message.
   ****************************/
  it('should show error message for blank username', async function() {
      const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
      const loginButton = await driver.findElement(By.css('form button'));
      
      await passwordInput.sendKeys('wrongpass123');
      await loginButton.click();

      let errorElement = await driver.wait(until.elementLocated(By.className('error')), 5000);
      let errorText = await errorElement.getText();
      expect(errorText).to.equal('Username field is required!');
  });

  /****************************
   * Test ID: TestCase3
   * Description: Verify the error message when the username is less than 3 characters.
   * Test Procedure:
   * 1. Enter a short username (e.g., "wr") and a valid password.
   * 2. Click login and verify the error message.
   ****************************/
  it('should show error message for username with less than 3 characters', async function() {
      const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
      const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
      const loginButton = await driver.findElement(By.css('form button'));
      
      await usernameInput.sendKeys('wr');
      await passwordInput.sendKeys('wrongpass123');
      await loginButton.click();

      let errorElement = await driver.wait(until.elementLocated(By.className('error')), 5000);
      let errorText = await errorElement.getText();
      expect(errorText).to.equal('Username field must be at least 3 characters');
  });

  /****************************
   * Test ID: TestCase4
   * Description: Verify the error message when the password field is left blank.
   * Test Procedure:
   * 1. Enter a valid username but leave the password field blank.
   * 2. Click login and verify the error message.
   ****************************/
  it('should show error message for blank password', async function() {
      const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
      const loginButton = await driver.findElement(By.css('form button'));
      
      await usernameInput.sendKeys('wronguser');
      await loginButton.click();

      let errorElement = await driver.wait(until.elementLocated(By.className('error')), 5000);
      let errorText = await errorElement.getText();
      expect(errorText).to.equal('Password field is required!');
  });

  /****************************
   * Test ID: TestCase5
   * Description: Verify the error message when the password is less than 8 characters.
   * Test Procedure:
   * 1. Enter a valid username but a short password (e.g., "wrong").
   * 2. Click login and verify the error message.
   ****************************/
  it('should show error message for password that is not 8 characters long', async function() {
      const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
      const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
      const loginButton = await driver.findElement(By.css('form button'));
      
      await usernameInput.sendKeys('wronguser');
      await passwordInput.sendKeys('wrong');
      await loginButton.click();
      let errorElement = await driver.wait(until.elementLocated(By.className('error')), 5000);
      let errorText = await errorElement.getText();
      expect(errorText).to.equal('Password must be at least 8 characters long!');
  });

  /****************************
   * Test ID: TestCase6
   * Description: Verify that the user can log in successfully with valid credentials.
   * Test Procedure:
   * 1. Enter valid credentials (e.g., admin/admin123).
   * 2. Click login and verify the "Create Post" button is displayed.
   ****************************/
  it('should allow the user to login', async function() {
    const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
    const loginButton = await driver.findElement(By.css('form button'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin123');
    await loginButton.click();

    const createPostButton = await driver.wait(until.elementLocated(By.xpath('//li[text()="Create Post"]')), 5000);
    expect(await createPostButton.isDisplayed()).to.be.true;
  });

  after(async function() {
    await driver.quit();
  });
});
describe('Blog Site End-to-End Tests', function() {
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  /****************************
   * Test ID: TestCase1
   * Description: Verify that the homepage loads correctly and displays posts.
   * Test Procedure:
   * 1. Navigate to the homepage.
   * 2. Verify the page title is "Blog Site."
   * 3. Check that posts are displayed with correct titles.
   ****************************/
  it('should load the homepage and display posts', async function() {
    await driver.get(url);
    const title = await driver.getTitle();
    expect(title).to.equal('Blog Site');

    const posts = await driver.findElements(By.className('post-card'));
    expect(posts.length).to.be.greaterThan(0);

    const postTitles = await driver.findElements(By.css('post-card h2'));
    const postNames = ['First Blog Post', 'Another Post'];
    for (let i = 0; i < postTitles.length; i++) {
      const currentTitle = await postTitles[i].getText();
      expect(currentTitle).to.equal(postNames[i]);
    }
  });

  /****************************
   * Test ID: TestCase2
   * Description: Verify that the "Create Post" button is not visible when the user is logged out.
   * Test Procedure:
   * 1. Navigate to the homepage.
   * 2. Check that the "Create Post" button is not displayed.
   ****************************/
  it('should not display "Create Post" button when logged out', async function() {
    await driver.get(url);
    const createPostButton = await driver.findElements(By.xpath('//li[text()="Create Post"]'));
    expect(createPostButton.length).to.equal(0);
  });

  /****************************
   * Test ID: TestCase3
   * Description: Verify that the user can log in successfully.
   * Test Procedure:
   * 1. Navigate to the homepage and click on "Login."
   * 2. Enter valid username and password.
   * 3. Verify that the "Create Post" button appears after login.
   ****************************/
  it('should allow the user to login', async function() {
    await driver.get(url);
    
    const loginLink = await driver.findElement(By.xpath('//li[text()="Login"]'));
    await loginLink.click();

    const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
    const loginButton = await driver.findElement(By.css('form button'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin123');
    await loginButton.click();

    const createPostButton = await driver.wait(until.elementLocated(By.xpath('//li[text()="Create Post"]')), 5000);
    expect(await createPostButton.isDisplayed()).to.be.true;
  });

  /****************************
   * Test ID: TestCase4
   * Description: Verify that the "Create Post" button is visible after login and navigates to the create post page.
   * Test Procedure:
   * 1. Log in with valid credentials.
   * 2. Click the "Create Post" button.
   * 3. Verify that the create post page is displayed with the correct title.
   ****************************/
  it('should display "Create Post" button after login and navigate to create post page', async function() {
    await driver.get(url);
    
    const loginLink = await driver.findElement(By.xpath('//li[text()="Login"]'));
    await loginLink.click();

    const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
    const loginButton = await driver.findElement(By.css('form button'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin123');
    await loginButton.click();

    const createPostButton = await driver.wait(until.elementLocated(By.xpath('//li[text()="Create Post"]')), 5000);
    await createPostButton.click();

    const createPostTitle = await driver.wait(until.elementLocated(By.css('h2')), 10000).getText();
    expect(createPostTitle).to.equal('Create a New Post');
  });

  /****************************
   * Test ID: TestCase5
   * Description: Verify that a logged-in user can create a new post.
   * Test Procedure:
   * 1. Log in with valid credentials.
   * 2. Click the "Create Post" button and enter post details.
   * 3. Submit the post and verify that it appears on the homepage.
   ****************************/
  it('should allow the user to create a new post', async function() {
    await driver.get(url);

    const loginLink = await driver.findElement(By.xpath('//li[text()="Login"]'));
    await loginLink.click();

    const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
    const loginButton = await driver.findElement(By.css('form button'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin123');
    await loginButton.click();

    const createPostButton = await driver.wait(until.elementLocated(By.xpath('//li[text()="Create Post"]')), 5000);
    await createPostButton.click();

    const titleInput = await driver.findElement(By.xpath('//input[@name="title"]'));
    const contentInput = await driver.findElement(By.xpath('//textarea[@name="content"]'));
    const submitButton = await driver.findElement(By.css('form button'));

    await titleInput.sendKeys('My New Post');
    await contentInput.sendKeys('This is the content of the new post.');
    await submitButton.click();

    const posts = await driver.findElements(By.css('.post-card h2'));
    const newPostTitle = await posts[0].getText();
    expect(newPostTitle).to.equal('My New Post');
  });

  /****************************
   * Test ID: TestCase6
   * Description: Verify that a user can view a post's details and see comments.
   * Test Procedure:
   * 1. Click on a post from the homepage.
   * 2. Verify the post title and check that the comments section is displayed.
   ****************************/
  it('should allow a user to view a post and see comments', async function() {
    await driver.get(url);

    const firstPostLink = await driver.findElement(By.css('.post-card button'));
    await firstPostLink.click();

    const postTitle = await driver.findElement(By.css('h2')).getText();
    expect(postTitle).to.not.be.empty;

    const commentsSection = await driver.findElement(By.css('.comments-section h3')).getText();
    expect(commentsSection).to.equal('Comments');
  });

  /****************************
   * Test ID: TestCase7
   * Description: Verify that a user can add a comment to a post.
   * Test Procedure:
   * 1. Navigate to a post's details page.
   * 2. Enter a comment and submit it.
   * 3. Verify that the comment appears in the comments section.
   ****************************/
  it('should allow the user to add a comment to a post', async function() {
    await driver.get(url);

    const firstPostLink = await driver.findElement(By.css('.post-card button'));
    await firstPostLink.click();

    const commentTextarea = await driver.findElement(By.css('.add-comment textarea'));
    const commentButton = await driver.findElement(By.css('.add-comment button'));

    await commentTextarea.sendKeys('This is a test comment.');
    await commentButton.click();

    const newComment = await driver.findElement(By.css('.comment p')).getText();
    expect(newComment.split(":")[1].trim()).to.equal('This is a test comment.');
  });

  /****************************
   * Test ID: TestCase8
   * Description: Verify that the user can log out and the "Create Post" button is hidden.
   * Test Procedure:
   * 1. Log in with valid credentials.
   * 2. Click the "Logout" button.
   * 3. Verify that the "Create Post" button is not visible after logout.
   ****************************/
  it('should log the user out and hide "Create Post" button', async function() {
    await driver.get(url);

    const loginLink = await driver.findElement(By.xpath('//li[text()="Login"]'));
    await loginLink.click();

    const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
    const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
    const loginButton = await driver.findElement(By.css('form button'));

    await usernameInput.sendKeys('admin');
    await passwordInput.sendKeys('admin123');
    await loginButton.click();

    const logoutLink = await driver.findElement(By.xpath('//li[text()="Logout"]'));
    await logoutLink.click();

    const createPostButton = await driver.findElements(By.linkText('Create Post'));
    expect(createPostButton.length).to.equal(0);
  });

  after(async function() {
    await driver.quit();
  });
});
