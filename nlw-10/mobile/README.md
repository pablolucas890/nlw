# Nlw Copa - Mobile
-  (Compoents with buttons, etc)
- npx expo install react-native-svg@12.1.1
- npx expo install react-native-safe-area-context
- install expo-fonts
- install react-native-svg-transformer
- configure file metro.config.js
- configure import svg files on src/@types/svg.d.ts
```
declare module "*.svg" {
    import React from 'react'
    import { SvgProps } from 'react-native-svg'
    const content: React.FC<SvgProps>
    export default content
}
```