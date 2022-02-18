export enum LaserColor {
  PURPLE_YELLOW = '01',
  PURPLE_GREEN = '02',
  PURPLE_WHITE = '03',
  PURPLE_CYAN = '04'
}

export enum LaserPattern { // I can't come up with good names for these, they're hard to describe
  AA = 'a a',                 // Its basically just the way the panel flickers
  AB = 'a b',
  AC = 'a c',
  BA = 'b a',
  BB = 'b b',
  BC = 'b c',
  CA = 'c a',
  CB = 'c b',
  CC = 'c c'
}