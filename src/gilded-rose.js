export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const clamp = (q) => Math.max(0, Math.min(50, q));

const rules = {
  'Aged Brie': (item) => {
    item.sellIn--;
    item.quality = clamp(item.quality + (item.sellIn < 0 ? 2 : 1));
  },
  'Sulfuras, Hand of Ragnaros': () => {},
  'Backstage passes to a TAFKAL80ETC concert': (item) => {
    item.sellIn--;
    if (item.sellIn < 0) { item.quality = 0; return; }
    const step = item.sellIn < 5 ? 3 : item.sellIn < 10 ? 2 : 1;
    item.quality = clamp(item.quality + step);
  },
  Conjured: (item) => {
    item.sellIn--;
    item.quality = clamp(item.quality - (item.sellIn < 0 ? 4 : 2));
  },
};

const normal = (item) => {
  item.sellIn--;
  item.quality = clamp(item.quality - (item.sellIn < 0 ? 2 : 1));
};

const ruleFor = (item) =>
  rules[item.name] ?? (item.name.startsWith('Conjured') ? rules.Conjured : normal);

export class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) ruleFor(item)(item);
    return this.items;
  }
}
