module.exports = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Vercel function finally working"
  });
};
