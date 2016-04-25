exports.config = {
  baseUrl: 'http://localhost:8000',
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*.e2e.js'],
  getPageTimeout: 30000,
  rootElement: 'master-app',
  allScriptsTimeout: 30000,
  useAllAngular2AppRoots: true
}
