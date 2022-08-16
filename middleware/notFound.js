 const notFound = (req, res) => {
   res.status(404).send("Upps, page not found");
 };

export default notFound