# Country Images Folder

This folder contains all country-specific images for the visa service tiles.

## Naming Convention

Please name your images using the following format:
- **Lowercase country name** + `.jpg` extension
- **Spaces become hyphens** in multi-word country names
- Examples:
  - `australia.jpg`
  - `singapore.jpg`
  - `dubai.jpg`
  - `russia.jpg`
  - `azerbaijan.jpg`
  - `philippines.jpg`
  - `sri-lanka.jpg`
  - `indonesia.jpg`
  - `cambodia.jpg`
  - `united-states-of-america.jpg`
  - `united-kingdom.jpg`
  - `new-zealand.jpg`

## Supported Countries

The following countries currently have visa services and can have images:

### E-Visas (Online)
- Australia ✅ (already added)
- Singapore
- Dubai
- Russia
- Azerbaijan
- Philippines
- Sri Lanka
- Indonesia
- Cambodia
- Georgia
- South Korea
- Turkey
- Uganda
- Bahrain
- Armenia
- Hong Kong
- Thailand
- Malaysia
- New Zealand

### Sticker/Embassy Visas
- United States of America
- United Kingdom
- Canada
- Japan
- South Africa
- France
- Switzerland
- Germany
- Greece
- Italy
- Netherlands
- Poland
- Denmark
- Slovakia
- Slovenia
- Austria
- Czech Republic
- Hungary
- Iceland
- Bulgaria
- Spain
- Norway
- Finland
- Portugal
- Turkey

## Image Requirements

- **Format**: JPG or PNG
- **Size**: Recommended 800x600px or similar aspect ratio
- **Content**: Should represent iconic landmarks or landscapes of the country
- **Quality**: High resolution for best display quality

## How to Add Images

1. Save your image file in this folder (`public/country-images/`)
2. Name it using the lowercase country name (e.g., `singapore.jpg`)
3. The VisaTile component will automatically detect and display the image

## Current Status

- ✅ Australia: `australia.jpg` (Sydney Opera House)
- ✅ Singapore: `singapore.jpg` (Marina Bay Sands & Merlion)
- ✅ Greece: `greece.jpg` (Santorini/Acropolis)
- ✅ Switzerland: `switzerland.jpg` (Alpine landscapes)
- ⏳ Germany: `germany.jpg` (Neuschwanstein Castle/Brandenburg Gate)
- ⏳ Italy: `italy.jpg` (Colosseum/Vatican/Venice)
- ⏳ Poland: `poland.jpg` (Warsaw/Krakow/Wieliczka Salt Mine)
- ⏳ Dubai: `dubai.jpg` (Burj Khalifa/Dubai Marina)
- ⏳ Russia: `russia.jpg` (Red Square/St. Basil's Cathedral)
- ⏳ Azerbaijan: `azerbaijan.jpg` (Baku Flame Towers)
- ⏳ Philippines: `philippines.jpg` (Boracay/Palawan)
- ⏳ Sri Lanka: `sri-lanka.jpg` (Sigiriya/Temple of Tooth)
- ⏳ Indonesia: `indonesia.jpg` (Bali/Borobudur)
- ⏳ Cambodia: `cambodia.jpg` (Angkor Wat/Siem Reap)
- ⏳ Georgia: `georgia.jpg` (Tbilisi/Svaneti)
- ⏳ South Korea: `south-korea.jpg` (Seoul/Gyeongbokgung)
- ⏳ Turkey: `turkey.jpg` (Hagia Sophia/Cappadocia)
- ⏳ Uganda: `uganda.jpg` (Bwindi/Murchison Falls)
- ⏳ Bahrain: `bahrain.jpg` (Bahrain Fort/Manama)
- ⏳ Armenia: `armenia.jpg` (Mount Ararat/Yerevan)
- ⏳ Hong Kong: `hong-kong.jpg` (Victoria Peak/Skyline)
- ⏳ Thailand: `thailand.jpg` (Bangkok/Temples)
- ⏳ Malaysia: `malaysia.jpg` (Petronas Towers/KLCC)
- ⏳ New Zealand: `new-zealand.jpg` (Milford Sound/Auckland)
- ⏳ United States of America: `united-states-of-america.jpg` (Statue of Liberty/Empire State Building)
- ⏳ United Kingdom: `united-kingdom.jpg` (Big Ben/London Eye/Tower Bridge)
- ⏳ Canada: `canada.jpg` (CN Tower/Niagara Falls/Banff)
- ⏳ Japan: `japan.jpg` (Mount Fuji/Tokyo Skyline/Temples)
- ⏳ South Africa: `south-africa.jpg` (Table Mountain/Kruger National Park)
- ⏳ France: `france.jpg` (Eiffel Tower/Louvre/Notre-Dame)
- ⏳ Denmark: `denmark.jpg` (Nyhavn/Little Mermaid/Copenhagen)
- ⏳ Slovakia: `slovakia.jpg` (Bratislava Castle/High Tatras)
- ⏳ Slovenia: `slovenia.jpg` (Lake Bled/Ljubljana Castle)
- ⏳ Austria: `austria.jpg` (Vienna/Salzburg/Alps)
- ⏳ Czech Republic: `czech-republic.jpg` (Prague Castle/Charles Bridge)
- ⏳ Hungary: `hungary.jpg` (Budapest/Parliament Building/Danube)
- ⏳ Iceland: `iceland.jpg` (Northern Lights/Blue Lagoon/Geysers)
- ⏳ Bulgaria: `bulgaria.jpg` (Sofia/Rila Monastery/Black Sea)
- ⏳ Spain: `spain.jpg` (Sagrada Familia/Alhambra/Madrid)
- ⏳ Norway: `norway.jpg` (Fjords/Northern Lights/Oslo)
- ⏳ Finland: `finland.jpg` (Helsinki/Northern Lights/Saunas)
- ⏳ Portugal: `portugal.jpg` (Lisbon/Porto/Algarve)
- ⏳ Other countries: Images can be added as needed

## How It Works

The system automatically detects and displays images based on country names:
1. **Dynamic Loading**: Images are loaded automatically when you add them to this folder
2. **Smart Naming**: Country names are converted to lowercase and spaces become hyphens
3. **Custom Positioning**: All countries have optimized image positioning:
   - **Architecture Focus** (`center 25%`): Dubai, Germany, Hong Kong, United States of America
   - **Landmark Focus** (`center 30%`): Singapore, Russia, Cambodia, South Korea, Bahrain, New Zealand, Poland, United Kingdom, Canada, France, Spain, Portugal
   - **Cultural Focus** (`center 35%`): Switzerland, Azerbaijan, Sri Lanka, Georgia, Turkey, Armenia, Malaysia, Italy, Japan, Denmark, Slovakia, Slovenia, Austria, Czech Republic, Hungary, Bulgaria
   - **Natural Focus** (`center 40%`): Greece, Philippines, Indonesia, Uganda, Thailand, South Africa, Iceland, Norway, Finland
4. **Fallback**: If no image exists, the tile shows the default gradient background
