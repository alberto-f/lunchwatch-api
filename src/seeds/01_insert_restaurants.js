/* eslint-disable import/prefer-default-export */
/**
 * Seed restaurants table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  return knex('restaurants')
    .del()
    .then(() => Promise.all([
      knex('restaurants').insert([
        {
          id: 1,
          name: 'Smarthouse',
          chain: 'Amica',
          url: 'https://www.amica.fi/ravintolat/ravintolat-kaupungeittain/oulu/smarthouse/',
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Garden',
          chain: 'Amica',
          url: 'https://www.amica.fi/ravintolat/ravintolat-kaupungeittain/oulu/teknologiantie-1/',
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'VTT Oulu',
          chain: 'Amica',
          url: 'https://www.amica.fi/ravintolat/ravintolat-kaupungeittain/oulu/vtt-oulu/',
          updated_at: new Date(),
        },
      ]),
    ]));
}
