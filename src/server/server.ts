import fs from 'fs';

onNet('coords', (pos: number[], rot: number[], label: string): void => {
  try {
    fs.writeFileSync('D:\\FXServer\\server-data\\resources\\[local]\\nightclub_lights\\coords.txt', `${label}  |  ${JSON.stringify({ pos, rot })}`);
  } catch (e) {
    console.log(e);
  }
});

onNet('saveToFile', (data: string): void => {
  try {
    fs.writeFileSync(`D:\\FXServer\\server-data\\resources\\[local]\\nightclub_lights\\light_set_${+ new Date()}.txt`, data);
  } catch (e) {
    console.log(e);
  }
});