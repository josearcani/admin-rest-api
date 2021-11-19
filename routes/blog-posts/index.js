const app = require('express').Router();

const api = require('./api');

const authAdminUser = require('../../middlewares/index').authAdminUser;

// get all posts
app.get('/blog-posts/get-all', authAdminUser, function (req, res) {
  if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.getAllBlogPosts(function (apiResponse) {
      apiResponse.authSuccess = true;
      res.json(apiResponse);
    })
  }
})

// create post
app.post('/blog-posts/create-new', authAdminUser, function (req, res) {
  if (
    !req.body.title ||
    !req.body.urlTitle ||
    !req.body.dateTimestamp ||
    !req.body.tags ||
    !req.body.thumbnailImageUrl ||
    !req.body.markdownContent ||
    !req.body.seoTitleTag ||
    !req.body.seoMetaDescription
  ) {
    res.json({ submitError: false });
  } else if (!res.locals.authSuccess) {
    res.json({ authSuccess: false }); // to validatew index in frontend
  } else {
    api.createNewBlogPost(
      req.body.title,
      req.body.urlTitle,
      req.body.dateTimestamp,
      req.body.tags,
      req.body.thumbnailImageUrl,
      req.body.markdownContent,
      req.body.seoTitleTag,
      req.body.seoMetaDescription,
      function(apiResponse) {
        apiResponse.authSuccess = true; // if all runs right is validated
        res.json(apiResponse);
      }
    )
  }
})

// get post  by id
app.get('/blog-posts/get-post-by-id', authAdminUser, function(req, res) {
  if (!req.query.id) {
    res.json({notFoundError: false})
  } else if (!res.locals.authSuccess) {
    res.json({authSuccess: false})
  } else {
    api.getBlogPostById(req.query.id, function(apiResponse) {
      apiResponse.authSuccess = true
      res.json(apiResponse)
    })
  }
})

// edit post
app.put('/blog-posts/edit', authAdminUser, function(req, res) {
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.urlTitle ||
    !req.body.dateTimestamp ||
    !req.body.tags ||
    !req.body.thumbnailImageUrl ||
    !req.body.markdownContent ||
    !req.body.seoTitleTag ||
    !req.body.seoMetaDescription
  ) {
    res.json({submitError: false})
  } else if (!res.locals.authSuccess) {
    res.json({authSuccess: false})
  } else {
    api.editBlogPost(
      req.body.id,
      req.body.title,
      req.body.urlTitle,
      req.body.dateTimestamp,
      req.body.tags,
      req.body.thumbnailImageUrl,
      req.body.markdownContent,
      req.body.seoTitleTag,
      req.body.seoMetaDescription,
      function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      }
    )
  }
})

// dek¿lete a post
app.put('/blog-posts/delete', authAdminUser, function(req, res) {
  if (!req.body.id) {
    res.json({success: false})
  } else if (!res.locals.authSuccess) {
    res.json({authSuccess: false})
  } else {
    api.deleteBlogPost(req.body.id, function(apiResponse) {
      apiResponse.authSuccess = true
      res.json(apiResponse)
    })
  }
})

module.exports = app;