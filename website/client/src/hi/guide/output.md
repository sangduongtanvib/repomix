# आउटपुट फॉर्मेट

Repomix तीन आउटपुट फॉर्मेट का समर्थन करता है: XML, मार्कडाउन और प्लेन टेक्स्ट। प्रत्येक फॉर्मेट के अपने फायदे हैं और विभिन्न उपयोग मामलों के लिए अनुकूलित हैं।

## आउटपुट फॉर्मेट विकल्प

आप `--style` विकल्प का उपयोग करके आउटपुट फॉर्मेट निर्दिष्ट कर सकते हैं:

```bash
# XML फॉर्मेट (डिफॉल्ट)
repomix --style xml

# मार्कडाउन फॉर्मेट
repomix --style markdown

# प्लेन टेक्स्ट फॉर्मेट
repomix --style plain
```

## XML फॉर्मेट

XML फॉर्मेट AI मॉडल के साथ उपयोग के लिए अनुशंसित फॉर्मेट है। यह फाइल पथ, फाइल प्रकार और कोड संरचना के बारे में स्पष्ट मेटाडेटा प्रदान करता है।

```bash
repomix --style xml
```

उदाहरण आउटपुट:

```xml
<repository>
  <file path="src/index.ts" type="typescript">
    import { processRepository } from './core';
    
    export function main() {
      processRepository('./my-repo');
    }
  </file>
  <file path="src/core.ts" type="typescript">
    export function processRepository(path: string) {
      // कार्यान्वयन विवरण
    }
  </file>
</repository>
```

XML फॉर्मेट के लाभ:

1. **स्पष्ट संरचना**: फाइलों और उनके संबंधों की स्पष्ट संरचना
2. **मेटाडेटा**: फाइल पथ और प्रकार जैसे मेटाडेटा शामिल
3. **AI पार्सिंग**: AI मॉडल द्वारा आसानी से पार्स किया जा सकता है
4. **संदर्भ संरक्षण**: फाइल संदर्भ और संरचना संरक्षित रहती है

## मार्कडाउन फॉर्मेट

मार्कडाउन फॉर्मेट मानव पठनीयता और AI प्रोसेसिंग के बीच एक संतुलन प्रदान करता है। यह GitHub और अन्य मार्कडाउन व्यूअर में अच्छी तरह से प्रदर्शित होता है।

```bash
repomix --style markdown
```

उदाहरण आउटपुट:

```markdown
# Repository

## src/index.ts
```typescript
import { processRepository } from './core';

export function main() {
  processRepository('./my-repo');
}
```

## src/core.ts
```typescript
export function processRepository(path: string) {
  // कार्यान्वयन विवरण
}
```
```

मार्कडाउन फॉर्मेट के लाभ:

1. **पठनीयता**: मानव पाठकों के लिए अधिक पठनीय
2. **प्रदर्शन**: GitHub और अन्य मार्कडाउन व्यूअर में अच्छी तरह से प्रदर्शित होता है
3. **सिंटैक्स हाइलाइटिंग**: कोड ब्लॉक में सिंटैक्स हाइलाइटिंग का समर्थन
4. **संपादन योग्यता**: आसानी से संपादित किया जा सकता है

## प्लेन टेक्स्ट फॉर्मेट

प्लेन टेक्स्ट फॉर्मेट सबसे सरल आउटपुट विकल्प है। यह फाइल पथ और सामग्री को बिना किसी विशेष फॉर्मेटिंग के प्रस्तुत करता है।

```bash
repomix --style plain
```

उदाहरण आउटपुट:

```
--- src/index.ts ---
import { processRepository } from './core';

export function main() {
  processRepository('./my-repo');
}

--- src/core.ts ---
export function processRepository(path: string) {
  // कार्यान्वयन विवरण
}
```

प्लेन टेक्स्ट फॉर्मेट के लाभ:

1. **सादगी**: कोई विशेष फॉर्मेटिंग नहीं
2. **संगतता**: सभी टेक्स्ट एडिटर और टूल के साथ संगत
3. **आकार**: आमतौर पर सबसे छोटा फाइल आकार

## डिफॉल्ट आउटपुट फॉर्मेट सेट करना

आप अपने `repomix.config.json` में डिफॉल्ट आउटपुट फॉर्मेट सेट कर सकते हैं:

```json
{
  "output": {
    "style": "markdown"
  }
}
```

## आउटपुट फाइल नाम

आप `--output-file` विकल्प का उपयोग करके आउटपुट फाइल का नाम निर्दिष्ट कर सकते हैं:

```bash
repomix --output-file my-repo-code.xml
```

डिफॉल्ट फाइल नाम `repomix-output.xml`, `repomix-output.md`, या `repomix-output.txt` है, जो चुने गए आउटपुट फॉर्मेट पर निर्भर करता है।

## AI मॉडल के साथ आउटपुट का उपयोग

### XML के साथ

XML फॉर्मेट AI मॉडल के साथ उपयोग के लिए अनुशंसित है। यह फाइल संरचना और संदर्भ को संरक्षित करता है, जिससे AI को कोडबेस को बेहतर ढंग से समझने में मदद मिलती है।

```
इस XML फाइल में मेरे रिपॉजिटरी की सभी फाइलें हैं। कृपया इसकी समीक्षा करें और सुधार के लिए सुझाव दें।
```

### मार्कडाउन के साथ

मार्कडाउन फॉर्मेट मानव पठनीयता और AI प्रोसेसिंग के बीच एक अच्छा संतुलन प्रदान करता है।

```
इस मार्कडाउन फाइल में मेरे रिपॉजिटरी की सभी फाइलें हैं। कृपया इसकी समीक्षा करें और सुधार के लिए सुझाव दें।
```

### प्लेन टेक्स्ट के साथ

प्लेन टेक्स्ट फॉर्मेट सबसे सरल है लेकिन फाइल संरचना और संदर्भ के बारे में कम जानकारी प्रदान करता है।

```
इस टेक्स्ट फाइल में मेरे रिपॉजिटरी की सभी फाइलें हैं। कृपया इसकी समीक्षा करें और सुधार के लिए सुझाव दें।
```

## अगला क्या है?

- [कमांड लाइन विकल्पों](command-line-options.md) के बारे में अधिक जानें
- [कॉन्फिगरेशन विकल्पों](configuration.md) का अन्वेषण करें
- [सुरक्षा सुविधाओं](security.md) के बारे में जानें
