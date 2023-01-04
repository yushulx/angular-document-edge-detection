export class Template {
    static binary = `
      {
          "GlobalParameter":{
              "Name":"GP"
          },
          "ImageParameterArray":[
              {
                  "Name":"IP-1",
                  "NormalizerParameterName":"NP-1",
                  "BinarizationModes":[{"Mode":"BM_LOCAL_BLOCK", "ThresholdCompensation":9}],
                  "ScaleDownThreshold":2300
              }
          ],
          "NormalizerParameterArray":[
              {
                  "Name":"NP-1",
                  "ColourMode": "ICM_BINARY" 
              }
          ]
      }
      `;

    static color = `
      {
          "GlobalParameter":{
              "Name":"GP"
          },
          "ImageParameterArray":[
              {
                  "Name":"IP-1",
                  "NormalizerParameterName":"NP-1",
                  "BinarizationModes":[{"Mode":"BM_LOCAL_BLOCK", "ThresholdCompensation":9}],
                  "ScaleDownThreshold":2300
              }
          ],
          "NormalizerParameterArray":[
              {
                  "Name":"NP-1",
                  "ColourMode": "ICM_COLOUR" 
              }
          ]
      }
      `;

    static grayscale = `
      {
          "GlobalParameter":{
              "Name":"GP"
          },
          "ImageParameterArray":[
              {
                  "Name":"IP-1",
                  "NormalizerParameterName":"NP-1",
                  "BinarizationModes":[{"Mode":"BM_LOCAL_BLOCK", "ThresholdCompensation":9}],
                  "ScaleDownThreshold":2300
              }
          ],
          "NormalizerParameterArray":[
              {
                  "Name":"NP-1",
                  "ColourMode": "ICM_GRAYSCALE"
              }
          ]
      }
      `;
}