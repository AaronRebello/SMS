// const fileUpload = require("../config/multer");
// const Resource = require("../models/Resources");


// exports.adminResources = (req,res) => {
//     await Resource.find({}).then((resource) => {
//         if (resource.length > 0) {
//           res.status(200).json(resource);
//         } else {
//           res.status(404).json({ msg: "no resource found" });
//         }
//       });
// }