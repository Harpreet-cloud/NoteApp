import fs from "fs";


// insert svg icons
const icon = (iconName) => fs.readFileSync(`./src/public/icons/${iconName}.svg`);
const siteName = "NoteApp";

export default {
  icon,
  siteName,
}