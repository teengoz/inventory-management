var isPublic = typeof window != "undefined";

(function(global) {
  var plugin = 'bootstrap';

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   (isPublic)? '@angular' : 'node_modules/@angular',
    'rxjs':                       (isPublic)? 'rxjs' : 'node_modules/rxjs',
    'angular2-modal':             (isPublic)? 'angular2-modal' : 'node_modules/angular2-modal',
    'ng-select':                  (isPublic)? 'ng-select' : 'node_modules/ng-select',
    'primeng':                    (isPublic)? 'primeng' : 'node_modules/primeng',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-modal':             { defaultExtension: 'js', main: 'bundles/angular2-modal.umd' },
    'ng-select':                  { main: 'index.js', defaultExtension: 'js' },
    'primeng':                    { defaultExtension: 'js' },
  };

  map[`angular2-modal/plugins/${plugin}`] = map['angular2-modal'] + '/bundles';
  packages[`angular2-modal/plugins/${plugin}`] =  { defaultExtension: 'js', main: `angular2-modal.${plugin}.umd` };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade'
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);