import { Injectable, Optional } from '@angular/core';
import { DocumentNormalizer} from 'dynamsoft-document-normalizer';

@Injectable({
  providedIn: 'root'
})
export class DynamsoftService {

  constructor() {
    DocumentNormalizer.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
    DocumentNormalizer.engineResourcePath = "assets/dynamsoft-document-normalizer";
  }
}
