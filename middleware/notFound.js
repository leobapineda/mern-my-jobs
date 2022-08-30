 const notFound = (req, res) => {
   res.status(404).send("Upps, route not found");
 };

export default notFound