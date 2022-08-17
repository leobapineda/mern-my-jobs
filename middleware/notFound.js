 const notFound = (req, res) => {
   res.status(404).send("Upps, route does not found");
 };

export default notFound