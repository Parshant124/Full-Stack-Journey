import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Health Check Data", "Health Checking is a Success")
    )
})

// const healthCheck = async (req, res, next) => {
//   Promise.resolve()
//     .then(() => {
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             "Health Check Data",
//             "Health Checking is a Success"
//           )
//         )
//     })
//     .catch((err) => next(err))
// }

export { healthCheck }
