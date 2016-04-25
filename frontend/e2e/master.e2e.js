'use strict'

describe('Master', function() {
  it('should save a new master', function() {
    browser.get('/master')
    element(by.id('firstName')).sendKeys('TEST')
    element(by.id('level')).sendKeys('9')
    element(by.id('create')).click()
    browser.getCurrentUrl().then(function (url) {
      expect(url).toContain('/master/')
    })
  })
  it('should navigate from edit to view', function () {
    element(by.css('.master-name')).getText().then(function(name) {
      expect(name).toContain('TEST')
    })
    element(by.css('.btn.btn-primary')).click()
    browser.getCurrentUrl().then(function (url) {
      expect(url).toContain('edit')
    })
  })
  it('should edit a master', function() {
    element(by.id('lastName')).sendKeys('ING')
    element(by.id('save')).click().then(function () {
      browser.getCurrentUrl().then(function (url) {
        expect(url).not.toContain('edit')
      })
    })
    element(by.css('.master-name')).getText().then(function(name) {
      expect(name).toContain('ING')
    })
  })
  it('should list masters', function () {
    browser.get('/masters')
    element.all(by.css('master-list li')).then(function (items) {
      expect(items.length).toBeGreaterThan(0)
    })
  })
})
