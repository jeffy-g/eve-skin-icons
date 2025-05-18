# eve-skin-icons

Skin icon images from the EVE Online client, packaged as an easy‑to‑install npm module for third‑party sites and custom web applications.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Assets](#available-assets)
- [Contributing](#contributing)
- [License & Copyright](#license--copyright)

---

## Installation

Install the package via npm:

```bash
npm install eve-skin-icons
```

or with yarn:

```bash
yarn add eve-skin-icons
```

---

## Usage

### Unpacking the Icon Images

After installing the package, use the `eve-skin-icons-unpack` command to extract the skin icon images into a local directory:

```bash
npx eve-skin-icons-unpack ./icons
```

This command will unzip the skin icon images into the specified directory (`./icons` in this example).

#### CLI Options:
- `[output directory]` : The directory where you want to extract the images. If not provided, the images will be unpacked into the `<CWD>/skin-icons`.



### Import and use the skin icon URLs in your application:

```js
import { SkinMap } from "eve-skin-icons";

// usage example
export const resolveTypeImageURL = (typeId: number | string, size = 32) => {
    const skinNumber: number = SkinMap[typeId];
    if (skinNumber) {
        return `./images/skin-icons/${skinNumber}.png`;
    } else {
        return `https://images.evetech.net/types/${typeId}/icon?size=${size}`;
    }
};
// example: resolveTypeImageURL(35224) returns './images/skin-icons/3130.png'
```

### API

- `SkinMap[typeId]`\
  Returns the icon image number associated with the given SKIN type ID.  
  If no mapping is found, a fallback to EVE's image server is used.

---

## Select Your SkinMap Version

- **`skin-map.mjs`**: Fully unpacked for instant access, but larger in size (177 KB, `import { SkinMap } from "eve-skin-icons/skin-map.mjs"`).  
- **`skin-map-next.mjs`**: Text-compressed format, lightweight (112 KB, `import { SkinMap } from "eve-skin-icons/skin-map-next.mjs"`).  
- **`skin-map-compress.mjs`**: Ultra-lightweight with gzip + Base64 encoding (41 KB, default when using `import { SkinMap } from "eve-skin-icons"`).

---

## Available Assets

All skin icon images extracted from the official EVE Online client. Icons are provided in a fixed resolution of 64×64 px.

  + Refer to the [docs](./docs) for a full list of supported skin IDs. A full list will be available soon.

---

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and the code of conduct.

---

## License & Copyright

> ### Copyright Notice  
EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide.  
 
All other trademarks are the property of their respective owners.  
EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork,  
screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property  
relating to these trademarks are likewise the intellectual property of CCP hf.  
 
CCP hf. has granted permission to `eve-skin-icons` to use EVE Online and all associated logos  
and designs for promotional and information purposes on its website but does not endorse,  
and is not in any way affiliated with, `eve-skin-icons`.  
 
CCP is in no way responsible for the content on or functioning of this website,  
nor can it be liable for any damage arising from the use of this website.

This package is provided for non-commercial, informational use only.  
Redistribution of the included image assets requires explicit permission from CCP hf.

