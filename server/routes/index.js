const express = require('express');
const shortid = require('shortid');

const queries = require('../queries');

const router = express.Router();

/**
 * GET /{id}
 * @summary Redirect to the original link
 * @tags redirect
 * @param {string} id.path.required - Id of the link
 * @returns 301 - redirect
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (shortid.isValid(id)) {
    try {
      const result = await queries.links.get({ id });
      if (!result) {
        res.status(404).json('Link does not exist');
      } else {
        await queries.clicks.add({ linkId: id });
        res.redirect(result.link);
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid link id provided');
  }
});

module.exports = router;