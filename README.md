# Angular Document Edge Detection 
A quick start Angular sample demonstrates how to use [Dynamsoft Document Normalizer JavaScript API](https://www.dynamsoft.com/document-normalizer/docs/introduction/?ver=latest) to detect the edges of a document and crop the document in a web application.

## Development Environment

```bash
ng --version

Angular CLI: 13.3.7
Node: 16.13.1
Package Manager: npm 8.1.2
OS: win32 x64

Angular: 13.3.10
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1303.7
@angular-devkit/build-angular   13.3.7
@angular-devkit/core            13.3.7
@angular-devkit/schematics      13.3.7
@angular/cli                    13.3.7
@schematics/angular             13.3.7
ng-packagr                      13.3.1
rxjs                            7.5.5
typescript                      4.6.4

```


## Usage
1. Install the dependencies:
    
    ```bash
    npm install
    ```

2. Apply for a [30-day free trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=ddn) and update the license key in `dynamsoft.service.ts` file:
    
    ```typescript
    DocumentNormalizer.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
    ```
    
3. Run the Angular application:
    
    ```bash
    ng serve
    ```

    ![Angular Document Edge Detection](https://www.dynamsoft.com/codepool/img/2023/01/angular-document-edge-detection.png)

