const dayjs = require('dayjs')
const express = require('express');
const shortid = require('shortid');

const queries = require('../queries');
const isUrl = require('../utils/isUrl');

const router = express.Router();

/**
 * A ShortentRequest type
 * @typedef {object} ShortentRequest
 * @property {string} link - A link to shortent
 */

/**
 * POST /api/shorten
 * @summary Shorten a link
 * @tags link
 * @param {ShortentRequest} request.body.required - data - application/json
 * @return {string} 201 - success response - application/json
 */
router.post('/shorten', async (req, res) => {
  const { link } = req.body;

  if (isUrl(link)) {
    const id = shortid.generate();
    try {
      await queries.links.add({ id, link });
      res.status(201).json(id);
    } catch (err) {
      logger.error(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid link provided');
  }
});

/**
 * A ClickCounts type
 * @typedef {object} ClickCounts
 * @property {string} date - A date of the clicks
 * @property {number} count - Number of the clicks
 */

/**
 * A StatsResponse type
 * @typedef {object} StatsResponse
 * @property {string} id - An id of the link
 * @property {string} link - The original link
 * @property {string} createdAt - The time when the short link has been created
 * @property {array<ClickCounts>} clicks - Clicks on the link per day
 */

/**
 * GET /api/stats/{id}/{months}
 * @summary Get the statistics of the link
 * @tags link
 * @param {string} id.path.required - Id of the link
 * @param {number|undefined} months.path - The statistics period as a number of the monthes
 * @returns {StatsResponse} 200 - success response - application/json
 */
router.get('/stats/:id/:months?', async (req, res) => {
  const { id, months: monthsParam } = req.params;

  if (!shortid.isValid(id)) {
    res.status(400).json('Invalid link id provided');
  }

  const monthsStr = monthsParam && monthsParam.trim();
  const months = monthsStr && !isNaN(monthsStr) ? parseInt(monthsStr, 10) : 0;

  let startDate;
  let endDate;

  if (months) {
    const toSubstruct = months - 1;
    const now = dayjs();
    startDate = now.subtract(toSubstruct, 'month').startOf('month').toDate();
    endDate = now.endOf('month').toDate();
  }

  try {
    const result = await queries.stats.get({ id, startDate, endDate });

    result
      ? res.status(200).json(result)
      : res.status(404).json('Link does not exist');
  } catch (err) {
    logger.error(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
