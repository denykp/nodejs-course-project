exports.error404 = (_, res) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
};
