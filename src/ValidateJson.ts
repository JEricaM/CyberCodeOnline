import { FileHelper } from "./FileHelper";


const paths = FileHelper.getAllFiles('./contribution').filter(fileName => fileName.endsWith('.json'));

let index = 1;
for (const path of paths) {
  try {
    const str = FileHelper.getFile(path);
    JSON.parse(str);
    console.log(`(${index}/${paths.length}) ${path} valid`)
    index++;
  } catch (e) {
    throw new Error(`${path} is invalid JSON, ${e}`);
  }
}

const maskStr = FileHelper.getFile('./contribution/dungeon/layout/structure-mask.json');
const mask: { rooms: { tiles: string[] }[] } = JSON.parse(maskStr);
index = 1;
for (const room of mask.rooms) {
  if (room.tiles.length !== 225) {
    throw `Room number ${index} has invalid room config, ${room.tiles.length}`;
  }
  for (const tile of room.tiles) {
    if (tile !== " " && tile !== "#") {
      throw `Room number ${index} contains invalid character, '${tile}' is not a valid tile symbol`;
    }
  }
  index++;
}

console.log(`JSON Validation complete.`)