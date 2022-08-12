class LoginPage {

    /* Form Elements */
    get userNameInput() { return { locator: '#username', label: 'Username Input' } }
    get passwordInput () { return {locator: '#password', label: 'Password Input',  } }
    get loginButton()  { return { locator: '#log-in', label: 'Log In Button' } }
    get formCheckBox() { return { locator: '.form-check-input' , label: 'Remember Me Check Box' } }

    /*  Text Labels */
    get loginHeader() { return { locator: 'h4.auth-header', label: 'Login Form'  } }
    get formCheckLabel() { return { locator: '.form-check-label', label: 'Remember Me'} }
    get usernameLabel() { return { locator: ':nth-child(1) > label', label: 'Username' } }
    get passwordLabel() { return { locator: ':nth-child(2) > label', label: 'Password'  } }

    /* Images */
    get logoImage() { return { locator: '.logo-w > a > img', label: 'Logo' } }
    get usernameIcon() { return { locator: 'div[class="pre-icon os-icon os-icon-user-male-circle"]', label: 'Username Icon' } }
    get twitterImage() { return { locator: 'img[src="img/social-icons/twitter.png"]', label: 'Twitter' } }
    get faceBookImage() { return { locator: 'img[src="img/social-icons/facebook.png"]', label: 'Facebook' } }
    get linkedInImage() { return { locator: 'img[src="img/social-icons/linkedin.png"]',  label: 'LinkedIn' } }

    /* Alert Warning */
    get alertWarning() { return { locator: 'div[class="alert alert-warning"]', label: 'Alert Warning'}  }

    getElements() {
        return [this.userNameInput, this.passwordInput, this.loginButton, this.formCheckBox]
    }

    getImages() {
        return [this.logoImage, this.twitterImage, this.faceBookImage, this.linkedInImage, this.usernameIcon]
    }
    getText() {
        return [this.loginHeader, this.formCheckLabel, this.usernameLabel, this.passwordLabel]
    }   

    getUrl() {
        return '/hackathonV2.html'
    }

    visit() {
        cy.visit(this.getUrl())
    }

    visitDynamic() {
        cy.visit(this.getUrl() + '?showAd=true')
    }

    clearUsernameAndPassword(){
        cy.get(this.userNameInput.locator).clear()
        cy.get(this.passwordInput.locator).clear()
    }
    enterUsername(username) {
        cy.get(this.userNameInput.locator).type(username)
    }

    enterPassword(password) {
        cy.get(this.passwordInput.locator).type(password)
    }

    clickSubmit(){
        cy.get(this.loginButton.locator).click()
    }

    login(username = 'anything', password = 'works') {
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickSubmit()
    }

    /**
     * Random update check
     */

}

export default new LoginPage