import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GildedRose, Item } from '../src/gilded-rose.js';

const after = (name, sellIn, quality, days = 1) => {
  const shop = new GildedRose([new Item(name, sellIn, quality)]);
  for (let i = 0; i < days; i++) shop.updateQuality();
  return shop.items[0];
};

test('normal item degrades by one', () => {
  const i = after('+5 Dexterity Vest', 10, 20);
  assert.equal(i.sellIn, 9);
  assert.equal(i.quality, 19);
});

test('normal item degrades twice as fast after sell date', () => {
  assert.equal(after('Elixir of the Mongoose', 0, 10).quality, 8);
});

test('quality never negative', () => {
  assert.equal(after('Elixir of the Mongoose', 0, 1).quality, 0);
});

test('brie gets better with age', () => {
  assert.equal(after('Aged Brie', 2, 0).quality, 1);
  assert.equal(after('Aged Brie', 0, 0).quality, 2);
});

test('quality never above fifty', () => {
  assert.equal(after('Aged Brie', 5, 50).quality, 50);
});

test('sulfuras never changes', () => {
  const i = after('Sulfuras, Hand of Ragnaros', 0, 80, 5);
  assert.equal(i.sellIn, 0);
  assert.equal(i.quality, 80);
});

test('backstage passes', () => {
  const name = 'Backstage passes to a TAFKAL80ETC concert';
  assert.equal(after(name, 15, 20).quality, 21);
  assert.equal(after(name, 10, 20).quality, 22);
  assert.equal(after(name, 5, 20).quality, 23);
  assert.equal(after(name, 1, 20).quality, 23);
  assert.equal(after(name, 0, 20).quality, 0);
});

test('conjured items degrade twice as fast', () => {
  assert.equal(after('Conjured Mana Cake', 3, 6).quality, 4);
  assert.equal(after('Conjured Mana Cake', 0, 6).quality, 2);
});

test('thirty day run matches golden output', () => {
  const items = [
    new Item('+5 Dexterity Vest', 10, 20),
    new Item('Aged Brie', 2, 0),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  ];
  const shop = new GildedRose(items);
  for (let d = 0; d < 30; d++) shop.updateQuality();
  assert.deepEqual(shop.items.map((i) => [i.sellIn, i.quality]), [
    [-20, 0], [-28, 50], [0, 80], [-15, 0],
  ]);
});
