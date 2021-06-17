const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const content = req.body;

  try {
    const newPost = await Post.create({
      ...content,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedContent = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('Post has been updated.');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteContent = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('Post has been updated.');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
